import { Bell, UserCircle } from "lucide-react";


function Navbar() {


  return (

    <div className="h-16 bg-white shadow flex items-center justify-between px-6">


      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>



      <div className="flex items-center gap-5">


        <Bell 
          size={22}
          className="cursor-pointer"
        />


        <div className="flex items-center gap-2">

          <UserCircle size={30}/>

          <span className="font-medium">
            Admin
          </span>

        </div>


      </div>


    </div>

  );

}


export default Navbar;