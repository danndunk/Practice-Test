import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

import { Alert } from "react-bootstrap";
import "./form.css";

import { API } from "../../config/API";

export default function FormLogin() {
  const navigate = useNavigate();
  const [_, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState();

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/login", body, config);
      console.log(response.data);

      if (response?.data.status === "success") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        navigate("/products");
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            {response.data.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card-auth p-4">
        <div
          style={{ fontSize: "36px", lineHeight: "49px", fontWeight: "700" }}
          className="mb-3"
        >
          Login
        </div>
        {message && message}
        <form onSubmit={handleSubmit}>
          <div className="mt-3 form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              id="email"
              name="email"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              id="password"
              name="password"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
          </div>
          <div className="d-grid gap-2 mt-5">
            <button type="submit" className="btn btn-login">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
