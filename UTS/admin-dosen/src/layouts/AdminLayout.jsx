import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { APP_TITLE, THEME } from '@/utils/config';

export function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header / Navbar */}
      <header className={`${THEME.bg} text-white shadow-md px-8 py-3 flex items-center justify-between`}>
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold tracking-wide">{APP_TITLE}</h1>
          <nav className="flex space-x-2">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-md font-medium text-sm transition ${
                  isActive ? 'bg-black/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/dosen"
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-md font-medium text-sm transition ${
                  isActive ? 'bg-black/20 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              Dosen
            </NavLink>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm transition"
        >
          Logout
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-500">
        © 2026 {APP_TITLE}
      </footer>
    </div>
  );
}