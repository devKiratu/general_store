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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateErrors()) return;
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
    saveProduct(product);
    navigate("/", { replace: true });
  };

  const saveProduct = async (product) => {
    await fetch("https://ndunguc.000webhostapp.com/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
  };

  const validateErrors = () => {
    if (sku.trim() === "") {
      setErrors({ ...errors, sku: "Please provide a valid SKU" });
      return true;
    }
    if (name.trim() === "") {
      setErrors({ ...errors, name: "Please provide a valid name" });
      return true;
    }
    if (currentProduct === null || currentProduct === "Type Switcher") {
      setErrors({
        ...errors,
        productType: "Please select product type",
      });
      return true;
    }
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
              onChange={(e) => {
                setErrors({ ...errors, sku: "" });
                setSku(e.target.value);
              }}
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter a valid SKU")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>
          {errors.sku && <p className="error-msg">{errors.sku}</p>}
          <div className="input-grp">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => {
                setErrors({ ...errors, name: "" });
                setName(e.target.value);
              }}
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter a valid name")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>
          {errors.name && <p className="error-msg">{errors.name}</p>}
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
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter a valid price in $")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>
          <div className="input-grp">
            <label htmlFor="productType">Type Switcher</label>
            <select
              id="productType"
              onChange={(e) => {
                setErrors({ ...errors, productType: "" });
                setCurrentProduct(e.target.value);
              }}
              required
            >
              <option defaultValue>Type Switcher</option>
              <option id={"DVD"}>DVD</option>
              <option id={"Furniture"}>Furniture</option>
              <option id={"Book"}>Book</option>
            </select>
          </div>
          {errors.productType && (
            <p className="error-msg">{errors.productType}</p>
          )}
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
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Please enter a valid size in MB"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </div>
              <p className="type-desc">Please provide size in MB</p>
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
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Please enter a valid height in CM"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
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
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Please enter a valid width in CM"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
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
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Please enter a valid length in CM"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </div>
              <p className="type-desc">
                Please provide dimensions in HxWxL format
              </p>
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
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Please enter a valid weight in KG"
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </div>
              <p className="type-desc">Please provide weight in KG</p>
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
