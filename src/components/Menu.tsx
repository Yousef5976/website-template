import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'appetizers', icon: '🍟', en: 'Appetizers', ar: 'مقبلات' },
  { id: 'hot-drinks', icon: '☕', en: 'Hot Drinks', ar: 'مشروبات ساخنة' },
  { id: 'juices', icon: '🥤', en: 'Juices', ar: 'عصائر' },
  { id: 'beer-wine', icon: '🍺', en: 'Beer & Wine', ar: 'بيرة ونبيذ' },
  { id: 'spirits', icon: '🥃', en: 'Spirits', ar: 'روح' },
  { id: 'cocktails', icon: '🍹', en: 'Cocktails', ar: 'كوكتيلات' },
  { id: 'shisha', icon: '💨', en: 'Shisha', ar: 'شيشة' }
];

const MENU_DATA: Record<string, any[]> = {
  'appetizers': [
    { nameEn: 'Mozzarella Fried', nameAr: 'موزاريلا فرايد', price: 60 },
    { nameEn: 'Chicken Strips', nameAr: 'تشيكن ستريبس', price: 60 },
    { nameEn: 'Tempura Shrimps', nameAr: 'جمبري تامبورا', price: 80 },
    { nameEn: 'Sausage', nameAr: 'سجق', price: 60 },
    { nameEn: 'Asafer', nameAr: 'عصافير', price: 75 },
    { nameEn: 'Mini Hawashi', nameAr: 'ميني حواوشي', price: 60 },
    { nameEn: 'Chicken Liver', nameAr: 'كبدة دجاج', price: 50 },
    { nameEn: 'Chicken Wings', nameAr: 'أجنحة دجاج', price: 50 },
    { nameEn: 'Cheese Tomato', nameAr: 'جبنة طماطم', price: 30 },
    { nameEn: 'Home Made Chips', nameAr: 'شيبس بيتي', price: 25 },
    { nameEn: 'Mix Cheese', nameAr: 'مكس جبن', price: 85 },
    { nameEn: 'French Fries', nameAr: 'بطاطس مقلية', price: 25 },
    { nameEn: 'Chicken Fajita', nameAr: 'فاهيتا دجاج', price: 70 },
    { nameEn: 'Mombar', nameAr: 'ممبار', price: 55 },
  ],
  'hot-drinks': [
    { nameEn: 'Tea', nameAr: 'شاي', price: 20 },
    { nameEn: 'Tea With Flavors', nameAr: 'شاي بنكهات', price: 25 },
    { nameEn: 'Turkish Coffee', nameAr: 'قهوة تركي', price: 22 },
    { nameEn: 'French Coffee', nameAr: 'قهوة فرنساوي', price: 28 },
    { nameEn: 'Hazelnut Coffee', nameAr: 'قهوة بالبندق', price: 28 },
    { nameEn: 'Nescafe', nameAr: 'نسكافيه', price: 35 },
    { nameEn: 'Cappuccino', nameAr: 'كابتشينو', price: 40 },
    { nameEn: 'Latte', nameAr: 'لاتيه', price: 40 },
    { nameEn: 'Mocha', nameAr: 'موكا', price: 40 },
    { nameEn: 'Espresso Sgl', nameAr: 'اسبريسو', price: 25 },
    { nameEn: 'Orchid', nameAr: 'سحلب', price: 40 },
    { nameEn: 'Cinnamon Milk', nameAr: 'قرفة باللبن', price: 30 },
    { nameEn: 'Hot Chocolate', nameAr: 'هوت شوكليت', price: 35 },
    { nameEn: 'Hot Cider', nameAr: 'هوت سايدر', price: 35 },
  ],
  'juices': [
    { nameEn: 'Lemon', nameAr: 'ليمون', price: 30 },
    { nameEn: 'Yogurt', nameAr: 'زبادي', price: 30 },
    { nameEn: 'Fresh Juice', nameAr: 'عصير فريش', price: 40 },
    { nameEn: 'Orange', nameAr: 'برتقال', price: 35 },
    { nameEn: 'Pepsi - 7up - Mirinda', nameAr: 'كانز - بيبسي وسفن وميرندا', price: 30 },
    { nameEn: 'Fayrouz - Birell - Schweppes', nameAr: 'فيروز - بيريل - شويبس', price: 32 },
    { nameEn: 'Red Bull', nameAr: 'ريد بول', price: 60 },
    { nameEn: 'Mineral Water Small', nameAr: 'مياه معدنية صغيرة', price: 10 },
  ],
  'beer-wine': [
    { nameEn: 'Stella', nameAr: 'ستيلا', price: 50, popular: true },
    { nameEn: 'Heineken', nameAr: 'هينيكن', price: 55 },
    { nameEn: 'Sakara Gold', nameAr: 'سقارة جولد', price: 60 },
    { nameEn: 'Master Max', nameAr: 'ماستر ماكس', price: 60 },
    { nameEn: 'Desperados Tequila', nameAr: 'ديسبرادوس تكيلا', price: 65 },
    { nameEn: 'I.D. Double Edge Energy', nameAr: 'آي دي دابل ايدج إنرجي', price: 65 },
    { nameEn: 'I.D. Double Edge Cherry', nameAr: 'آي دي دابل ايدج كريز', price: 65 },
    { nameEn: 'I.D. Double Edge Watermelon', nameAr: 'آي دي دابل ايدج بطيخ', price: 65 },
    { nameEn: 'Cubana Rum Peach', nameAr: 'كوبانا رم خوخ', price: 65 },
    { nameEn: 'Butler’s Gin Lemon', nameAr: 'باتلرز جن ليمون', price: 65 },
    { nameEn: 'Omar Khayam Bottle (R/W/R)', nameAr: 'عمر الخيام زجاجة', price: 275 },
    { nameEn: 'Omar Khayam Glass (R/W)', nameAr: 'عمر الخيام كاس', price: 75 },
    { nameEn: 'Grand Marquis (R/W)', nameAr: 'جراند ماركيز', price: 320 },
    { nameEn: 'Grand Marquis Sweet', nameAr: 'جراند ماركيز مسكر', price: 330 },
    { nameEn: 'Ayam (R/W)', nameAr: 'أيام', price: 380 },
    { nameEn: 'Cape Bay Merlot Red', nameAr: 'كيب باي ميرلو أحمر', price: 430 },
  ],
  'spirits': [
    { nameEn: 'Auld Stag Whisky 350ml', nameAr: 'اولد ستاج ويسكي ٣٥٠ مل', price: 180 },
    { nameEn: 'Auld Stag Whisky 750ml', nameAr: 'اولد ستاج ويسكي ٧٥٠ مل', price: 400 },
    { nameEn: 'Butler’s Gin 750ml', nameAr: 'باتلرز جن ٧٥٠ مل', price: 450 },
    { nameEn: 'Cubana Rum 750ml', nameAr: 'كوبانا رم ٧٥٠ مل', price: 450 },
    { nameEn: 'Malvado Tequila 750ml', nameAr: 'ملفادو تكيلا ٧٥٠ مل', price: 450 },
    { nameEn: 'Vodka ID Blue 1L', nameAr: 'فودكا بلو 1 لتر', price: 500 },
    { nameEn: 'Vodka ID Blue 500ml', nameAr: 'فودكا بلو ٥٠٠ مل', price: 300 },
    { nameEn: 'Butler’s Gin Shot', nameAr: 'باتلرز جن شوت', price: 55 },
    { nameEn: 'Vodka ID Blue Shot', nameAr: 'فودكا بلو شوت', price: 65 },
    { nameEn: 'Malvado Tequila Shot', nameAr: 'ملفادو تكيلا شوت', price: 55 },
    { nameEn: 'Auld Stag Whisky Shot', nameAr: 'اولد ستاج ويسكي شوت', price: 45 },
    { nameEn: 'Cubana Rum Shot', nameAr: 'كوبانا رم شوت', price: 55 },
  ],
  'cocktails': [
    { nameEn: 'Tequila Sunrise', nameAr: 'تكيلا صن رايز', price: 115 },
    { nameEn: 'Senorita', nameAr: 'سنيوريتا', price: 115 },
    { nameEn: 'Blue Moon', nameAr: 'بلو مون', price: 115 },
    { nameEn: 'Mojito', nameAr: 'موهيتو', price: 125, popular: true },
    { nameEn: 'Flaming Lamborghini', nameAr: 'فلامنج لامبورجيني', price: 200 },
    { nameEn: 'Sangria 2L', nameAr: 'سانجريا ٢ لتر', price: 425 },
    { nameEn: 'Bull Frog', nameAr: 'بول فروج', price: 170 },
    { nameEn: 'Fix Tiger', nameAr: 'فيكس تايجر', price: 180 },
    { nameEn: 'Green Lagoon', nameAr: 'جرين لاجون', price: 145 },
    { nameEn: 'Long Island', nameAr: 'لونج آيلاند', price: 135, popular: true },
    { nameEn: 'Electric Long Island', nameAr: 'إلكتريك لونج آيلاند', price: 150 },
    { nameEn: 'Nigeria 2L', nameAr: 'نيجيريا 2 لتر', price: 420 },
    { nameEn: 'Village 2L', nameAr: 'فيلدج ٢ لتر', price: 595 },
    { nameEn: 'Sex On The Peach', nameAr: 'سكس اون بيتش', price: 130 },
    { nameEn: 'Special Cocktail', nameAr: 'كوكتيل سبيشيال', price: 190 },
    { nameEn: 'Blue Lady', nameAr: 'بلو ليدي', price: 125 },
    { nameEn: 'Black Russian', nameAr: 'بلاك راشان', price: 125 },
    { nameEn: 'B52', nameAr: 'بي ٥٢', price: 185 },
    { nameEn: 'Cuba Libera', nameAr: 'كوبا ليبرة', price: 115 },
    { nameEn: 'Vodka Apple Pie', nameAr: 'فودكا ابل باي', price: 110 },
    { nameEn: 'Bloody Marie', nameAr: 'بلودي ماري', price: 125 },
    { nameEn: 'Screw Driver', nameAr: 'سكرو درايفر', price: 110 },
  ],
  'shisha': [
    { nameEn: 'Double Apple', nameAr: 'تفاح مضاعف', price: 0, tba: true, popular: true },
    { nameEn: 'Lemon Mint', nameAr: 'ليمون نعناع', price: 0, tba: true },
    { nameEn: 'Special Mix', nameAr: 'مزيج خاص', price: 0, tba: true, desc: 'Ask your server' },
  ]
};

