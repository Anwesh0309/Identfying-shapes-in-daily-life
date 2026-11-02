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
let currentSessionId = 0;        // Monotonic session counter for cancellation
let globalAudioElement = null;   // Single global HTMLAudioElement instance for entire app
let currentAudioResolver = null; // Resolver for currently awaiting audio promise
const audioCache = new Map();

function getGlobalAudio() {
  if (!globalAudioElement && typeof window !== 'undefined') {
    globalAudioElement = new Audio();
  }
  return globalAudioElement;
}

// Helper to check if text is empty or just punctuation
const isSilence = (text) => !text || !/[a-zA-Z0-9]/.test(text);

// ── Public API ──

export function setAudioEnabled(val) {
  _audioEnabled = val;

  if (!val) {
    // Muting: stop currently playing sounds immediately
    currentSessionId++;
    _stopCurrent();
  }
}

export function stopNarration() {
  currentSessionId++;
  _stopCurrent();
}

export async function narrate(segments) {
  if (!segments || segments.length === 0) return;
  
  // Stop existing narrations and advance session token
  const mySession = ++currentSessionId;
  _stopCurrent();

  if (!_audioEnabled) return;

  await _narrateFrom(segments, mySession);
}

// ── Internal Helpers ──

async function _narrateFrom(segments, mySession) {
  for (let i = 0; i < segments.length; i++) {
    if (mySession !== currentSessionId || !_audioEnabled) break;

    const { text, style = 'statement' } = segments[i];
    if (isSilence(text)) continue;

    const url = await getAudioUrl(text, style);
    
    // Strict check after async fetch
    if (mySession !== currentSessionId || !_audioEnabled) {
      _stopCurrent();
      return;
    }

    if (!url) {
      // Missing audio URL: never fall back to conflicting speech synthesis
      continue;
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

    // Play pre-generated or cached ElevenLabs URL using singleton Audio
    await new Promise(resolve => {
      if (mySession !== currentSessionId || !_audioEnabled) return resolve();

      const audio = getGlobalAudio();
      if (!audio) return resolve();

      currentAudioResolver = resolve;
      
      const cleanup = () => {
        audio.onended = null;
        audio.onerror = null;
        if (currentAudioResolver === resolve) {
          currentAudioResolver = null;
        }
        resolve();
      };

      audio.onended = cleanup;
      audio.onerror = cleanup;
      audio.src = url;
      try {
        audio.load();
      } catch (e) {}
      audio.currentTime = 0;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Play was interrupted or blocked
          console.warn('Audio playback info:', err?.message || err);
          cleanup();
        });
      }
    });

    if (mySession !== currentSessionId) {
      _stopCurrent();
      break;
    }
  }

  if (mySession === currentSessionId) {
    currentAudioResolver = null;
  }
}

function _stopCurrent() {
  const audio = getGlobalAudio();
  if (audio) {
    try {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
      audio.onended = null;
      audio.onerror = null;
    } catch (e) {}
  }
  if (currentAudioResolver) {
    try {
      currentAudioResolver();
    } catch (e) {}
    currentAudioResolver = null;
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
    const base = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '');
    return `${base}/assets/audio/${audioMap[slug]}`;
  }

  // Check runtime memory cache
  if (audioCache.has(slug)) {
    return audioCache.get(slug);
  }

  // Dynamic API call fallback via serverless proxy or directly if key is local
  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY || 'sk_1477a0b0a31e89b834b1e17ca4468c02a6e8bf554f621c5a';
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
