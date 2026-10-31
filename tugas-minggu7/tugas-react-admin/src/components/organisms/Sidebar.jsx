import { NavLink, useNavigate } from "react-router-dom";
import { confirmLogout } from "../../utils/helpers/SwalHelpers";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    confirmLogout(() => {
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    });
  };

  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-6 text-center border-b border-gray-700 pb-4">
          Admin Panel
        </h1>
        <nav className="space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition-colors ${
                isActive ? "bg-blue-600 text-white font-semibold" : "hover:bg-slate-700 text-gray-300"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/mahasiswa"
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition-colors ${
                isActive ? "bg-blue-600 text-white font-semibold" : "hover:bg-slate-700 text-gray-300"
              }`
            }
          >
            Data Mahasiswa
          </NavLink>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors"
      >
        Logout
      </button>
    </aside>
  );
}