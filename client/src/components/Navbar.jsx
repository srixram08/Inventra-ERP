import { Bell, UserCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const getPageTitle = (path) => {
    if (path.startsWith("/dashboard")) return "Dashboard Overview";
    if (path.startsWith("/products")) return "Product Catalog";
    if (path.startsWith("/customers")) return "Customer Directory";
    if (path.startsWith("/suppliers")) return "Supplier Registry";
    if (path.startsWith("/purchases")) return "Purchase Orders";
    if (path.startsWith("/sales")) return "Sales Transactions";
    if (path.startsWith("/reports")) return "Business Intelligence & Reports";
    return "Inventra System Portal";
  };

  return (
    <div className="h-16 bg-white/70 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
      <h2 className="text-lg font-bold tracking-tight text-slate-800">
        {getPageTitle(location.pathname)}
      </h2>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all duration-200">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3.5 pl-4 border-l border-slate-200">
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-slate-800">Super Administrator</span>
            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Active session</span>
          </div>
          <div className="p-0.5 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full">
            <UserCircle size={32} className="text-white bg-slate-900 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;