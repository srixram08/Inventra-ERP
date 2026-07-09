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

import Supplier from "./pages/Supplier";


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



        {/* Protected Routes */}

        <Route

          element={

            <ProtectedRoute>

              <Layout />

            </ProtectedRoute>

          }

        >


          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          <Route
            path="/products"
            element={<Products />}
          />


          <Route
            path="/customers"
            element={<Customers />}
          />


          <Route
            path="/suppliers"
            element={<Supplier />}
          />


        </Route>



        {/* fallback */}

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