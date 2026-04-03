import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/api.js';
import { useToast } from '../Toast.jsx';
import { User, Mail, Shield, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (user) setForm({ name: user.name || '', email: user.email || '' });
  }, [user]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.updateProfile(form);
      toast('Profile updated', 'success');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return (
    <div style={{ padding: '28px 28px', maxWidth: 560 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: '#26215C', margin: 0 }}>
          Settings
        </h1>
        <p style={{ color: '#888780', fontSize: 12, marginTop: 3 }}>Manage your account profile</p>
      </div>

      {/* Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '18px 20px', background: 'white', borderRadius: 12, border: '0.5px solid #D3D1C7' }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%', background: '#26215C',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 500, color: '#CECBF6',
        }}>{initials}</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#2C2C2A' }}>{user?.name}</div>
          <div style={{ fontSize: 12, color: '#888780' }}>{user?.email}</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4, background: '#EEEDFE', color: '#534AB7', padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 500 }}>
            <Shield size={9} /> User account
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={submit} style={{ background: 'white', borderRadius: 12, border: '0.5px solid #D3D1C7', padding: '22px 22px' }}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 500, color: '#5F5E5A', marginBottom: 6 }}>
            <User size={12} /> Full name
          </label>
          <input
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            placeholder="Your name"
          />
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 500, color: '#5F5E5A', marginBottom: 6 }}>
            <Mail size={12} /> Email address
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            placeholder="you@example.com"
          />
        </div>
        <button type="submit" disabled={loading}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: loading ? '#AFA9EC' : '#534AB7',
            color: 'white', padding: '9px 18px', borderRadius: 8,
            fontSize: 13, fontWeight: 500, border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
          <Save size={13} /> {loading ? 'Saving…' : 'Save changes'}
        </button>
      </form>

      {/* Info */}
      <div style={{ marginTop: 16, padding: '14px 18px', background: '#EEEDFE', borderRadius: 10, border: '0.5px solid #AFA9EC' }}>
        <div style={{ fontSize: 12, color: '#534AB7', fontWeight: 500, marginBottom: 4 }}>Account info</div>
        <div style={{ fontSize: 11, color: '#7F77DD' }}>Password changes are not supported via the profile page. Contact your admin to reset credentials.</div>
      </div>
    </div>
  );
}