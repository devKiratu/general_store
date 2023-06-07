import { useState } from "react";
import { Link } from "react-router-dom";

function AddProduct() {
  const [currentProduct, setCurrentProduct] = useState(null);
  return (
    <div className="page-container">
      <main>
        <nav>
          <h2>Product Add</h2>
          <div className="btns">
            <button form="product_form" type="submit">
              Save
            </button>
            <Link to={"/"}>
              <button>Cancel</button>
            </Link>
          </div>
        </nav>
        <hr />
        <form id="product_form">
          <div className="input-grp">
            <label htmlFor="sku">SKU</label>
            <input type="text" id="sku" required />
          </div>
          <div className="input-grp">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <div className="input-grp">
            <label htmlFor="price">Price ($)</label>
            <input type="number" id="price" required />
          </div>
          <div className="input-grp">
            <label htmlFor="productType">Type Switcher</label>
            <select
              id="productType"
              onChange={(e) => setCurrentProduct(e.target.value)}
              required
            >
              <option defaultValue>Type Switcher</option>
              <option id={"DVD"}>DVD</option>
              <option id={"Furniture"}>Furniture</option>
              <option id={""}>Book</option>
            </select>
          </div>
          {currentProduct === "DVD" && (
            <div className="type-container">
              <div className="input-grp">
                <label htmlFor="size">Size (MB)</label>
                <input type="number" id="size" required />
              </div>
              <p>Please provide size</p>
            </div>
          )}
          {currentProduct === "Furniture" && (
            <div className="type-container">
              <div className="input-grp">
                <label htmlFor="height">Height (CM)</label>
                <input type="number" id="height" required />
              </div>
              <div className="input-grp">
                <label htmlFor="width">Width (CM)</label>
                <input type="number" id="width" required />
              </div>
              <div className="input-grp">
                <label htmlFor="length">Length (CM)</label>
                <input type="number" id="length" required />
              </div>
              <p>Please provide dimensions</p>
            </div>
          )}
          {currentProduct === "Book" && (
            <div className="type-container">
              <div className="input-grp">
                <label htmlFor="weight">Weight (KG)</label>
                <input type="number" id="weight" required />
              </div>
              <p>Please provide weight</p>
            </div>
          )}
        </form>
      </main>
      <footer>
        <hr />
        <p>Scandiweb Test assignment</p>
      </footer>
    </div>
  );
}

export default AddProduct;
