import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';

// Context
import { AuthProvider, AuthContext } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';

// A small helper for routes that require login
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="flex justify-center mt-20 font-bold">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          {/* Navbar is outside Routes so it stays visible on every page */}
          <Navbar />

          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes (Must be logged in) */}
              <Route 
                path="/create" 
                element={
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/edit/:id" 
                element={
                  <PrivateRoute>
                    <EditPost />
                  </PrivateRoute>
                } 
              />

              {/* Catch-all: Redirect unknown paths to Home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          <footer className="py-10 text-center text-gray-400 text-sm">
            © 2026 BlogHub Management System. Built with MERN Stack.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;