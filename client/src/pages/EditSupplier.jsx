import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getSupplierById,
  updateSupplier,
} from "../api/supplierApi";


const EditSupplier = () => {


  const { id } = useParams();

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    address: "",

  });


  const [loading, setLoading] = useState(true);




  useEffect(() => {

    fetchSupplier();

  }, []);





  const fetchSupplier = async () => {

    try {


      const res = await getSupplierById(id);


      setFormData(res.data);



    } catch(error) {


      console.error(error);


      alert(
        "Failed to load supplier"
      );


    } finally {


      setLoading(false);


    }

  };





  const handleChange = (e) => {


    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });


  };





  const handleSubmit = async (e) => {


    e.preventDefault();


    try {


      await updateSupplier(
        id,
        formData
      );


      alert(
        "Supplier updated successfully"
      );


      navigate("/suppliers");



    } catch(error) {


      console.error(error);


      alert(
        "Update failed"
      );


    }


  };





  if (loading) {

    return (

      <div className="p-6 text-xl">

        Loading Supplier...

      </div>

    );

  }





  return (

    <div className="p-6">


      <h1 className="text-3xl font-bold mb-6">

        Edit Supplier

      </h1>





      <form

        onSubmit={handleSubmit}

        className="
        bg-white
        shadow
        rounded-xl
        p-6
        max-w-xl
        space-y-4
        "

      >



        <input

          type="text"

          name="name"

          value={formData.name || ""}

          onChange={handleChange}

          placeholder="Supplier Name"

          className="
          w-full
          border
          rounded
          p-3
          "

        />





        <input

          type="email"

          name="email"

          value={formData.email || ""}

          onChange={handleChange}

          placeholder="Email"

          className="
          w-full
          border
          rounded
          p-3
          "

        />





        <input

          type="text"

          name="phone"

          value={formData.phone || ""}

          onChange={handleChange}

          placeholder="Phone"

          className="
          w-full
          border
          rounded
          p-3
          "

        />





        <textarea

          name="address"

          value={formData.address || ""}

          onChange={handleChange}

          placeholder="Address"

          className="
          w-full
          border
          rounded
          p-3
          "

        />





        <button

          type="submit"

          className="
          bg-blue-600
          text-white
          px-5
          py-2
          rounded-lg
          hover:bg-blue-700
          "

        >

          Update Supplier

        </button>



      </form>


    </div>

  );

};



export default EditSupplier;