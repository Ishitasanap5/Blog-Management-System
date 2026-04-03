import { useState, useCallback } from 'react';

let toastFn = null;

export const useToast = () => {
  const show = useCallback((msg, type = 'success') => {
    if (toastFn) toastFn(msg, type);
  }, []);
  return show;
};

export const ToastContainer = () => {
  const [toast, setToast] = useState(null);

  toastFn = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (!toast) return null;

  const colors = {
    success: { bg: '#E1F5EE', color: '#085041', border: '#9FE1CB' },
    error: { bg: '#FCEBEB', color: '#501313', border: '#F7C1C1' },
    info: { bg: '#E6F1FB', color: '#042C53', border: '#B5D4F4' },
  };
  const c = colors[toast.type] || colors.success;

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      padding: '12px 20px', borderRadius: 10, fontSize: 13, fontWeight: 500,
      background: c.bg, color: c.color, border: `0.5px solid ${c.border}`,
      animation: 'slideUp 0.25s ease',
    }}>
      {toast.msg}
      <style>{`@keyframes slideUp{from{transform:translateY(12px);opacity:0}to{transform:none;opacity:1}}`}</style>
    </div>
  );
};