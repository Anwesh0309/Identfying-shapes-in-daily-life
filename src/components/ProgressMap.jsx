const STEPS = [
  { id: 'wonder',   label: 'Wonder',   num: '01', icon: '🔍' },
  { id: 'story',    label: 'Story',    num: '02', icon: '📖' },
  { id: 'simulate', label: 'Simulate', num: '03', icon: '🧪' },
  { id: 'play',     label: 'Practice', num: '04', icon: '🎮' },
  { id: 'reflect',  label: 'Reflect',  num: '05', icon: '📝' },
];

const ORDER = ['intro', 'wonder', 'story', 'simulate', 'play', 'reflect', 'results'];

export default function ProgressMap({ currentPhase, phaseComplete, onSelectPhase }) {
  const phaseIdx = ORDER.indexOf(currentPhase);

  return (
    <nav
      aria-label="Learning journey progress"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(6px, 1.2vw, 12px)',
        justifyContent: 'center',
        background: 'rgba(10, 8, 32, 0.85)',
        border: '1.5px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 50,
        padding: '6px clamp(14px, 2.5vw, 24px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        flexShrink: 0,
      }}
    >
      {STEPS.map((step, i) => {
        const isActive   = currentPhase === step.id;
        const isComplete = phaseComplete?.[step.id];

        /* Circle styles */
        const circleBg = isActive
          ? '#facc15'
          : isComplete
          ? '#22c55e'
          : 'rgba(255, 255, 255, 0.15)';
        const circleColor = isActive
          ? '#0f0a2e'
          : '#fff';
        const circleBorder = isActive
          ? 'none'
          : isComplete
          ? 'none'
          : '2px solid rgba(255, 255, 255, 0.35)';

        /* Label styling — high contrast extra bold */
        const labelColor = isActive
          ? '#facc15'
          : isComplete
          ? '#4ade80'
          : '#ffffff';
        const labelOpacity = isActive ? 1 : isComplete ? 0.95 : 0.75;

        return (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1.2vw, 12px)' }}>
            {/* Step node button */}
            <button
              onClick={() => onSelectPhase && onSelectPhase(step.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              title={`Go to ${step.label}`}
            >
              {/* Numbered circle or tick */}
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: circleBg,
                  border: circleBorder,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Fredoka One, sans-serif',
                  fontWeight: 900,
                  fontSize: 12,
                  color: circleColor,
                  flexShrink: 0,
                  transition: 'all 0.3s',
                  boxShadow: isActive ? '0 0 14px rgba(250, 204, 21, 0.6)' : 'none',
                }}
              >
                {isComplete ? (
                  <span style={{ fontSize: 14, fontWeight: 900 }}>✓</span>
                ) : (
                  step.num
                )}
              </div>

              {/* Icon & Label */}
              <span
                style={{
                  fontFamily: 'Fredoka One, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(12px, 1.3vw, 14px)',
                  color: labelColor,
                  opacity: labelOpacity,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  textShadow: isActive ? '0 0 10px rgba(250, 204, 21, 0.4)' : 'none',
                }}
              >
                <span>{step.icon}</span>
                <span>{step.label}</span>
              </span>
            </button>

            {/* Connecting Line */}
            {i < STEPS.length - 1 && (
              <div
                style={{
                  width: 'clamp(10px, 2vw, 24px)',
                  height: 2.5,
                  background: isComplete || (isActive && ORDER.indexOf(STEPS[i+1].id) <= phaseIdx)
                    ? 'rgba(34, 197, 94, 0.8)'
                    : 'rgba(255, 255, 255, 0.25)',
                  flexShrink: 0,
                  transition: 'background 0.3s',
                }}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
