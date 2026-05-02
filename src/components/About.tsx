import React from 'react';

export default function About({ lang }: { lang: string }) {
  return (
    <section id="about">
      <div className="about-grid">
        <div>
          <div className="sec-label reveal">{lang === 'ar' ? 'قصتنا' : 'Our Story'}</div>
          <h2 className="sec-title reveal reveal-delay-1" dangerouslySetInnerHTML={{
            __html: lang === 'ar' ? 'أكثر أسطح العجوزة <em>حبّاً</em>' : 'Agouza\'s Most <em>Loved</em> Rooftop'
          }} />
          <div className="divider reveal reveal-delay-2"></div>
          <div className="about-body reveal reveal-delay-2">
            <p>
              {lang === 'ar' 
                ? '5 دور روف هو الوجهة المفضلة على أسطح العجوزة — ملجأ في الهواء الطلق حيث تجتمع الأجواء الرائعة والطعام اللذيذ والمشروبات الباردة كل ليلة.' 
                : "5 Door Roof is Agouza's go-to rooftop bar and lounge — an open-air haven where good vibes, great food, and cold drinks come together every single night."}
            </p>
            <p>
              {lang === 'ar' 
                ? 'من برجرنا الشهير والمشويات إلى الكوكتيلات المميزة والشيشة الممتازة — كل زيارة تجربة جديدة في أجمل أسطح القاهرة.' 
                : "From our famous burgers and grills to loaded cocktails and premium shisha — every visit is a new experience in Cairo's best rooftop setting."}
            </p>
          </div>
          <div className="about-stats reveal reveal-delay-3">
            <div className="stat-box"><div className="stat-num">4.5★</div><div className="stat-lbl">{lang === 'ar' ? 'تقييم جوجل' : 'Google Rating'}</div></div>
            <div className="stat-box"><div className="stat-num">30K+</div><div className="stat-lbl">{lang === 'ar' ? 'متابع فيسبوك' : 'Facebook Fans'}</div></div>
            <div className="stat-box"><div className="stat-num">1100+</div><div className="stat-lbl">{lang === 'ar' ? 'مراجعة' : 'Reviews'}</div></div>
            <div className="stat-box"><div className="stat-num">∞</div><div className="stat-lbl">{lang === 'ar' ? 'أجواء ليلية' : 'Nightly Vibes'}</div></div>
          </div>
        </div>
        <div className="about-visual reveal reveal-delay-2">
          <Feature icon="🌆" titleEn="Open-Air Rooftop" titleAr="سطح في الهواء الطلق" descEn="Breathe fresh air above Agouza with Cairo's skyline as your backdrop every night." descAr="تنفّس الهواء فوق العجوزة مع أفق القاهرة خلفيةً لك كل ليلة." lang={lang} />
          <Feature icon="🍔" titleEn="Famous Burgers & Grills" titleAr="برجر ومشويات شهيرة" descEn="Voted Cairo's best burgers — plus grills, pizza, and snacks all night long." descAr="صوّت عليها الجميع كأفضل برجر في القاهرة — مع مشويات وبيتزا وسناكس طوال الليل." lang={lang} />
          <Feature icon="🍺" titleEn="Full Bar & Cocktails" titleAr="بار كامل وكوكتيلات" descEn="Cold beers, wines, spirits, shots and a full cocktail menu crafted nightly." descAr="بيرة باردة ونبيذ وكحول وشوت وقائمة كوكتيل كاملة يومياً." lang={lang} />
          <Feature icon="💨" titleEn="Premium Shisha" titleAr="شيشة ممتازة" descEn="Top-quality shisha with a wide range of flavours served every evening." descAr="شيشة ذات جودة عالية مع مجموعة واسعة من النكهات تُقدَّم كل مساء." lang={lang} />
          <Feature icon="🎶" titleEn="Live Music & DJ Nights" titleAr="موسيقى حية وليالي دي جي" descEn="Regular live music sessions keeping the rooftop energy high until late." descAr="جلسات موسيقى حية منتظمة تحافظ على أجواء السطح مفعمة بالحيوية حتى وقت متأخر." lang={lang} />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, titleEn, titleAr, descEn, descAr, lang }: any) {
  return (
    <div className="about-feature">
      <div className="feat-icon">{icon}</div>
      <div className="feat-text">
        <strong>{lang === 'ar' ? titleAr : titleEn}</strong>
        <p>{lang === 'ar' ? descAr : descEn}</p>
      </div>
    </div>
  );
}
