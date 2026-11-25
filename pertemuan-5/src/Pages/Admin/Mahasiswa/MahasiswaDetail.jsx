import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMahasiswa } from "@/Utils/Apis/MahasiswaApi";
import { toastError } from "@/Utils/Helpers/ToastHelpers";
import Button from "@/Pages/Admin/Components/Button";
import Card from "@/Pages/Admin/Components/Card";

const MahasiswaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mahasiswa, setMahasiswa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMahasiswa = async () => {
      try {
        const res = await getMahasiswa(id);
        setMahasiswa(res.data);
      } catch (err) {
        toastError("Gagal mengambil data mahasiswa");
      } finally {
        setLoading(false);
      }
    };

    fetchMahasiswa();
  }, [id]);

  if (loading) return <p className="text-center">Memuat data...</p>;
  if (!mahasiswa) return <p className="text-center">Data tidak ditemukan</p>;

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Detail Mahasiswa</h2>
      <p><strong>ID:</strong> {mahasiswa.id}</p>
      <p><strong>NIM:</strong> {mahasiswa.nim}</p>
      <p><strong>Nama:</strong> {mahasiswa.nama}</p>
      <div className="mt-4">
        <Button onClick={() => navigate("/admin/mahasiswa")}>Kembali</Button>
      </div>
    </Card>
  );
};

export default MahasiswaDetail;