import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createSupplier } from "../api/supplierApi";


function AddSupplier() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    name: "",
    email: "",
    phone: "",
    address: "",

  });



  const [loading, setLoading] = useState(false);





  const handleChange = (e)=>{

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };







  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{


      setLoading(true);


      await createSupplier(formData);



      alert(
        "Supplier Added Successfully"
      );


      navigate("/suppliers");



    }catch(error){


      console.error(
        "Add Supplier Error:",
        error
      );


      alert(
        "Failed to add supplier"
      );


    }finally{


      setLoading(false);


    }


  };







  return (

    <div className="p-6">


      <h1 className="text-3xl font-bold mb-6">

        Add Supplier

      </h1>





      <div className="
      bg-white
      rounded-xl
      shadow
      p-6
      max-w-xl
      ">



        <form onSubmit={handleSubmit}>



          <div className="mb-4">


            <label className="block mb-2 font-medium">

              Name

            </label>


            <input

              type="text"

              name="name"

              value={formData.name}

              onChange={handleChange}

              required

              className="
              w-full
              border
              rounded-lg
              px-3
              py-2
              "

            />


          </div>







          <div className="mb-4">


            <label className="block mb-2 font-medium">

              Email

            </label>


            <input

              type="email"

              name="email"

              value={formData.email}

              onChange={handleChange}

              className="
              w-full
              border
              rounded-lg
              px-3
              py-2
              "

            />


          </div>







          <div className="mb-4">


            <label className="block mb-2 font-medium">

              Phone

            </label>


            <input

              type="text"

              name="phone"

              value={formData.phone}

              onChange={handleChange}

              className="
              w-full
              border
              rounded-lg
              px-3
              py-2
              "

            />


          </div>







          <div className="mb-4">


            <label className="block mb-2 font-medium">

              Address

            </label>


            <textarea

              name="address"

              value={formData.address}

              onChange={handleChange}

              className="
              w-full
              border
              rounded-lg
              px-3
              py-2
              "

            />

          </div>







          <button

            type="submit"

            disabled={loading}

            className="
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-lg
            hover:bg-blue-700
            "

          >

            {
              loading
              ?
              "Saving..."
              :
              "Add Supplier"
            }


          </button>




        </form>



      </div>



    </div>

  );

}


export default AddSupplier;