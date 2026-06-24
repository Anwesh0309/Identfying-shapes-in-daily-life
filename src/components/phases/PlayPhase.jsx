import { useState, useEffect, useCallback } from 'react';
import { Star, Sparkles } from 'lucide-react';
import { narrate, say, stopNarration, sfxCorrect, sfxWrong, sfxLevelUp } from '../../utils/audio.js';
import { calcXP } from '../../utils/scoring.js';
import { questionBank } from '../../data/questionBank.js';
import { shapes } from '../../data/shapeData.js';

// Shuffle helper
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Map shape name → shapeId for SVG lookup
const SHAPE_NAME_MAP = {
  circle: 'circle', triangle: 'triangle', rectangle: 'rectangle',
  square: 'square', pentagon: 'pentagon', hexagon: 'hexagon',
  sphere: 'sphere', cylinder: 'cylinder', cone: 'cone',
  cube: 'cube', cuboid: 'cuboid', pyramid: 'pyramid',
};

function getShapeId(text) {
  const lower = text.toLowerCase();
  for (const [name, id] of Object.entries(SHAPE_NAME_MAP)) {
    if (lower.includes(name)) return id;
  }
  return null;
}

// Render a shape SVG given a shapeId
function ShapeSVG({ shapeId, size = 60 }) {
  if (!shapeId || !shapes[shapeId]) return null;
  const s = shapes[shapeId];
  const c = s.color;
  const g = s.glow;

  const svgProps = {
    width: size, height: size, viewBox: '0 0 100 100',
    style: { filter: `drop-shadow(0 0 6px ${g})` },
  };

  const stroke = { fill: 'none', stroke: c, strokeWidth: 6 };
  const fill3d = { fill: c + '33', stroke: c, strokeWidth: 4 };

  if (shapeId === 'circle')
    return <svg {...svgProps}><circle cx="50" cy="50" r="38" {...stroke} /></svg>;
  if (shapeId === 'triangle')
    return <svg {...svgProps}><polygon points="50,12 88,85 12,85" {...stroke} /></svg>;
  if (shapeId === 'rectangle')
    return <svg {...svgProps}><rect x="10" y="25" width="80" height="50" {...stroke} /></svg>;
  if (shapeId === 'square')
    return <svg {...svgProps}><rect x="15" y="15" width="70" height="70" {...stroke} /></svg>;
  if (shapeId === 'pentagon')
    return <svg {...svgProps}><polygon points="50,10 90,38 74,88 26,88 10,38" {...stroke} /></svg>;
  if (shapeId === 'hexagon')
    return <svg {...svgProps}><polygon points="50,8 88,28 88,72 50,92 12,72 12,28" {...stroke} /></svg>;
  if (shapeId === 'sphere')
    return <svg {...svgProps}><circle cx="50" cy="50" r="38" {...fill3d} /><ellipse cx="50" cy="50" rx="20" ry="38" fill="none" stroke={c} strokeWidth="2" opacity="0.5" /></svg>;
  if (shapeId === 'cylinder')
    return <svg {...svgProps}><rect x="18" y="28" width="64" height="50" {...fill3d} /><ellipse cx="50" cy="28" rx="32" ry="10" {...fill3d} /><ellipse cx="50" cy="78" rx="32" ry="10" {...fill3d} /></svg>;
  if (shapeId === 'cone')
    return <svg {...svgProps}><polygon points="50,8 82,88 18,88" {...fill3d} /><ellipse cx="50" cy="88" rx="32" ry="8" {...fill3d} /></svg>;
  if (shapeId === 'cube')
    return <svg {...svgProps}><rect x="18" y="30" width="50" height="50" {...fill3d} /><polygon points="18,30 38,12 88,12 68,30" {...fill3d} /><polygon points="68,30 88,12 88,62 68,80" {...fill3d} /></svg>;
  if (shapeId === 'cuboid')
    return <svg {...svgProps}><rect x="12" y="35" width="55" height="48" {...fill3d} /><polygon points="12,35 32,15 88,15 68,35" {...fill3d} /><polygon points="67,35 88,15 88,63 67,83" {...fill3d} /></svg>;
  if (shapeId === 'pyramid')
    return <svg {...svgProps}><polygon points="50,8 88,85 12,85" {...fill3d} /><polygon points="50,8 88,85 70,72" fill={c + '55'} stroke={c} strokeWidth="3" /><ellipse cx="50" cy="85" rx="38" ry="10" fill={c + '44'} stroke={c} strokeWidth="3" /></svg>;
  return null;
}

