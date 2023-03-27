import "./card.css";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cardSlice";
import { OrderDetail } from "../../components/orderDetail/OrderDetail";
import { axiosInstance } from "../../config";

export const Card = () => {
  const card = useSelector((state) => state.card);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = card.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createOrder = async (data) => {
    console.log(data);
    try {
      const res = await axiosInstance.post("/orders", data);

      res.status === 201 && navigate("/orders/" + res.data._id);
      dispatch(reset());
    } catch (err) {
      console.log(err);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              console.log(shipping);
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: card.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className="card">
      <Navbar />
      <div className="cardContainer">
        <div className="cardLeft">
          <table className="cardTable">
            <tbody>
              <tr className="cardTableTitle">
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </tbody>
            <tbody>
              {card.products.map((product) => (
                <tr className="cardTableRow" key={product._id}>
                  <td>
                    <div className="cardTableImgContainer">
                      <img className="cardTableImg" src={product.img} alt="" />
                    </div>
                  </td>
                  <td>
                    <span className="cardTableName">{product.title}</span>
                  </td>
                  <td>
                    <span className="cardTableExtras">
                      {product.extras.map((extra) => (
                        <span>{extra.text}</span>
                      ))}
                    </span>
                  </td>
                  <td>
                    <span className="cardTablePrice">${product.price}</span>
                  </td>
                  <td>
                    <span className="cardTableQuantity">
                      {product.quantity}
                    </span>
                  </td>
                  <td>
                    <span className="cardTableTotal">
                      ${product.price * product.quantity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cardRight">
          <div className="cardWrapper">
            <h2 className="cardRightWrapper">CART TOTAL</h2>
            <div className="cardRightTotalText">
              <b className="cardRightTotalTextTitle">Subtotal:</b>${card.total}
            </div>
            <div className="cardRightTotalText">
              <b className="cardRightTotalTextTitle">Discount:</b>$0.00
            </div>
            <div className="cardRightTotalText">
              <b className="cardRightTotalTextTitle">Total:</b>${card.total}
            </div>
            {open ? (
              <div className="paymentMethods">
                <button className="payButton" onClick={() => setCash(true)}>
                  CASH ON DELIVERY
                </button>
                <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "AQWZPvG97NvnrpwlSMQ0k7NSDj53Gso0M2GOfhsfen1D4RAG8k116IG4xQ_v2gwtmFP4jdYdewo0oKVB",
                      components: "buttons",
                      currency: "USD",
                      "disable-funding": "card",
                    }}
                  >
                    <ButtonWrapper currency={currency} showSpinner={false} />
                  </PayPalScriptProvider>
                </div>
              </div>
            ) : (
              <button onClick={() => setOpen(!open)} className="cardButton">
                CHECKOUT NOW!
              </button>
            )}
          </div>
        </div>
        {cash && <OrderDetail total={card.total} createOrder={createOrder} />}
      </div>
      <Footer />
    </div>
  );
};
