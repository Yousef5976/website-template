import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Experience from './components/Experience';
import Shisha from './components/Shisha';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Preloader from './components/Preloader';
import BottomNav from './components/BottomNav';
import { type CartItem } from './types';

export default function CustomerApp() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.className = `lang-${lang}`;
  }, [lang]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -25px 0px' });

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const addToCart = (nameEn: string, nameAr: string, price: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.nameEn === nameEn);
      if (existing) {
        return prev.map(item => 
          item.nameEn === nameEn ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { nameEn, nameAr, price, qty: 1 }];
    });
  };

  const updateQty = (nameEn: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.nameEn === nameEn) {
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      <Preloader />
      
      <Navbar lang={lang} toggleLang={toggleLang} />
      
      <div 
        className="cart-float" 
        onClick={() => setIsCartOpen(true)} 
        title="View Order"
      >
        🛒
        <div className={`cart-count ${cartCount > 0 ? 'show' : ''}`}>{cartCount}</div>
      </div>
      
      <a href="https://wa.me/201098175000" className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <div className="wa-pulse"></div>💬
      </a>
      
      <BottomNav lang={lang} onOpenCart={() => setIsCartOpen(true)} />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        updateQty={updateQty} 
        clearCart={clearCart} 
        lang={lang} 
      />

      <Hero lang={lang} />
      <About lang={lang} />
      <Menu lang={lang} addToCart={addToCart} />
      <Experience lang={lang} />
      <Shisha lang={lang} />
      <Contact lang={lang} cart={cart} />
      <Footer lang={lang} />
    </>
  );
}
