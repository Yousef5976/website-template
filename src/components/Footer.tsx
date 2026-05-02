import React from 'react';

export default function Footer({ lang }: { lang: string }) {
  return (
    <footer>
      <div className="ft-logo">5 DOOR ROOF</div>
      <div className="ft-socials">
        <a href="https://www.facebook.com/5doorroof/" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://wa.me/201098175000" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href="https://maps.app.goo.gl/yu4nxNVkmoh6xWzY8" target="_blank" rel="noopener noreferrer">Google Maps</a>
      </div>
      <div className="ft-copy">
        &copy; {new Date().getFullYear()} 5 Door Roof. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
      </div>
    </footer>
  );
}