function getCategoryLabel(type) {
  if (type === 1 || type === 7) return '2D Shapes';
  if (type === 2 || type === 8) return '3D Solids';
  if (type === 3 || type === 4 || type === 5) return 'Properties';
  if (type === 6) return 'Movement';
  return 'Geometry';
}

export default function PlayPhase({ state, dispatch, ACTIONS, onComplete }) {
  const [questions] = useState(() =>
    shuffle(questionBank).slice(0, 100).map(q => ({
      ...q,
      options: shuffle(q.options),
    }))
  );
  const [qIndex, setQIndex] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [lastAnswer, setLastAnswer] = useState('');

  const currentQ = questions[qIndex];
  const progressPercent = (qIndex / 100) * 100;

  // The shape shown in the question (from question text)
  const questionShapeId = currentQ ? getShapeId(currentQ.text) : null;
  // The shape shown in hint
  const hintShapeId = currentQ ? getShapeId(currentQ.hint) : null;

  useEffect(() => {
    if (currentQ && state.audioEnabled) {
      stopNarration();
      setTimeout(() => narrate([say(currentQ.text)]), 200);
    }
  }, [qIndex, state.audioEnabled]);

  const submitAnswer = useCallback((answerVal) => {
    if (hasAnswered) return;
    const match = String(answerVal).trim().toLowerCase() === String(currentQ.answer).trim().toLowerCase();
    setHasAnswered(true);
    setIsCorrect(match);
    setLastAnswer(String(answerVal));
    setShowPopup(true);

    if (match) {
      sfxCorrect();
      setCorrectCount(c => c + 1);
      const xp = calcXP(1, hintsUsed, state.streak);
      setSessionXP(s => s + xp);
      dispatch({ type: ACTIONS.ANSWER_CORRECT, payload: { attemptNumber: 1, hintsUsed } });
      if (state.audioEnabled) setTimeout(() => narrate([say('Good, keep it up!')]), 100);
    } else {
      sfxWrong();
      dispatch({ type: ACTIONS.ANSWER_INCORRECT });
      if (state.audioEnabled) setTimeout(() => narrate([say("Not quite, let's try in the next question!")]), 100);
    }

    // Auto-advance after 1 second
    setTimeout(() => {
      stopNarration();
      setShowPopup(false);
      setHasAnswered(false);
      setIsCorrect(null);
      setLastAnswer('');
      setHintsUsed(0);
      setShowHint(false);
      dispatch({ type: ACTIONS.NEXT_QUESTION });

      setQIndex(prev => {
        const next = prev + 1;
        if (next >= 100) {
          sfxLevelUp();
          dispatch({ type: ACTIONS.COMPLETE_PHASE, payload: 'play' });
          setIsFinished(true);
          return prev;
        }
        return next;
      });
    }, 1000);
  }, [hasAnswered, currentQ, hintsUsed, state, dispatch, ACTIONS]);

  // ── Finished screen ──
  if (isFinished) {
    const pct = Math.round((correctCount / 100) * 100);
    const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : pct >= 30 ? 1 : 0;
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        height:'100%', width:'100%', padding:'80px 20px 20px', boxSizing:'border-box' }}>
        <div className="glass-card" style={{ width:'min(90%,420px)', borderRadius:24, padding:'28px 24px',
          display:'flex', flexDirection:'column', alignItems:'center', gap:14,
          border:'1px solid rgba(255,255,255,0.15)' }}>
          <span style={{ fontSize:52 }}>🏆</span>
          <h2 style={{ fontFamily:'Fredoka One', color:'#fff', margin:0, fontSize:22 }}>Test Complete!</h2>
          <p style={{ fontFamily:'Nunito', color:'rgba(255,255,255,0.6)', margin:0, fontSize:13, textAlign:'center' }}>
            You answered all 100 questions!
          </p>
          <div style={{ width:100, height:100, borderRadius:'50%', border:'5px solid #facc15',
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontFamily:'Fredoka One', fontSize:24, color:'#facc15' }}>{pct}%</span>
            <span style={{ fontFamily:'Nunito', fontSize:10, color:'rgba(255,255,255,0.5)', fontWeight:700 }}>{correctCount}/100</span>
          </div>
          <div style={{ display:'flex', gap:4 }}>
            {[0,1,2].map(i => <Star key={i} size={24} color="#facc15" fill={i < stars ? '#facc15' : 'none'} />)}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, width:'100%' }}>
            {[
              { label:'XP Earned', value:sessionXP, color:'#22c55e' },
              { label:'Correct', value:correctCount, color:'#facc15' },
              { label:'Score', value:`${pct}%`, color:'#38bdf8' },
            ].map(s => (
              <div key={s.label} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:14, padding:'8px 4px', textAlign:'center' }}>
                <span style={{ display:'block', fontSize:9, color:'rgba(255,255,255,0.4)', fontFamily:'Fredoka One' }}>{s.label}</span>
                <span style={{ fontFamily:'Fredoka One', fontSize:20, color:s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
          <button onClick={onComplete} className="pulse" style={{
            background:'linear-gradient(135deg,#fde047,#facc15,#eab308)',
            border:'none', borderRadius:24, padding:'12px 32px',
            color:'#1a0f4e', fontFamily:'Fredoka One', fontSize:15, fontWeight:900, cursor:'pointer',
            display:'flex', alignItems:'center', gap:8, boxShadow:'0 6px 18px rgba(250,204,21,0.4)' }}>
            <Sparkles size={16} /> Continue to Reflect
          </button>
        </div>
      </div>
    );
  }

  // ── Main question view ──
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
      height:'100%', width:'100%',
      padding:'clamp(60px,8vh,80px) clamp(14px,3vw,32px) clamp(10px,2vh,20px)',
      gap:'clamp(8px,1.4vh,12px)', boxSizing:'border-box', overflow:'hidden' }}>

      {/* Header pill */}
      <div style={{ background:'linear-gradient(135deg,#7c3aed,#4f46e5)', borderRadius:24, padding:'5px 20px',
        color:'#fff', fontFamily:'Fredoka One', fontSize:13,
        display:'flex', alignItems:'center', gap:6,
        boxShadow:'0 4px 12px rgba(124,58,237,0.4)', flexShrink:0 }}>
        ✏️ Shape Practice
      </div>

      {/* Stats row */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        width:'100%', maxWidth:560, flexShrink:0 }}>
        <div style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)',
          borderRadius:15, padding:'4px 12px', display:'flex', alignItems:'center', gap:6 }}>
          <Star size={13} color="#facc15" fill="#facc15" />
          <span style={{ fontFamily:'Fredoka One', color:'#fff', fontSize:13 }}>{state.totalStars}</span>
        </div>
        <span style={{ fontFamily:'Fredoka One', color:'rgba(255,255,255,0.5)', fontSize:12 }}>
          {qIndex + 1} / 100
        </span>
        <div style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)',
          borderRadius:15, padding:'4px 12px', display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ fontSize:13 }}>🔥</span>
          <span style={{ fontFamily:'Fredoka One', color:'#f97316', fontSize:13 }}>{state.streak}x</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width:'100%', maxWidth:560, height:5,
        background:'rgba(255,255,255,0.1)', borderRadius:3, flexShrink:0 }}>
        <div style={{ width:`${progressPercent}%`, height:'100%',
          background:'linear-gradient(90deg,#7c3aed,#4f46e5)', borderRadius:3, transition:'width 0.3s ease' }} />
      </div>

      {/* Question card */}
      <div className="glass-card" style={{ width:'100%', maxWidth:560,
        padding:'clamp(12px,2vh,20px)', borderRadius:22,
        backgroundColor:'rgba(30,20,70,0.55)', border:'1.5px solid rgba(255,255,255,0.1)',
        boxShadow:'0 12px 36px rgba(0,0,0,0.45)',
        display:'flex', flexDirection:'column', gap:12, flexShrink:0 }}>

        {/* Category + correct count */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ background:'#facc15', color:'#1a0f4e', borderRadius:10, padding:'3px 10px',
            fontFamily:'Fredoka One', fontSize:10, fontWeight:900, textTransform:'uppercase' }}>
            {getCategoryLabel(currentQ.type)}
          </span>
          <span style={{ fontFamily:'Nunito', fontSize:10, color:'rgba(255,255,255,0.4)', fontWeight:700 }}>
            ✓ {correctCount} correct
          </span>
        </div>

        {/* Shape visual + question text row */}
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          {questionShapeId && (
            <div style={{ flexShrink:0 }}>
              <ShapeSVG shapeId={questionShapeId} size={56} />
            </div>
          )}
          <p style={{ fontFamily:'Fredoka One', fontSize:'clamp(13px,1.8vh,16px)',
            color:'#fff', margin:0, lineHeight:1.45, flex:1 }}>
            {currentQ.text}
          </p>
        </div>

        {/* Hint panel */}
        {showHint && (
          <div style={{ background:'rgba(56,189,248,0.08)', border:'1px dashed rgba(56,189,248,0.35)',
            borderRadius:12, padding:'8px 12px',
            display:'flex', alignItems:'center', gap:10 }}>
            {hintShapeId && <ShapeSVG shapeId={hintShapeId} size={36} />}
            <span style={{ fontFamily:'Nunito', fontSize:12, color:'#e0f2fe', lineHeight:1.4 }}>
              💡 {currentQ.hint}
            </span>
          </div>
        )}

        {/* MCQ — tap option = immediate answer check */}
        {currentQ.inputType === 'mcq' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:9 }}>
            {currentQ.options.map(opt => {
              let bg = 'rgba(255,255,255,0.04)';
              let border = 'rgba(255,255,255,0.12)';
              if (hasAnswered && opt === currentQ.answer) { bg = 'rgba(34,197,94,0.22)'; border = '#22c55e'; }
              if (hasAnswered && opt === lastAnswer && !isCorrect) { bg = 'rgba(239,68,68,0.22)'; border = '#ef4444'; }
              const optShapeId = getShapeId(opt);
              return (
                <button key={opt}
                  onClick={() => !hasAnswered && submitAnswer(opt)}
                  disabled={hasAnswered}
                  style={{ background:bg, border:`1.5px solid ${border}`, borderRadius:14,
                    padding:'10px 8px', cursor:hasAnswered?'default':'pointer',
                    color:'#fff', textAlign:'center', fontFamily:'Fredoka One', fontSize:13,
                    transition:'all 0.2s',
                    display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  {optShapeId && <ShapeSVG shapeId={optShapeId} size={32} />}
                  {opt}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Hint button */}
      <div style={{ display:'flex', justifyContent:'flex-end', width:'100%', maxWidth:560, flexShrink:0 }}>
        <button onClick={() => {
          if (!showHint) {
            setShowHint(true);
            setHintsUsed(h => h + 1);
            dispatch({ type: ACTIONS.USE_HINT });
            if (state.audioEnabled) narrate([say(currentQ.hint)]);
          }
        }} disabled={showHint} style={{
          background: showHint ? 'transparent' : 'rgba(250,204,21,0.15)',
          border: showHint ? '1.5px solid rgba(255,255,255,0.1)' : '1.5px solid rgba(250,204,21,0.35)',
          borderRadius:18, padding:'5px 14px',
          color: showHint ? 'rgba(255,255,255,0.3)' : '#facc15',
          fontFamily:'Fredoka One', fontSize:11, cursor: showHint ? 'default' : 'pointer' }}>
          💡 Hint
        </button>
      </div>

      {/* Answer popup — auto-dismisses after 1 second */}
      {showPopup && (
        <div style={{ position:'fixed', inset:0, zIndex:300,
          display:'flex', alignItems:'center', justifyContent:'center',
          background:'rgba(0,0,0,0.35)', pointerEvents:'none' }}>
          <div style={{ background: isCorrect ? '#22c55e' : '#ef4444',
            borderRadius:24, padding:'28px 32px',
            display:'flex', flexDirection:'column', alignItems:'center', gap:10,
            boxShadow:'0 16px 48px rgba(0,0,0,0.55)',
            animation:'popIn 0.25s cubic-bezier(0.175,0.885,0.32,1.275)',
            minWidth:220, maxWidth:300 }}>
            <span style={{ fontSize:52 }}>{isCorrect ? '🎉' : '😢'}</span>
            <span style={{ fontFamily:'Fredoka One', fontSize:22, color:'#fff' }}>
              {isCorrect ? 'Correct!' : 'Not quite!'}
            </span>
            {!isCorrect && (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                {getShapeId(String(currentQ.answer)) && (
                  <ShapeSVG shapeId={getShapeId(String(currentQ.answer))} size={44} />
                )}
                <span style={{ fontFamily:'Nunito', fontSize:13, color:'rgba(255,255,255,0.95)',
                  textAlign:'center', lineHeight:1.4 }}>
                  Answer: <strong>{currentQ.answer}</strong>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
