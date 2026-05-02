import React, { useState } from 'react';
import { type CartItem } from '../types';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function Contact({ lang, cart }: { lang: string, cart: CartItem[] }) {
  const [formData, setFormData] = useState({
    name: '', phone: '', date: '', time: '20:00', guests: '4', occasion: 'Casual Night Out', notes: ''
  });

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const submitBooking = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name, phone, date, time, guests, occasion, notes } = formData;
    
    if (!name || !phone || !date || !time) {
      alert(lang === 'ar' ? 'يرجى تعبئة الحقول المطلوبة' : 'Please fill all required fields (Name, Phone, Date, Time).');
      return;
    }

    // Save to firebase
    try {
      await addDoc(collection(db, 'reservations'), {
        name,
        phone,
        date,
        time,
        guests,
        occasion,
        notes,
        total: cartTotal,
        status: 'pending',
        tableId: null,
        cart,
        createdAt: serverTimestamp()
      });
    } catch (err: any) {
      console.error("Error adding document: ", err.message);
      alert("System error sending your reservation online. But we will still send it via WhatsApp.");
    }

    let msg = `Hi 5 Door Roof! 🙏\n\n`;
    msg += `📋 *Table Booking*\n👤 Name: ${name || '-'}\n📅 Date: ${date || '-'}\n🕐 Time: ${time}\n👥 Guests: ${guests}\n🎉 Occasion: ${occasion}\n`;
    
    if (cart.length > 0) {
      msg += `\n🛒 *Pre-Order:*\n`;
      cart.forEach(item => { msg += `  • ${item.qty}× ${lang === 'ar' ? item.nameAr : item.nameEn} — ${item.price * item.qty} EGP\n`; });
      msg += `  💰 Total: ${cartTotal} EGP (+ 12% service)\n`;
    }
    if (notes) msg += `\n📝 Notes: ${notes}`;

    window.open(`https://wa.me/201098175000?text=${encodeURIComponent(msg)}`, '_blank');
    
    const btn = e.target as HTMLButtonElement;
    btn.textContent = lang === 'ar' ? '✓ تم الإرسال!' : '✓ Sent to WhatsApp!';
    btn.style.background = '#3a7c4f';
    setTimeout(() => {
      btn.textContent = lang === 'ar' ? '📲 تأكيد عبر واتساب' : '📲 Confirm via WhatsApp';
      btn.style.background = '';
    }, 3500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact">
      <div className="contact-grid">
        <div>
          <div className="sec-label" style={{ color: 'var(--gold)' }}>{lang === 'ar' ? 'زورونا' : 'Visit Us'}</div>
          <h2 className="sec-title reveal" dangerouslySetInnerHTML={{
            __html: lang === 'ar' ? 'تعال اعثر على <em>5 دور روف</em>' : 'Come Find <em>5 Door Roof</em>'
          }} />
          <p className="contact-lead reveal reveal-delay-1">
            {lang === 'ar' 
              ? 'نفتح كل مساء في العجوزة — تعال للمشروبات والشيشة والطعام والليالي التي ستتذكرها فعلاً.' 
              : 'We\'re open every evening in Agouza — come for the drinks, the shisha, the food, and the kind of nights you\'ll actually remember.'}
          </p>
          <div className="quick-actions reveal reveal-delay-2">
            <a href="https://wa.me/201098175000" className="qa-btn qa-wa" target="_blank" rel="noopener noreferrer">💬 {lang === 'ar' ? 'واتساب' : 'WhatsApp Us'}</a>
            <a href="tel:+201098175000" className="qa-btn qa-call">📞 {lang === 'ar' ? 'اتصل الآن' : 'Call Now'}</a>
          </div>
          <div className="contact-details reveal reveal-delay-2">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <div className="contact-item-title">{lang === 'ar' ? 'العنوان' : 'Address'}</div>
                <div className="contact-item-val">
                  3 Abd El Aziem Rashed,<br/>Al Agouzah, Giza<br/>
                  <a href="https://maps.app.goo.gl/yu4nxNVkmoh6xWzY8" target="_blank" rel="noopener noreferrer" style={{ fontSize: '.82rem', color: 'var(--gold)' }}>
                    {lang === 'ar' ? 'افتح في خرائط جوجل →' : 'Open in Google Maps →'}
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🕐</div>
              <div>
                <div className="contact-item-title">{lang === 'ar' ? 'أوقات العمل' : 'Opening Hours'}</div>
                <div className="contact-item-val">{lang === 'ar' ? 'يومياً: من الساعة الحادية عشرة مساءً وحتى الثالثة والنصف صباحاً.' : 'Daily: 11:00 PM – 3:30 AM'}</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <div className="contact-item-title">{lang === 'ar' ? 'هاتف / واتساب' : 'Phone / WhatsApp'}</div>
                <div className="contact-item-val"><a href="tel:+201098175000" style={{ color: 'var(--gold)' }}>010 98175000</a></div>
              </div>
            </div>
          </div>
        </div>

        <div className="reserve-form reveal reveal-delay-2">
          <div className="form-title">{lang === 'ar' ? 'احجز طاولة' : 'Book a Table'}</div>
          
          <div className="form-row">
            <div className="form-group">
              <label>{lang === 'ar' ? 'اسمك' : 'Your Name'}</label>
              <input type="text" name="name" onChange={handleChange} placeholder={lang === 'ar' ? 'اسمك' : 'Your name'} />
            </div>
            <div className="form-group">
              <label>{lang === 'ar' ? 'هاتف / واتساب' : 'Phone / WhatsApp'}</label>
              <input type="tel" name="phone" onChange={handleChange} placeholder="+20 xxx xxx xxxx" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{lang === 'ar' ? 'التاريخ' : 'Date'}</label>
              <input type="date" name="date" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>{lang === 'ar' ? 'الوقت' : 'Time'}</label>
              <input type="time" name="time" onChange={handleChange} defaultValue="20:00" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>{lang === 'ar' ? 'عدد الأشخاص' : 'Guests'}</label>
              <select name="guests" onChange={handleChange} defaultValue="4">
                <option>1</option><option>2</option><option>3</option><option>4</option>
                <option>5</option><option>6</option><option>7</option><option>8</option><option>10+</option>
              </select>
            </div>
            <div className="form-group">
              <label>{lang === 'ar' ? 'المناسبة' : 'Occasion'}</label>
              <select name="occasion" onChange={handleChange}>
                <option>{lang === 'ar' ? 'ليلة عادية' : 'Casual Night Out'}</option>
                <option>{lang === 'ar' ? 'عيد ميلاد' : 'Birthday'}</option>
                <option>{lang === 'ar' ? 'ذكرى سنوية' : 'Anniversary'}</option>
                <option>{lang === 'ar' ? 'أخرى' : 'Other'}</option>
              </select>
            </div>
          </div>

          <div className="form-cart-preview">
            <div className="cart-preview-label">{lang === 'ar' ? 'الطلب المسبق (اختياري)' : 'Pre-Order (Optional)'}</div>
            <div className="cart-preview-box">
              {cart.length === 0 ? (
                <div className="cart-preview-empty">{lang === 'ar' ? 'لم تتم إضافة عناصر بعد.' : 'No items added yet.'}</div>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.nameEn} className="cart-preview-item">
                      <span>{item.qty}× {lang === 'ar' ? item.nameAr : item.nameEn}</span>
                      <span>{item.price * item.qty} EGP</span>
                    </div>
                  ))}
                  <div className="cart-preview-total">
                    <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
                    <span>{cartTotal} EGP</span>
                  </div>
                </>
              )}
            </div>
            <a href="#menu" className="open-menu-link">{lang === 'ar' ? '+ تصفح المنيو لإضافة عناصر' : '+ Browse menu to add items'}</a>
          </div>

          <div className="form-group">
            <label>{lang === 'ar' ? 'طلبات خاصة' : 'Special Requests'}</label>
            <textarea name="notes" onChange={handleChange} rows={2} placeholder={lang === 'ar' ? 'حساسية، تفضيلات، طلبات خاصة…' : 'Shisha flavour, table preference, allergies…'}></textarea>
          </div>
          <button className="form-submit" onClick={submitBooking}>
            📲 {lang === 'ar' ? 'تأكيد عبر واتساب' : 'Confirm via WhatsApp'}
          </button>
        </div>
      </div>
    </section>
  );
}
