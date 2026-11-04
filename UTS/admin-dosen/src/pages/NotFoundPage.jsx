import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-6xl font-bold text-gray-400 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Halaman Tidak Ditemukan</h2>
      <Button onClick={() => navigate('/admin/dashboard')} variant="primary" className="!w-auto px-6">
        Kembali ke Dashboard
      </Button>
    </div>
  );
}