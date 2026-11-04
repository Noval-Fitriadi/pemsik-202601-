import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { APP_TITLE, USER_EMAIL, USER_PASSWORD, THEME } from '@/utils/config';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === USER_EMAIL && password === USER_PASSWORD) {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/admin/dashboard');
    } else {
      setError('Email atau password salah!');
    }
  };

  return (
    <AuthLayout>
      <Card className="text-center shadow-lg">
        <h2 className={`text-2xl font-bold ${THEME.text} mb-1`}>{APP_TITLE}</h2>
        <p className="text-sm text-gray-500 mb-6">Silakan login untuk melanjutkan</p>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200 mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
            />
          </div>

          <Button type="submit" variant="primary">
            Login
          </Button>
        </form>
      </Card>
    </AuthLayout>
  );
}