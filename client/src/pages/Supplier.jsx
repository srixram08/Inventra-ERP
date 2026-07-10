import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

import {
  getSuppliers,
  deleteSupplier,
} from "../api/supplierApi";

function Supplier() {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================
  // FETCH SUPPLIERS
  // ==========================

  const fetchSuppliers = async () => {
    try {
      setLoading(true);

      const response = await getSuppliers();

      console.log("SUPPLIER API RESPONSE:", response.data);

      const data = response.data.suppliers || [];

      setSuppliers(data);
      setFilteredSuppliers(data);
    } catch (error) {
      console.error("Supplier Fetch Error:", error);
      alert("Failed to load suppliers");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // LOAD DATA ON PAGE LOAD
  // ==========================

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // ==========================
  // SEARCH
  // ==========================

  useEffect(() => {
    const result = suppliers.filter(
      (supplier) =>
        supplier.name?.toLowerCase().includes(search.toLowerCase()) ||
        supplier.email?.toLowerCase().includes(search.toLowerCase()) ||
        supplier.phone?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredSuppliers(result);
  }, [search, suppliers]);

  // ==========================
  // DELETE SUPPLIER
  // ==========================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this supplier?")) return;

    try {
      await deleteSupplier(id);
      fetchSuppliers();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-xl">
        Loading Suppliers...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Suppliers
        </h1>

        <button
          onClick={() => navigate("/suppliers/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Supplier
        </button>
      </div>

      <div className="relative mb-5">
        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg py-2 pl-10 pr-4"
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSuppliers.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6"
                >
                  No Suppliers Found
                </td>
              </tr>
            ) : (
              filteredSuppliers.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="border-t"
                >
                  <td className="p-3">{supplier.name}</td>
                  <td className="p-3">{supplier.email || "-"}</td>
                  <td className="p-3">{supplier.phone || "-"}</td>
                  <td className="p-3">{supplier.address || "-"}</td>

                  <td className="p-3">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() =>
                          navigate(`/suppliers/edit/${supplier.id}`)
                        }
                        className="text-blue-600"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(supplier.id)
                        }
                        className="text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Supplier;