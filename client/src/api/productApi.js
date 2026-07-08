import axios from "./axios";

export const getProducts = () => axios.get("/products");

export const createProduct = (data) =>
  axios.post("/products", data);

export const updateProduct = (id, data) =>
  axios.put(`/products/${id}`, data);

export const deleteProduct = (id) =>
  axios.delete(`/products/${id}`);

export const getCategories = () =>
  axios.get("/categories");

export const getSuppliers = () =>
  axios.get("/suppliers");