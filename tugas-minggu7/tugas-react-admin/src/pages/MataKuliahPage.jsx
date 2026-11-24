import { useState } from "react";
import Card from "../components/molecules/Card";
import Button from "../components/atoms/Button";
import TableToolbar from "../components/molecules/TableToolbar";
import Pagination from "../components/molecules/Pagination";
import MataKuliahTable from "../components/organisms/MataKuliahTable";
import MataKuliahModal from "../components/organisms/MataKuliahModal";
import {
  useMataKuliah,
  useStoreMataKuliah,
  useUpdateMataKuliah,
  useDeleteMataKuliah,
} from "../utils/hooks/useMataKuliah";
import { useAuthStateContext } from "../utils/contexts/AuthContext";
import { confirmDelete, confirmUpdate } from "../utils/helpers/SwalHelpers";
import { toastError } from "../utils/helpers/ToastHelpers";

export default function MataKuliahPage() {
  const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState("kode_mk");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const { user } = useAuthStateContext();
  const permissions = user?.permission || [];

  const {
    data: result = { data: [], total: 0 },
    isLoading: isLoadingMK,
  } = useMataKuliah({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: mataKuliah = [], total: totalCount } = result;
  const totalPages = Math.ceil(totalCount / limit);

  const { mutate: store } = useStoreMataKuliah();
  const { mutate: update } = useUpdateMataKuliah();
  const { mutate: remove } = useDeleteMataKuliah();

  const handleSubmit = (formData) => {
    if (selectedMataKuliah) {
      confirmUpdate(() => {
        update({
          id: selectedMataKuliah.id,
          data: {
            kode_mk: formData.kode_mk,
            nama_mk: formData.nama_mk,
            sks: Number(formData.sks),
          },
        });
        setModalOpen(false);
      });
    } else {
      const isExist = mataKuliah.some(
        (mk) =>
          mk.kode_mk.toLowerCase() === formData.kode_mk.trim().toLowerCase()
      );
      if (isExist) {
        toastError("Kode Mata Kuliah sudah terdaftar!");
        return;
      }

      store({
        kode_mk: formData.kode_mk.trim(),
        nama_mk: formData.nama_mk.trim(),
        sks: Number(formData.sks),
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
          <h2 className="text-xl font-bold">Data Mata Kuliah</h2>
          <p className="text-gray-500 text-sm">
            Manajemen Data Mata Kuliah dengan React Query & Pagination
          </p>
        </div>

        {permissions.includes("matakuliah.create") && (
          <Button
            onClick={() => {
              setSelectedMataKuliah(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Tambah Mata Kuliah
          </Button>
        )}
      </div>

      {permissions.includes("matakuliah.read") ? (
        <>
          <TableToolbar
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            searchPlaceholder="Cari kode / nama mata kuliah..."
            sortBy={sortBy}
            onSortByChange={(val) => {
              setSortBy(val);
              setPage(1);
            }}
            sortOptions={[
              { value: "kode_mk", label: "Sort by Kode MK" },
              { value: "nama_mk", label: "Sort by Nama MK" },
              { value: "sks", label: "Sort by SKS" },
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

          {isLoadingMK ? (
            <p className="text-gray-500 text-sm py-4">Memuat data mata kuliah...</p>
          ) : (
            <MataKuliahTable
              mataKuliah={mataKuliah}
              isLoading={isLoadingMK}
              openEditModal={(item) => {
                setSelectedMataKuliah(item);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
              canUpdate={permissions.includes("matakuliah.update")}
              canDelete={permissions.includes("matakuliah.delete")}
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
          Anda tidak memiliki izin untuk melihat data mata kuliah.
        </p>
      )}

      <MataKuliahModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMataKuliah={selectedMataKuliah}
      />
    </Card>
  );
}