import { useState } from "react";
import Card from "../components/molecules/Card";
import Button from "../components/atoms/Button";
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

  const { user } = useAuthStateContext();
  const permissions = user?.permission || [];

  const { data: mataKuliah = [], isLoading } = useMataKuliah();
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
            Manajemen Data Mata Kuliah dengan React Query Hooks
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

      {isLoading ? (
        <p className="text-gray-500 text-sm">Memuat data mata kuliah...</p>
      ) : permissions.includes("matakuliah.read") ? (
        <MataKuliahTable
          mataKuliah={mataKuliah}
          openEditModal={(item) => {
            setSelectedMataKuliah(item);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
          canUpdate={permissions.includes("matakuliah.update")}
          canDelete={permissions.includes("matakuliah.delete")}
        />
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