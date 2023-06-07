import { Link } from "react-router-dom";

function AddProduct() {
  return (
    <div className="page-container">
      <main>
        <nav>
          <h2>Product Add</h2>
          <div className="btns">
            <button>Save</button>
            <Link to={"/"}>
              <button>Cancel</button>
            </Link>
          </div>
        </nav>
        <hr />
      </main>
      <footer>
        <hr />
        <p>Scandiweb Test assignment</p>
      </footer>
    </div>
  );
}

export default AddProduct;
