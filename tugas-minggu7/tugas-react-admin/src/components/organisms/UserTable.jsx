export default function UserTable({ users, onEditRole, onDelete, canUpdate, canDelete }) {
  const roleBadgeColor = (role) => {
    if (role === "admin") return "bg-purple-100 text-purple-800 border-purple-200";
    if (role === "dosen") return "bg-blue-100 text-blue-800 border-blue-200";
    return "bg-emerald-100 text-emerald-800 border-emerald-200";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-700 border-collapse">
        <thead className="bg-blue-600 text-white uppercase text-xs">
          <tr>
            <th className="py-3 px-4">Nama</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Hak Akses (Permission)</th>
            <th className="py-3 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                Data user kosong.
              </td>
            </tr>
          ) : (
            users.map((item) => (
              <tr
                key={item.id}
                className="even:bg-gray-50 odd:bg-white border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{item.name}</td>
                <td className="py-3 px-4">{item.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase border ${roleBadgeColor(
                      item.role
                    )}`}
                  >
                    {item.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1 max-w-md">
                    {(item.permission || []).length === 0 ? (
                      <span className="text-xs text-gray-400 italic">Tidak ada permission</span>
                    ) : (
                      item.permission.map((perm) => (
                        <span
                          key={perm}
                          className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[11px] font-mono"
                        >
                          {perm}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-center space-x-2 whitespace-nowrap">
                  {canUpdate && (
                    <button
                      onClick={() => onEditRole(item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-xs"
                    >
                      Atur Role & Akses
                    </button>
                  )}
                  {canDelete && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded text-xs"
                    >
                      Hapus
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}