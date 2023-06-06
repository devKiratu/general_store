function ProductCard({ product }) {
  return (
    <div className="p-card">
      <input
        type="checkbox"
        id={product.sku}
        className="delete-checkbox"
        onClick={(e) => {
          console.log(e.target.id, e.target.checked);
        }}
      />
      <p>{product.sku}</p>
      <p>{product.name}</p>
      <p>{product.price}$</p>
    </div>
  );
}

export default ProductCard;
