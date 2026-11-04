import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { THEME, NAMA_MAHASISWA, DOSEN_NIDN_PERTAMA } from '@/utils/config';

const INITIAL_DOSEN = [
  { nidn: DOSEN_NIDN_PERTAMA, nama: NAMA_MAHASISWA, mataKuliah: 'Pemrograman Sisi Klien', status: 'Aktif' },
  { nidn: '0612078501', nama: 'Dr. Andi Wijaya, M.Kom', mataKuliah: 'Pemrograman Web', status: 'Aktif' },
  { nidn: '0623048802', nama: 'Rina Kartika, M.T.', mataKuliah: 'Basis Data', status: 'Cuti' },
  { nidn: '0605019003', nama: 'Bayu Pratama, M.Cs.', mataKuliah: 'Struktur Data', status: 'Aktif' },
];

export function DashboardPage() {
  const [dosenList, setDosenList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('dosen_data');
    if (saved) {
      setDosenList(JSON.parse(saved));
    } else {
      setDosenList(INITIAL_DOSEN);
      localStorage.setItem('dosen_data', JSON.stringify(INITIAL_DOSEN));
    }
  }, []);

  const totalDosen = dosenList.length;
  const dosenAktif = dosenList.filter((d) => d.status === 'Aktif').length;
  const dosenCuti = dosenList.filter((d) => d.status === 'Cuti').length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Selamat Datang di Dashboard</h2>
      <p className="text-gray-500 text-sm mb-6">Ringkasan data dosen</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-t-4 border-t-indigo-600">
          <p className="text-sm text-gray-500 font-medium">Total Dosen</p>
          <h3 className="text-4xl font-bold mt-2 text-gray-800">{totalDosen}</h3>
        </Card>

        <Card className="border-t-4 border-t-emerald-500">
          <p className="text-sm text-gray-500 font-medium">Dosen Aktif</p>
          <h3 className="text-4xl font-bold mt-2 text-gray-800">{dosenAktif}</h3>
        </Card>

        <Card className="border-t-4 border-t-gray-400">
          <p className="text-sm text-gray-500 font-medium">Dosen Cuti</p>
          <h3 className="text-4xl font-bold mt-2 text-gray-800">{dosenCuti}</h3>
        </Card>
      </div>
    </div>
  );
}