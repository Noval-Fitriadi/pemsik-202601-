import { confirmDelete, confirmUpdate } from "@/Utils/Helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/Utils/Helpers/ToastHelpers";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../Components/Card";
import Heading from "../Components/Heading";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Label from "../Components/Label";

import { mahasiswaList } from "@/data/Dummy";
import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";

const Mahasiswa = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [form, setForm] = useState({ nim: "", nama: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  // Load data awal dengan useEffect (simulasi fetch API)
  useEffect(() => {
    const fetchMahasiswa = async () => {
      setMahasiswa(mahasiswaList);
    };
    const timer = setTimeout(() => fetchMahasiswa(), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setForm({ nim: "", nama: "" });
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEdit = (mhs) => {
    setForm({ nim: mhs.nim, nama: mhs.nama });
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const addMahasiswa = (newData) => {
    setMahasiswa([...mahasiswa, newData]);
  };

  const updateMahasiswa = (nim, newData) => {
    const updated = mahasiswa.map((mhs) =>
      mhs.nim === nim ? { ...mhs, ...newData } : mhs
    );
    setMahasiswa(updated);
  };

  const deleteMahasiswa = (nim) => {
    const filtered = mahasiswa.filter((mhs) => mhs.nim !== nim);
    setMahasiswa(filtered);
  };

 const handleDelete = (nim) => {
  confirmDelete(() => {
    deleteMahasiswa(nim);
    toastSuccess("Data berhasil dihapus");
  });
};

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!form.nim || !form.nama) {
    toastError("NIM dan Nama wajib diisi");
    return;
  }

  if (isEdit) {
    confirmUpdate(() => {
      updateMahasiswa(form.nim, form);
      toastSuccess("Data berhasil diperbarui");
      setForm({ nim: "", nama: "" });
      setIsEdit(false);
      setIsModalOpen(false);
    });
  } else {
    const exists = mahasiswa.find((m) => m.nim === form.nim);
    if (exists) {
      toastError("NIM sudah terdaftar!");
      return;
    }
    addMahasiswa(form);
    toastSuccess("Data berhasil ditambahkan");
    setForm({ nim: "", nama: "" });
    setIsModalOpen(false);
  }
};

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <heading as="h2" className="mb-0 text-left">daftar Mahasiswa</heading>
          <Button onClick={() => openAddModal()}>+ Tambah Mahasiswa</Button>
          </div>
           
           <MahasiswaTable
            data={mahasiswa}
            onEdit={handleEdit}
            onDelete={handleDelete}
            />
          </Card>

      {isModalOpen && (
        <MahasiswaModal
          isOpen={isModalOpen}
          isEdit={isEdit}
          form={form}
          onChange={handleChange}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Mahasiswa;