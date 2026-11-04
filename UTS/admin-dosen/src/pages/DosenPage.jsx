import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { THEME, NAMA_MAHASISWA, DOSEN_NIDN_PERTAMA } from '@/utils/config';

const INITIAL_DOSEN = [
  { nidn: DOSEN_NIDN_PERTAMA, nama: NAMA_MAHASISWA, mataKuliah: 'Pemrograman Sisi Klien', status: 'Aktif' },
  { nidn: '0612078501', nama: 'Dr. Andi Wijaya, M.Kom', mataKuliah: 'Pemrograman Web', status: 'Aktif' },
  { nidn: '0623048802', nama: 'Rina Kartika, M.T.', mataKuliah: 'Basis Data', status: 'Cuti' },
  { nidn: '0605019003', nama: 'Bayu Pratama, M.Cs.', mataKuliah: 'Struktur Data', status: 'Aktif' },
];

export function DosenPage() {
  const navigate = useNavigate();
  const [dosenList, setDosenList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ nidn: '', nama: '', mataKuliah: '', status: 'Aktif' });
  const [formError, setFormError] = useState('');

  // Simulasi fetch 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem('dosen_data');
      if (saved) {
        setDosenList(JSON.parse(saved));
      } else {
        setDosenList(INITIAL_DOSEN);
        localStorage.setItem('dosen_data', JSON.stringify(INITIAL_DOSEN));
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const saveToLocalStorage = (data) => {
    setDosenList(data);
    localStorage.setItem('dosen_data', JSON.stringify(data));
  };

  const handleOpenAdd = () => {
    setFormData({ nidn: '', nama: '', mataKuliah: '', status: 'Aktif' });
    setIsEditMode(false);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dosen) => {
    setFormData(dosen);
    setIsEditMode(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nidn || !formData.nama || !formData.mataKuliah) {
      setFormError('Semua field wajib diisi!');
      return;
    }

    if (formData.nidn.length !== 10 || !/^\d+$/.test(formData.nidn)) {
      setFormError('NIDN harus tepat 10 digit angka!');
      return;
    }

    if (!isEditMode) {
      const isDuplicate = dosenList.some((d) => d.nidn === formData.nidn);
      if (isDuplicate) {
        setFormError('NIDN sudah terdaftar (duplikat)!');
        return;
      }
      const updated = [...dosenList, formData];
      saveToLocalStorage(updated);
    } else {
      const updated = dosenList.map((d) => (d.nidn === formData.nidn ? formData : d));
      saveToLocalStorage(updated);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (nidn, status) => {
    if (status === 'Aktif') return; // Double guard
    if (confirm('Apakah Anda yakin ingin menghapus data dosen ini?')) {
      const updated = dosenList.filter((d) => d.nidn !== nidn);
      saveToLocalStorage(updated);
    }
  };

  // Bonus: Filter real-time berdasarkan nama
  const filteredDosen = dosenList.filter((d) =>
    d.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Dosen</h2>
        <Button onClick={handleOpenAdd} variant="primary" className="!w-auto px-5">
          + Tambah Dosen
        </Button>
      </div>

      {/* Input Pencarian (Bonus) */}
      <div className="mb-6 max-w-md">
        <Input
          placeholder="Cari nama dosen..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 font-medium">Memuat data dosen...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDosen.map((dosen) => (
            <Card key={dosen.nidn} className="relative flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{dosen.nama}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      dosen.status === 'Aktif'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {dosen.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-mono mb-2">NIDN: {dosen.nidn}</p>
                <p className="text-sm text-gray-600 mb-6">{dosen.mataKuliah}</p>
              </div>

              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <Button
                  onClick={() => navigate(`/admin/dosen/${dosen.nidn}`)}
                  variant="primary"
                  className="text-xs py-1.5"
                >
                  Detail
                </Button>
                <Button
                  onClick={() => handleOpenEdit(dosen)}
                  variant="warning"
                  className="text-xs py-1.5"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(dosen.nidn, dosen.status)}
                  variant="danger"
                  disabled={dosen.status === 'Aktif'}
                  className="text-xs py-1.5"
                >
                  Hapus
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Tambah / Edit Dosen */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {isEditMode ? 'Edit Dosen' : 'Tambah Dosen'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            {formError && (
              <div className="bg-red-50 text-red-600 text-xs p-2.5 rounded mb-4 border border-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nidn">NIDN</Label>
                <Input
                  id="nidn"
                  placeholder="Masukkan 10 digit NIDN"
                  value={formData.nidn}
                  onChange={(e) => setFormData({ ...formData, nidn: e.target.value })}
                  readOnly={isEditMode}
                />
              </div>

              <div>
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  placeholder="Masukkan nama"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="mataKuliah">Mata Kuliah</Label>
                <Input
                  id="mataKuliah"
                  placeholder="Masukkan mata kuliah"
                  value={formData.mataKuliah}
                  onChange={(e) => setFormData({ ...formData, mataKuliah: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="secondary"
                  className="!w-auto px-4"
                >
                  Batal
                </Button>
                <Button type="submit" variant="primary" className="!w-auto px-4">
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}