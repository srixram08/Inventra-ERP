import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Truck,
  FileText,
  LogOut
} from "lucide-react";


function Sidebar() {


  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Products",
      icon: Package
    },
    {
      name: "Customers",
      icon: Users
    },
    {
      name: "Sales",
      icon: ShoppingCart
    },
    {
      name: "Suppliers",
      icon: Truck
    },
    {
      name: "Reports",
      icon: FileText
    }
  ];



  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";

  };



  return (

    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">


      <h1 className="text-2xl font-bold mb-8">
        Inventra ERP
      </h1>



      <div className="space-y-3">


        {
          menuItems.map((item,index)=>{

            const Icon = item.icon;


            return (

              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 cursor-pointer"
              >

                <Icon size={20}/>

                <span>
                  {item.name}
                </span>

              </div>

            );

          })
        }


      </div>



      <button

        onClick={logout}

        className="flex items-center gap-3 mt-10 p-3 w-full rounded-lg hover:bg-red-600"

      >

        <LogOut size={20}/>

        Logout

      </button>


    </div>

  );

}


export default Sidebar;