import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { AuthContext } from "../../context/authContext";

export const Login = () => {
  const [inputs, setInputs] = useState("");

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    e.preventDefault();

    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async () => {
    try {
      await login(inputs);
      navigate("/admin");
    } catch (err) {
      console.log(err.response);
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <h1>Admin Dashboard</h1>
        <input
          name="username"
          placeholder="username"
          className="loginInput"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="password"
          type="password"
          className="loginInput"
          onChange={handleChange}
        />
        <button onClick={handleClick} className="loginButton">
          Sign In
        </button>
        {error && <span className="loginError">Wrong Credentials</span>}
      </div>
    </div>
  );
};
