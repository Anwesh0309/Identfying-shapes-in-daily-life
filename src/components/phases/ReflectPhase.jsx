import { useEffect } from 'react';
import { Star, RotateCcw, Home } from 'lucide-react';
import { narrate, say, stopNarration, sfxLevelUp } from '../../utils/audio.js';
import { calcStars } from '../../utils/scoring.js';

// Confetti dots for decoration
const CONFETTI = [
  { top:'8%', left:'8%', color:'#f472b6', size:10 },
  { top:'12%', left:'30%', color:'#facc15', size:8 },
  { top:'6%', left:'55%', color:'#38bdf8', size:12 },
  { top:'10%', left:'78%', color:'#4ade80', size:9 },
  { top:'20%', left:'90%', color:'#a78bfa', size:11 },
  { top:'80%', left:'5%', color:'#fb923c', size:10 },
  { top:'75%', left:'22%', color:'#facc15', size:8 },
  { top:'85%', left:'68%', color:'#38bdf8', size:12 },
  { top:'78%', left:'88%', color:'#f472b6', size:9 },
  { top:'40%', left:'3%', color:'#4ade80', size:7 },
  { top:'55%', left:'93%', color:'#a78bfa', size:8 },
];

function getMascotMessage(pct) {
  if (pct >= 80) return 'Outstanding! You are a Geometry Master! 🌟';
  if (pct >= 60) return 'Great work! Keep practising to reach the top! 💪';
  if (pct >= 40) return 'Good start! Try again to improve! 👍';
  return 'Keep going! Every attempt makes you better! 🤗';
}

export default function ReflectPhase({ state, onComplete }) {
  useEffect(() => {
    stopNarration();
    sfxLevelUp();
    if (state.audioEnabled) {
      const pct = Math.round(((state.worldCorrect?.reduce((a,b)=>a+(b||0),0) || 0) / Math.max(state.currentQuestion, 1)) * 100);
      narrate([say(`Journey complete! You finished all phases. ${getMascotMessage(pct)}`)]);
    }
  }, []);

  // Calculate stats from state
  const totalCorrect = state.worldCorrect?.reduce((a, b) => a + (b || 0), 0) || 0;
  const totalAnswered = Math.max(state.currentQuestion || 0, totalCorrect);
  const pct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : pct >= 30 ? 1 : 0;

  // Per-world rows (use worldCorrect from state, groups of ~10)
  const worldRows = [
    { icon: '🍎', label: 'Shape Identification', correct: state.worldCorrect?.[0] || 0, total: 10 },
    { icon: '⭐', label: '3D Solid Matching', correct: state.worldCorrect?.[1] || 0, total: 10 },
    { icon: '🧸', label: 'Properties & Counting', correct: state.worldCorrect?.[2] || 0, total: 10 },
  ];

  const handlePlayAgain = () => onComplete({ replay: true });

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', width: '100%',
      padding: 'clamp(60px,7vh,80px) clamp(14px,4vw,40px) clamp(10px,2vh,20px)',
      boxSizing: 'border-box', zIndex: 10, position: 'relative', overflow: 'hidden',
    }}>

      {/* Confetti decorations */}
      {CONFETTI.map((c, i) => (
        <div key={i} style={{
          position: 'absolute', top: c.top, left: c.left,
          width: c.size, height: c.size,
          background: c.color, borderRadius: 3,
          opacity: 0.7, transform: 'rotate(45deg)',
          animation: `float ${2 + (i % 3) * 0.7}s infinite ease-in-out`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Main card */}
      <div className="glass-card" style={{
        width: 'min(92%, 420px)', borderRadius: 24, padding: '24px 22px',
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        position: 'relative', zIndex: 2,
      }}>

        {/* Trophy */}
        <span style={{ fontSize: 48 }}>🏆</span>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Fredoka One', color: '#fff', margin: 0, fontSize: 22 }}>
            Journey Complete!
          </h2>
          <p style={{ fontFamily: 'Nunito', color: 'rgba(255,255,255,0.55)', margin: '2px 0 0', fontSize: 12, fontWeight: 700 }}>
            You finished all 5 phases!
          </p>
        </div>

        {/* Score circle */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          border: `6px solid #facc15`,
          boxShadow: '0 0 20px rgba(250,204,21,0.4)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'Fredoka One', fontSize: 26, color: '#facc15', lineHeight: 1 }}>{pct}%</span>
          <span style={{ fontFamily: 'Nunito', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>
            {totalCorrect}/{totalAnswered}
          </span>
        </div>

        {/* Stars */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[0,1,2].map(i => (
            <Star key={i} size={22}
              color="#facc15" fill={i < stars ? '#facc15' : 'none'}
              style={{ opacity: i < stars ? 1 : 0.3 }}
            />
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, width: '100%' }}>
          {[
            { label: 'XP Earned', value: state.xp || 0, color: '#fb923c' },
            { label: 'Max Streak', value: `🔥 ${state.maxStreak || 0}`, color: '#f97316' },
            { label: 'Teaching', value: `${Math.round(pct/100*3)}/3`, color: '#38bdf8' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14, padding: '8px 4px', textAlign: 'center',
            }}>
              <span style={{ display: 'block', fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'Fredoka One', marginBottom: 2 }}>
                {s.label}
              </span>
              <span style={{ fontFamily: 'Fredoka One', fontSize: 16, color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* World score rows */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {worldRows.map((w, i) => {
            const wStars = calcStars(w.correct);
            return (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12, padding: '8px 12px',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 16 }}>{w.icon}</span>
                <span style={{ fontFamily: 'Nunito', fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 700, flex: 1 }}>
                  {w.correct}/{w.total}
                </span>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[0,1,2].map(si => (
                    <Star key={si} size={12} color="#facc15" fill={si < wStars ? '#facc15' : 'none'} style={{ opacity: si < wStars ? 1 : 0.25 }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mascot bubble */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', backgroundColor: '#facc15',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            flexShrink: 0, boxShadow: '0 4px 12px rgba(250,204,21,0.3)',
          }}>🐻</div>
          <div style={{
            background: '#fff', color: '#1a0f4e', borderRadius: '12px 12px 12px 4px',
            padding: '8px 12px', fontFamily: 'Nunito', fontSize: 12, fontWeight: 800,
            lineHeight: 1.3, flex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}>
            {getMascotMessage(pct)}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <button onClick={handlePlayAgain} style={{
            flex: 1, background: 'linear-gradient(135deg,#fde047,#facc15,#eab308)',
            border: 'none', borderRadius: 20, padding: '12px 0',
            color: '#1a0f4e', fontFamily: 'Fredoka One', fontSize: 14, fontWeight: 900,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            boxShadow: '0 6px 16px rgba(250,204,21,0.4)',
          }}>
            <RotateCcw size={15} /> Play Again
          </button>
          <button onClick={() => window.location.href = 'https://intelliasg.com/courses/grade-2-math/lessons'} style={{
            flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 20, padding: '12px 0',
            color: '#fff', fontFamily: 'Fredoka One', fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Home size={15} /> Home
          </button>
        </div>
      </div>
    </div>
  );
}
