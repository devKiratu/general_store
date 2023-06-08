import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddProduct() {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let product = {
      sku,
      name,
      price: Number(price),
      productType: currentProduct,
    };
    switch (currentProduct) {
      case "Book":
        product = { ...product, weight: Number(weight) };
        break;
      case "Furniture":
        product = {
          ...product,
          height: Number(height),
          width: Number(width),
          length: Number(length),
        };
        break;
      case "DVD":
        product = { ...product, size: Number(size) };
        break;
      default:
        break;
    }
    console.log("Product ====> ", product);
    saveProduct(product);
    navigate("/", { replace: true });
  };

  const saveProduct = async (product) => {
    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
    const data = await res.json();

    console.log("RESPONSE =====>", data);
  };

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
        <form id="product_form" onSubmit={handleSubmit}>
          <div className="input-grp">
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              id="sku"
              required
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>
          <div className="input-grp">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-grp">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              min={0}
              step={0.01}
              id="price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
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
                <input
                  type="number"
                  min={0}
                  id="size"
                  required
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <p>Please provide size</p>
            </div>
          )}
          {currentProduct === "Furniture" && (
            <div className="type-container">
              <div className="input-grp">
                <label htmlFor="height">Height (CM)</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  id="height"
                  required
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="input-grp">
                <label htmlFor="width">Width (CM)</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  id="width"
                  required
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
              <div className="input-grp">
                <label htmlFor="length">Length (CM)</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  id="length"
                  required
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
              <p>Please provide dimensions</p>
            </div>
          )}
          {currentProduct === "Book" && (
            <div className="type-container">
              <div className="input-grp">
                <label htmlFor="weight">Weight (KG)</label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  id="weight"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
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
