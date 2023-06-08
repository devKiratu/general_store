import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import FurnitureCard from "../components/FurnitureCard";
import DVDCard from "../components/DVDCard";
import { Link } from "react-router-dom";

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
            <Link to={"/addproduct"}>
              <button>Add</button>
            </Link>
            <button>Mass Delete</button>
          </div>
        </nav>
        <hr />
        <div className="p-list">
          {products.map((p) => {
            switch (p.product_type) {
              case "Book":
                return <BookCard key={p.sku} product={p} />;
              case "Furniture":
                return <FurnitureCard key={p.sku} product={p} />;
              case "DVD":
                return <DVDCard key={p.sku} product={p} />;
              default:
                return null;
            }
          })}
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
