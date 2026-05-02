import React, { useState, useEffect } from 'react';

export default function Navbar({ lang, toggleLang }: { lang: string, toggleLang: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobOpen, setIsMobOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobNav = () => {
    setIsMobOpen(false);
    document.body.style.overflow = '';
  };

  const openMobNav = () => {
    setIsMobOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-logo">5 DOOR ROOF</div>
        <div className="nav-links">
          <a href="#about">{lang === 'ar' ? 'عنّا' : 'About'}</a>
          <a href="#menu">{lang === 'ar' ? 'المنيو' : 'Menu'}</a>
          <a href="#experience">{lang === 'ar' ? 'تجربتنا' : 'Experience'}</a>
          <a href="#shisha">{lang === 'ar' ? 'شيشة' : 'Shisha'}</a>
          <a href="#contact" className="nav-reserve">{lang === 'ar' ? 'احجز طاولة' : 'Book a Table'}</a>
        </div>
        <div className="nav-right">
          <button className="lang-btn" onClick={toggleLang}>
            🌐 {lang === 'ar' ? 'English' : 'عربي'}
          </button>
          <div className={`hamburger ${isMobOpen ? 'open' : ''}`} onClick={isMobOpen ? closeMobNav : openMobNav}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      <div className={`mob-overlay ${isMobOpen ? 'open' : ''}`} onClick={closeMobNav}></div>
      <div className={`mob-panel ${isMobOpen ? 'open' : ''}`}>
        <a href="#about" onClick={closeMobNav}>{lang === 'ar' ? 'عنّا' : 'About'}</a>
        <a href="#menu" onClick={closeMobNav}>{lang === 'ar' ? 'المنيو' : 'Menu'}</a>
        <a href="#experience" onClick={closeMobNav}>{lang === 'ar' ? 'تجربتنا' : 'Experience'}</a>
        <a href="#shisha" onClick={closeMobNav}>{lang === 'ar' ? 'شيشة' : 'Shisha'}</a>
        <a href="#contact" className="mob-reserve" onClick={closeMobNav}>{lang === 'ar' ? 'احجز طاولة' : 'Book a Table'}</a>
      </div>
    </>
  );
}
