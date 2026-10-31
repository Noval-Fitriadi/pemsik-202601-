import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/atoms/Input";
import Label from "../components/atoms/Label";
import Button from "../components/atoms/Button";
import users from "../data/users.json";
import { toastSuccess, toastError } from "../utils/helpers/ToastHelpers";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const userFound = users.find(
      (u) => u.username === username && u.password === password
    );

    if (userFound) {
      localStorage.setItem("isLoggedIn", "true");
      toastSuccess("Login berhasil!");
      navigate("/admin/dashboard");
    } else {
      toastError("Username atau password salah!");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Login Admin</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="your password"
          />
        </div>
        <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </Button>
      </form>
    </div>
  );
}