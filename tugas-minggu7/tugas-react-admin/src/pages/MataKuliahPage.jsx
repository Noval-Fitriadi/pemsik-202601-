import { useState, useEffect } from "react";
import Card from "../components/molecules/Card";
import Button from "../components/atoms/Button";
import MataKuliahTable from "../components/organisms/MataKuliahTable";
import MataKuliahModal from "../components/organisms/MataKuliahModal";
import {
  getAllMataKuliah,
  storeMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from "../utils/apis/MataKuliahApi";
import { confirmDelete, confirmUpdate } from "../utils/helpers/SwalHelpers";
import { toastSuccess, toastError } from "../utils/helpers/ToastHelpers";

export default function MataKuliahPage() {
  const [mataKuliah, setMataKuliah] = useState([]);
  const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchMataKuliah = async () => {
    try {
      const res = await getAllMataKuliah();
      setMataKuliah(res.data);
    } catch (err) {
      toastError("Gagal mengambil data mata kuliah!");
    }
  };

  useEffect(() => {
    fetchMataKuliah();
  }, []);

  const handleSubmit = async (formData) => {
    if (selectedMataKuliah) {
      confirmUpdate(async () => {
        try {
          await updateMataKuliah(selectedMataKuliah.id, {
            kode_mk: formData.kode_mk,
            nama_mk: formData.nama_mk,
            sks: formData.sks,
          });
          toastSuccess("Mata kuliah berhasil diperbarui");
          fetchMataKuliah();
          setModalOpen(false);
        } catch (err) {
          toastError("Gagal memperbarui mata kuliah!");
        }
      });
    } else {
      const isExist = mataKuliah.some(
        (mk) => mk.kode_mk.toLowerCase() === formData.kode_mk.trim().toLowerCase()
      );
      if (isExist) {
        toastError("Kode Mata Kuliah sudah terdaftar!");
        return;
      }

      try {
        await storeMataKuliah({
          kode_mk: formData.kode_mk.trim(),
          nama_mk: formData.nama_mk.trim(),
          sks: Number(formData.sks),
        });
        toastSuccess("Mata kuliah berhasil ditambahkan");
        fetchMataKuliah();
        setModalOpen(false);
      } catch (err) {
        toastError("Gagal menambahkan mata kuliah!");
      }
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await deleteMataKuliah(id);
        toastSuccess("Mata kuliah berhasil dihapus");
        fetchMataKuliah();
      } catch (err) {
        toastError("Gagal menghapus mata kuliah!");
      }
    });
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Data Mata Kuliah</h2>
          <p className="text-gray-500 text-sm">
            Manajemen Data Mata Kuliah dengan Modular Axios API
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedMataKuliah(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Tambah Mata Kuliah
        </Button>
      </div>

      <MataKuliahTable
        mataKuliah={mataKuliah}
        openEditModal={(item) => {
          setSelectedMataKuliah(item);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <MataKuliahModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMataKuliah={selectedMataKuliah}
      />
    </Card>
  );
}