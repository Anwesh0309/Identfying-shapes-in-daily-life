import { useEffect } from 'react';
import { Trophy, Star, Sparkles, LogOut, RotateCcw } from 'lucide-react';
import { narrate, say, stopNarration, sfxLevelUp } from '../../utils/audio.js';
import { BADGES } from '../../utils/badgeEngine.js';

export default function ResultsPhase({ state, onReset, onClose, reflectionData }) {
  useEffect(() => {
    stopNarration();
    sfxLevelUp();
    if (state.audioEnabled) {
      narrate([
        say('Incredible work! You completed the geometry lesson and earned your badges!'),
        say('You are now a certified Geometry Master! Share your badges with your classmates!')
      ]);
    }
  }, [state.audioEnabled]);

  const earnedBadges = BADGES.filter(b => state.badges.includes(b.id));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        padding: 'clamp(40px, 6vh, 60px) clamp(16px, 4vw, 40px) clamp(12px, 2vh, 24px) clamp(12px, 4vw, 40px)',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box',
        overflowY: 'auto',
        gap: 'clamp(10px, 2vh, 24px)',
      }}
    >
      {/* Celebration Header */}
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 'clamp(40px, 6vh, 60px)', display: 'block', animation: 'float 3s infinite' }}>🎓</span>
        <h1
          style={{
            fontFamily: 'Fredoka One, sans-serif',
            fontSize: 'clamp(22px, 3.5vh, 32px)',
            background: 'linear-gradient(135deg, #facc15 0%, #22c55e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '4px 0 0 0',
          }}
        >
          Geometry Master Graduation!
        </h1>
        <p
          style={{
            fontFamily: 'Nunito, sans-serif',
            fontSize: 'clamp(11px, 1.5vh, 14px)',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: '4px 0 0 0',
          }}
        >
          Congratulations! You completed the Grade 2 Geometry Module!
        </p>
      </div>

      {/* Main Stats panel */}
      <div
        className="glass-card"
        style={{
          width: 'min(95%, 650px)',
          padding: 'clamp(14px, 2.5vh, 24px)',
          borderRadius: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Core numbers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '10px 6px', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'Fredoka One' }}>TOTAL XP</span>
            <span style={{ fontFamily: 'Fredoka One', fontSize: 'clamp(20px, 3vh, 28px)', color: '#22c55e' }}>{state.xp}</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '10px 6px', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'Fredoka One' }}>STARS EARNED</span>
            <span style={{ fontFamily: 'Fredoka One', fontSize: 'clamp(20px, 3vh, 28px)', color: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <Star size={16} fill="#facc15" color="#facc15" />
              {state.totalStars}
            </span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '10px 6px', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'Fredoka One' }}>MAX STREAK</span>
            <span style={{ fontFamily: 'Fredoka One', fontSize: 'clamp(20px, 3vh, 28px)', color: '#ef4444' }}>🔥 {state.maxStreak}</span>
          </div>
        </div>

        {/* Reflection info */}
        {reflectionData && (
          <div style={{ background: 'rgba(167, 139, 250, 0.08)', border: '1px solid rgba(167, 139, 250, 0.25)', borderRadius: 16, padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontFamily: 'Fredoka One', fontSize: 11, color: '#c084fc' }}>📝 MY SHAPE JOURNAL REFLECTIONS:</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, fontFamily: 'Nunito', fontSize: 12, color: '#e9d5ff' }}>
              <div>• 2D shape I found at home: <strong>{reflectionData.flatShape}</strong></div>
              <div>• 3D solid I found at home: <strong>{reflectionData.solidShape}</strong></div>
            </div>
          </div>
        )}

        {/* Badges Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontFamily: 'Fredoka One', fontSize: 12, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Trophy size={14} color="#facc15" />
            UNLOCKED BADGES ({earnedBadges.length} / {BADGES.length})
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {earnedBadges.map(badge => (
              <div
                key={badge.id}
                style={{
                  background: 'rgba(250, 204, 21, 0.1)',
                  border: '1.5px solid rgba(250, 204, 21, 0.4)',
                  borderRadius: 14,
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{ fontSize: 16 }}>{badge.icon}</span>
                <span style={{ fontFamily: 'Fredoka One', fontSize: 11, color: '#fff' }}>{badge.name}</span>
              </div>
            ))}
            {earnedBadges.length === 0 && (
              <span style={{ fontFamily: 'Nunito', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                Keep practicing to earn geometry badges!
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
          <button
            onClick={onReset}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
              border: 'none',
              borderRadius: 20,
              padding: 12,
              color: '#fff',
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: '0 6px 16px rgba(124,58,237,0.3)',
            }}
          >
            <RotateCcw size={16} />
            Play Again
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 20,
              padding: 12,
              color: '#fff',
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <LogOut size={16} />
            Exit Module
          </button>
        </div>
      </div>
    </div>
  );
}
