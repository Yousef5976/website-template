import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, KeySquare, LogOut, Check, X, Clock, Settings, User } from 'lucide-react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, db, signInWithPopup, googleProvider, signOut } from '../../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';

export default function AdminPortal() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return <div className="admin-loading">Loading...</div>;

  if (!user) {
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-box">
          <h2>🔒 Admin Portal</h2>
          <p>Sign in to manage reservations and tables.</p>
          <button className="btn-gold" onClick={() => signInWithPopup(auth, googleProvider)}>
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  // Assuming all Google users can access or just rely on Firebase rules blocking reads
  // I setup rules so that only users in `users` can read/writes (and yousefg924@gmail.com).

  return (
    <div className="admin-layout">
      <AdminSidebar onSignOut={() => signOut(auth)} />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Navigate to="reservations" />} />
          <Route path="reservations" element={<ReservationsView />} />
          <Route path="tables" element={<TablesView />} />
          <Route path="revenue" element={<RevenueView />} />
        </Routes>
      </div>
    </div>
  );
}

function AdminSidebar({ onSignOut }: { onSignOut: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="admin-sidebar">
      <div className="asb-brand">5 DOOR <span>ADMIN</span></div>
      <nav className="asb-nav">
        <button onClick={() => navigate('reservations')}><CalendarDays size={18} /> Reservations</button>
        <button onClick={() => navigate('tables')}><KeySquare size={18} /> Tables Setup</button>
        <button onClick={() => navigate('revenue')}><LayoutDashboard size={18} /> Dashboard</button>
      </nav>
      <div className="asb-bottom">
        <button onClick={onSignOut} className="asb-logout"><LogOut size={18} /> Sign Out</button>
      </div>
    </div>
  );
}

function ReservationsView() {
  const [resList, setResList] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    const q1 = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
    const u1 = onSnapshot(q1, snap => {
      setResList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const q2 = query(collection(db, 'tables'), orderBy('createdAt', 'asc'));
    const u2 = onSnapshot(q2, snap => {
      setTables(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => { u1(); u2(); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, 'reservations', id), { status });
  };

  const assignTable = async (id: string, tableId: string) => {
    await updateDoc(doc(db, 'reservations', id), { tableId });
  };

  // Check if a table is booked for the given date (simple check: any pending/successful reservation has it on that date)
  const getAvailableTables = (date: string) => {
    const bookedTableIdsForDate = resList.filter(r => 
      r.date === date && 
      (r.status === 'pending' || r.status === 'successful') && 
      r.tableId
    ).map(r => r.tableId);
    
    return tables.map(t => ({
      ...t,
      isBooked: bookedTableIdsForDate.includes(t.id)
    }));
  };

  return (
    <div className="adm-view">
      <div className="adm-header">
        <h2>Reservations</h2>
      </div>
      <div className="adm-res-list">
        {resList.map(r => (
          <div key={r.id} className={`adm-res-card status-${r.status}`}>
            <div className="adm-res-top">
              <div>
                <div className="res-name">{r.name || 'No Name'}</div>
                <div className="res-meta">{r.phone} · {r.guests} guests · {r.occasion}</div>
              </div>
              <div className="res-badge">{r.status.toUpperCase()}</div>
            </div>
            
            <div className="res-mid">
              <div className="res-time">
                <CalendarDays size={16}/> {r.date} <Clock size={16}/> {r.time}
              </div>
              <div className="res-table">
                Assign Table:
                <select 
                  value={r.tableId || ''} 
                  onChange={(e) => assignTable(r.id, e.target.value)}
                  disabled={r.status === 'done' || r.status === 'unsuccessful'}
                >
                  <option value="">- Not Assigned -</option>
                  {getAvailableTables(r.date).map(t => (
                    <option key={t.id} value={t.id} disabled={t.isBooked && t.id !== r.tableId}>
                      {t.name} {t.isBooked && t.id !== r.tableId ? '(Booked)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {r.cart && r.cart.length > 0 && (
              <div className="res-cart-preview">
                <strong>Pre-Order:</strong> {r.cart.map((c:any) => `${c.qty}x ${c.nameEn}`).join(', ')} <br/>
                <strong style={{color:'var(--gold)'}}>Total: {r.total} EGP</strong>
              </div>
            )}
            
            {r.notes && <div className="res-notes"><strong>Notes:</strong> {r.notes}</div>}

            <div className="res-actions">
              {r.status === 'pending' && (
                <>
                  <button onClick={() => updateStatus(r.id, 'successful')} className="btn-ok"><Check size={16}/> Accept</button>
                  <button onClick={() => updateStatus(r.id, 'unsuccessful')} className="btn-no"><X size={16}/> Reject</button>
                </>
              )}
              {r.status === 'successful' && (
                <button onClick={() => updateStatus(r.id, 'done')} className="btn-done"><Check size={16}/> Mark as Done & Left</button>
              )}
              {(r.status === 'done' || r.status === 'unsuccessful') && (
                <span className="res-archived-lbl">Archived</span>
              )}
            </div>
          </div>
        ))}
        {resList.length === 0 && <p>No reservations found.</p>}
      </div>
    </div>
  );
}

function TablesView() {
  const [tables, setTables] = useState<any[]>([]);
  const [tbName, setTbName] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'tables'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, snap => {
      setTables(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const addTable = async () => {
    if (!tbName.trim()) return;
    await addDoc(collection(db, 'tables'), {
      name: tbName.trim(),
      createdAt: serverTimestamp()
    });
    setTbName('');
  };

  const removeTable = async (id: string) => {
    if (window.confirm('Delete this table?')) {
      await deleteDoc(doc(db, 'tables', id));
    }
  };

  return (
    <div className="adm-view">
      <div className="adm-header">
        <h2>Manage Tables</h2>
      </div>
      <div className="adm-add-tb">
        <input 
          placeholder="Table name (e.g. T1, Rooftop-A)" 
          value={tbName} 
          onChange={e => setTbName(e.target.value)} 
        />
        <button className="btn-gold" onClick={addTable}>Add Table</button>
      </div>
      <div className="adm-tb-list">
        {tables.map(t => (
          <div key={t.id} className="adm-tb-card">
            <span>{t.name}</span>
            <button onClick={() => removeTable(t.id)}><X size={16} color="red"/></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueView() {
  const [resList, setResList] = useState<any[]>([]);

  useEffect(() => {
    const q1 = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q1, snap => {
      setResList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const doneRes = resList.filter(r => r.status === 'done');
  const sum = doneRes.reduce((acc, r) => acc + (Number(r.total) || 0), 0);

  return (
    <div className="adm-view">
      <div className="adm-header">
        <h2>Dashboard</h2>
      </div>
      <div className="dashboard-grid">
        <div className="dash-card">
          <div className="dash-title">Total Revenue</div>
          <div className="dash-val">{sum.toLocaleString()} EGP</div>
        </div>
        <div className="dash-card">
          <div className="dash-title">Completed Orders</div>
          <div className="dash-val">{doneRes.length}</div>
        </div>
      </div>
    </div>
  );
}
