import React from 'react';
import './style.css'; // We'll use your existing CSS here

const Background = () => {
  return (
    <div className="container">
      <div className="elements">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={`element-${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Background;