export default function Menu({ lang, addToCart }: { lang: string, addToCart: (en: string, ar: string, price: number) => void }) {
  const [activeTab, setActiveTab] = useState('appetizers');

  return (
    <section id="menu">
      <div className="reveal">
        <div className="sec-label">{lang === 'ar' ? 'المنيو الكامل' : 'Full Menu'}</div>
        <h2 className="sec-title" dangerouslySetInnerHTML={{
          __html: lang === 'ar' ? 'ماذا <em>نقدّم</em>' : 'What We <em>Serve</em>'
        }} />
        <div className="divider"></div>
        <p className="menu-desc">
          {lang === 'ar' ? 'اضغط + لإضافة عناصر لطلبك — سنرسله مباشرة عبر واتساب.' : 'Tap + to add items to your order — we\'ll send it straight to WhatsApp.'}
        </p>
      </div>

      <div className="menu-tabs-wrap">
        <div className="menu-tabs">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id} 
              className={`menu-tab ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.icon} {lang === 'ar' ? cat.ar : cat.en}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-panel active">
        <div className="menu-cat-title">
          {CATEGORIES.find(c => c.id === activeTab)?.[lang === 'ar' ? 'ar' : 'en']}
        </div>
        <div className="menu-items">
          {MENU_DATA[activeTab]?.map((item, idx) => (
            <div key={idx} className="menu-item">
              <div className="item-info">
                <div className="item-name">{lang === 'ar' ? item.nameAr : item.nameEn}</div>
                {item.nameAr && <div className="item-ar">{lang === 'ar' ? item.nameEn : item.nameAr}</div>}
                {item.desc && <div className="item-desc">{item.desc}</div>}
                {item.popular && <div className="item-badge">⭐ Most Popular</div>}
              </div>
              <div className="item-right">
                {item.tba ? (
                  <div className="price-tba">{lang === 'ar' ? 'اسأل الموظف' : 'Ask staff'}</div>
                ) : (
                  <>
                    <span className="item-price">{item.price} EGP</span>
                    <button className="add-btn" onClick={(e) => {
                       addToCart(item.nameEn, item.nameAr, item.price);
                       const t = e.target as HTMLButtonElement;
                       t.textContent = '✓';
                       t.style.background = '#3a7c4f';
                       setTimeout(() => { t.textContent = '+'; t.style.background = ''; }, 800);
                    }}>+</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="service-note">
          {lang === 'ar' ? '⚠️ جميع الأسعار تخضع لرسوم خدمة 12٪' : '⚠️ All prices are subject to 12% service charge'}
        </div>
      </div>
    </section>
  );
}
