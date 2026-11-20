import { useState } from "react";
import Card from "../components/molecules/Card";
import Button from "../components/atoms/Button";
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

  const { user } = useAuthStateContext();
  const permissions = user?.permission || [];

  const { data: mahasiswa = [], isLoading } = useMahasiswa();
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
            Manajemen Data Mahasiswa dengan React Query Hooks
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

      {isLoading ? (
        <p className="text-gray-500 text-sm">Memuat data mahasiswa...</p>
      ) : permissions.includes("mahasiswa.read") ? (
        <MahasiswaTable
          mahasiswa={mahasiswa}
          openEditModal={(item) => {
            setSelectedMahasiswa(item);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
          canUpdate={permissions.includes("mahasiswa.update")}
          canDelete={permissions.includes("mahasiswa.delete")}
        />
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