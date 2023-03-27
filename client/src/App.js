
import { Home } from "./pages/home/Home"
import { Product } from "./pages/product/Product"
import { Card } from "./pages/card/Card";
import { Order } from "./pages/order/Order";
import { Admin } from "./pages/admin/Admin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Login } from "./pages/login/Login";



function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/orders/:id" element={<Order />} />
          <Route path="/card" element={<Card />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
