import { audioMap } from './audioMap.js';

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // ElevenLabs Alice
const MODEL = 'eleven_multilingual_v2';

const STYLE_SETTINGS = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

// ── Internal State ──
let _audioEnabled = true;
let activeQueueId = null;   // Symbol ID for currently running queue
let currentAudio = null;    // Current HTMLAudioElement playing
let pausedSegments = null;  // { segments, index } saved when muted mid-queue
const audioCache = new Map();

// Helper to check if text is empty or just punctuation
const isSilence = (text) => !text || !/[a-zA-Z0-9]/.test(text);

// ── Public API ──

export function setAudioEnabled(val) {
  _audioEnabled = val;

  if (!val) {
    // Muting: stop currently playing sounds immediately
    activeQueueId = null;
    pausedSegments = null;
    _stopCurrent();
  }
}

export function stopNarration() {
  activeQueueId = null;
  pausedSegments = null;
  _stopCurrent();
  try {
    window.speechSynthesis.cancel();
  } catch (e) {}
}

export async function narrate(segments) {
  if (!segments || segments.length === 0) return;
  
  // Stop existing narrations
  activeQueueId = null;
  pausedSegments = null;
  _stopCurrent();
  try {
    window.speechSynthesis.cancel();
  } catch (e) {}

  if (!_audioEnabled) return;

  await _narrateFrom(segments, 0);
}

// ── Internal Helpers ──

async function _narrateFrom(segments, startIndex) {
  const myId = Symbol();
  activeQueueId = myId;

  for (let i = startIndex; i < segments.length; i++) {
    if (activeQueueId !== myId) break;

    // Check if muted mid-loop
    if (!_audioEnabled) {
      pausedSegments = { segments, index: i };
      _stopCurrent();
      return;
    }

    const { text, style = 'statement' } = segments[i];
    if (isSilence(text)) continue;

    const url = await getAudioUrl(text, style);
    
    // Strict check after async fetch
    if (activeQueueId !== myId || !_audioEnabled) {
      if (!_audioEnabled) pausedSegments = { segments, index: i };
      _stopCurrent();
      return;
    }

    // Preload next segment to eliminate delay
    if (i + 1 < segments.length) {
      const nextSegment = segments[i + 1];
      if (!isSilence(nextSegment.text)) {
        getAudioUrl(nextSegment.text, nextSegment.style || 'statement');
      }
    }

    // Always ensure prior audio is stopped before starting a new clip
    _stopCurrent();

    if (!url) {
      // Fallback: Web Speech API
      await new Promise(resolve => {
        if (activeQueueId !== myId || !_audioEnabled) return resolve();
        
        try {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
          }
          const utterance = new SpeechSynthesisUtterance(text);
          const voices = window.speechSynthesis.getVoices();
          const enVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
                          voices.find(v => v.lang.startsWith('en') && v.name.includes('Natural')) ||
                          voices.find(v => v.lang.startsWith('en')) ||
                          voices[0];
          
          if (enVoice) utterance.voice = enVoice;
          utterance.rate = 0.95; // child friendly speed
          utterance.pitch = 1.05; // slightly higher pitch
          
          const onDone = () => {
            utterance.onend = null;
            utterance.onerror = null;
            resolve();
          };

          utterance.onend = onDone;
          utterance.onerror = onDone;
          
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          resolve();
        }
      });
    } else {
      // Play pre-generated or cached ElevenLabs URL
      await new Promise(resolve => {
        if (activeQueueId !== myId || !_audioEnabled) return resolve();

        const audio = new Audio(url);
        currentAudio = audio;
        
        const cleanup = () => {
          audio.onended = null;
          audio.onerror = null;
          if (currentAudio === audio) currentAudio = null;
          resolve();
        };

        audio.onended = cleanup;
        audio.onerror = cleanup;
        audio.play().catch(() => cleanup());
      });
    }

    if (activeQueueId !== myId) {
      _stopCurrent();
      break;
    }
  }

  if (activeQueueId === myId) {
    activeQueueId = null;
    currentAudio = null;
  }
}

function _stopCurrent() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.onended = null;
      currentAudio.onerror = null;
      currentAudio.removeAttribute('src');
      currentAudio.load();
    } catch (e) {}
    currentAudio = null;
  }
  try {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } catch (e) {}
}

// Slugify string for mapping key
function getSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove punctuation
    .trim()
    .replace(/[-\s]+/g, '_'); // replace spaces/dashes with underscores
}

async function getAudioUrl(text, style = 'statement') {
  if (isSilence(text)) return null;
  
  const slug = getSlug(text);
  
  // Check static audio map first
  if (audioMap && audioMap[slug]) {
    return `/assets/audio/${audioMap[slug]}`;
  }

  // Check runtime memory cache
  if (audioCache.has(slug)) {
    return audioCache.get(slug);
  }

  // Dynamic API call fallback via serverless proxy or directly if key is local
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY || 'sk_0af55b573c54fe31387443150c45624fed865ccc914cd486';
  if (!apiKey) return null;

  try {
    const settings = STYLE_SETTINGS[style] || STYLE_SETTINGS.statement;
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: settings,
      }),
    });

    if (!res.ok) return null;

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    audioCache.set(slug, url);
    return url;
  } catch (e) {
    return null;
  }
}

// ── Segment Builder Helpers ──
export const say       = (text) => ({ text, style: 'statement'   });
export const ask       = (text) => ({ text, style: 'question'    });
export const cheer     = (text) => ({ text, style: 'celebration' });
export const emphasize = (text) => ({ text, style: 'emphasis'    });
export const think     = (text) => ({ text, style: 'thinking'    });
export const celebrate = (text) => ({ text, style: 'celebration' });
export const instruct  = (text) => ({ text, style: 'statement'   });
export const encourage = (text) => ({ text, style: 'encouragement' });

// ── Web Audio Sound Effects (Zero Latency Synthesizer) ──
let audioCtx = null;
function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, dur, type = 'sine', gain = 0.15) {
  if (!_audioEnabled) return;
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    
    osc.connect(g);
    g.connect(ctx.destination);
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch (e) {}
}

export function sfxCorrect() {
  playTone(523, 0.10); // C5
  setTimeout(() => playTone(659, 0.10), 80); // E5
  setTimeout(() => playTone(784, 0.20), 160); // G5
}

export function sfxWrong() {
  playTone(220, 0.15, 'sawtooth', 0.12); // A3
  setTimeout(() => playTone(196, 0.22, 'sawtooth', 0.10), 100); // G3
}

export function sfxBadge() {
  [523, 659, 784, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.15, 'sine', 0.12), i * 70);
  });
}

export function sfxStreak() {
  [784, 880, 988, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.10, 'sine', 0.15), i * 50);
  });
}

export function sfxLevelUp() {
  [523, 587, 659, 698, 784, 880, 988, 1047].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.08, 'sine', 0.10), i * 40);
  });
}
