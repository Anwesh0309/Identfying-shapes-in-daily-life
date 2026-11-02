import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { narrate, say, stopNarration, sfxCorrect, sfxLevelUp } from '../../utils/audio.js';
import { wonderSection1Narration, wonderSection2Narration } from '../../utils/narration.js';
import { shapes } from '../../data/shapeData.js';
import wonderRoomBg from '../../assets/wonder_room_bg.png';
import wonderIntroBg from '../../assets/wonder_intro_bg.png';

// The 6 targets — positions align with the high quality wonderRoomBg image
const WONDER_TARGETS = [
  {
    id: 'circle',
    label: 'Wall Clock',
    emoji: '⏰',
    shapeId: 'circle',
    top: '20%',
    left: '18.5%',
    glowColor: '#fb7185',
    desc: 'The round clock on the wall is a circle!',
    narrationText: 'Look at the wall clock! It is a circle. Circles are perfectly round and have no straight sides or corners.'
  },
  {
    id: 'rectangle',
    label: 'Clipboard',
    emoji: '📋',
    shapeId: 'rectangle',
    top: '25.5%',
    left: '46%',
    glowColor: '#38bdf8',
    desc: 'The clipboard or document shape is a rectangle!',
    narrationText: 'Look at the clipboard! It is a rectangle. Rectangles have four straight sides where opposite sides are equal, and four corners.'
  },
  {
    id: 'square',
    label: 'Square Tile',
    emoji: '⬜',
    shapeId: 'square',
    top: '67%',
    left: '56%',
    glowColor: '#4ade80',
    desc: 'The square tile on the desk is a perfect square!',
    narrationText: 'Look at the square tile! It is a square. Squares have four straight sides that are all equal in length, and four corners.'
  },
  {
    id: 'triangle',
    label: 'Warning Sign',
    emoji: '⚠️',
    shapeId: 'triangle',
    top: '33.5%',
    left: '77.5%',
    glowColor: '#facc15',
    desc: 'The warning sign banner is a triangle!',
    narrationText: 'Look at the warning sign! It is a triangle. Triangles have three straight sides and three pointy corners.'
  },
  {
    id: 'hexagon',
    label: 'Spider Web',
    emoji: '🕸️',
    shapeId: 'hexagon',
    top: '58%',
    left: '14%',
    glowColor: '#a78bfa',
    desc: 'The spider web pattern is made of hexagons!',
    narrationText: 'Look at the spider web! Its cells form hexagons. A hexagon has six straight sides and six corners.'
  },
  {
    id: 'pentagon',
    label: 'Cross Sign',
    emoji: '➕',
    shapeId: 'pentagon',
    top: '47%',
    left: '40.5%',
    glowColor: '#34d399',
    desc: 'The plus / cross sign here represents a special shape with multiple sides!',
    narrationText: 'Look at the cross sign! It shows how shapes can combine. A pentagon has five sides and five corners.'
  },
];

