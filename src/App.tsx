import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import CustomerApp from './CustomerApp';

// We'll create AdminPortal shortly
import AdminPortal from './components/admin/AdminPortal';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CustomerApp />} />
        <Route path="/admin/*" element={<AdminPortal />} />
      </Routes>
    </HashRouter>
  );
}
