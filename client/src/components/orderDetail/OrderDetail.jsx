import { useState } from "react";
import "./orderDetail.css";

export const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };

  return (
    <div className="orderDetailContainer">
      <div className="orderDetailWrapper">
        <h1 className="orderDetailTitle">You will pay $12 after deliverey</h1>
        <div className="orderDetailItem">
          <label className="orderDetailLabel">Name Surname</label>
          <input
            placeholder="John Doe"
            type="text"
            className="orderDetailInput"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="orderDetailItem">
          <label className="orderDetailLabel">Phone Number</label>
          <input
            placeholder="+1 234 567 89"
            type="text"
            className="orderDetailInput"
          />
        </div>
        <div className="orderDetailItem">
          <label className="orderDetailLabel">Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className="orderDetailTextArea"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className="orderDetailButton" onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
};
