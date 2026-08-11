import { useEffect } from 'react';
import { Star, RotateCcw, Home, Trophy, Sparkles } from 'lucide-react';
import { narrate, say, stopNarration, sfxLevelUp } from '../../utils/audio.js';
import { calcStars } from '../../utils/scoring.js';

// Confetti dots for celebration decoration
const CONFETTI = [
  { top: '8%', left: '8%', color: '#f472b6', size: 10 },
  { top: '12%', left: '30%', color: '#facc15', size: 8 },
  { top: '6%', left: '55%', color: '#38bdf8', size: 12 },
  { top: '10%', left: '78%', color: '#4ade80', size: 9 },
  { top: '20%', left: '90%', color: '#a78bfa', size: 11 },
  { top: '80%', left: '5%', color: '#fb923c', size: 10 },
  { top: '75%', left: '22%', color: '#facc15', size: 8 },
  { top: '85%', left: '68%', color: '#38bdf8', size: 12 },
  { top: '78%', left: '88%', color: '#f472b6', size: 9 },
  { top: '40%', left: '3%', color: '#4ade80', size: 7 },
  { top: '55%', left: '93%', color: '#a78bfa', size: 8 },
];

function getMascotMessage(pct, totalAnswered) {
  if (totalAnswered === 0) return 'Welcome to Reflect! Start Practice mode to test your shape skills and earn points! 🚀';
  if (pct >= 80) return 'Outstanding! You scored ' + pct + '% and mastered 2D and 3D Geometry! 🌟';
  if (pct >= 60) return 'Great work! You scored ' + pct + '%. Keep practicing to reach 3 stars! 💪';
  if (pct >= 40) return 'Good start! You scored ' + pct + '%. Try practice mode again to boost your score! 👍';
  return 'Every attempt makes you smarter! Try practice mode to improve your score! 🤗';
}

