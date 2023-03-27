import { PizzaCard } from "../pizzaCard/PizzaCard";
import "./pizzaList.css";

export const PizzaList = ({ pizzaList }) => {
  return (
    <div className="pizzaListContainer" id="pizzas">
      <h1 className="pizzaListTitle">THE BEST PIZZA IN TOWN</h1>
      <p className="pizzaListDesc">
        This is Yalla restaurant! We sell the pizza, But not just a normal one,
        We have all the from all over the world, and with each one there is a
        group of specialists working to manufacture it. So Welcome to our
        Restaurant
      </p>
      <div className="pizzaListWrapper">
        {pizzaList.map((pizza) => (
          <PizzaCard pizza={pizza} key={pizza._id} />
        ))}
      </div>
    </div>
  );
};
