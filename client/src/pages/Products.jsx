import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getProducts } from "../api/productApi";
import ProductTable from "../components/products/ProductTable";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      console.log("Products API:", response.data);

      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Product Management
          </h1>

          <p className="text-gray-500">
            Manage all inventory products
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <ProductTable
        products={products}
        loading={loading}
      />
    </>
  );
}

export default Products;