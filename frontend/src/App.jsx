// App.jsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import { ToastContainer } from '../src/Toast.jsx'
import LandingPage from '../src/pages/Landing.jsx'
import Sidebar from '../src/components/Sidebar.jsx'
import LoginPage from '../src/pages/Loginpage.jsx'
import RegisterPage from '../src/pages/Register.jsx'
import DashboardPage from '../src/pages/Dashboard.jsx'
import PostsPage from '../src/pages/Postpage.jsx'
import PostEditorPage from '../src/pages/EditPost.jsx'
import SettingsPage from '../src/pages/Settingspage.jsx'
import { ThemePage, CategoriesPage } from '../src/pages/Miscpages .jsx'

const Layout = () => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 overflow-y-auto bg-stone-100">
      <Outlet />
    </main>
  </div>
)

const ProtectedLayout = () => {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span style={{ color: '#888780', fontSize: 13 }}>Loading…</span>
    </div>
  )
  return user ? <Layout /> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected — ProtectedLayout renders <Layout /> which renders <Outlet /> */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/new" element={<PostEditorPage />} />
          <Route path="/posts/edit/:id" element={<PostEditorPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </>
  )
}