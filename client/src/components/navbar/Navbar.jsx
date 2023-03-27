import "./navbar.css";
import { Phone, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../public/img/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export const Navbar = () => {
  const quantity = useSelector((state) => state.card.quantity);
  const { currentAdmin, logout } = useContext(AuthContext);
  const handleLogout = (e) => {
    logout();
  };

  return (
    <div className="navbarContainer">
      <div className="navbarItem">
        <div className="navbarCallButton">
          <Phone className="navbarImg" />
        </div>
        <div className="navbarTexts">
          <div className="navbarText">ORDER NOW!</div>
          <div className="navbarText navbarPhone">+214 58 74 96</div>
        </div>
      </div>
      <div className="navbarItem">
        <ul className="navbarItemLists">
          <li className="navbarItemList">
            <a href="#featured">Homepage</a>
          </li>
          <li className="navbarItemList">
            {" "}
            <a href="#pizzas">Products</a>
          </li>
          <li className="navbarItemList logo">Menu</li>
          <Link to="/">
            <img className="navbarLogo" src={logo} alt="Yalla" />
          </Link>
          <li className="navbarItemList">Events</li>
          <li className="navbarItemList">Blog</li>
          <li className="navbarItemList">
            {" "}
            <a href="#footer">Contact</a>
          </li>
          {currentAdmin && (
            <li className="navbarItemList" onClick={handleLogout}>
              Logout
            </li>
          )}
        </ul>
      </div>
      <Link to="/card">
        <div className="navbarItem">
          <div className="cart">
            <Badge
              badgeContent={quantity}
              color="secondary"
              className="navbarItemBadge"
            >
              <ShoppingCartOutlined className="navbarItemCart" />
            </Badge>
          </div>
        </div>
      </Link>
    </div>
  );
};
