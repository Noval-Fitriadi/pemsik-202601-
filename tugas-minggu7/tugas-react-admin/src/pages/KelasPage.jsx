import { useState } from "react";
import Card from "../components/molecules/Card";
import Button from "../components/atoms/Button";
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

  const { user } = useAuthStateContext();
  const permissions = user?.permission || [];

  const { data: kelas = [], isLoading } = useKelas();
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
            Manajemen Data Kelas dengan React Query Hooks
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

      {isLoading ? (
        <p className="text-gray-500 text-sm">Memuat data kelas...</p>
      ) : permissions.includes("kelas.read") ? (
        <KelasTable
          kelas={kelas}
          openEditModal={(item) => {
            setSelectedKelas(item);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
          canUpdate={permissions.includes("kelas.update")}
          canDelete={permissions.includes("kelas.delete")}
        />
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