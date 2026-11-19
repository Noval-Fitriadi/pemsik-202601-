import { useState, useEffect } from "react";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

const PERMISSION_GROUPS = [
  {
    group: "Dashboard",
    items: ["dashboard.page"],
  },
  {
    group: "Mahasiswa",
    items: [
      "mahasiswa.page",
      "mahasiswa.read",
      "mahasiswa.create",
      "mahasiswa.update",
      "mahasiswa.delete",
    ],
  },
  {
    group: "Dosen",
    items: [
      "dosen.page",
      "dosen.read",
      "dosen.create",
      "dosen.update",
      "dosen.delete",
    ],
  },
  {
    group: "Mata Kuliah",
    items: [
      "matakuliah.page",
      "matakuliah.read",
      "matakuliah.create",
      "matakuliah.update",
      "matakuliah.delete",
    ],
  },
  {
    group: "Manajemen User",
    items: ["user.page", "user.read", "user.update", "user.delete"],
  },
];

const ROLE_PRESETS = {
  admin: PERMISSION_GROUPS.flatMap((g) => g.items),
  dosen: [
    "dashboard.page",
    "mahasiswa.page",
    "mahasiswa.read",
    "dosen.page",
    "dosen.read",
    "matakuliah.page",
    "matakuliah.read",
    "matakuliah.create",
    "matakuliah.update",
  ],
  mahasiswa: ["dashboard.page", "mahasiswa.page", "mahasiswa.read", "matakuliah.page", "matakuliah.read"],
};

export default function UserRoleModal({ isOpen, onClose, onSubmit, selectedUser }) {
  const [role, setRole] = useState("mahasiswa");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (selectedUser) {
      setRole(selectedUser.role || "mahasiswa");
      setPermissions(selectedUser.permission || []);
    }
  }, [selectedUser, isOpen]);

  if (!isOpen || !selectedUser) return null;

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (ROLE_PRESETS[newRole]) {
      setPermissions(ROLE_PRESETS[newRole]);
    }
  };

  const togglePermission = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((item) => item !== perm) : [...prev, perm]
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...selectedUser,
      role,
      permission: permissions,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-1">Ubah Role & Permission User</h2>
        <p className="text-sm text-gray-500 mb-4">
          Pengguna: <span className="font-semibold text-gray-800">{selectedUser.name}</span> ({selectedUser.email})
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <Label htmlFor="role">Pilih Role (Preset Otomatis)</Label>
            <select
              id="role"
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="dosen">Dosen</option>
              <option value="mahasiswa">Mahasiswa</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Memilih role akan mengisi template permission bawaan, dan kamu tetap bisa mencentang/menghapus izin secara manual di bawah.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Daftar Permission ({permissions.length} dipilih)</Label>
              <div className="space-x-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPermissions(ROLE_PRESETS.admin)}
                  className="text-blue-600 hover:underline"
                >
                  Pilih Semua
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => setPermissions([])}
                  className="text-red-600 hover:underline"
                >
                  Kosongkan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PERMISSION_GROUPS.map((group) => (
                <div key={group.group} className="border rounded-lg p-3 bg-gray-50">
                  <h4 className="font-semibold text-xs uppercase text-gray-700 mb-2 border-b pb-1">
                    {group.group}
                  </h4>
                  <div className="space-y-1.5">
                    {group.items.map((perm) => (
                      <label
                        key={perm}
                        className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={permissions.includes(perm)}
                          onChange={() => togglePermission(perm)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="font-mono">{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}