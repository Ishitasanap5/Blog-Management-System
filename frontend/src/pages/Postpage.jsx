import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/api.js';
import { useToast } from '../Toast.jsx';
import { PenSquare, Trash2, Plus, Search, RefreshCw } from 'lucide-react';

const Badge = ({ text, type }) => {
  const styles = {
    published: { bg: '#E1F5EE', color: '#085041' },
    draft: { bg: '#FAEEDA', color: '#633806' },
    featured: { bg: '#FBEAF0', color: '#72243E' },
  };
  const s = styles[type] || styles.published;
  return (
    <span style={{ background: s.bg, color: s.color, padding: '2px 9px', borderRadius: 20, fontSize: 10, fontWeight: 500 }}>
      {text}
    </span>
  );
};

export default function PostsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleting, setDeleting] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const load = () => {
    setLoading(true);
    api.getAllBlogs()
      .then(setBlogs)
      .catch(() => toast('Failed to load posts', 'error'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (blog) => {
    if (!confirm(`Delete "${blog.title}"?`)) return;
    setDeleting(blog._id);
    try {
      await api.deleteBlog(blog._id);
      toast('Post deleted', 'success');
      setBlogs(prev => prev.filter(b => b._id !== blog._id));
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setDeleting(null);
    }
  };

  const isOwner = (blog) =>
    blog.author?._id === user?.id || blog.author?.email === user?.email;

  const filtered = blogs.filter(b => {
    if (filter === 'mine' && !isOwner(b)) return false;
    if (search && !b.title.toLowerCase().includes(search.toLowerCase()) &&
        !b.category.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const chips = [
    { key: 'all', label: `All (${blogs.length})` },
    { key: 'mine', label: `Mine (${blogs.filter(b => isOwner(b)).length})` },
  ];

  const colors = ['#EEEDFE','#E1F5EE','#FAEEDA','#E6F1FB','#FBEAF0','#EAF3DE'];

  return (
    <div style={{ padding: '28px 28px', maxWidth: 900 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: '#26215C', margin: 0 }}>
            All posts
          </h1>
          <p style={{ color: '#888780', fontSize: 12, marginTop: 3 }}>
            {filtered.length} post{filtered.length !== 1 ? 's' : ''} shown
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={load}
            style={{ background: 'white', border: '0.5px solid #D3D1C7', color: '#888780', padding: '7px 10px', borderRadius: 8, cursor: 'pointer' }}>
            <RefreshCw size={13} />
          </button>
          <button onClick={() => navigate('/posts/new')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#534AB7', color: 'white', padding: '8px 14px',
              borderRadius: 8, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer',
            }}>
            <Plus size={14} /> New post
          </button>
        </div>
      </div>

      {/* Filter + Search */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
        {chips.map(c => (
          <button key={c.key} onClick={() => setFilter(c.key)}
            style={{
              padding: '5px 13px', borderRadius: 20, fontSize: 12, cursor: 'pointer', border: 'none',
              background: filter === c.key ? '#EEEDFE' : 'white',
              color: filter === c.key ? '#534AB7' : '#888780',
              border: filter === c.key ? '0.5px solid #AFA9EC' : '0.5px solid #D3D1C7',
            }}>
            {c.label}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <Search size={13} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#888780' }} />
          <input
            placeholder="Search posts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 30, width: 180, fontSize: 12 }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 12, border: '0.5px solid #D3D1C7', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#888780', fontSize: 13 }}>Loading posts…</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#888780', fontSize: 13 }}>
            No posts found.{' '}
            <button onClick={() => navigate('/posts/new')} style={{ color: '#534AB7', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>
              Create one →
            </button>
          </div>
        ) : filtered.map((blog, i) => (
          <div key={blog._id} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 18px',
            borderBottom: i < filtered.length - 1 ? '0.5px solid #F1EFE8' : 'none',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 8, flexShrink: 0,
              background: colors[i % colors.length],
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#2C2C2A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {blog.title}
              </div>
              <div style={{ fontSize: 11, color: '#888780', marginTop: 2 }}>
                {blog.author?.name} · {blog.category} · {new Date(blog.createdAt).toLocaleDateString()}
                {blog.tags?.length > 0 && ` · ${blog.tags.slice(0,2).join(', ')}`}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <Badge text="Published" type="published" />
              {isOwner(blog) && (
                <>
                  <button onClick={() => navigate(`/posts/edit/${blog._id}`)}
                    style={{ width: 28, height: 28, border: '0.5px solid #D3D1C7', borderRadius: 7, background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888780' }}>
                    <PenSquare size={12} />
                  </button>
                  <button onClick={() => handleDelete(blog)} disabled={deleting === blog._id}
                    style={{ width: 28, height: 28, border: '0.5px solid #F7C1C1', borderRadius: 7, background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E24B4A' }}>
                    <Trash2 size={12} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}