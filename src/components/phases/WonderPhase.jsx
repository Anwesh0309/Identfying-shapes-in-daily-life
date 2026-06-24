import { useState, useEffect } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { narrate, say, sfxCorrect, sfxLevelUp } from '../../utils/audio.js';
import { wonderNarration } from '../../utils/narration.js';
import { shapes } from '../../data/shapeData.js';

// The 6 targets — positions match the reference image (indoor cozy attic scene)
const WONDER_TARGETS = [
  {
    id: 'circle',
    label: 'Wall Clock',
    emoji: '⏰',
    shapeId: 'circle',
    top: '12%',
    left: '10%',
    glowColor: '#fb7185',
    desc: 'The round clock on the wall is a circle!',
    narrationText: 'Look at the wall clock! It is a circle. Circles are perfectly round and have no straight sides or corners.'
  },
  {
    id: 'rectangle',
    label: 'Clipboard',
    emoji: '📋',
    shapeId: 'rectangle',
    top: '18%',
    left: '44%',
    glowColor: '#38bdf8',
    desc: 'The clipboard or document shape is a rectangle!',
    narrationText: 'Look at the clipboard! It is a rectangle. Rectangles have four straight sides where opposite sides are equal, and four corners.'
  },
  {
    id: 'square',
    label: 'Square Tile',
    emoji: '⬜',
    shapeId: 'square',
    top: '62%',
    left: '54%',
    glowColor: '#4ade80',
    desc: 'The square tile on the floor is a perfect square!',
    narrationText: 'Look at the square tile! It is a square. Squares have four straight sides that are all equal in length, and four corners.'
  },
  {
    id: 'triangle',
    label: 'Warning Sign',
    emoji: '⚠️',
    shapeId: 'triangle',
    top: '25%',
    left: '76%',
    glowColor: '#facc15',
    desc: 'The warning sign is a triangle!',
    narrationText: 'Look at the warning sign! It is a triangle. Triangles have three straight sides and three pointy corners.'
  },
  {
    id: 'hexagon',
    label: 'Spider Web',
    emoji: '🕸️',
    shapeId: 'hexagon',
    top: '52%',
    left: '12%',
    glowColor: '#a78bfa',
    desc: 'The spider web pattern is made of hexagons!',
    narrationText: 'Look at the spider web! Its cells form hexagons. A hexagon has six straight sides and six corners.'
  },
  {
    id: 'pentagon',
    label: 'Cross Sign',
    emoji: '➕',
    shapeId: 'pentagon',
    top: '40%',
    left: '38%',
    glowColor: '#34d399',
    desc: 'The plus / cross sign here represents a special shape with multiple sides!',
    narrationText: 'Look at the cross sign! It shows how shapes can combine. A pentagon has five sides and five corners.'
  },
];

