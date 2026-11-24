import { useState } from "react";
import Card from "../components/molecules/Card";
import Button from "../components/atoms/Button";
import TableToolbar from "../components/molecules/TableToolbar";
import Pagination from "../components/molecules/Pagination";
import KelasTable from "../components/organisms/KelasTable";
import KelasModal from "../components/organisms/KelasModal";
import {
  useKelas,
  useStoreKelas,
  useUpdateKelas,
  useDeleteKelas,
} from "../utils/hooks/useKelas";
import { useAuthStateContext } from "../utils/contexts/AuthContext";
import { confirmDelete, confirmUpdate } from "../utils/helpers/SwalHelpers";
import { toastError } from "../utils/helpers/ToastHelpers";

export default function KelasPage() {
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("kode_kelas");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { user } = useAuthStateContext();
  const permissions = user?.permission || [];

  const {
    data: result = { data: [], total: 0 },
    isLoading: isLoadingKelas,
  } = useKelas({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: kelas = [], total: totalCount } = result;
  const totalPages = Math.ceil(totalCount / limit);

  const { mutate: store } = useStoreKelas();
  const { mutate: update } = useUpdateKelas();
  const { mutate: remove } = useDeleteKelas();

  const handleSubmit = (formData) => {
    if (selectedKelas) {
      confirmUpdate(() => {
        update({
          id: selectedKelas.id,
          data: {
            kode_kelas: formData.kode_kelas,
            nama_kelas: formData.nama_kelas.trim(),
            mata_kuliah: formData.mata_kuliah,
            dosen: formData.dosen,
            ruangan: formData.ruangan.trim(),
          },
        });
        setModalOpen(false);
      });
    } else {
      const isExist = kelas.some(
        (k) =>
          k.kode_kelas.toLowerCase() === formData.kode_kelas.trim().toLowerCase()
      );
      if (isExist) {
        toastError("Kode Kelas sudah terdaftar!");
        return;
      }

      store({
        kode_kelas: formData.kode_kelas.trim(),
        nama_kelas: formData.nama_kelas.trim(),
        mata_kuliah: formData.mata_kuliah,
        dosen: formData.dosen,
        ruangan: formData.ruangan.trim(),
      });
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
          <h2 className="text-xl font-bold">Data Kelas</h2>
          <p className="text-gray-500 text-sm">
            Manajemen Data Kelas dengan React Query & Pagination
          </p>
        </div>

        {permissions.includes("kelas.create") && (
          <Button
            onClick={() => {
              setSelectedKelas(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Tambah Kelas
          </Button>
        )}
      </div>

      {permissions.includes("kelas.read") ? (
        <>
          <TableToolbar
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            searchPlaceholder="Cari kode / nama kelas / mata kuliah / dosen..."
            sortBy={sortBy}
            onSortByChange={(val) => {
              setSortBy(val);
              setPage(1);
            }}
            sortOptions={[
              { value: "kode_kelas", label: "Sort by Kode Kelas" },
              { value: "nama_kelas", label: "Sort by Nama Kelas" },
              { value: "ruangan", label: "Sort by Ruangan" },
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

          {isLoadingKelas ? (
            <p className="text-gray-500 text-sm py-4">Memuat data kelas...</p>
          ) : (
            <KelasTable
              kelas={kelas}
              isLoading={isLoadingKelas}
              openEditModal={(item) => {
                setSelectedKelas(item);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
              canUpdate={permissions.includes("kelas.update")}
              canDelete={permissions.includes("kelas.delete")}
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
          Anda tidak memiliki izin untuk melihat data kelas.
        </p>
      )}

      <KelasModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedKelas={selectedKelas}
      />
    </Card>
  );
}