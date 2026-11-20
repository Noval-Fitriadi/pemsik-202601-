import { useState } from "react";
import Card from "../components/molecules/Card";
import Button from "../components/atoms/Button";
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

  const { user } = useAuthStateContext();
  const permissions = user?.permission || [];

  const { data: dosen = [], isLoading } = useDosen();
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
            Manajemen Data Dosen dengan React Query Hooks
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

      {isLoading ? (
        <p className="text-gray-500 text-sm">Memuat data dosen...</p>
      ) : permissions.includes("dosen.read") ? (
        <DosenTable
          dosen={dosen}
          openEditModal={(item) => {
            setSelectedDosen(item);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
          canUpdate={permissions.includes("dosen.update")}
          canDelete={permissions.includes("dosen.delete")}
        />
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