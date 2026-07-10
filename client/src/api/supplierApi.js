import API from "./axios";


// =================================
// GET ALL SUPPLIERS
// =================================

export const getSuppliers = async () => {

  const response = await API.get(
    "/suppliers"
  );

  return response;

};




// =================================
// GET SINGLE SUPPLIER
// =================================

export const getSupplierById = async (id) => {

  const response = await API.get(
    `/suppliers/${id}`
  );

  return response;

};




// =================================
// CREATE SUPPLIER
// =================================

export const createSupplier = async (data) => {

  const response = await API.post(
    "/suppliers",
    data
  );

  return response;

};




// =================================
// UPDATE SUPPLIER
// =================================

export const updateSupplier = async (
  id,
  data
) => {

  const response = await API.put(
    `/suppliers/${id}`,
    data
  );

  return response;

};




// =================================
// DELETE SUPPLIER
// =================================

export const deleteSupplier = async (id) => {

  const response = await API.delete(
    `/suppliers/${id}`
  );

  return response;

};