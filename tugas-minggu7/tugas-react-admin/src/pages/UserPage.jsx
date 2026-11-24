import { useState } from "react";
import Card from "../components/molecules/Card";
import TableToolbar from "../components/molecules/TableToolbar";
import Pagination from "../components/molecules/Pagination";
import UserTable from "../components/organisms/UserTable";
import UserRoleModal from "../components/organisms/UserRoleModal";
import {
  useUser,
  useUpdateUser,
  useDeleteUser,
} from "../utils/hooks/useUser";
import { useAuthStateContext } from "../utils/contexts/AuthContext";
import { confirmDelete, confirmUpdate } from "../utils/helpers/SwalHelpers";

export default function UserPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { user, setUser } = useAuthStateContext();
  const permissions = user?.permission || [];

  const {
    data: result = { data: [], total: 0 },
    isLoading: isLoadingUsers,
  } = useUser({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: users = [], total: totalCount } = result;
  const totalPages = Math.ceil(totalCount / limit);

  const { mutate: update } = useUpdateUser();
  const { mutate: remove } = useDeleteUser();

  const handleSaveRole = (updatedData) => {
    confirmUpdate(() => {
      const payload = {
        ...selectedUser,
        role: updatedData.role,
        permission: updatedData.permission,
      };
      update({ id: selectedUser.id, data: payload });
      if (user?.id === selectedUser.id && setUser) {
        setUser(payload);
      }
      setModalOpen(false);
    });
  };

  const handleDelete = (id) => {
    confirmDelete(() => {
      remove(id);
    });
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-bold">Manajemen User & Role</h2>
        <p className="text-gray-500 text-sm">
          Pengaturan Role dan Hak Akses Pengguna dengan Pagination
        </p>
      </div>

      {permissions.includes("user.read") ? (
        <>
          <TableToolbar
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            searchPlaceholder="Cari nama / email / role user..."
            sortBy={sortBy}
            onSortByChange={(val) => {
              setSortBy(val);
              setPage(1);
            }}
            sortOptions={[
              { value: "name", label: "Sort by Nama" },
              { value: "email", label: "Sort by Email" },
              { value: "role", label: "Sort by Role" },
            ]}
            sortOrder={sortOrder}
            onSortOrderChange={(val) => {
              setSortOrder(val);
              setPage(1);
            }}
            limit={limit}
            onLimitChange={(val) => {
              setLimit(val);
              setPage(1);
            }}
          />

          {isLoadingUsers ? (
            <p className="text-gray-500 text-sm py-4">Memuat data user...</p>
          ) : (
            <UserTable
              users={users}
              currentUserId={user?.id}
              openRoleModal={(item) => {
                setSelectedUser(item);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
              canUpdate={permissions.includes("user.update")}
              canDelete={permissions.includes("user.delete")}
            />
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p className="text-red-500 text-sm">
          Anda tidak memiliki izin untuk melihat daftar user.
        </p>
      )}

      <UserRoleModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveRole}
      />
    </Card>
  );
}