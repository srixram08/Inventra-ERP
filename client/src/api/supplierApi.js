import API from "./axios";


// ======================================
// GET ALL SUPPLIERS
// ======================================

export const getSuppliers = async () => {
  try {

    const response = await API.get("/suppliers");

    return response.data;

  } catch (error) {

    console.error(
      "Get Suppliers Error:",
      error.response?.data || error.message
    );

    throw error;

  }
};



// ======================================
// GET SUPPLIER BY ID
// ======================================

export const getSupplierById = async (id) => {

  try {

    const response = await API.get(
      `/suppliers/${id}`
    );

    return response.data;


  } catch(error){

    console.error(
      "Get Supplier Error:",
      error.response?.data || error.message
    );

    throw error;

  }

};



// ======================================
// CREATE SUPPLIER
// ======================================

export const createSupplier = async (data) => {

  try {

    const response = await API.post(
      "/suppliers",
      data
    );


    return response.data;


  } catch(error){

    console.error(
      "Create Supplier Error:",
      error.response?.data || error.message
    );

    throw error;

  }

};



// ======================================
// UPDATE SUPPLIER
// ======================================

export const updateSupplier = async (
  id,
  data
) => {

  try {

    const response = await API.put(
      `/suppliers/${id}`,
      data
    );


    return response.data;


  } catch(error){

    console.error(
      "Update Supplier Error:",
      error.response?.data || error.message
    );

    throw error;

  }

};



// ======================================
// DELETE SUPPLIER
// ======================================

export const deleteSupplier = async (id) => {

  try {

    const response = await API.delete(
      `/suppliers/${id}`
    );


    return response.data;


  } catch(error){

    console.error(
      "Delete Supplier Error:",
      error.response?.data || error.message
    );

    throw error;

  }

};