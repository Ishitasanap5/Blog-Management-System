import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/api.js';
import { FileText, Eye, TrendingUp, PenSquare, Clock, ArrowRight } from 'lucide-react';

const StatCard = ({ label, value, sub, color }) => (
  <div style={{
    background: 'white', borderRadius: 12, border: '0.5px solid #D3D1C7',
    padding: '16px 18px',
  }}>
    <div style={{ fontSize: 11, color: '#888780', marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 24, fontWeight: 500, color: '#2C2C2A' }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: color || '#1D9E75', marginTop: 4 }}>{sub}</div>}
  </div>
);

const Badge = ({ status }) => {
  const map = {
    published: { bg: '#E1F5EE', color: '#085041', label: 'Published' },
    draft: { bg: '#FAEEDA', color: '#633806', label: 'Draft' },
  };
  const s = map[status] || map.published;
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 500,
    }}>{s.label}</span>
  );
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.getAllBlogs().then(setBlogs).catch(() => {});
  }, []);

  const myBlogs = blogs.filter(b => b.author?._id === user?.id || b.author?.email === user?.email);
  const recent = [...blogs].slice(0, 5);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ padding: '28px 28px', maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 600, color: '#26215C', margin: 0 }}>
          {greeting}, {user?.name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p style={{ color: '#888780', fontSize: 13, marginTop: 4 }}>
          Here's what's happening with your blog today.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
        <StatCard label="Total posts" value={blogs.length} sub={`${myBlogs.length} yours`} />
        <StatCard label="Categories" value={[...new Set(blogs.map(b => b.category))].length} sub="across all posts" />
        <StatCard label="Authors" value={[...new Set(blogs.map(b => b.author?.name))].filter(Boolean).length} sub="contributors" color="#534AB7" />
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
        <button onClick={() => navigate('/posts/new')}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: '#534AB7', color: 'white', padding: '9px 16px',
            borderRadius: 8, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer',
          }}>
          <PenSquare size={14} /> Write new post
        </button>
        <button onClick={() => navigate('/posts')}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'white', color: '#2C2C2A', padding: '9px 16px',
            borderRadius: 8, fontSize: 13, border: '0.5px solid #D3D1C7', cursor: 'pointer',
          }}>
          <FileText size={14} /> Manage posts
        </button>
      </div>

      {/* Recent posts */}
      <div style={{ background: 'white', borderRadius: 12, border: '0.5px solid #D3D1C7' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px', borderBottom: '0.5px solid #E8E6DF',
        }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#2C2C2A' }}>Recent posts</span>
          <button onClick={() => navigate('/posts')}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              color: '#534AB7', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer',
            }}>
            View all <ArrowRight size={12} />
          </button>
        </div>

        {recent.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#888780', fontSize: 13 }}>
            No posts yet. <button onClick={() => navigate('/posts/new')} style={{ color: '#534AB7', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>Write your first one →</button>
          </div>
        ) : recent.map((blog, i) => (
          <div key={blog._id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 18px',
            borderBottom: i < recent.length - 1 ? '0.5px solid #F1EFE8' : 'none',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: ['#EEEDFE','#E1F5EE','#FAEEDA','#E6F1FB','#FBEAF0'][i % 5],
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#2C2C2A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {blog.title}
              </div>
              <div style={{ fontSize: 11, color: '#888780', marginTop: 2 }}>
                {blog.author?.name} · {blog.category}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <Badge status="published" />
              <button onClick={() => navigate(`/posts/edit/${blog._id}`)}
                style={{ color: '#888780', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <PenSquare size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}