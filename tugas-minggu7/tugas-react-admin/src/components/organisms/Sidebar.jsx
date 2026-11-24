import { NavLink, useNavigate } from "react-router-dom";
import { confirmLogout } from "../../utils/helpers/SwalHelpers";
import { useAuthStateContext } from "../../utils/contexts/AuthContext";

export default function Sidebar() {
  const { user, setUser } = useAuthStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    confirmLogout(() => {
      setUser(null);
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    });
  };

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition-colors ${
      isActive ? "bg-blue-600 text-white font-semibold" : "hover:bg-slate-700 text-gray-300"
    }`;

  const permissions = user?.permission || [];

  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="mb-6 text-center border-b border-gray-700 pb-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-xs text-blue-300 mt-1">
            {user?.name} • <span className="uppercase font-semibold">{user?.role}</span>
          </p>
        </div>

        <nav className="space-y-2">
          {permissions.includes("dashboard.page") && (
            <NavLink to="/admin/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
          {permissions.includes("mahasiswa.page") && (
            <NavLink to="/admin/mahasiswa" className={navLinkClass}>
              Data Mahasiswa
            </NavLink>
          )}
          {permissions.includes("dosen.page") && (
            <NavLink to="/admin/dosen" className={navLinkClass}>
              Data Dosen
            </NavLink>
          )}
          {permissions.includes("matakuliah.page") && (
            <NavLink to="/admin/matakuliah" className={navLinkClass}>
              Data Mata Kuliah
            </NavLink>
          )}
          {permissions.includes("user.page") && (
            <NavLink to="/admin/users" className={navLinkClass}>
              Manajemen User
            </NavLink>
          )}
          {permissions.includes("kelas.page") && (
            <NavLink to="/admin/kelas" className={navLinkClass}>
              Data Kelas
            </NavLink>
          )}
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