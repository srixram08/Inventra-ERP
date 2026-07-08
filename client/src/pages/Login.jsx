import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );


      if(response.data.success){

        localStorage.setItem(
          "token",
          response.data.token
        );


        navigate("/dashboard");

      }

    } catch(error){

      setError(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">


      <div className="bg-white p-8 rounded-xl shadow-lg w-96">


        <h1 className="text-3xl font-bold text-center mb-6">
          Inventra ERP
        </h1>


        {error && (
          <p className="text-red-500 text-center mb-3">
            {error}
          </p>
        )}


        <form onSubmit={handleLogin}>


          <input

            type="email"

            name="email"

            placeholder="Email"

            value={formData.email}

            onChange={handleChange}

            className="w-full p-3 border rounded mb-4"

          />



          <input

            type="password"

            name="password"

            placeholder="Password"

            value={formData.password}

            onChange={handleChange}

            className="w-full p-3 border rounded mb-4"

          />



          <button

            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"

          >

            Login

          </button>


        </form>


      </div>


    </div>

  );
}


export default Login;