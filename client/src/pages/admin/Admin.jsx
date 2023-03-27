import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import "./admin.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AddButton } from "../../components/addButton/AddButton";
import { AddProduct } from "../../components/addProduct/AddProduct";
import { AuthContext } from "../../context/authContext";
import { axiosInstance } from "../../config";

export const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [close, setClose] = useState(false);
  const status = ["preparing", "on the way", "delivered"];
  const { currentAdmin } = useContext(AuthContext);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productRes = await axiosInstance.get("/products");
        const orderRes = await axiosInstance.get("/orders");

        setProducts(productRes.data);
        setOrders(orderRes.data);
      } catch (err) {
        throw err;
      }
    };
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete("/products/" + id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orders.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axiosInstance.put("/orders/" + id, {
        status: currentStatus + 1,
      });

      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!currentAdmin ? (
        "You are not allowed to"
      ) : (
        <div className="admin">
          <Navbar />
          <div className="adminContainer">
            <div className="adminItem">
              <h1 className="adminTitle">Products</h1>
              <AddButton setClose={setClose} />
              {close && <AddProduct setClose={setClose} />}

              <table className="adminTable">
                <tbody>
                  <tr className="adminTrTitle">
                    <th>Image</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </tbody>
                {products?.map((product) => (
                  <tbody key={product._id}>
                    <tr className="adminTrTitle">
                      <td>
                        <img
                          src={product.img}
                          alt=""
                          className="adminPizzaImg"
                        />
                      </td>
                      <td>{product._id.slice(0, 5)}...</td>
                      <td>{product.title}</td>
                      <td>${product.prices[0]}</td>
                      <td>
                        <button className="adminButton">Edit</button>
                        <button
                          className="adminButton"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            <div className="adminItem">
              <h1 className="adminTitle">Orders</h1>
              <table className="adminTable">
                <tbody>
                  <tr className="adminTrTitle">
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </tbody>
                {orders?.map((order) => (
                  <tbody>
                    <tr className="adminTrTitle">
                      <td>{order._id.slice(0, 5)}...</td>
                      <td>{order.customer}</td>
                      <td>${order.total}</td>
                      <td>
                        {order.method === 0 ? (
                          <span>cash</span>
                        ) : (
                          <span>paid</span>
                        )}
                      </td>
                      <td>{status[order.status]}</td>
                      <td>
                        <button onClick={() => handleStatus(order._id)}>
                          Next Stage
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
