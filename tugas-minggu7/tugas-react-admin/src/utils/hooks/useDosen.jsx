import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "../apis/DosenApi";
import { toastSuccess, toastError } from "../helpers/ToastHelpers";

export const useDosen = () =>
  useQuery({
    queryKey: ["dosen"],
    queryFn: getAllDosen,
    select: (res) => res?.data ?? [],
  });

export const useStoreDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Data dosen berhasil ditambahkan!");
    },
    onError: () => toastError("Gagal menambahkan data dosen."),
  });
};

export const useUpdateDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDosen(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Data dosen berhasil diperbarui!");
    },
    onError: () => toastError("Gagal memperbarui data dosen."),
  });
};

export const useDeleteDosen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Data dosen berhasil dihapus!");
    },
    onError: () => toastError("Gagal menghapus data dosen."),
  });
};