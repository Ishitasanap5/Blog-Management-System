import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../Toast.jsx';
import { BookOpen } from 'lucide-react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast('Password must be at least 6 characters', 'error');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast('Account created!', 'success');
      navigate('/dashboard');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, type = 'text', placeholder) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#5F5E5A', marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type} required placeholder={placeholder}
        value={form[key]}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
      />
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh', background: '#F1EFE8',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: 400, padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 48, height: 48, borderRadius: 12, background: '#26215C', marginBottom: 12,
          }}>
            <BookOpen size={22} color="#7F77DD" />
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 600, color: '#26215C', margin: 0 }}>
            Create account
          </h1>
          <p style={{ color: '#888780', fontSize: 13, marginTop: 4 }}>Start managing your blog</p>
        </div>

        <form onSubmit={submit} style={{
          background: 'white', borderRadius: 14, border: '0.5px solid #D3D1C7', padding: '28px 28px',
        }}>
          {field('name', 'Full name', 'text', 'Your name')}
          {field('email', 'Email address', 'email', 'you@example.com')}
          {field('password', 'Password', 'password', 'Min. 6 characters')}

          <button type="submit" disabled={loading}
            style={{
              width: '100%', marginTop: 6,
              background: loading ? '#AFA9EC' : '#534AB7',
              color: 'white', padding: '10px', borderRadius: 8,
              fontSize: 14, fontWeight: 500, border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#888780', marginTop: 16 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#534AB7', textDecoration: 'none', fontWeight: 500 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}