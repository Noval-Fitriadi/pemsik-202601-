import { useState } from "react";
import Card from "../components/molecules/Card";
import Button from "../components/atoms/Button";
import MahasiswaTable from "../components/organisms/MahasiswaTable";
import MahasiswaModal from "../components/organisms/MahasiswaModal";
import { confirmDelete, confirmUpdate } from "../utils/helpers/SwalHelpers";
import { toastSuccess, toastError } from "../utils/helpers/ToastHelpers";

export default function MahasiswaPage() {
  const [mahasiswa, setMahasiswa] = useState([
    { nim: "20211001", nama: "Budi Santoso", status: true },
    { nim: "20211002", nama: "Siti Aminah", status: true },
    { nim: "20211003", nama: "Ahmad Fauzi", status: false },
  ]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const storeMahasiswa = (dataBaru) => {
    const isNimExist = mahasiswa.some((m) => m.nim === dataBaru.nim.trim());
    if (isNimExist) {
      toastError("NIM sudah terdaftar!");
      return false;
    }
    setMahasiswa((prev) => [...prev, dataBaru]);
    toastSuccess("Data berhasil ditambahkan");
    return true;
  };

  const updateMahasiswa = (dataUpdate) => {
    setMahasiswa((prev) =>
      prev.map((m) => (m.nim === dataUpdate.nim ? dataUpdate : m))
    );
  };

  const deleteMahasiswa = (nim) => {
    setMahasiswa((prev) => prev.filter((m) => m.nim !== nim));
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedMahasiswa(item);
    setModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (selectedMahasiswa) {
      // Menggunakan confirmUpdate dari helper Notion
      confirmUpdate(() => {
        updateMahasiswa(formData);
        toastSuccess("Data berhasil diperbarui");
        setModalOpen(false);
      });
    } else {
      const isSuccess = storeMahasiswa(formData);
      if (isSuccess) {
        setModalOpen(false);
      }
    }
  };

  const handleDelete = (nim) => {
    // Menggunakan confirmDelete dari helper Notion
    confirmDelete(() => {
      deleteMahasiswa(nim);
      toastSuccess("Data berhasil dihapus");
    });
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Data Mahasiswa</h2>
          <p className="text-gray-500 text-sm">
            Manajemen Data Mahasiswa dengan Swal2 & react-hot-toast
          </p>
        </div>
        <Button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Tambah Mahasiswa
        </Button>
      </div>

      <MahasiswaTable
        mahasiswa={mahasiswa}
        openEditModal={openEditModal}
        onDelete={handleDelete}
      />

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </Card>
  );
}