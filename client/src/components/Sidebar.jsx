import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Truck,
  FileText,
  LogOut,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";


function Sidebar() {


  const navigate = useNavigate();

  const location = useLocation();



  const menuItems = [


    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },


    {
      name: "Products",
      icon: Package,
      path: "/products",
    },


    {
      name: "Customers",
      icon: Users,
      path: "/customers",
    },


    {
      name: "Sales",
      icon: ShoppingCart,
      path: "/sales",
    },


    {
      name: "Suppliers",
      icon: Truck,
      path: "/suppliers",
    },
    {
      name: "Purchases",
      path: "/purchases",
      icon: ShoppingCart,
    },

    {
      name: "Reports",
      icon: FileText,
      path: "/reports",
    },


  ];




  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };





  return (


    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">


      <h1 className="text-2xl font-bold mb-8">

        Inventra ERP

      </h1>




      <div className="space-y-2">


        {menuItems.map((item)=>{


          const Icon = item.icon;


          return (


            <button


              key={item.name}



              onClick={()=>{


                console.log(
                  "Clicked:",
                  item.name,
                  "Path:",
                  item.path
                );


                navigate(item.path);


              }}



              className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                
                location.pathname === item.path

                ? "bg-blue-600"

                : "hover:bg-slate-700"

              }`}


            >


              <Icon size={20}/>


              {item.name}


            </button>


          );


        })}



      </div>





      <button


        onClick={logout}


        className="
        w-full
        flex
        items-center
        gap-3
        mt-10
        p-3
        rounded-lg
        hover:bg-red-600
        "


      >


        <LogOut size={20}/>


        Logout


      </button>




    </div>


  );

}



export default Sidebar;