export default function WonderPhase({ state, onComplete }) {
  const [wonderSubState, setWonderSubState] = useState('intro'); // 'intro' or 'explore'
  const [discovered, setDiscovered] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState(null);

  useEffect(() => {
    if (state.audioEnabled) {
      if (wonderSubState === 'intro') {
        // Narrate the wonder intro narration, then read the visible card text
        narrate([
          ...wonderNarration,
          say('Where can we find circles, triangles, and cylinders around us? Can you spot shapes in daily life?'),
          say('Shapes are hiding all around us in the playground!'),
        ]);
      } else {
        // Narrate exactly the text shown on the explore screen header
        narrate([
          say('Shape Discovery Scene!'),
          say('Find all 6 glowing shapes in the scene!'),
          say('Tap on the glowing circles to discover each shape and its properties!'),
        ]);
      }
    }
  }, [state.audioEnabled, wonderSubState]);

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
      narrate([say(target.narrationText)]);
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
          gap: 'clamp(10px, 2.5vh, 24px)',
        }}
      >
        {/* Question mark circle */}
        <div
          style={{
            width: 'clamp(80px, 12vh, 120px)',
            height: 'clamp(80px, 12vh, 120px)',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(36px, 5vh, 52px)',
            color: '#fff',
            fontFamily: 'Fredoka One, sans-serif',
            fontWeight: 900,
            boxShadow: '0 8px 32px rgba(129, 140, 248, 0.3)',
            animation: 'float 3s infinite ease-in-out',
          }}
        >
          ?
        </div>

        {/* Bear Mascot speaking */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 'clamp(44px, 6vh, 56px)',
              height: 'clamp(44px, 6vh, 56px)',
              borderRadius: '50%',
              backgroundColor: '#facc15',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(24px, 3vh, 32px)',
              boxShadow: '0 6px 18px rgba(250, 204, 21, 0.3)',
            }}
          >
            🐻
          </div>
          <div
            style={{
              background: '#fff',
              color: '#1a0f4e',
              borderRadius: '16px 16px 16px 4px',
              padding: '8px 16px',
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: 'clamp(12px, 1.8vh, 14px)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            Hmm... I wonder... 🧐
          </div>
        </div>

        {/* Central question card */}
        <div
          className="glass-card"
          style={{
            width: 'min(90%, 550px)',
            padding: 'clamp(20px, 3.5vh, 32px)',
            borderRadius: 24,
            alignItems: 'center',
            textAlign: 'center',
            gap: 16,
            backgroundColor: 'rgba(30, 20, 70, 0.55)',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <span style={{ fontSize: 40 }}>📐</span>
          
          <h2
            style={{
              fontFamily: 'Fredoka One, sans-serif',
              fontSize: 'clamp(18px, 2.5vh, 24px)',
              color: '#fff',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Where can we find circles, triangles, and cylinders around us? Can you spot shapes in daily life?
          </h2>

          <p
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontStyle: 'italic',
              fontSize: 'clamp(12px, 1.8vh, 14px)',
              color: 'rgba(255, 255, 255, 0.65)',
              margin: 0,
            }}
          >
            Shapes are hiding all around us in the playground!
          </p>
        </div>

        {/* Discovery button */}
        <button
          onClick={() => setWonderSubState('explore')}
          className="pulse"
          style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)',
            border: 'none',
            borderRadius: 50,
            padding: 'clamp(10px, 1.8vh, 14px) clamp(30px, 6vw, 60px)',
            color: '#fff',
            fontFamily: 'Fredoka One, sans-serif',
            fontSize: 'clamp(14px, 2.2vh, 18px)',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(129, 140, 248, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s',
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
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Header bar */}
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(15, 10, 46, 0.65)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>🏃</span>
            <div>
              <h3 style={{ fontFamily: 'Fredoka One, sans-serif', color: '#fff', margin: 0, fontSize: 15 }}>
                Shape Discovery Scene
              </h3>
              <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: 11 }}>
                Find all 6 glowing shapes in the scene!
              </p>
            </div>
          </div>
          <div
            style={{
              background: isAllFound ? 'rgba(34, 197, 94, 0.2)' : 'rgba(250, 204, 21, 0.15)',
              border: isAllFound ? '1px solid #22c55e' : '1px solid #facc15',
              color: isAllFound ? '#4ade80' : '#facc15',
              padding: '4px 12px',
              borderRadius: 15,
              fontSize: 12,
              fontFamily: 'Fredoka One, sans-serif',
            }}
          >
            {isAllFound ? '🎉 ALL FOUND!' : `🔎 FOUND: ${discovered.length} / 6`}
          </div>
        </div>

        {/* Visual Scene Area — Cozy Indoor Attic/Adventure Room */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #2a1a0e 0%, #3d2410 30%, #4a2e14 60%, #5c3a1a 100%)',
          }}
        >
          {/* Warm ambient light overlay */}
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 65% 40%, rgba(255,160,50,0.18) 0%, transparent 65%)', pointerEvents:'none' }} />
          {/* Fairy lights string top */}
          <div style={{ position:'absolute', top:'6%', left:0, right:0, height:2, background:'transparent', pointerEvents:'none' }}>
            {[4,12,20,28,36,44,52,60,68,76,84,92].map((l,i) => (
              <div key={i} style={{ position:'absolute', left:`${l}%`, top:0, width:5, height:5, borderRadius:'50%',
                background: i%3===0?'#ffd700':i%3===1?'#ff9f40':'#ff6b9d',
                boxShadow:`0 0 6px ${i%3===0?'#ffd700':i%3===1?'#ff9f40':'#ff6b9d'}`,
                animation:'wonderPulse 2s infinite ease-in-out', animationDelay:`${i*0.2}s` }} />
            ))}
          </div>
          {/* Wooden floor */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'28%',
            background:'linear-gradient(180deg, #5c3a1a 0%, #4a2e10 100%)',
            borderTop:'2px solid rgba(255,180,80,0.2)' }}>
            {[0,15,30,45,60,75,90].map((l,i) => (
              <div key={i} style={{ position:'absolute', left:`${l}%`, top:0, bottom:0, width:1,
                background:'rgba(0,0,0,0.15)' }} />
            ))}
          </div>
          {/* Round rug on floor */}
          <div style={{ position:'absolute', bottom:'14%', left:'28%',
            width:'44%', height:'14%', borderRadius:'50%',
            background:'radial-gradient(ellipse, rgba(160,50,30,0.55) 0%, rgba(100,30,20,0.3) 70%, transparent 100%)',
            border:'1px solid rgba(200,80,40,0.3)' }} />
          {/* Bookshelf right side */}
          <div style={{ position:'absolute', right:'4%', top:'8%', width:'14%', height:'55%',
            background:'rgba(80,40,15,0.7)', border:'1px solid rgba(120,70,20,0.5)', borderRadius:4 }}>
            {[15,28,41,54,67].map((t,i) => (
              <div key={i} style={{ position:'absolute', top:`${t}%`, left:'8%', right:'8%', height:'8%',
                background:`rgba(${[180,60,40][i%3]},${[80,120,100][i%3]},${[40,160,140][i%3]},0.6)`, borderRadius:2 }} />
            ))}
          </div>
          {/* Tent/canopy bottom right */}
          <div style={{ position:'absolute', bottom:'22%', right:'6%',
            width:0, height:0,
            borderLeft:'55px solid transparent', borderRight:'55px solid transparent',
            borderBottom:'70px solid rgba(70,100,180,0.45)' }} />
          <div style={{ position:'absolute', bottom:'22%', right:'0%',
            width:'22%', height:'28%',
            background:'rgba(60,80,160,0.25)', borderRadius:'0 0 8px 0',
            border:'1px solid rgba(100,130,220,0.2)' }} />
          {/* Warm lamp glow bottom center */}
          <div style={{ position:'absolute', bottom:'24%', left:'44%',
            width:28, height:28, borderRadius:'50%',
            background:'radial-gradient(circle, #ffe580 0%, #ffa500 60%, transparent 100%)',
            boxShadow:'0 0 30px 10px rgba(255,180,60,0.3)' }} />
          {/* Ladder left side */}
          <div style={{ position:'absolute', left:'12%', top:'5%', bottom:'26%', width:3,
            background:'rgba(140,80,30,0.6)', borderRadius:2 }}>
            {[20,35,50,65,80].map((t,i) => (
              <div key={i} style={{ position:'absolute', top:`${t}%`, left:-8, width:19, height:2,
                background:'rgba(140,80,30,0.5)', borderRadius:1 }} />
            ))}
          </div>
          {/* Panda toy bottom left */}
          <div style={{ position:'absolute', bottom:'27%', left:'18%', fontSize:28, opacity:0.7 }}>🐼</div>
          {/* Telescope */}
          <div style={{ position:'absolute', bottom:'27%', left:'46%', fontSize:24, opacity:0.6 }}>🔭</div>
          {/* Potted plant */}
          <div style={{ position:'absolute', bottom:'27%', right:'22%', fontSize:24, opacity:0.7 }}>🪴</div>
          {/* Window ambient light top right */}
          <div style={{ position:'absolute', top:'5%', right:'18%', width:'12%', height:'22%',
            background:'rgba(255,220,150,0.12)', border:'1px solid rgba(255,200,100,0.2)', borderRadius:4 }} />

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
                  width: 'clamp(42px, 5.5vh, 56px)',
                  height: 'clamp(42px, 5.5vh, 56px)',
                  borderRadius: '50%',
                  background: isFound ? `${targetColor}33` : isSelected ? `${targetColor}44` : 'rgba(10,6,26,0.65)',
                  border: `2.5px solid ${targetColor}`,
                  boxShadow: isFound
                    ? `0 0 12px ${targetColor}88, inset 0 0 8px ${targetColor}22`
                    : `0 0 18px ${targetColor}99, 0 0 30px ${targetColor}44`,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(18px, 2.8vh, 24px)',
                  zIndex: isSelected ? 20 : 10,
                  transition: 'all 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
                  animation: !isFound ? 'wonderPulse 2s infinite ease-in-out' : 'none',
                  transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                }}
              >
                {isFound && !isSelected && (
                  <div style={{
                    position: 'absolute', top: -4, right: -4,
                    background: '#22c55e', borderRadius: '50%', width: 15, height: 15,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1.5px solid #fff', boxShadow: '0 2px 6px rgba(34,197,94,0.5)'
                  }}>
                    <CheckCircle size={9} color="#fff" />
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
          padding: 'clamp(16px, 3vh, 24px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          overflowY: 'auto',
          justifyContent: selectedTarget ? 'flex-start' : 'center',
          alignItems: selectedTarget ? 'stretch' : 'center',
          textAlign: selectedTarget ? 'left' : 'center',
        }}
      >
        {selectedTarget ? (
          <>
            {/* Shape Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `rgba(${parseInt(currentShape.color.slice(1,3),16)}, ${parseInt(currentShape.color.slice(3,5),16)}, ${parseInt(currentShape.color.slice(5,7),16)}, 0.15)`,
                  border: `1px solid ${currentShape.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                }}
              >
                {selectedTarget.emoji}
              </div>
              <div>
                <h2 style={{ fontFamily: 'Fredoka One, sans-serif', color: '#fff', margin: 0, fontSize: 18 }}>
                  {currentShape.name}
                </h2>
                <span
                  style={{
                    fontFamily: 'Fredoka One, sans-serif',
                    fontSize: 10,
                    color: currentShape.color,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  2D Shape (Flat)
                </span>
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />

            {/* Shape Attributes */}
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '10px 6px', textAlign: 'center'
              }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 2, fontFamily: 'Fredoka One' }}>SIDES</span>
                <span style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 20, color: currentShape.color }}>
                  {currentShape.sides}
                </span>
              </div>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '10px 6px', textAlign: 'center'
              }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 2, fontFamily: 'Fredoka One' }}>CORNERS</span>
                <span style={{ fontFamily: 'Fredoka One, sans-serif', fontSize: 20, color: currentShape.color }}>
                  {currentShape.corners}
                </span>
              </div>
            </div>

            {/* SVG Visual rendering */}
            <div
              style={{
                height: 110,
                background: 'rgba(10, 8, 32, 0.4)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <svg width="80" height="80" viewBox="0 0 100 100">
                {selectedTarget.shapeId === 'circle' && (
                  <circle cx="50" cy="50" r="38" fill="none" stroke={currentShape.color} strokeWidth="6" filter={`drop-shadow(0 0 8px ${currentShape.glow})`} />
                )}
                {selectedTarget.shapeId === 'triangle' && (
                  <polygon points="50,15 15,80 85,80" fill="none" stroke={currentShape.color} strokeWidth="6" filter={`drop-shadow(0 0 8px ${currentShape.glow})`} />
                )}
                {selectedTarget.shapeId === 'rectangle' && (
                  <rect x="15" y="25" width="70" height="50" fill="none" stroke={currentShape.color} strokeWidth="6" filter={`drop-shadow(0 0 8px ${currentShape.glow})`} />
                )}
                {selectedTarget.shapeId === 'square' && (
                  <rect x="20" y="20" width="60" height="60" fill="none" stroke={currentShape.color} strokeWidth="6" filter={`drop-shadow(0 0 8px ${currentShape.glow})`} />
                )}
                {selectedTarget.shapeId === 'pentagon' && (
                  <polygon points="50,15 88,43 74,85 26,85 12,43" fill="none" stroke={currentShape.color} strokeWidth="6" filter={`drop-shadow(0 0 8px ${currentShape.glow})`} />
                )}
                {selectedTarget.shapeId === 'hexagon' && (
                  <polygon points="50,12 85,31 85,69 50,88 15,69 15,31" fill="none" stroke={currentShape.color} strokeWidth="6" filter={`drop-shadow(0 0 8px ${currentShape.glow})`} />
                )}
              </svg>
            </div>

            {/* Description */}
            <div>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'Fredoka One, sans-serif' }}>WHAT IT IS:</span>
              <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: 13, color: '#fff', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                {selectedTarget.desc}
              </p>
            </div>

            <div>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'Fredoka One, sans-serif' }}>REAL WORLD EXAMPLES:</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                {currentShape.examples.map((ex, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 12,
                      padding: '4px 10px',
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.85)',
                      fontFamily: 'Nunito, sans-serif'
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
                  borderRadius: 16,
                  padding: '13px 20px',
                  color: '#1a0f4e',
                  fontFamily: 'Fredoka One, sans-serif',
                  fontSize: 15,
                  fontWeight: 900,
                  cursor: 'pointer',
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 8px 24px rgba(250,204,21,0.55)',
                }}
              >
                <Sparkles size={16} />
                Continue to Story ✨
              </button>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 44, animation: 'float 3s infinite ease-in-out' }}>🔎</div>
            <h3 style={{ fontFamily: 'Fredoka One, sans-serif', color: '#fff', margin: 0, fontSize: 16 }}>
              Start Inspecting!
            </h3>
            <p style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: 13, maxWidth: 200, lineHeight: 1.4 }}>
              Click any of the glowing shape circles in the playground scene to discover their properties!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
