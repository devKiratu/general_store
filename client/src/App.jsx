import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/" element={<ProductList />} />
          <Route path="*" element={<h2>404 | Route does not exist</h2>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
