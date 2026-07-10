import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


// Pages

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";


import Supplier from "./pages/Supplier";
import AddSupplier from "./pages/AddSupplier";
import EditSupplier from "./pages/EditSupplier";


// Components

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {


  return (


    <BrowserRouter>


      <Routes>



        {/* Login */}

        <Route

          path="/"

          element={<Login />}

        />





        {/* Protected ERP Routes */}


        <Route


          element={

            <ProtectedRoute>

              <Layout />

            </ProtectedRoute>

          }


        >




          {/* Dashboard */}

          <Route

            path="/dashboard"

            element={<Dashboard />}

          />







          {/* Products */}

          <Route

            path="/products"

            element={<Products />}

          />







          {/* Customers */}


          <Route

            path="/customers"

            element={<Customers />}

          />



          <Route

            path="/customers/add"

            element={<AddCustomer />}

          />



          <Route

            path="/customers/edit/:id"

            element={<EditCustomer />}

          />









          {/* Suppliers */}



          <Route

            path="/suppliers"

            element={<Supplier />}

          />



          <Route

            path="/suppliers/add"

            element={<AddSupplier />}

          />



          <Route

            path="/suppliers/edit/:id"

            element={<EditSupplier />}

          />





        </Route>







        {/* Unknown Route */}

        <Route

          path="*"

          element={

            <Navigate

              to="/dashboard"

              replace

            />

          }

        />




      </Routes>


    </BrowserRouter>


  );

}


export default App;