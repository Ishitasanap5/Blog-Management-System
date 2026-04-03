import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  LayoutDashboard, FileText, PenSquare, Tag, Palette,
  Settings, LogOut, BookOpen
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'All Posts', icon: FileText, path: '/posts' },
  { label: 'New Post', icon: PenSquare, path: '/posts/new' },
  { label: 'Categories', icon: Tag, path: '/categories' },
  { label: 'Theme', icon: Palette, path: '/theme' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return (
    <aside style={{
      width: 210, background: '#26215C', display: 'flex',
      flexDirection: 'column', flexShrink: 0, height: '100vh',
      position: 'sticky', top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={18} color="#7F77DD" />
          <span style={{ color: '#CECBF6', fontSize: 16, fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
            Inkwell
          </span>
        </div>
        <div style={{ color: '#534AB7', fontSize: 11, marginTop: 3 }}>Blog management</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '14px 0', overflowY: 'auto' }}>
        <div style={{ color: '#534AB7', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 18px 6px' }}>
          Content
        </div>
        {navItems.slice(0, 3).map(({ label, icon: Icon, path }) => {
          const active = pathname === path || (path !== '/dashboard' && pathname.startsWith(path));
          return (
            <button key={path} onClick={() => navigate(path)}
              style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: active ? '8px 18px 8px 16px' : '8px 18px',
                width: '100%', background: active ? 'rgba(127,119,221,0.15)' : 'transparent',
                color: active ? '#EEEDFE' : '#AFA9EC', fontSize: 13,
                borderLeft: active ? '2px solid #7F77DD' : '2px solid transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
              }}
            >
              <Icon size={14} /> {label}
            </button>
          );
        })}

        <div style={{ color: '#534AB7', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '12px 18px 6px' }}>
          Site
        </div>
        {navItems.slice(3).map(({ label, icon: Icon, path }) => {
          const active = pathname === path;
          return (
            <button key={path} onClick={() => navigate(path)}
              style={{
                display: 'flex', alignItems: 'center', gap: 9,
                padding: active ? '8px 18px 8px 16px' : '8px 18px',
                width: '100%', background: active ? 'rgba(127,119,221,0.15)' : 'transparent',
                color: active ? '#EEEDFE' : '#AFA9EC', fontSize: 13,
                borderLeft: active ? '2px solid #7F77DD' : '2px solid transparent',
                border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
              }}
            >
              <Icon size={14} /> {label}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '12px 16px', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', background: '#534AB7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 500, color: '#EEEDFE', flexShrink: 0,
          }}>{initials}</div>
          <div>
            <div style={{ color: '#EEEDFE', fontSize: 12, fontWeight: 500 }}>{user?.name || 'User'}</div>
            <div style={{ color: '#7F77DD', fontSize: 10 }}>{user?.email || ''}</div>
          </div>
        </div>
        <button onClick={logout}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            color: '#AFA9EC', fontSize: 12, background: 'transparent',
            border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          <LogOut size={13} /> Sign out
        </button>
      </div>
    </aside>
  );
}