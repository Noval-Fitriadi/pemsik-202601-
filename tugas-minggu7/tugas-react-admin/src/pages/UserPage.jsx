import { useState, useEffect } from "react";
import Card from "../components/molecules/Card";
import UserTable from "../components/organisms/UserTable";
import UserRoleModal from "../components/organisms/UserRoleModal";
import { getAllUsers, updateUser, deleteUser } from "../utils/apis/UserApi";
import { useAuthStateContext } from "../utils/contexts/AuthContext";
import { confirmUpdate, confirmDelete } from "../utils/helpers/SwalHelpers";
import { toastSuccess, toastError } from "../utils/helpers/ToastHelpers";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { user, setUser } = useAuthStateContext();

  const permissions = user?.permission || [];

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      toastError("Gagal mengambil data user!");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveRolePermission = (updatedData) => {
    confirmUpdate(async () => {
      try {
        await updateUser(updatedData.id, updatedData);
        toastSuccess(`Role & permission ${updatedData.name} berhasil diperbarui!`);

        // Sinkronisasi real-time jika user yang diubah adalah akun yang sedang login
        if (user && String(user.id) === String(updatedData.id)) {
          setUser(updatedData);
        }

        fetchUsers();
        setModalOpen(false);
      } catch (err) {
        toastError("Gagal memperbarui role & permission user!");
      }
    });
  };

  const handleDeleteUser = (id) => {
    if (user && String(user.id) === String(id)) {
      toastError("Tidak dapat menghapus akun yang sedang digunakan login!");
      return;
    }

    confirmDelete(async () => {
      try {
        await deleteUser(id);
        toastSuccess("User berhasil dihapus!");
        fetchUsers();
      } catch (err) {
        toastError("Gagal menghapus user!");
      }
    });
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-bold">Manajemen Role & Permission User</h2>
        <p className="text-gray-500 text-sm">
          Atur peran (Role) dan hak akses spesifik (Permission) untuk setiap pengguna sistem
        </p>
      </div>

      {permissions.includes("user.read") ? (
        <UserTable
          users={users}
          onEditRole={(item) => {
            setSelectedUser(item);
            setModalOpen(true);
          }}
          onDelete={handleDeleteUser}
          canUpdate={permissions.includes("user.update")}
          canDelete={permissions.includes("user.delete")}
        />
      ) : (
        <p className="text-red-500 text-sm">Anda tidak memiliki izin melihat daftar user.</p>
      )}

      <UserRoleModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSaveRolePermission}
        selectedUser={selectedUser}
      />
    </Card>
  );
}