import { useEffect } from 'react';
import { stopNarration } from '../../utils/audio.js';

export default function IntroPhase({ state, onStart }) {
  // Silence narration during Intro phase only
  useEffect(() => {
    stopNarration();
  }, []);

  const steps = [
    { icon: '🔍', label: 'Wonder',   sub: 'Spark your curiosity' },
    { icon: '📖', label: 'Story',    sub: 'Hear the tale' },
    { icon: '🧪', label: 'Simulate', sub: 'Explore & discover' },
    { icon: '🎮', label: 'Play',     sub: 'Test your skills' },
    { icon: '📝', label: 'Reflect',  sub: 'What did you learn?' },
  ];

  const row1 = steps.slice(0, 3);
  const row2 = steps.slice(3);

  const featureCards = [
    { icon: '📐', label: '2D & 3D Shapes' },
    { icon: '🧪', label: '3 Interactive Stations' },
    { icon: '🏆', label: '10 Game Worlds' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      padding: 'clamp(48px, 6.5vh, 68px) clamp(16px, 3vw, 36px) clamp(12px, 1.8vh, 20px)',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 10,
      gap: 'clamp(6px, 1.2vh, 14px)',
      overflow: 'hidden',
    }}>

      {/* ── Floating background symbols ── */}
      {[
        { val:'●', top:'5%',  left:'3%',  size:90, op:0.07 },
        { val:'▲', top:'3%',  left:'18%', size:70, op:0.06 },
        { val:'■', top:'4%',  right:'18%',size:72, op:0.06 },
        { val:'⬡', top:'7%', right:'3%', size:86, op:0.07 },
        { val:'⬟', top:'76%', left:'2%',  size:64, op:0.06 },
        { val:'▬', top:'83%', right:'2%', size:68, op:0.06 },
      ].map((d, i) => (
        <span key={i} style={{
          position: 'absolute',
          top: d.top, left: d.left, right: d.right,
          fontSize: d.size,
          opacity: d.op,
          color: '#fff',
          fontFamily: 'Fredoka One, sans-serif',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}>{d.val}</span>
      ))}

      {/* ── Badge pill ── */}
      <div style={{
        background: 'rgba(255,255,255,0.12)',
        border: '1.5px solid rgba(255,255,255,0.25)',
        borderRadius: 26,
        padding: '7px 22px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
        boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
      }}>
        <span style={{ fontSize: 18 }}>✨</span>
        <span style={{
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(14px, 1.6vw, 16px)',
          color: 'rgba(255,255,255,0.95)',
          letterSpacing: '0.4px',
        }}>
          MOE Curriculum · Grade 2
        </span>
      </div>

      {/* ── Main title ── */}
      <h1 style={{
        fontFamily: 'Fredoka One, sans-serif',
        fontSize: 'clamp(40px, 6vw, 62px)',
        fontWeight: 900,
        color: '#ffffff',
        margin: 0,
        lineHeight: 1.08,
        textAlign: 'center',
        letterSpacing: '-0.5px',
        flexShrink: 0,
        textShadow: '0 4px 20px rgba(0,0,0,0.35)',
      }}>
        Identifying &amp; <span style={{ color: '#facc15' }}>Shapes</span>
      </h1>

      {/* ── Mascot + speech bubble ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        flexShrink: 0,
      }}>
        <div style={{
          width: 70,
          height: 70,
          borderRadius: '50%',
          backgroundColor: '#facc15',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 40,
          boxShadow: '0 6px 22px rgba(250,204,21,0.5)',
          flexShrink: 0,
        }}>🐻</div>

        <div style={{
          background: '#ffffff',
          color: '#1a0f4e',
          borderRadius: '18px 18px 18px 4px',
          padding: '12px 24px',
          fontFamily: 'Fredoka One, sans-serif',
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          lineHeight: 1.35,
          boxShadow: '0 8px 26px rgba(0,0,0,0.25)',
          whiteSpace: 'nowrap',
        }}>
          Ready for a shape adventure? 📐
        </div>
      </div>

      {/* ── Description text ── */}
      <p style={{
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 700,
        fontSize: 'clamp(15px, 1.9vw, 18px)',
        color: 'rgba(255,255,255,0.88)',
        maxWidth: 620,
        margin: 0,
        textAlign: 'center',
        lineHeight: 1.45,
        flexShrink: 0,
      }}>
        Join Oliver and Emma on a journey to identify, classify, and explore shapes in daily life through stories, simulations, and fun games!
      </p>

      {/* ── Learning Journey card ── */}
      <div style={{
        width: 'min(94%, 640px)',
        background: 'rgba(18, 12, 52, 0.75)',
        border: '1.5px solid rgba(255,255,255,0.18)',
        borderRadius: 22,
        padding: '16px 28px 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 8px 32px rgba(0,0,0,0.32)',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'Fredoka One, sans-serif',
          fontSize: 13,
          color: '#facc15',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
        }}>YOUR LEARNING JOURNEY</span>

        {/* Row 1: Wonder → Story → Simulate */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          width: '100%',
        }}>
          {row1.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22, lineHeight: 1 }}>{s.icon}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontFamily: 'Fredoka One', fontSize: 14, color: '#fff', lineHeight: 1 }}>{s.label}</span>
                  <span style={{ fontFamily: 'Nunito', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 800, lineHeight: 1 }}>{s.sub}</span>
                </div>
              </div>
              {i < row1.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginLeft: 2 }}>—→</span>
              )}
            </div>
          ))}
        </div>

        {/* Row 2: Play → Reflect */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          width: '100%',
        }}>
          {row2.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22, lineHeight: 1 }}>{s.icon}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontFamily: 'Fredoka One', fontSize: 14, color: '#fff', lineHeight: 1 }}>{s.label}</span>
                  <span style={{ fontFamily: 'Nunito', fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 800, lineHeight: 1 }}>{s.sub}</span>
                </div>
              </div>
              {i < row2.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginLeft: 2 }}>—→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA button ── */}
      <button
        onClick={onStart}
        className="pulse"
        style={{
          background: 'linear-gradient(135deg, #fde047 0%, #facc15 55%, #eab308 100%)',
          border: 'none',
          borderRadius: 50,
          padding: '16px 60px',
          color: '#1a0f4e',
          fontFamily: 'Fredoka One, sans-serif',
          fontSize: 'clamp(18px, 2vw, 21px)',
          fontWeight: 900,
          cursor: 'pointer',
          boxShadow: '0 8px 36px rgba(250,204,21,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          letterSpacing: '0.4px',
          transition: 'transform 0.15s, box-shadow 0.15s',
          flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 12px 44px rgba(250,204,21,0.75)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 36px rgba(250,204,21,0.6)'; }}
      >
        <span style={{ fontSize: 22 }}>🚀</span>
        <span>Begin Your Journey!</span>
      </button>

      {/* ── Bottom 3 feature cards ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 14,
        width: 'min(94%, 640px)',
        flexShrink: 0,
      }}>
        {featureCards.map(c => (
          <div key={c.label} style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1.5px solid rgba(255,255,255,0.14)',
            borderRadius: 18,
            padding: '14px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            boxShadow: '0 4px 18px rgba(0,0,0,0.22)',
          }}>
            <span style={{ fontSize: 28 }}>{c.icon}</span>
            <span style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(12px, 1.4vw, 14px)',
              color: 'rgba(255,255,255,0.9)',
              textAlign: 'center',
              lineHeight: 1.2,
            }}>{c.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
