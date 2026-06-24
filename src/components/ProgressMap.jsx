const STEPS = [
  { id: 'wonder',   label: 'Wonder',   num: '01', icon: '🔍' },
  { id: 'story',    label: 'Story',    num: '02', icon: '📖' },
  { id: 'simulate', label: 'Simulate', num: '03', icon: '🧪' },
  { id: 'play',     label: 'Play',     num: '04', icon: '🎮' },
  { id: 'reflect',  label: 'Reflect',  num: '05', icon: '📝' },
];

const ORDER = ['intro', 'wonder', 'story', 'simulate', 'play', 'reflect', 'results'];

export default function ProgressMap({ currentPhase, phaseComplete }) {
  const phaseIdx = ORDER.indexOf(currentPhase);

  return (
    <nav
      aria-label="Learning journey progress"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(6px, 1.2vw, 12px)',
        justifyContent: 'center',
        background: 'rgba(10, 8, 32, 0.75)',
        border: '1.5px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 50,
        padding: '6px clamp(14px, 2.5vw, 24px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        flexShrink: 0,
      }}
    >
      {STEPS.map((step, i) => {
        const stepIdx    = ORDER.indexOf(step.id);
        const isActive   = currentPhase === step.id;
        const isComplete = phaseComplete[step.id] || stepIdx < phaseIdx;

        /* Circle styles */
        const circleBg = isActive
          ? '#facc15'
          : isComplete
          ? '#22c55e'
          : 'rgba(255, 255, 255, 0.05)';
        const circleColor = isActive
          ? '#0f0a2e'
          : '#fff';
        const circleBorder = isActive
          ? 'none'
          : isComplete
          ? 'none'
          : '2px solid rgba(255, 255, 255, 0.2)';

        /* Label styling */
        const labelColor = isActive
          ? '#facc15'
          : isComplete
          ? '#22c55e'
          : 'rgba(255, 255, 255, 0.35)';

        return (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1.2vw, 12px)' }}>
            {/* Step node */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Numbered circle or tick */}
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: circleBg,
                  border: circleBorder,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Fredoka One, sans-serif',
                  fontWeight: 900,
                  fontSize: 11,
                  color: circleColor,
                  flexShrink: 0,
                  transition: 'all 0.3s',
                  boxShadow: isActive ? '0 0 12px rgba(250, 204, 21, 0.4)' : 'none',
                }}
              >
                {isComplete ? (
                  <span style={{ fontSize: 13, fontWeight: 900 }}>✓</span>
                ) : (
                  step.num
                )}
              </div>

              {/* Icon & Label */}
              <span
                style={{
                  fontFamily: 'Fredoka One, sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(11px, 1.3vw, 13px)',
                  color: labelColor,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span>{step.icon}</span>
                <span>{step.label}</span>
              </span>
            </div>

            {/* Connecting Line */}
            {i < STEPS.length - 1 && (
              <div
                style={{
                  width: 'clamp(12px, 2.5vw, 32px)',
                  height: 2,
                  background: isComplete || (isActive && ORDER.indexOf(STEPS[i+1].id) <= phaseIdx)
                    ? 'rgba(34, 197, 94, 0.6)'
                    : 'rgba(255, 255, 255, 0.1)',
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
