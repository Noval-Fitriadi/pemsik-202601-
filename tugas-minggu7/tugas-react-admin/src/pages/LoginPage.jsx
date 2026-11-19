import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/atoms/Input";
import Label from "../components/atoms/Label";
import Button from "../components/atoms/Button";
import { login } from "../utils/apis/AuthApi";
import { toastSuccess, toastError } from "../utils/helpers/ToastHelpers";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      toastSuccess("Login berhasil!");
      navigate("/admin/dashboard");
    } catch (err) {
      toastError(err.message || "Gagal terhubung ke server!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Login Admin</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@mail.com"
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
            placeholder="admin123"
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Login
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun?{" "}
        <Link to="/register" className="text-blue-600 hover:underline font-medium">
          Registrasi di sini
        </Link>
      </p>
    </div>
  );
}