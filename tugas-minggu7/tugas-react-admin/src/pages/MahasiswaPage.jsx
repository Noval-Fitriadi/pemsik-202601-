import { useState } from "react";
import Card from "../components/molecules/Card";
import Button from "../components/atoms/Button";
import TableToolbar from "../components/molecules/TableToolbar";
import Pagination from "../components/molecules/Pagination";
import MahasiswaTable from "../components/organisms/MahasiswaTable";
import MahasiswaModal from "../components/organisms/MahasiswaModal";
import {
  useMahasiswa,
  useStoreMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "../utils/hooks/useMahasiswa";
import { useAuthStateContext } from "../utils/contexts/AuthContext";
import { confirmDelete, confirmUpdate } from "../utils/helpers/SwalHelpers";
import { toastError } from "../utils/helpers/ToastHelpers";

export default function MahasiswaPage() {
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { user } = useAuthStateContext();
  const permissions = user?.permission || [];

  const {
    data: result = { data: [], total: 0 },
    isLoading: isLoadingMahasiswa,
  } = useMahasiswa({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: mahasiswa = [], total: totalCount } = result;
  const totalPages = Math.ceil(totalCount / limit);

  const { mutate: store } = useStoreMahasiswa();
  const { mutate: update } = useUpdateMahasiswa();
  const { mutate: remove } = useDeleteMahasiswa();

  const handleSubmit = (formData) => {
    if (selectedMahasiswa) {
      confirmUpdate(() => {
        update({
          id: selectedMahasiswa.id,
          data: formData,
        });
        setModalOpen(false);
      });
    } else {
      const isExist = mahasiswa.some((m) => m.nim === formData.nim?.trim());
      if (isExist) {
        toastError("NIM sudah terdaftar!");
        return;
      }

      store(formData);
      setModalOpen(false);
    }
  };

  const handleDelete = (id) => {
    confirmDelete(() => {
      remove(id);
    });
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Data Mahasiswa</h2>
          <p className="text-gray-500 text-sm">
            Manajemen Data Mahasiswa dengan React Query & Pagination
          </p>
        </div>

        {permissions.includes("mahasiswa.create") && (
          <Button
            onClick={() => {
              setSelectedMahasiswa(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Tambah Mahasiswa
          </Button>
        )}
      </div>

      {permissions.includes("mahasiswa.read") ? (
        <>
          <TableToolbar
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            searchPlaceholder="Cari nama / NIM mahasiswa..."
            sortBy={sortBy}
            onSortByChange={(val) => {
              setSortBy(val);
              setPage(1);
            }}
            sortOptions={[
              { value: "nama", label: "Sort by Nama" },
              { value: "nim", label: "Sort by NIM" },
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

          {isLoadingMahasiswa ? (
            <p className="text-gray-500 text-sm py-4">Memuat data mahasiswa...</p>
          ) : (
            <MahasiswaTable
              mahasiswa={mahasiswa}
              isLoading={isLoadingMahasiswa}
              openEditModal={(item) => {
                setSelectedMahasiswa(item);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
              canUpdate={permissions.includes("mahasiswa.update")}
              canDelete={permissions.includes("mahasiswa.delete")}
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
          Anda tidak memiliki izin untuk melihat data mahasiswa.
        </p>
      )}

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </Card>
  );
}