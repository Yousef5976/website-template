import React from 'react';

export default function BottomNav({ lang, onOpenCart }: { lang: string, onOpenCart: () => void }) {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        <a href="#hero" className="active">
          <span className="bn-icon">🏠</span>
          <span>{lang === 'ar' ? 'الرئيسية' : 'Home'}</span>
        </a>
        <a href="#menu">
          <span className="bn-icon">🍔</span>
          <span>{lang === 'ar' ? 'المنيو' : 'Menu'}</span>
        </a>
        <a href="#contact" className="bn-reserve">
          <span className="bn-icon">📅</span>
          <span>{lang === 'ar' ? 'احجز' : 'Book'}</span>
        </a>
        <a href="#shisha">
          <span className="bn-icon">💨</span>
          <span>{lang === 'ar' ? 'شيشة' : 'Shisha'}</span>
        </a>
        <a onClick={onOpenCart} style={{ cursor: 'pointer' }}>
          <span className="bn-icon">🛒</span>
          <span>{lang === 'ar' ? 'اطلب' : 'Order'}</span>
        </a>
      </div>
    </nav>
  );
}
