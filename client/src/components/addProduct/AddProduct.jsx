import { useState } from "react";
import "./addProduct.css";
import axios from "axios";
import { axiosInstance } from "../../config";

export const AddProduct = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dwr3xxgpz/image/upload",
        data
      );
      const { url } = uploadResponse.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

      await axiosInstance.post("/products", newProduct);
      setClose(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="addProductContainer">
      <div className="addProductWrapper">
        <span onClick={() => setClose(false)} className="addProductClose">
          X
        </span>
        <h1>Add a new pizza</h1>
        <div className="addPizzaItem">
          <label className="addProductLabel">Choose an image</label>
          <input
            className="addProductInput"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addPizzaItem">
          <label className="addProductLabel">Title</label>
          <input
            className="addProductInput"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="addPizzaItem">
          <label className="addProductLabel">Desc</label>
          <textarea
            className="addProductInput"
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="addPizzaItem">
          <label className="addProductLabel">Prices</label>
          <div className="priceContainer">
            <input
              className="addProductInput addProductInputSm"
              placeholder="Small"
              type="number"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className="addProductInput addProductInputSm"
              placeholder="Medium"
              type="number"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className="addProductInput addProductInputSm"
              placeholder="Large"
              type="number"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className="addPizzaItem">
          <div className="extraContainer">
            <label className="addProductLabel">Extra</label>
            <input
              className="addProductInput addProductInputSm"
              name="text"
              placeholder="Item"
              type="text"
              onChange={handleExtraInput}
            />
            <input
              className="addProductInput addProductInputSm"
              name="price"
              placeholder="Price"
              type="number"
              onChange={handleExtraInput}
            />
            <button className="extraButton" onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className="extraItems">
            {extraOptions.map((option) => (
              <span key={option.text} className="extraItem">
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className="addProductButton" onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
};
