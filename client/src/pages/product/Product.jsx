import "./product.css";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import pizzaImg from "../../public/img/pizza.png";
import productSize from "../../public/img/size.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cardSlice";
import { axiosInstance } from "../../config";

export const Product = () => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [extras, setExtras] = useState([]);
  const [pizza, setPizza] = useState({});
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        setPizza(res.data);
        setPrice(res.data.prices?.[0]);
      } catch (err) {
        throw err;
      }
    };
    getProducts();
  }, [id]);

  return (
    <div className="product">
      <Navbar />
      <div className="productContainer">
        <div className="productContainerLeft">
          <div className="imgContainer">
            <img className="productImg" src={pizza.img} alt="" />
          </div>
        </div>
        <div className="productContainerRight">
          <h1 className="productName">{pizza?.title}</h1>
          <span className="productPrice">${pizza.prices?.[size]}</span>
          <p className="productDesc"> {pizza.desc} </p>
          <h3 className="productChoose">Choose the size</h3>
          <div className="productSizes">
            <div className="productSize" onClick={() => handleSize(0)}>
              <img className="productSizeImg" src={productSize} alt="" />
              <span className="productNumber">M</span>
            </div>
            <div className="productSize" onClick={() => handleSize(1)}>
              <img
                className="productSizeImg productMedium"
                src={productSize}
                alt=""
              />
              <span className="productNumber">L</span>
            </div>
            <div className="productSize" onClick={() => handleSize(2)}>
              <img
                className="productSizeImg productLarge"
                src={productSize}
                alt=""
              />
              <span className="productNumber">XL</span>
            </div>
          </div>
          <h3 className="ProductChooseIngr">Choose additional ingredients</h3>
          <div className="productIngrediants">
            {pizza.extraOptions?.map((option) => (
              <div className="productOption">
                <input
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  className="productOptionCheckbox"
                  onChange={(e) => handleChange(e, option)}
                />
                <label htmlFor={option.text}>{option.text}</label>
              </div>
            ))}
          </div>
          <div className="productAdd">
            <input
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              defaultValue={1}
              className="productQuantity"
            />
            <button className="productButton" onClick={handleClick}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
