import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../api/api.js';

export function ThemePage() {
  const palettes = [
    { name: 'Violet (default)', primary: '#534AB7', bg: '#F1EFE8', active: true },
    { name: 'Ocean', primary: '#185FA5', bg: '#EEF4FB', active: false },
    { name: 'Forest', primary: '#3B6D11', bg: '#F0F5EA', active: false },
    { name: 'Ember', primary: '#854F0B', bg: '#FAF3EA', active: false },
  ];

  return (
    <div style={{ padding: '28px 28px', maxWidth: 600 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: '#26215C', margin: 0 }}>
          Theme
        </h1>
        <p style={{ color: '#888780', fontSize: 12, marginTop: 3 }}>Customize your blog's appearance</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
        {palettes.map(p => (
          <div key={p.name} style={{
            background: 'white', borderRadius: 12,
            border: p.active ? '1.5px solid #7F77DD' : '0.5px solid #D3D1C7',
            padding: '16px', cursor: 'pointer', position: 'relative',
          }}>
            {p.active && (
              <div style={{ position: 'absolute', top: 10, right: 10, background: '#EEEDFE', color: '#534AB7', fontSize: 9, fontWeight: 500, padding: '2px 7px', borderRadius: 20 }}>
                Active
              </div>
            )}
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: p.primary }} />
              <div style={{ width: 24, height: 24, borderRadius: 6, background: p.bg }} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#2C2C2A' }}>{p.name}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 18px', background: '#FAEEDA', borderRadius: 10, border: '0.5px solid #FAC775' }}>
        <div style={{ fontSize: 12, color: '#854F0B', fontWeight: 500 }}>Theme switching</div>
        <div style={{ fontSize: 11, color: '#BA7517', marginTop: 3 }}>Theme customization connects to your frontend rendering layer — update your CSS variables in index.css to apply changes.</div>
      </div>
    </div>
  );
}

export function CategoriesPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => { api.getAllBlogs().then(setBlogs).catch(() => {}); }, []);

  const cats = blogs.reduce((acc, b) => {
    const c = b.category || 'General';
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});

  const colors = ['#EEEDFE','#E1F5EE','#FAEEDA','#E6F1FB','#FBEAF0','#EAF3DE'];

  return (
    <div style={{ padding: '28px 28px', maxWidth: 560 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: '#26215C', margin: 0 }}>
          Categories
        </h1>
        <p style={{ color: '#888780', fontSize: 12, marginTop: 3 }}>Browse posts by category</p>
      </div>

      <div style={{ background: 'white', borderRadius: 12, border: '0.5px solid #D3D1C7', overflow: 'hidden' }}>
        {Object.keys(cats).length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', color: '#888780', fontSize: 13 }}>No categories yet.</div>
        ) : Object.entries(cats).map(([name, count], i) => (
          <div key={name} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '13px 18px',
            borderBottom: i < Object.keys(cats).length - 1 ? '0.5px solid #F1EFE8' : 'none',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: colors[i % colors.length], flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: '#2C2C2A' }}>{name}</div>
            <div style={{ fontSize: 11, color: '#888780' }}>{count} post{count !== 1 ? 's' : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}