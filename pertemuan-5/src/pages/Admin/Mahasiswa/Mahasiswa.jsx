import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/Utils/Apis/MahasiswaApi";
import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";
import Card from "@/Pages/Admin/Components/Card";
import Button from "@/Pages/Admin/Components/Button";
import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";

const Mahasiswa = () => {
  const navigate = useNavigate();
  const [mahasiswa, setMahasiswa] = useState([]);
  const [form, setForm] = useState({ id: "", nim: "", nama: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMahasiswa = async () => {
    try {
      const res = await getAllMahasiswa();
      setMahasiswa(res.data);
    } catch (err) {
      toastError("Gagal mengambil data mahasiswa");
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const openAddModal = () => {
    setForm({ id: "", nim: "", nama: "" });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEdit = (mhs) => {
    setForm({ id: mhs.id, nim: mhs.nim, nama: mhs.nama });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!form.nim || !form.nama) {
      toastError("NIM dan Nama wajib diisi");
      return;
    }

    if (isEdit) {
      confirmUpdate(async () => {
        try {
          await updateMahasiswa(form.id, { nim: form.nim, nama: form.nama });
          await fetchMahasiswa();
          toastSuccess("Data berhasil diperbarui");
          setForm({ id: "", nim: "", nama: "" });
          setIsEdit(false);
          setIsModalOpen(false);
        } catch (err) {
          toastError("Gagal memperbarui data");
        }
      });
    } else {
      const exists = mahasiswa.find((m) => m.nim === form.nim);
      if (exists) {
        toastError("NIM sudah terdaftar!");
        return;
      }

      try {
        await storeMahasiswa({ nim: form.nim, nama: form.nama });
        await fetchMahasiswa();
        toastSuccess("Data berhasil ditambahkan");
        setForm({ id: "", nim: "", nama: "" });
        setIsModalOpen(false);
      } catch (err) {
        toastError("Gagal menambahkan data");
      }
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await deleteMahasiswa(id);
        await fetchMahasiswa();
        toastSuccess("Data berhasil dihapus");
      } catch (err) {
        toastError("Gagal menghapus data");
      }
    });
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Data Mahasiswa</h2>
        <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
      </div>

      <MahasiswaTable
        data={mahasiswa}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
      />

      <MahasiswaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        form={form}
        onChange={handleChange}
        isEdit={isEdit}
      />
    </Card>
  );
};

export default Mahasiswa;