export default function WonderPhase({ state, onComplete }) {
  const [wonderSubState, setWonderSubState] = useState('intro'); // 'intro' or 'explore'
  const [discovered, setDiscovered] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const narrateTimerRef = useRef(null);

  useEffect(() => {
    if (narrateTimerRef.current) {
      clearTimeout(narrateTimerRef.current);
      narrateTimerRef.current = null;
    }
    stopNarration();

    if (state.audioEnabled) {
      narrateTimerRef.current = setTimeout(() => {
        if (wonderSubState === 'intro') {
          narrate(wonderSection1Narration);
        } else {
          narrate(wonderSection2Narration);
        }
      }, 150);
    }

    return () => {
      if (narrateTimerRef.current) {
        clearTimeout(narrateTimerRef.current);
        narrateTimerRef.current = null;
      }
      stopNarration();
    };
  }, [state.audioEnabled, wonderSubState]);

  // Overall unmount cleanup
  useEffect(() => {
    return () => {
      if (narrateTimerRef.current) {
        clearTimeout(narrateTimerRef.current);
        narrateTimerRef.current = null;
      }
      stopNarration();
    };
  }, []);

  const handleTargetClick = (target) => {
    setSelectedTarget(target);
    
    if (!discovered.includes(target.id)) {
      const nextDiscovered = [...discovered, target.id];
      setDiscovered(nextDiscovered);
      
      if (nextDiscovered.length === WONDER_TARGETS.length) {
        sfxLevelUp();
      } else {
        sfxCorrect();
      }
    }

    if (state.audioEnabled) {
      if (narrateTimerRef.current) {
        clearTimeout(narrateTimerRef.current);
        narrateTimerRef.current = null;
      }
      stopNarration();
      narrateTimerRef.current = setTimeout(() => {
        narrate([say(target.narrationText)]);
      }, 120);
    }
  };

  const isAllFound = discovered.length === WONDER_TARGETS.length;
  const currentShape = selectedTarget ? shapes[selectedTarget.shapeId] : null;

  // 1. Intro state matching Screenshot 2
  if (wonderSubState === 'intro') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          padding: 'clamp(60px, 8vh, 80px) clamp(16px, 4vw, 40px) clamp(16px, 2vh, 24px) clamp(16px, 4vw, 40px)',
          boxSizing: 'border-box',
          zIndex: 10,
          position: 'relative',
          gap: 'clamp(12px, 2.5vh, 24px)',
          overflow: 'hidden',
        }}
      >
        {/* Question mark circle */}
        <div
          style={{
            width: 'clamp(80px, 12vh, 110px)',
            height: 'clamp(80px, 12vh, 110px)',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(40px, 6vh, 56px)',
            color: '#fff',
            fontFamily: 'Fredoka One, sans-serif',
            fontWeight: 900,
            boxShadow: '0 8px 32px rgba(129, 140, 248, 0.4)',
            animation: 'float 3s infinite ease-in-out',
            flexShrink: 0,
          }}
        >
          ?
        </div>

        {/* Bear Mascot speaking */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div
            style={{
              width: 'clamp(44px, 6vh, 56px)',
              height: 'clamp(44px, 6vh, 56px)',
              borderRadius: '50%',
              backgroundColor: '#facc15',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(24px, 3.5vh, 32px)',
              boxShadow: '0 6px 18px rgba(250, 204, 21, 0.4)',
            }}
          >
            🐻
          </div>
          <div
            style={{
              background: '#fff',
              color: '#1a0f4e',
              borderRadius: '16px 16px 16px 4px',
              padding: '10px 18px',
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(14px, 2vh, 17px)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
            }}
          >
            Hmm... I wonder... 🧐
          </div>
        </div>

        {/* Central question card with high quality generated background */}
        <div
          className="glass-card"
          style={{
            width: 'min(90%, 580px)',
            padding: 'clamp(22px, 3.5vh, 36px)',
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 16,
            backgroundImage: `linear-gradient(180deg, rgba(20, 14, 50, 0.75) 0%, rgba(30, 20, 70, 0.88) 100%), url(${wonderIntroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 44 }}>📐</span>
          
          <h2
            style={{
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(19px, 2.8vh, 26px)',
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.35,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            Where can we find <span style={{ color: '#facc15' }}>circles</span>, <span style={{ color: '#38bdf8' }}>triangles</span>, and <span style={{ color: '#4ade80' }}>cylinders</span> around us? Can you spot shapes in daily life?
          </h2>

          <div
            style={{
              background: 'rgba(250, 204, 21, 0.15)',
              border: '1.5px dashed rgba(250, 204, 21, 0.5)',
              borderRadius: 14,
              padding: '8px 16px',
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(13px, 1.9vh, 16px)',
              color: '#fde047',
              margin: 0,
            }}
          >
            🔍 Shapes are hiding all around us in the playground! Tap Let's Discover to find them!
          </div>
        </div>

        {/* Discovery button */}
        <button
          onClick={() => setWonderSubState('explore')}
          className="pulse"
          style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)',
            border: 'none',
            borderRadius: 50,
            padding: 'clamp(12px, 2vh, 16px) clamp(32px, 6vw, 64px)',
            color: '#fff',
            fontFamily: 'Fredoka One, sans-serif',
            fontSize: 'clamp(16px, 2.4vh, 20px)',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(129, 140, 248, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
        >
          <span>✨</span>
          <span>Let's Discover!</span>
          <span>✨</span>
        </button>
      </div>
    );
  }

  // 2. Exploration Map layout
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        padding: 'clamp(60px, 8vh, 80px) clamp(12px, 3vw, 24px) clamp(12px, 2vh, 24px) clamp(12px, 3vw, 24px)',
        gap: 'clamp(12px, 2vw, 24px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* LEFT COLUMN: Playground Map */}
      <div
        className="glass-card"
        style={{
          flex: 1.4,
          borderRadius: 20,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Header bar */}
        <div
          style={{
            padding: '12px 18px',
            background: 'rgba(15, 10, 46, 0.85)',
            borderBottom: '1.5px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 24 }}>🏃</span>
            <div>
              <h3 style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, color: '#fff', margin: 0, fontSize: 16 }}>
                Shape Discovery Scene
              </h3>
              <p style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, color: '#facc15', margin: 0, fontSize: 12 }}>
                Find all 6 glowing shapes in the scene!
              </p>
            </div>
          </div>
          <div
            style={{
              background: isAllFound ? 'rgba(34, 197, 94, 0.3)' : 'rgba(250, 204, 21, 0.25)',
              border: isAllFound ? '2px solid #22c55e' : '2px solid #facc15',
              color: isAllFound ? '#4ade80' : '#facc15',
              padding: '6px 14px',
              borderRadius: 20,
              fontSize: 13,
              fontFamily: 'Fredoka One, sans-serif',
              fontWeight: 900,
            }}
          >
            {isAllFound ? '🎉 ALL FOUND!' : `🔎 FOUND: ${discovered.length} / 6`}
          </div>
        </div>

        {/* Visual Scene Area — High Quality Generated Room Background Image (Adjusted 100% fit) */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: `url(${wonderRoomBg})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        >
          {/* Subtle warm ambient vignette overlay */}
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%, rgba(15,10,35,0.15) 0%, rgba(10,5,25,0.4) 100%)', pointerEvents:'none' }} />
          {/* Fairy lights string top */}
          <div style={{ position:'absolute', top:'4%', left:0, right:0, height:2, background:'transparent', pointerEvents:'none' }}>
            {[4,12,20,28,36,44,52,60,68,76,84,92].map((l,i) => (
              <div key={i} style={{ position:'absolute', left:`${l}%`, top:0, width:6, height:6, borderRadius:'50%',
                background: i%3===0?'#ffd700':i%3===1?'#ff9f40':'#ff6b9d',
                boxShadow:`0 0 8px ${i%3===0?'#ffd700':i%3===1?'#ff9f40':'#ff6b9d'}`,
                animation:'wonderPulse 2s infinite ease-in-out', animationDelay:`${i*0.2}s` }} />
            ))}
          </div>
          {/* Interactive glowing target pins */}
          {WONDER_TARGETS.map(target => {
            const isFound = discovered.includes(target.id);
            const isSelected = selectedTarget?.id === target.id;
            const targetColor = target.glowColor || shapes[target.shapeId].color;

            return (
              <button
                key={target.id}
                onClick={() => handleTargetClick(target)}
                style={{
                  position: 'absolute',
                  top: target.top,
                  left: target.left,
                  width: 'clamp(44px, 5.5vh, 58px)',
                  height: 'clamp(44px, 5.5vh, 58px)',
                  borderRadius: '50%',
                  background: isFound ? `${targetColor}33` : isSelected ? `${targetColor}44` : 'rgba(10,6,26,0.65)',
                  border: `3px solid ${targetColor}`,
                  boxShadow: isFound
                    ? `0 0 14px ${targetColor}bb, inset 0 0 8px ${targetColor}44`
                    : `0 0 20px ${targetColor}ff, 0 0 35px ${targetColor}66`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(20px, 2.8vh, 26px)',
                  zIndex: isSelected ? 20 : 10,
                  transition: 'all 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
                  animation: !isFound ? 'wonderPulse 2s infinite ease-in-out' : 'none',
                  transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                }}
              >
                {isFound && !isSelected && (
                  <div style={{
                    position: 'absolute', top: -4, right: -4,
                    background: '#22c55e', borderRadius: '50%', width: 16, height: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #fff', boxShadow: '0 2px 6px rgba(34,197,94,0.6)'
                  }}>
                    <CheckCircle size={10} color="#fff" strokeWidth={3} />
                  </div>
                )}
                <span>{target.emoji}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Inspector Card */}
      <div
        className="glass-card"
        style={{
          flex: 1,
          borderRadius: 20,
          padding: 'clamp(14px, 2.5vh, 20px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          backgroundColor: 'rgba(25, 18, 60, 0.75)',
          overflow: 'hidden',
          justifyContent: selectedTarget ? 'flex-start' : 'center',
          alignItems: selectedTarget ? 'stretch' : 'center',
          textAlign: selectedTarget ? 'left' : 'center',
        }}
      >
        {selectedTarget ? (
          <>
            {/* Shape Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `rgba(${parseInt(currentShape.color.slice(1,3),16)}, ${parseInt(currentShape.color.slice(3,5),16)}, ${parseInt(currentShape.color.slice(5,7),16)}, 0.25)`,
                  border: `2px solid ${currentShape.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  boxShadow: `0 0 12px ${currentShape.glow}`,
                }}
              >
                {selectedTarget.emoji}
              </div>
              <div>
                <h2 style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, color: '#fff', margin: 0, fontSize: 20 }}>
                  {currentShape.name}
                </h2>
                <span
                  style={{
                    fontFamily: 'Fredoka One, sans-serif',
                    fontWeight: 900,
                    fontSize: 11,
                    color: currentShape.color,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  2D Shape (Flat)
                </span>
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />

            {/* Shape Attributes */}
            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: 14, padding: '8px 6px', textAlign: 'center'
              }}>
                <span style={{ fontSize: 11, color: '#fff', display: 'block', marginBottom: 2, fontFamily: 'Fredoka One', fontWeight: 900 }}>SIDES</span>
                <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 24, color: currentShape.color }}>
                  {currentShape.sides}
                </span>
              </div>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: 14, padding: '8px 6px', textAlign: 'center'
              }}>
                <span style={{ fontSize: 11, color: '#fff', display: 'block', marginBottom: 2, fontFamily: 'Fredoka One', fontWeight: 900 }}>CORNERS</span>
                <span style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 24, color: currentShape.color }}>
                  {currentShape.corners}
                </span>
              </div>
            </div>

            {/* SVG Visual rendering */}
            <div
              style={{
                height: 90,
                background: 'rgba(10, 8, 32, 0.5)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <svg width="70" height="70" viewBox="0 0 100 100">
                {selectedTarget.shapeId === 'circle' && (
                  <circle cx="50" cy="50" r="38" fill="none" stroke={currentShape.color} strokeWidth="7" filter={`drop-shadow(0 0 10px ${currentShape.glow})`} />
                )}
                {selectedTarget.shapeId === 'triangle' && (
                  <polygon points="50,15 15,80 85,80" fill="none" stroke={currentShape.color} strokeWidth="7" filter={`drop-shadow(0 0 10px ${currentShape.glow})`} />
                )}
                {selectedTarget.shapeId === 'rectangle' && (
                  <rect x="15" y="25" width="70" height="50" fill="none" stroke={currentShape.color} strokeWidth="7" filter={`drop-shadow(0 0 10px ${currentShape.glow})`} />
                )}
                {selectedTarget.shapeId === 'square' && (
                  <rect x="20" y="20" width="60" height="60" fill="none" stroke={currentShape.color} strokeWidth="7" filter={`drop-shadow(0 0 10px ${currentShape.glow})`} />
                )}
                {selectedTarget.shapeId === 'pentagon' && (
                  <polygon points="50,15 88,43 74,85 26,85 12,43" fill="none" stroke={currentShape.color} strokeWidth="7" filter={`drop-shadow(0 0 10px ${currentShape.glow})`} />
                )}
                {selectedTarget.shapeId === 'hexagon' && (
                  <polygon points="50,12 85,31 85,69 50,88 15,69 15,31" fill="none" stroke={currentShape.color} strokeWidth="7" filter={`drop-shadow(0 0 10px ${currentShape.glow})`} />
                )}
              </svg>
            </div>

            {/* Description */}
            <div style={{ flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: '#facc15', fontFamily: 'Fredoka One, sans-serif', fontWeight: 900 }}>WHAT IT IS:</span>
              <p style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, fontSize: 14, color: '#ffffff', margin: '3px 0 0 0', lineHeight: 1.35 }}>
                {selectedTarget.desc}
              </p>
            </div>

            <div style={{ flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: '#38bdf8', fontFamily: 'Fredoka One, sans-serif', fontWeight: 900 }}>REAL WORLD EXAMPLES:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {currentShape.examples.map((ex, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.12)',
                      border: '1.5px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: 12,
                      padding: '4px 10px',
                      fontSize: 12,
                      color: '#ffffff',
                      fontFamily: 'Fredoka One, sans-serif',
                      fontWeight: 900,
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Finished button */}
            {isAllFound && (
              <button
                onClick={onComplete}
                className="pulse"
                style={{
                  background: 'linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)',
                  border: 'none',
                  borderRadius: 18,
                  padding: '12px 20px',
                  color: '#1a0f4e',
                  fontFamily: 'Fredoka One, sans-serif',
                  fontSize: 16,
                  fontWeight: 900,
                  cursor: 'pointer',
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 8px 24px rgba(250,204,21,0.6)',
                  flexShrink: 0,
                }}
              >
                <Sparkles size={18} />
                Continue to Story ✨
              </button>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 48, animation: 'float 3s infinite ease-in-out' }}>🔎</div>
            <h3 style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, color: '#fff', margin: 0, fontSize: 18 }}>
              Start Inspecting!
            </h3>
            <p style={{ fontFamily: 'Fredoka One, sans-serif', fontWeight: 900, color: '#fde047', margin: 0, fontSize: 14, maxWidth: 220, lineHeight: 1.45 }}>
              Click any of the glowing shape circles in the scene to discover their properties!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
