import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { getAllUsers, updateUser, deleteUser } from "../apis/UserApi";
import { toastSuccess, toastError } from "../helpers/ToastHelpers";

export const useUser = (query = {}) =>
  useQuery({
    queryKey: ["users", query],
    queryFn: () => getAllUsers(query),
    select: (res) => ({
      data: res?.data ?? [],
      total: parseInt(res.headers["x-total-count"] ?? "0", 10),
    }),
    placeholderData: keepPreviousData,
  });

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toastSuccess("Role & akses user berhasil diperbarui!");
    },
    onError: () => toastError("Gagal memperbarui role & akses user."),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toastSuccess("User berhasil dihapus!");
    },
    onError: () => toastError("Gagal menghapus user."),
  });
};