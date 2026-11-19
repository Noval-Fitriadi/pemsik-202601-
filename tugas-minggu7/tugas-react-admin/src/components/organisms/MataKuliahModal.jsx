import { useState, useEffect } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { toastError } from "../../utils/helpers/ToastHelpers";

export default function MataKuliahModal({
  isModalOpen,
  onClose,
  onSubmit,
  selectedMataKuliah,
}) {
  const [form, setForm] = useState({ kode_mk: "", nama_mk: "", sks: "" });

  useEffect(() => {
    if (selectedMataKuliah) {
      setForm(selectedMataKuliah);
    } else {
      setForm({ kode_mk: "", nama_mk: "", sks: "" });
    }
  }, [selectedMataKuliah, isModalOpen]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "sks" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.kode_mk.trim() || !form.nama_mk.trim() || !form.sks) {
      toastError("Semua field Mata Kuliah wajib diisi!");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {selectedMataKuliah ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="kode_mk">Kode Mata Kuliah</Label>
            <Input
              id="kode_mk"
              name="kode_mk"
              value={form.kode_mk}
              onChange={handleChange}
              placeholder="Contoh: IF301"
              disabled={!!selectedMataKuliah}
            />
          </div>
          <div>
            <Label htmlFor="nama_mk">Nama Mata Kuliah</Label>
            <Input
              id="nama_mk"
              name="nama_mk"
              value={form.nama_mk}
              onChange={handleChange}
              placeholder="Masukkan Nama Mata Kuliah"
            />
          </div>
          <div>
            <Label htmlFor="sks">Jumlah SKS</Label>
            <Input
              id="sks"
              name="sks"
              type="number"
              min="1"
              max="6"
              value={form.sks}
              onChange={handleChange}
              placeholder="Contoh: 3"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {selectedMataKuliah ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}