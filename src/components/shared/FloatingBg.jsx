import { useEffect, useState } from 'react';

const FLOATING_SHAPES = ['▲', '●', '■', '⬡', '⬟', '⬘', '★', '✚'];

export default function FloatingBg() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Generate a set of static randomized parameters on mount to avoid server/client mismatch
    const list = Array.from({ length: 15 }).map((_, i) => {
      const size = Math.floor(Math.random() * 32) + 16; // 16px to 48px
      const left = Math.floor(Math.random() * 96) + 2; // 2% to 98%
      const top = Math.floor(Math.random() * 90) + 5; // 5% to 95%
      const dur = Math.floor(Math.random() * 15) + 15; // 15s to 30s
      const delay = Math.floor(Math.random() * 10) * -1; // negative delay to start immediately
      const shape = FLOATING_SHAPES[i % FLOATING_SHAPES.length];
      return { id: i, size, left, top, dur, delay, shape };
    });
    setElements(list);
  }, []);

  return (
    <div className="floating-bg" aria-hidden="true">
      {elements.map(el => (
        <span
          key={el.id}
          className="float-shape"
          style={{
            fontSize: el.size,
            left: `${el.left}%`,
            top: `${el.top}%`,
            '--dur': `${el.dur}s`,
            '--delay': `${el.delay}s`,
            opacity: 0.04
          }}
        >
          {el.shape}
        </span>
      ))}
    </div>
  );
}
