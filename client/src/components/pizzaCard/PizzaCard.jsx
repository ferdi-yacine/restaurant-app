import "./pizzaCard.css";
import { Link } from "react-router-dom";

export const PizzaCard = ({ pizza }) => {
  return (
    <div className="pizzaCardContainer">
      <Link to={`/product/${pizza._id}`}>
        <img className="pizzaCardImg" src={pizza.img} alt="" />
      </Link>
      <h1 className="pizzaCardTitle">{pizza.title}</h1>
      <span className="pizzaCardPrice">${pizza.prices[0]}</span>
      <p className="pizzaCardDesc">{pizza.desc}</p>
    </div>
  );
};
