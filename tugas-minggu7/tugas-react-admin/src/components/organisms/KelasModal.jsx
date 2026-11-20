import { useState, useEffect } from "react";
import Input from "../atoms/Input";
import Label from "../atoms/Label";
import Button from "../atoms/Button";
import { useMataKuliah } from "../../utils/hooks/useMataKuliah";
import { useDosen } from "../../utils/hooks/useDosen";
import { toastError } from "../../utils/helpers/ToastHelpers";

export default function KelasModal({
  isModalOpen,
  onClose,
  onSubmit,
  selectedKelas,
}) {
  const [form, setForm] = useState({
    kode_kelas: "",
    nama_kelas: "",
    mata_kuliah: "",
    dosen: "",
    ruangan: "",
  });

  const { data: daftarMataKuliah = [] } = useMataKuliah();
  const { data: daftarDosen = [] } = useDosen();

  useEffect(() => {
    if (selectedKelas) {
      setForm({
        kode_kelas: selectedKelas.kode_kelas || "",
        nama_kelas: selectedKelas.nama_kelas || "",
        mata_kuliah: selectedKelas.mata_kuliah || "",
        dosen: selectedKelas.dosen || "",
        ruangan: selectedKelas.ruangan || "",
      });
    } else {
      setForm({
        kode_kelas: "",
        nama_kelas: "",
        mata_kuliah: "",
        dosen: "",
        ruangan: "",
      });
    }
  }, [selectedKelas, isModalOpen]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !form.kode_kelas.trim() ||
      !form.nama_kelas.trim() ||
      !form.mata_kuliah ||
      !form.dosen ||
      !form.ruangan.trim()
    ) {
      toastError("Semua field kelas wajib diisi!");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {selectedKelas ? "Edit Data Kelas" : "Tambah Data Kelas"}
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <Label htmlFor="kode_kelas">Kode Kelas</Label>
            <Input
              id="kode_kelas"
              name="kode_kelas"
              value={form.kode_kelas}
              onChange={handleChange}
              placeholder="Contoh: A11.4501"
              disabled={!!selectedKelas}
            />
          </div>
          <div>
            <Label htmlFor="nama_kelas">Nama Kelas</Label>
            <Input
              id="nama_kelas"
              name="nama_kelas"
              value={form.nama_kelas}
              onChange={handleChange}
              placeholder="Contoh: Pemrograman Sisi Klien - A"
            />
          </div>
          <div>
            <Label htmlFor="mata_kuliah">Mata Kuliah</Label>
            <select
              id="mata_kuliah"
              name="mata_kuliah"
              value={form.mata_kuliah}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Pilih Mata Kuliah --</option>
              {daftarMataKuliah.map((mk) => (
                <option key={mk.id} value={mk.nama_mk}>
                  {mk.kode_mk} - {mk.nama_mk}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="dosen">Dosen Pengampu</Label>
            <select
              id="dosen"
              name="dosen"
              value={form.dosen}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Pilih Dosen --</option>
              {daftarDosen.map((d) => (
                <option key={d.id} value={d.nama}>
                  {d.nama} ({d.bidang})
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="ruangan">Ruangan</Label>
            <Input
              id="ruangan"
              name="ruangan"
              value={form.ruangan}
              onChange={handleChange}
              placeholder="Contoh: H.4.2"
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
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}