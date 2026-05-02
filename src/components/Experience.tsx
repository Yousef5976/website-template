import React from 'react';

const EXP = [
  { num: '01', icon: '🌆', titleEn: 'Rooftop Views', titleAr: 'إطلالات السطح', descEn: 'Perched above Al Agouzah, open-air with Cairo\'s breeze and city lights all around.', descAr: 'فوقالعجوزة، في الهواء الطلق مع نسيم القاهرة وأضواء المدينة.' },
  { num: '02', icon: '🍔', titleEn: 'Cairo\'s Best Burgers', titleAr: 'أفضل برجر في القاهرة', descEn: 'Consistently voted the best burgers in Cairo — grills, pizza and snacks to match.', descAr: 'يُصوَّت باستمرار على أفضل برجر في القاهرة — مع مشويات وبيتزا وسناكس.' },
  { num: '03', icon: '🍹', titleEn: 'Full Cocktail Bar', titleAr: 'بار كوكتيل كامل', descEn: '20+ cocktails, wines, beers, spirits and shots — something for everyone, every night.', descAr: 'أكثر من 20 كوكتيل، نبيذ، بيرة، أرواح وشوت — شيء للجميع، كل ليلة.' },
  { num: '04', icon: '💨', titleEn: 'Premium Shisha', titleAr: 'شيشة ممتازة', descEn: 'Wide selection of premium shisha flavours — our most-requested feature.', descAr: 'مجموعة واسعة من نكهات الشيشة الممتازة — الأكثر طلباً لدينا.' },
  { num: '05', icon: '🎶', titleEn: 'Live Music & DJ', titleAr: 'موسيقى حية ودي جي', descEn: 'Regular live music sessions and DJ nights that keep the energy going until late.', descAr: 'جلسات موسيقى حية منتظمة وليالي دي جي تبقي الطاقة مرتفعة حتى وقت متأخر.' },
  { num: '06', icon: '👥', titleEn: 'Mixed & Welcoming', titleAr: 'متنوع وترحيبي', descEn: 'Locals and expats, mixed groups and couples — one of Cairo\'s most inclusive spots.', descAr: 'محليون ومغتربون، مجموعات مختلطة وأزواج — من أكثر الأماكن شمولاً في القاهرة.' },
];

export default function Experience({ lang }: { lang: string }) {
  return (
    <section id="experience">
      <div className="exp-inner">
        <div className="exp-header reveal">
          <div className="sec-label" style={{ color: 'var(--gold)' }}>
            {lang === 'ar' ? 'لماذا 5 دور روف' : 'Why 5 Door Roof'}
          </div>
          <h2 className="sec-title" dangerouslySetInnerHTML={{
            __html: lang === 'ar' ? 'تجربة <em>5 دور</em> الكاملة' : 'The Full <em>5 Door</em> Experience'
          }} />
          <p className="exp-lead">
            {lang === 'ar' ? 'أكثر من مجرد بار — جو، مجتمع، مؤسسة قاهرية.' : 'More than a bar — a vibe, a community, a Cairo institution.'}
          </p>
        </div>
        <div className="exp-wrap">
          <div className="exp-cards">
            {EXP.map((item, idx) => (
              <div key={idx} className={`exp-card reveal reveal-delay-${Math.min((idx%3)+1, 3)}`}>
                <div className="exp-card-num">{item.num}</div>
                <div className="exp-card-icon">{item.icon}</div>
                <h3 className="exp-card-title">{lang === 'ar' ? item.titleAr : item.titleEn}</h3>
                <p className="exp-card-body">{lang === 'ar' ? item.descAr : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="swipe-hint">
          {lang === 'ar' ? '← اسحب للاستكشاف →' : '← Swipe to explore →'}
        </p>
      </div>
    </section>
  );
}
