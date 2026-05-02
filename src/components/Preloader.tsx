import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHidden(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="preloader" className={isHidden ? 'hidden' : ''}>
      <div className="pre-logo">5 Door Roof</div>
      <div className="pre-line"></div>
      <div className="pre-sub">Al Agouzah · Cairo</div>
    </div>
  );
}
