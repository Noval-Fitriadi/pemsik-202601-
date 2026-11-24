import axios from "../AxiosInstance";

export const getAllUsers = (params = {}) => axios.get("/user", { params });
export const getUser = (id) => axios.get(`/user/${id}`);
export const updateUser = (id, data) => axios.put(`/user/${id}`, data);
export const deleteUser = (id) => axios.delete(`/user/${id}`);