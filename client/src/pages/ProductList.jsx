import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  async function loadProducts() {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    console.log(data);
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <div className="page-container">
      <main>
        <nav>
          <h2>Product List</h2>
          <div className="btns">
            <button>Add</button>
            <button>Mass Delete</button>
          </div>
        </nav>
        <hr />
        <div className="p-list">
          {products.map((p) => (
            <ProductCard key={p.sku} product={p} />
          ))}
        </div>
      </main>
      <footer>
        <hr />
        <p>Scandiweb Test assignment</p>
      </footer>
    </div>
  );
}

export default ProductList;
