import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import EditCustomer from "./pages/EditCustomer";


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



          {/* Add Customer */}

          <Route

            path="/customers/add"

            element={<AddCustomer />}

          />



          {/* Edit Customer */}

          <Route

            path="/customers/edit/:id"

            element={<EditCustomer />}

          />



        </Route>




        {/* Unknown Routes */}

        <Route

          path="*"

          element={
            <Navigate
              to="/"
              replace
            />
          }

        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;