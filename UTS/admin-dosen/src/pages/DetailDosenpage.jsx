// BARIS 1: Pastikan diimpor dari 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'; 

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DOSEN_NIDN_PERTAMA, NAMA_MAHASISWA } from '@/utils/config';

const INITIAL_DOSEN = [
  { nidn: DOSEN_NIDN_PERTAMA, nama: NAMA_MAHASISWA, mataKuliah: 'Pemrograman Sisi Klien', status: 'Aktif' },
  { nidn: '0612078501', nama: 'Dr. Andi Wijaya, M.Kom', mataKuliah: 'Pemrograman Web', status: 'Aktif' },
  { nidn: '0623048802', nama: 'Rina Kartika, M.T.', mataKuliah: 'Basis Data', status: 'Cuti' },
  { nidn: '0605019003', nama: 'Bayu Pratama, M.Cs.', mataKuliah: 'Struktur Data', status: 'Aktif' },
];

export function DetailDosenPage() {
  const { nidn } = useParams();
  const navigate = useNavigate();

  const savedData = localStorage.getItem('dosen_data');
  const dosenList = savedData ? JSON.parse(savedData) : INITIAL_DOSEN;

  const dosen = dosenList.find((d) => String(d.nidn).trim() === String(nidn).trim());

  if (!dosen) {
    return (
      <Card className="max-w-xl mx-auto mt-8 text-center py-8">
        <p className="text-gray-600 text-lg mb-4">Data dosen tidak ditemukan.</p>
        <Button onClick={() => navigate('/admin/dosen')} variant="secondary" className="!w-auto px-6">
          Kembali
        </Button>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Detail Dosen</h2>

      <div className="space-y-4 text-sm mb-8">
        <div className="grid grid-cols-3">
          <span className="text-gray-500 font-medium">NIDN</span>
          <span className="col-span-2 text-gray-800 font-mono">{dosen.nidn}</span>
        </div>
        <div className="grid grid-cols-3">
          <span className="text-gray-500 font-medium">Nama</span>
          <span className="col-span-2 text-gray-800 font-semibold">{dosen.nama}</span>
        </div>
        <div className="grid grid-cols-3">
          <span className="text-gray-500 font-medium">Mata Kuliah</span>
          <span className="col-span-2 text-gray-800">{dosen.mataKuliah}</span>
        </div>
        <div className="grid grid-cols-3 items-center">
          <span className="text-gray-500 font-medium">Status</span>
          <div className="col-span-2">
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
        </div>
      </div>

      <Button onClick={() => navigate('/admin/dosen')} variant="secondary" className="!w-auto px-6">
        ← Kembali
      </Button>
    </Card>
  );
}