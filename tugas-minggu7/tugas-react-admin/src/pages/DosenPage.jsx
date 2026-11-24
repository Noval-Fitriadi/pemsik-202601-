import { useState } from "react";
import Card from "../components/molecules/Card";
import Button from "../components/atoms/Button";
import TableToolbar from "../components/molecules/TableToolbar";
import Pagination from "../components/molecules/Pagination";
import DosenTable from "../components/organisms/DosenTable";
import DosenModal from "../components/organisms/DosenModal";
import {
  useDosen,
  useStoreDosen,
  useUpdateDosen,
  useDeleteDosen,
} from "../utils/hooks/useDosen";
import { useAuthStateContext } from "../utils/contexts/AuthContext";
import { confirmDelete, confirmUpdate } from "../utils/helpers/SwalHelpers";
import { toastError } from "../utils/helpers/ToastHelpers";

export default function DosenPage() {
  const [selectedDosen, setSelectedDosen] = useState(null);
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
    isLoading: isLoadingDosen,
  } = useDosen({
    q: search,
    _sort: sortBy,
    _order: sortOrder,
    _page: page,
    _limit: limit,
  });

  const { data: dosen = [], total: totalCount } = result;
  const totalPages = Math.ceil(totalCount / limit);

  const { mutate: store } = useStoreDosen();
  const { mutate: update } = useUpdateDosen();
  const { mutate: remove } = useDeleteDosen();

  const handleSubmit = (formData) => {
    if (selectedDosen) {
      confirmUpdate(() => {
        update({
          id: selectedDosen.id,
          data: {
            nidn: formData.nidn,
            nama: formData.nama,
            bidang: formData.bidang,
          },
        });
        setModalOpen(false);
      });
    } else {
      const isExist = dosen.some((d) => d.nidn === formData.nidn.trim());
      if (isExist) {
        toastError("NIDN sudah terdaftar!");
        return;
      }

      store({
        nidn: formData.nidn.trim(),
        nama: formData.nama.trim(),
        bidang: formData.bidang.trim(),
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
          <h2 className="text-xl font-bold">Data Dosen</h2>
          <p className="text-gray-500 text-sm">
            Manajemen Data Dosen dengan React Query & Pagination
          </p>
        </div>

        {permissions.includes("dosen.create") && (
          <Button
            onClick={() => {
              setSelectedDosen(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Tambah Dosen
          </Button>
        )}
      </div>

      {permissions.includes("dosen.read") ? (
        <>
          <TableToolbar
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            searchPlaceholder="Cari nama / NIDN / bidang dosen..."
            sortBy={sortBy}
            onSortByChange={(val) => {
              setSortBy(val);
              setPage(1);
            }}
            sortOptions={[
              { value: "nama", label: "Sort by Nama" },
              { value: "nidn", label: "Sort by NIDN" },
              { value: "bidang", label: "Sort by Bidang" },
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

          {isLoadingDosen ? (
            <p className="text-gray-500 text-sm py-4">Memuat data dosen...</p>
          ) : (
            <DosenTable
              dosen={dosen}
              isLoading={isLoadingDosen}
              openEditModal={(item) => {
                setSelectedDosen(item);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
              canUpdate={permissions.includes("dosen.update")}
              canDelete={permissions.includes("dosen.delete")}
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
          Anda tidak memiliki izin untuk melihat data dosen.
        </p>
      )}

      <DosenModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedDosen={selectedDosen}
      />
    </Card>
  );
}