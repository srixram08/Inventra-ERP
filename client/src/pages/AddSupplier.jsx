import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createSupplier,
} from "../api/supplierApi";


const AddSupplier = () => {


  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    address: "",

  });



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      await createSupplier(formData);


      alert(
        "Supplier added successfully"
      );


      navigate("/suppliers");



    } catch(error) {


      console.error(error);


      alert(
        "Failed to add supplier"
      );


    }

  };




  return (

    <div className="p-6">


      <h1 className="text-3xl font-bold mb-6">

        Add Supplier

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

          placeholder="Supplier Name"

          value={formData.name}

          onChange={handleChange}

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

          placeholder="Email"

          value={formData.email}

          onChange={handleChange}

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

          placeholder="Phone"

          value={formData.phone}

          onChange={handleChange}

          className="
          w-full
          border
          rounded
          p-3
          "

        />





        <textarea

          name="address"

          placeholder="Address"

          value={formData.address}

          onChange={handleChange}

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

          Save Supplier

        </button>



      </form>


    </div>

  );

};



export default AddSupplier;