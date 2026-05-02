import React from 'react';

export default function Hero({ lang }: { lang: string }) {
  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-stars"></div>
      <div className="hero-content">
        <div className="hero-tag reveal">
          {lang === 'ar' ? 'بار على السطح ولاونج ·العجوزة، القاهرة' : 'Rooftop Bar & Lounge · Al Agouzah, Cairo'}
        </div>
        <h1 className="hero-title reveal reveal-delay-1" dangerouslySetInnerHTML={{
          __html: lang === 'ar' 
            ? 'خمسة طوابق فوق.<br/><em>صفر</em> هموم.' 
            : 'Five Floors Up.<br/><em>Zero</em> Worries.'
        }} />
        <p className="hero-desc reveal reveal-delay-2">
          {lang === 'ar' 
            ? 'المكان المفضل على أسطح القاهرة في العجوزة — برجر، مشويات، مشروبات باردة، شيشة وموسيقى حية. حيث تصبح كل ليلة حكاية.' 
            : "Cairo's favourite rooftop hangout in Agouza — burgers, grills, cold drinks, shisha & live music. Where every night becomes a story."}
        </p>
        <div className="hero-ctas reveal reveal-delay-3">
          <a href="#menu" className="btn-gold">{lang === 'ar' ? 'استكشف المنيو' : 'Explore Menu'}</a>
          <a href="#contact" className="btn-outline">{lang === 'ar' ? 'احجز طاولة' : 'Book a Table'}</a>
        </div>
      </div>
    </section>
  );
}
