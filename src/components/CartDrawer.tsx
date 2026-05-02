import React from 'react';
import { type CartItem } from '../types';

export default function CartDrawer({
  isOpen, onClose, cart, updateQty, clearCart, lang
}: {
  isOpen: boolean, onClose: () => void, cart: CartItem[], 
  updateQty: (en: string, delta: number) => void, clearCart: () => void, lang: string
}) {
  const total = cart.reduce((acc, c) => acc + c.price * c.qty, 0);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="cart-title">{lang === 'ar' ? 'طلبك' : 'Your Order'}</div>
          <button className="cart-close" onClick={onClose}>×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">{lang === 'ar' ? 'عربتك فارغة' : 'Your cart is empty'}</div>
          ) : (
            cart.map(item => (
              <div key={item.nameEn} className="cart-item">
                <div className="cart-item-name">{lang === 'ar' ? item.nameAr : item.nameEn}</div>
                <div className="cart-item-controls">
                  <span className="cart-item-price">{item.price * item.qty} EGP</span>
                  <button className="qty-btn" onClick={() => updateQty(item.nameEn, -1)}>-</button>
                  <span className="qty-val">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.nameEn, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>{lang === 'ar' ? 'الإجمالي' : 'Total'}</span>
              <span>{total} EGP</span>
            </div>
            <div className="cart-actions">
              <button className="cart-btn clear" onClick={clearCart}>{lang === 'ar' ? 'تفريغ' : 'Clear'}</button>
              <button className="cart-btn book" onClick={() => {
                onClose();
                window.location.hash = '#contact';
              }}>{lang === 'ar' ? 'متابعة الحجز' : 'Proceed to Booking'}</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
