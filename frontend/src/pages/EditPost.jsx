import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/api.js';
import { useToast } from '../Toast.jsx';
import { ArrowLeft, Save, X, Plus } from 'lucide-react';

const CATEGORIES = ['General', 'Technology', 'Design', 'Business', 'Lifestyle', 'Tutorial', 'News', 'Opinion'];

export default function PostEditorPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({ title: '', content: '', category: 'General', tags: [] });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    api.getAllBlogs()
      .then(blogs => {
        const blog = blogs.find(b => b._id === id);
        if (blog) setForm({ title: blog.title, content: blog.content, category: blog.category || 'General', tags: blog.tags || [] });
        else toast('Post not found', 'error');
      })
      .catch(() => toast('Failed to load post', 'error'))
      .finally(() => setFetching(false));
  }, [id]);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t)) setForm(p => ({ ...p, tags: [...p.tags, t] }));
    setTagInput('');
  };

  const removeTag = (t) => setForm(p => ({ ...p, tags: p.tags.filter(x => x !== t) }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return toast('Title and content are required', 'error');
    setLoading(true);
    try {
      if (isEdit) {
        await api.updateBlog(id, form);
        toast('Post updated', 'success');
      } else {
        await api.createBlog(form);
        toast('Post created!', 'success');
      }
      navigate('/posts');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div style={{ padding: 40, color: '#888780', fontSize: 13 }}>Loading post…</div>
  );

  return (
    <div style={{ padding: '28px 28px', maxWidth: 740 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button onClick={() => navigate('/posts')}
          style={{ background: 'white', border: '0.5px solid #D3D1C7', color: '#888780', padding: '6px 8px', borderRadius: 8, cursor: 'pointer', display: 'flex' }}>
          <ArrowLeft size={14} />
        </button>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: '#26215C', margin: 0 }}>
            {isEdit ? 'Edit post' : 'New post'}
          </h1>
          <p style={{ color: '#888780', fontSize: 12, marginTop: 2 }}>
            {isEdit ? 'Update your post content' : 'Create a new blog post'}
          </p>
        </div>
      </div>

      <form onSubmit={submit}>
        <div style={{ background: 'white', borderRadius: 12, border: '0.5px solid #D3D1C7', padding: '24px', marginBottom: 16 }}>

          {/* Title */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#5F5E5A', marginBottom: 6 }}>
              Post title *
            </label>
            <input
              placeholder="An interesting title…"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              style={{ fontSize: 15, fontWeight: 500 }}
            />
          </div>

          {/* Category */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#5F5E5A', marginBottom: 6 }}>
              Category
            </label>
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#5F5E5A', marginBottom: 6 }}>
              Tags
            </label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
              {form.tags.map(t => (
                <span key={t} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: '#EEEDFE', color: '#534AB7',
                  padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500,
                }}>
                  {t}
                  <button type="button" onClick={() => removeTag(t)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7F77DD', padding: 0, display: 'flex' }}>
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                placeholder="Add a tag…"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); }}}
                style={{ flex: 1 }}
              />
              <button type="button" onClick={addTag}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: '#EEEDFE', color: '#534AB7', border: '0.5px solid #AFA9EC',
                  padding: '7px 12px', borderRadius: 8, fontSize: 12, cursor: 'pointer', flexShrink: 0,
                }}>
                <Plus size={12} /> Add
              </button>
            </div>
          </div>

          {/* Content */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#5F5E5A', marginBottom: 6 }}>
              Content *
            </label>
            <textarea
              placeholder="Write your blog post here…"
              value={form.content}
              onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
              rows={14}
              style={{ resize: 'vertical', lineHeight: 1.7 }}
            />
            <div style={{ fontSize: 11, color: '#b4b2a9', marginTop: 4, textAlign: 'right' }}>
              {form.content.length} characters · ~{Math.ceil(form.content.split(' ').length / 200)} min read
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button type="button" onClick={() => navigate('/posts')}
            style={{ background: 'white', border: '0.5px solid #D3D1C7', color: '#888780', padding: '9px 18px', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="submit" disabled={loading}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: loading ? '#AFA9EC' : '#534AB7',
              color: 'white', padding: '9px 20px', borderRadius: 8,
              fontSize: 13, fontWeight: 500, border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}>
            <Save size={13} /> {loading ? 'Saving…' : isEdit ? 'Update post' : 'Publish post'}
          </button>
        </div>
      </form>
    </div>
  );
}