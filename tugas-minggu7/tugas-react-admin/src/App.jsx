import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import MahasiswaPage from "./pages/MahasiswaPage";
import DetailMahasiswaPage from "./pages/DetailMahasiswaPage";
import DosenPage from "./pages/DosenPage";
import MataKuliahPage from "./pages/MataKuliahPage";
import KelasPage from "./pages/KelasPage";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "./components/organisms/ProtectedRoute";

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{
          top: 75,
          right: 24,
          zIndex: 99999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#ffffff",
            color: "#1f2937",
            padding: "12px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            fontSize: "14px",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="mahasiswa" element={<MahasiswaPage />} />
              <Route path="mahasiswa/:id" element={<DetailMahasiswaPage />} />
              <Route path="dosen" element={<DosenPage />} />
              <Route path="matakuliah" element={<MataKuliahPage />} />
              <Route path="kelas" element={<KelasPage />} />
              <Route path="users" element={<UserPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}