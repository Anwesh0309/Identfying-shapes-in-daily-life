import { useEffect } from 'react';
import { narrate } from '../../utils/audio.js';
import { introNarration } from '../../utils/narration.js';

export default function IntroPhase({ state, onStart }) {
  useEffect(() => {
    if (state.audioEnabled) narrate(introNarration);
  }, [state.audioEnabled]);

  const steps = [
    { icon: '🔍', label: 'Wonder',   sub: 'Spark your curiosity' },
    { icon: '📖', label: 'Story',    sub: 'Hear the tale' },
    { icon: '🧪', label: 'Simulate', sub: 'Explore & discover' },
    { icon: '🎮', label: 'Play',     sub: 'Test your skills' },
    { icon: '📝', label: 'Reflect',  sub: 'What did you learn?' },
  ];

  // Two rows: first 3, then 2 — mirrors the reference exactly
  const row1 = steps.slice(0, 3);
  const row2 = steps.slice(3);

  const featureCards = [
    { icon: '📐', label: 'Count & Skip' },
    { icon: '🧩', label: 'Simulations' },
    { icon: '🏆', label: '3 Game Worlds' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      padding: '0 20px 20px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 10,
      gap: 0,
      overflow: 'hidden',
    }}>

      {/* ── Floating background numbers (faded, same as reference) ── */}
      {[
        { val:'●', top:'8%',  left:'2%',  size:72, op:0.06 },
        { val:'▲', top:'5%',  left:'18%', size:56, op:0.05 },
        { val:'■', top:'6%',  right:'18%',size:60, op:0.05 },
        { val:'⬡', top:'10%', right:'3%', size:68, op:0.06 },
        { val:'⬟', top:'72%', left:'1%',  size:52, op:0.05 },
        { val:'▬', top:'80%', right:'1%', size:58, op:0.05 },
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

      {/* ── 1. Badge pill — exact match to reference ── */}
      <div style={{
        background: 'rgba(255,255,255,0.09)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 20,
        padding: '5px 16px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        marginBottom: 14,
      }}>
        <span style={{ fontSize: 14 }}>✨</span>
        <span style={{
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 800,
          fontSize: 13,
          color: 'rgba(255,255,255,0.85)',
          letterSpacing: '0.3px',
        }}>
          MOE Curriculum · Grade 2
        </span>
      </div>

      {/* ── 2. Main title — exact reference sizing/weight ── */}
      <h1 style={{
        fontFamily: 'Fredoka One, sans-serif',
        fontSize: 'clamp(32px, 5vw, 48px)',
        fontWeight: 900,
        color: '#ffffff',
        margin: '0 0 18px 0',
        lineHeight: 1.1,
        textAlign: 'center',
        letterSpacing: '-0.5px',
      }}>
        Identifying &amp; <span style={{ color: '#facc15' }}>Shapes</span>
      </h1>

      {/* ── 3. Mascot + speech bubble — side by side, reference treatment ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        marginBottom: 16,
      }}>
        {/* Yellow circle mascot */}
        <div style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: '#facc15',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          boxShadow: '0 4px 16px rgba(250,204,21,0.4)',
          flexShrink: 0,
        }}>🐻</div>

        {/* White speech bubble */}
        <div style={{
          background: '#ffffff',
          color: '#1a0f4e',
          borderRadius: '14px 14px 14px 4px',
          padding: '10px 18px',
          fontFamily: 'Fredoka One, sans-serif',
          fontSize: 14,
          lineHeight: 1.35,
          boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
          maxWidth: 210,
          whiteSpace: 'nowrap',
        }}>
          Ready for a shape adventure? 📐
        </div>
      </div>

      {/* ── 4. Description text — reference width / weight ── */}
      <p style={{
        fontFamily: 'Nunito, sans-serif',
        fontWeight: 600,
        fontSize: 'clamp(12px, 1.5vw, 14px)',
        color: 'rgba(255,255,255,0.7)',
        maxWidth: 440,
        margin: '0 0 18px 0',
        textAlign: 'center',
        lineHeight: 1.55,
      }}>
        Join Oliver and Emma on a journey to identify, classify, and explore shapes in daily life through stories, simulations, and fun games!
      </p>

      {/* ── 5. Learning Journey card — reference card width/height/style ── */}
      <div style={{
        width: 'min(88%, 510px)',
        background: 'rgba(18, 12, 52, 0.65)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 18,
        padding: '16px 22px 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        marginBottom: 18,
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
      }}>
        {/* Card label */}
        <span style={{
          fontFamily: 'Fredoka One, sans-serif',
          fontSize: 11,
          color: '#facc15',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>YOUR LEARNING JOURNEY</span>

        {/* Row 1: Wonder → Story → Simulate */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          width: '100%',
        }}>
          {row1.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 16, lineHeight: 1 }}>{s.icon}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontFamily: 'Fredoka One', fontSize: 11, color: '#fff', lineHeight: 1 }}>{s.label}</span>
                  <span style={{ fontFamily: 'Nunito', fontSize: 8, color: 'rgba(255,255,255,0.38)', fontWeight: 800, lineHeight: 1 }}>{s.sub}</span>
                </div>
              </div>
              {i < row1.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 11, marginLeft: 2 }}>—→</span>
              )}
            </div>
          ))}
        </div>

        {/* Row 2: Play → Reflect */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          width: '100%',
        }}>
          {row2.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 16, lineHeight: 1 }}>{s.icon}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontFamily: 'Fredoka One', fontSize: 11, color: '#fff', lineHeight: 1 }}>{s.label}</span>
                  <span style={{ fontFamily: 'Nunito', fontSize: 8, color: 'rgba(255,255,255,0.38)', fontWeight: 800, lineHeight: 1 }}>{s.sub}</span>
                </div>
              </div>
              {i < row2.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 11, marginLeft: 2 }}>—→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. CTA button — reference exact treatment ── */}
      <button
        onClick={onStart}
        className="pulse"
        style={{
          background: 'linear-gradient(135deg, #fde047 0%, #facc15 55%, #eab308 100%)',
          border: 'none',
          borderRadius: 50,
          padding: '14px 48px',
          color: '#1a0f4e',
          fontFamily: 'Fredoka One, sans-serif',
          fontSize: 17,
          fontWeight: 900,
          cursor: 'pointer',
          boxShadow: '0 6px 28px rgba(250,204,21,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 18,
          letterSpacing: '0.2px',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 36px rgba(250,204,21,0.65)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(250,204,21,0.5)'; }}
      >
        <span style={{ fontSize: 18 }}>🚀</span>
        <span>Begin Your Journey!</span>
      </button>

      {/* ── 7. Bottom 3 feature cards — reference grid/size ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        width: 'min(88%, 510px)',
      }}>
        {featureCards.map(c => (
          <div key={c.label} style={{
            background: 'rgba(255,255,255,0.055)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: '14px 8px 12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          }}>
            <span style={{ fontSize: 26 }}>{c.icon}</span>
            <span style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 700,
              fontSize: 12,
              color: 'rgba(255,255,255,0.75)',
              textAlign: 'center',
              lineHeight: 1.2,
            }}>{c.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
