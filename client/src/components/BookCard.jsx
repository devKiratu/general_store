function BookCard({ product, onMarkForDelete }) {
  return (
    <div className="p-card">
      <input
        type="checkbox"
        id={product.sku}
        className="delete-checkbox"
        onClick={(e) => {
          onMarkForDelete(e.target.id);
        }}
      />
      <p>{product.sku}</p>
      <p>{product.name}</p>
      <p>{product.price} $</p>
      <p>Weight: {product.weight}KG</p>
    </div>
  );
}

export default BookCard;
