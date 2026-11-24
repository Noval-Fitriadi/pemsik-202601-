import { useState, useEffect } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { toastError } from "../../utils/helpers/ToastHelpers";

export default function DosenModal({
  isModalOpen,
  onClose,
  onSubmit,
  selectedDosen,
}) {
  const [form, setForm] = useState({ nidn: "", nama: "", bidang: "" });

  useEffect(() => {
    if (selectedDosen) {
      setForm(selectedDosen);
    } else {
      setForm({ nidn: "", nama: "", bidang: "" });
    }
  }, [selectedDosen, isModalOpen]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nidn.trim() || !form.nama.trim() || !form.bidang.trim()) {
      toastError("Semua field Dosen wajib diisi!");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {selectedDosen ? "Edit Data Dosen" : "Tambah Dosen"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nidn">NIDN</Label>
            <Input
              id="nidn"
              name="nidn"
              value={form.nidn}
              onChange={handleChange}
              placeholder="Masukkan NIDN"
              disabled={!!selectedDosen}
            />
          </div>
          <div>
            <Label htmlFor="nama">Nama Dosen</Label>
            <Input
              id="nama"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan Nama & Gelar"
            />
          </div>
          <div>
            <Label htmlFor="bidang">Bidang Keahlian</Label>
            <Input
              id="bidang"
              name="bidang"
              value={form.bidang}
              onChange={handleChange}
              placeholder="Contoh: Rekayasa Perangkat Lunak"
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
              {selectedDosen ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}