export default function ReflectPhase({ state, onComplete }) {
  // Compute accurate total correct and answered counts from global state
  const totalCorrect = state.worldCorrect?.reduce((a, b) => a + (b || 0), 0) || 0;
  const totalAnswered = Math.max(state.currentQuestion || 0, totalCorrect);
  const pct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const overallStars = totalAnswered === 0 ? 0 : pct >= 80 ? 3 : pct >= 50 ? 2 : pct >= 30 ? 1 : 0;

  // Breakdown by world categories according to user's question progress
  const w1Correct = state.worldCorrect?.[0] || 0;
  const w1Total = Math.min(totalAnswered, 10);

  const w2Correct = state.worldCorrect?.[1] || 0;
  const w2Total = Math.max(0, Math.min(totalAnswered - 10, 10));

  const w3Correct = state.worldCorrect?.slice(2).reduce((a, b) => a + (b || 0), 0) || 0;
  const w3Total = Math.max(0, totalAnswered - 20);

  const simCompletedCount = (state.simStationsComplete || []).filter(Boolean).length;

  useEffect(() => {
    stopNarration();
    sfxLevelUp();
    if (state.audioEnabled) {
      if (totalAnswered > 0) {
        narrate([say(`Score update! You answered ${totalCorrect} out of ${totalAnswered} questions correctly, giving you a score of ${pct} percent! ${getMascotMessage(pct, totalAnswered)}`)]);
      } else {
        narrate([say(`Welcome to the Reflect Phase! You have completed all 3 simulation stations. Try Practice mode to earn your high score!`)]);
      }
    }
  }, []);

  const handlePlayAgain = () => onComplete({ replay: true });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: 'clamp(56px, 7vh, 76px) clamp(12px, 3vw, 36px) clamp(8px, 1.5vh, 16px)',
        boxSizing: 'border-box',
        zIndex: 10,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Celebration Confetti */}
      {CONFETTI.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.size,
            background: c.color,
            borderRadius: 3,
            opacity: 0.75,
            transform: 'rotate(45deg)',
            animation: `float ${2 + (i % 3) * 0.7}s infinite ease-in-out`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Main Scorecard Glass Container */}
      <div
        className="glass-card"
        style={{
          width: 'min(94%, 480px)',
          borderRadius: 24,
          padding: 'clamp(14px, 2.2vh, 22px) clamp(16px, 2.5vw, 26px)',
          backgroundColor: 'rgba(30, 20, 70, 0.75)',
          border: '2px solid rgba(255,255,255,0.22)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(8px, 1.3vh, 12px)',
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden',
        }}
      >
        {/* Header Title with Trophy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Trophy size={28} color="#facc15" />
          <h2
            style={{
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
              color: '#ffffff',
              margin: 0,
              fontSize: 'clamp(20px, 2.6vh, 25px)',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
          >
            Your Geometry Scoreboard
          </h2>
        </div>

        {/* Hero Score Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Score percentage circle */}
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              border: '5px solid #facc15',
              background: 'rgba(10, 8, 32, 0.65)',
              boxShadow: '0 0 20px rgba(250, 204, 21, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 26, color: '#facc15', lineHeight: 1 }}>
              {pct}%
            </span>
            <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 10, color: '#ffffff', marginTop: 2 }}>
              Score
            </span>
          </div>

          {/* Quick Stats Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 16, color: '#ffffff' }}>
              Correct Answers: <span style={{ color: '#4ade80' }}>{totalCorrect}</span> / {totalAnswered}
            </span>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 13, color: '#facc15' }}>
                Stars:
              </span>
              {[0, 1, 2].map((i) => (
                <Star
                  key={i}
                  size={20}
                  color="#facc15"
                  fill={i < overallStars ? '#facc15' : 'none'}
                  style={{ opacity: i < overallStars ? 1 : 0.3 }}
                />
              ))}
            </div>
            <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 12, color: '#38bdf8' }}>
              Simulation Labs: {simCompletedCount}/3 Completed
            </span>
          </div>
        </div>

        {/* Stat Cards Grid: XP, Max Streak, Total Stars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, width: '100%' }}>
          {[
            { label: 'XP Earned', value: state.xp || 0, color: '#fb923c' },
            { label: 'Max Streak', value: `🔥 ${state.maxStreak || 0}`, color: '#f97316' },
            { label: 'Total Stars', value: `⭐ ${state.totalStars || 0}`, color: '#facc15' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: 14,
                padding: '6px 4px',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 10,
                  color: '#ffffff',
                  fontFamily: 'Fredoka One, sans-serif',
                  fontWeight: 900,
                  marginBottom: 2,
                }}
              >
                {s.label}
              </span>
              <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 16, color: s.color }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Category Score Breakdown List */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Row 1: 2D Shapes */}
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1.5px solid rgba(255,255,255,0.15)',
              borderRadius: 12,
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🔴</span>
              <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 12, color: '#ffffff' }}>
                2D Shapes Identification
              </span>
            </div>
            <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 13, color: '#facc15' }}>
              {w1Correct} / {w1Total > 0 ? w1Total : 0} Correct
            </span>
          </div>

          {/* Row 2: 3D Solids */}
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1.5px solid rgba(255,255,255,0.15)',
              borderRadius: 12,
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🧊</span>
              <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 12, color: '#ffffff' }}>
                3D Solid Matching
              </span>
            </div>
            <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 13, color: '#38bdf8' }}>
              {w2Correct} / {w2Total > 0 ? w2Total : 0} Correct
            </span>
          </div>

          {/* Row 3: Properties */}
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1.5px solid rgba(255,255,255,0.15)',
              borderRadius: 12,
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>📐</span>
              <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 12, color: '#ffffff' }}>
                Properties & Attributes
              </span>
            </div>
            <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 13, color: '#4ade80' }}>
              {w3Correct} / {w3Total > 0 ? w3Total : 0} Correct
            </span>
          </div>
        </div>

        {/* Mascot Encouragement Speech Bubble */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: '#facc15',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(250,204,21,0.4)',
            }}
          >
            🐻
          </div>
          <div
            style={{
              background: '#ffffff',
              color: '#1a0f4e',
              borderRadius: '14px 14px 14px 4px',
              padding: '7px 12px',
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
              fontSize: 12,
              lineHeight: 1.3,
              flex: 1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            }}
          >
            {getMascotMessage(pct, totalAnswered)}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 2 }}>
          <button
            onClick={handlePlayAgain}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)',
              border: 'none',
              borderRadius: 22,
              padding: '10px 0',
              color: '#1a0f4e',
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: '0 6px 18px rgba(250, 204, 21, 0.45)',
            }}
          >
            <RotateCcw size={15} /> Play Again
          </button>
          <button
            onClick={() => (window.location.href = 'https://intelliasg.com/courses/grade-2-math/lessons')}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.12)',
              border: '2px solid rgba(255,255,255,0.25)',
              borderRadius: 22,
              padding: '10px 0',
              color: '#fff',
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <Home size={15} /> Home
          </button>
        </div>
      </div>
    </div>
  );
}

