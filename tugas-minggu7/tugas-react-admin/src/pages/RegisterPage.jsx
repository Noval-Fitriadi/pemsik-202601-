import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/atoms/Input";
import Label from "../components/atoms/Label";
import Button from "../components/atoms/Button";
import { register } from "../utils/apis/AuthApi";
import { toastSuccess, toastError } from "../utils/helpers/ToastHelpers";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toastError("Semua field wajib diisi!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toastError("Konfirmasi password tidak cocok!");
      return;
    }

    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      toastSuccess("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      toastError(err.message || "Gagal melakukan registrasi!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Registrasi User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama lengkap"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="contoh@mail.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Ulangi password"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Daftar
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-blue-600 hover:underline font-medium">
          Login di sini
        </Link>
      </p>
    </div>
  );
}