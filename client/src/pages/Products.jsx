import { useEffect, useState } from "react";

import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import ProductForm from "../components/products/ProductForm";

import {
  getProducts,
  deleteProduct,
} from "../api/productApi";

import API from "../api/axios";


const Products = () => {


  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [suppliers, setSuppliers] = useState([]);

  const [loading, setLoading] = useState(true);


  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);


  const [search, setSearch] = useState("");



  // ==============================
  // LOAD PRODUCTS
  // ==============================

  const fetchProducts = async () => {

    try {

      setLoading(true);


      const response = await getProducts();


      console.log(
        "PRODUCT RESPONSE:",
        response
      );



      let productList = [];



      if(Array.isArray(response)) {

        productList = response;

      }

      else if(Array.isArray(response.data)) {

        productList = response.data;

      }

      else if(Array.isArray(response.products)) {

        productList = response.products;

      }



      setProducts(productList);



    }

    catch(error) {

      console.log(
        "Product Fetch Error:",
        error
      );

      setProducts([]);

    }

    finally {

      setLoading(false);

    }

  };





  // ==============================
  // LOAD CATEGORIES
  // ==============================

  const fetchCategories = async()=>{

    try {


      const response =
        await API.get("/categories");


      const data=response.data;



      if(Array.isArray(data)){

        setCategories(data);

      }

      else if(Array.isArray(data.data)){

        setCategories(data.data);

      }


    }

    catch(error){

      console.log(error);

    }

  };





  // ==============================
  // LOAD SUPPLIERS
  // ==============================

  const fetchSuppliers = async()=>{

    try {


      const response =
        await API.get("/suppliers");


      const data=response.data;



      if(Array.isArray(data)){

        setSuppliers(data);

      }

      else if(Array.isArray(data.data)){

        setSuppliers(data.data);

      }


    }

    catch(error){

      console.log(error);

    }

  };





  useEffect(()=>{


    fetchProducts();

    fetchCategories();

    fetchSuppliers();


  },[]);





  // ==============================
  // ADD PRODUCT
  // ==============================

  const handleAdd = ()=>{


    setSelectedProduct(null);


    setShowModal(true);


  };





  // ==============================
  // EDIT PRODUCT
  // ==============================

  const handleEdit = (product)=>{


    setSelectedProduct(product);


    setShowModal(true);


  };





  // ==============================
  // DELETE PRODUCT
  // ==============================

  const handleDelete = async(id)=>{


    const confirm =
      window.confirm(
        "Delete this product?"
      );


    if(!confirm)
      return;



    try {


      await deleteProduct(id);


      fetchProducts();


    }

    catch(error){

      console.log(error);

    }


  };





  // ==============================
  // SEARCH
  // ==============================

  const filteredProducts =

    products.filter((product)=>


      product.name
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )


    );





  return (

    <div className="p-6">



      <div className="
        flex
        justify-between
        items-center
        mb-6
      ">


        <h1 className="
          text-2xl
          font-bold
        ">

          Product Management

        </h1>



        <button

          onClick={handleAdd}

          className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded-lg
          "

        >

          + Add Product

        </button>


      </div>





      <input

        type="text"

        placeholder="Search Product..."

        value={search}

        onChange={(e)=>
          setSearch(e.target.value)
        }

        className="
        w-full
        border
        rounded-lg
        p-3
        mb-5
        "

      />






      {

        loading

        ?

        (

          <p>
            Loading Products...
          </p>

        )


        :


        (

          <ProductTable

            products={filteredProducts}

            onEdit={handleEdit}

            onDelete={handleDelete}

          />

        )


      }






      <ProductModal

        isOpen={showModal}

        onClose={()=>
          setShowModal(false)
        }


        title={
          selectedProduct
          ?
          "Edit Product"
          :
          "Add Product"
        }


      >



        <ProductForm


          product={selectedProduct}


          categories={categories}


          suppliers={suppliers}


          onSuccess={fetchProducts}


          onClose={()=>
            setShowModal(false)
          }


        />



      </ProductModal>




    </div>

  );

};


export default Products;