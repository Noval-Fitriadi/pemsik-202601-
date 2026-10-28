import { useParams, useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Heading from "../Components/Heading";
import Button from "../Components/Button";
import { mahasiswaList } from "@/data/Dummy";

const MahasiswaDetail = () => {
  const { nim } = useParams();
  const navigate = useNavigate();

  const data = mahasiswaList.find((m) => m.nim === nim);

  if (!data) {
    return (
      <Card>
        <Heading as="h2">Data Mahasiswa Tidak Ditemukan</Heading>
        <Button onClick={() => navigate("/admin/mahasiswa")}>Kembali</Button>
      </Card>
    );
  }

  return (
    <Card>
      <Heading as="h2">Detail Mahasiswa</Heading>
      <div className="space-y-2 my-4">
        <p><strong>NIM:</strong> {data.nim}</p>
        <p><strong>Nama:</strong> {data.nama}</p>
        {data.prodi && <p><strong>Program Studi:</strong> {data.prodi}</p>}
      </div>
      <Button onClick={() => navigate("/admin/mahasiswa")}>Kembali</Button>
    </Card>
  );
};

export default MahasiswaDetail;