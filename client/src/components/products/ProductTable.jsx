const ProductTable = ({ products, loading }) => {
  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Total Products: {products.length}</h2>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>Category:</strong> {product.category?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductTable;