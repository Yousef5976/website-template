import React from 'react';

const FLAVORS = ['Double Apple', 'Watermelon Mint', 'Lemon Mint', 'Grape', 'Peach', 'Blueberry', 'Mixed Fruit', 'Strawberry', 'Mango', 'Rose', 'Special Mix'];

export default function Shisha({ lang }: { lang: string }) {
  return (
    <section id="shisha">
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="sec-label reveal">
          {lang === 'ar' ? 'الأكثر شعبية في 5 دور' : 'Most Popular at 5 Door'}
        </div>
        <h2 className="sec-title reveal reveal-delay-1" dangerouslySetInnerHTML={{
          __html: lang === 'ar' ? 'شيشة و<em>أجواء رائعة</em>' : 'Shisha & <em>Good Vibes</em>'
        }} />
        <p className="shisha-desc reveal reveal-delay-2">
          {lang === 'ar' 
            ? 'الشيشة في قلب 5 دور روف. استقر مع مجموعتك، واختر نكهتك، ودع الليلة تتكشف فوق أسطح العجوزة.' 
            : 'Shisha is at the heart of 5 Door Roof. Settle in with your crew, pick your flavour, and let the night unfold above Agouza\'s rooftops.'}
        </p>
        <div className="shisha-flavors reveal reveal-delay-2">
          {FLAVORS.map(f => (
            <span key={f} className="flavor-tag">{f}</span>
          ))}
        </div>
        <div className="reveal reveal-delay-3" style={{ display: 'flex', justifyContent: 'center' }}>
          <a href="#contact" className="btn-gold">
            {lang === 'ar' ? 'احجز طاولتك' : 'Book Your Table'}
          </a>
        </div>
      </div>
    </section>
  );
}
