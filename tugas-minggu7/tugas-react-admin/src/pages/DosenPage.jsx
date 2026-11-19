import { useState, useEffect } from "react";
import Card from "../components/molecules/Card";
import Button from "../components/atoms/Button";
import DosenTable from "../components/organisms/DosenTable";
import DosenModal from "../components/organisms/DosenModal";
import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "../utils/apis/DosenApi";
import { confirmDelete, confirmUpdate } from "../utils/helpers/SwalHelpers";
import { toastSuccess, toastError } from "../utils/helpers/ToastHelpers";

export default function DosenPage() {
  const [dosen, setDosen] = useState([]);
  const [selectedDosen, setSelectedDosen] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchDosen = async () => {
    try {
      const res = await getAllDosen();
      setDosen(res.data);
    } catch (err) {
      toastError("Gagal mengambil data dosen!");
    }
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  const handleSubmit = async (formData) => {
    if (selectedDosen) {
      confirmUpdate(async () => {
        try {
          await updateDosen(selectedDosen.id, {
            nidn: formData.nidn,
            nama: formData.nama,
            bidang: formData.bidang,
          });
          toastSuccess("Data dosen berhasil diperbarui");
          fetchDosen();
          setModalOpen(false);
        } catch (err) {
          toastError("Gagal memperbarui data dosen!");
        }
      });
    } else {
      const isExist = dosen.some((d) => d.nidn === formData.nidn.trim());
      if (isExist) {
        toastError("NIDN sudah terdaftar!");
        return;
      }

      try {
        await storeDosen({
          nidn: formData.nidn.trim(),
          nama: formData.nama.trim(),
          bidang: formData.bidang.trim(),
        });
        toastSuccess("Data dosen berhasil ditambahkan");
        fetchDosen();
        setModalOpen(false);
      } catch (err) {
        toastError("Gagal menambahkan data dosen!");
      }
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await deleteDosen(id);
        toastSuccess("Data dosen berhasil dihapus");
        fetchDosen();
      } catch (err) {
        toastError("Gagal menghapus data dosen!");
      }
    });
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Data Dosen</h2>
          <p className="text-gray-500 text-sm">
            Manajemen Data Dosen dengan Modular Axios API
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedDosen(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Tambah Dosen
        </Button>
      </div>

      <DosenTable
        dosen={dosen}
        openEditModal={(item) => {
          setSelectedDosen(item);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <DosenModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedDosen={selectedDosen}
      />
    </Card>
  );
}