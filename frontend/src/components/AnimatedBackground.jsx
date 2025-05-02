import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  return (
    <div className="animated-container">
      <div className="animated-elements">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`shape shape-${i + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
