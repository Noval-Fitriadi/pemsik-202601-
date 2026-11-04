// GANTI DENGAN 5 DIGIT TERAKHIR NIM KAMU
export const NIM_5_DIGIT = "15659"; 
export const NAMA_MAHASISWA = "Noval Fitriadi"; // Nama kamu

export const APP_TITLE = `ADMIN-${NIM_5_DIGIT}`;
export const USER_EMAIL = `${NIM_5_DIGIT}@mail.com`;
export const USER_PASSWORD = NIM_5_DIGIT;
export const DOSEN_NIDN_PERTAMA = `12024${NIM_5_DIGIT}`;

// Pemetaan Warna Tema berdasarkan digit terakhir NIM
const COLOR_MAP = {
  '0': { bg: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-600', border: 'border-red-600', ring: 'focus:ring-red-500' },
  '1': { bg: 'bg-orange-600', hover: 'hover:bg-orange-700', text: 'text-orange-600', border: 'border-orange-600', ring: 'focus:ring-orange-500' },
  '2': { bg: 'bg-amber-600', hover: 'hover:bg-amber-700', text: 'text-amber-600', border: 'border-amber-600', ring: 'focus:ring-amber-500' },
  '3': { bg: 'bg-indigo-600', hover: 'hover:bg-indigo-700', text: 'text-indigo-600', border: 'border-indigo-600', ring: 'focus:ring-indigo-500' },
  '4': { bg: 'bg-teal-600', hover: 'hover:bg-teal-700', text: 'text-teal-600', border: 'border-teal-600', ring: 'focus:ring-teal-500' },
  '5': { bg: 'bg-emerald-600', hover: 'hover:bg-emerald-700', text: 'text-emerald-600', border: 'border-emerald-600', ring: 'focus:ring-emerald-500' },
  '6': { bg: 'bg-sky-600', hover: 'hover:bg-sky-700', text: 'text-sky-600', border: 'border-sky-600', ring: 'focus:ring-sky-500' },
  '7': { bg: 'bg-violet-600', hover: 'hover:bg-violet-700', text: 'text-violet-600', border: 'border-violet-600', ring: 'focus:ring-violet-500' },
  '8': { bg: 'bg-rose-600', hover: 'hover:bg-rose-700', text: 'text-rose-600', border: 'border-rose-600', ring: 'focus:ring-rose-500' },
  '9': { bg: 'bg-fuchsia-600', hover: 'hover:bg-fuchsia-700', text: 'text-fuchsia-600', border: 'border-fuchsia-600', ring: 'focus:ring-fuchsia-500' },
};

const lastDigit = NIM_5_DIGIT.slice(-1);
export const THEME = COLOR_MAP[lastDigit] || COLOR_MAP['3'];