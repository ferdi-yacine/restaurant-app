import "./order.css";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import paid from "../../public/img/paid.png";
import checked from "../../public/img/checked.png";
import bake from "../../public/img/bake.png";
import bike from "../../public/img/bike.png";
import delivered from "../../public/img/delivered.png";
import { Location, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";

export const Order = () => {
  const [order, setOrder] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const statusClass = (index) => {
    if (index - status < 1) return "done";
    if (index - status === 1) return "inProgress";
    if (index - status > 1) return "failled";
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axiosInstance.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        throw err;
      }
    };
    console.log(order);
    getOrders();
  }, [id]);

  const status = order.status;

  return (
    <div className="order">
      <Navbar />
      <div className="orderContainer">
        <div className="orderLeft">
          <div className="orderRow">
            <table className="orderTable">
              <tr className="orderTableTrTitlr">
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
              <tr className="orderTableTr">
                <td>
                  <span className="orderTableId">{order._id}</span>
                </td>
                <td>
                  <span className="orderTableName">{order.customer}</span>
                </td>
                <td>
                  <span className="orderTableAddress">{order.address}</span>
                </td>
                <td>
                  <span className="orderTableTotal">${order.total}</span>
                </td>
              </tr>
            </table>
          </div>
          <div className="orderRow">
            <div className={statusClass(0)}>
              <img className="orderStatusIcon" src={paid} alt="" />
              <span>Payment</span>
              <div className="orderStatusChecked">
                <img className="orderStatusCheckedIcon" src={checked} alt="" />
              </div>
            </div>
            <div className={statusClass(1)}>
              <img className="orderStatusIcon" src={bake} alt="" />
              <span>Preparing</span>
              <div className="orderStatusChecked">
                <img className="orderStatusCheckedIcon" src={checked} alt="" />
              </div>
            </div>
            <div className={statusClass(2)}>
              <img className="orderStatusIcon" src={bike} alt="" />
              <span>Payment</span>
              <div className="orderStatusChecked">
                <img className="orderStatusCheckedIcon" src={checked} alt="" />
              </div>
            </div>
            <div className={statusClass(3)}>
              <img className="orderStatusIcon" src={delivered} alt="" />
              <span>Payment</span>
              <div className="orderStatusChecked">
                <img className="orderStatusCheckedIcon" src={checked} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="orderRight">
          <div className="cardWrapper">
            <h2 className="cardRightWrapper">CART TOTAL</h2>
            <div className="cardRightTotalText">
              <b className="cardRightTotalTextTitle">Subtotal:</b>${order.total}
            </div>
            <div className="cardRightTotalText">
              <b className="cardRightTotalTextTitle">Discount:</b>$0.00
            </div>
            <div className="cardRightTotalText">
              <b className="cardRightTotalTextTitle">Total:</b>${order.total}
            </div>
            <button disabled className="orderButton">
              PAID
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
