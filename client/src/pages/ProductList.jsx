import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import FurnitureCard from "../components/FurnitureCard";
import DVDCard from "../components/DVDCard";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [ids, setIds] = useState([]);
  const loadProducts = async () => {
    const res = await fetch("https://ndunguc.000webhostapp.com/products");
    const data = await res.json();
    console.log(data);
    setProducts(data);
  };

  const updateDeleteObj = (id) => {
    if (ids.includes(id)) {
      setIds(ids.filter((el) => el !== id));
    } else {
      setIds([...ids, id]);
    }
  };

  const handleDelete = async () => {
    console.log("TO DELETE ====> ", ids);
    setProducts(products.filter((p) => !ids.includes(p.sku)));

    await fetch("https://ndunguc.000webhostapp.com/products/delete", {
      method: "POST",
      body: JSON.stringify({ ids }),
    });
  };

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
              <button>ADD</button>
            </Link>
            <button id="delete-product-btn" onClick={handleDelete}>
              MASS DELETE
            </button>
          </div>
        </nav>
        <hr />
        <div className="p-list">
          {products.map((p) => {
            switch (p.product_type) {
              case "Book":
                return (
                  <BookCard
                    key={p.sku}
                    product={p}
                    onMarkForDelete={updateDeleteObj}
                  />
                );
              case "Furniture":
                return (
                  <FurnitureCard
                    key={p.sku}
                    product={p}
                    onMarkForDelete={updateDeleteObj}
                  />
                );
              case "DVD":
                return (
                  <DVDCard
                    key={p.sku}
                    product={p}
                    onMarkForDelete={updateDeleteObj}
                  />
                );
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
