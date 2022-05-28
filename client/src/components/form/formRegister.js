import { useState } from "react";

import { Alert } from "react-bootstrap";
import "./form.css";

import { API } from "../../config/API";

export default function FormRegister() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState();

  const { fullname, email, password } = form;

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

      const response = await API.post("/register", body, config);

      if (response?.data.status === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
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
          Register
        </div>
        {message && message}
        <form>
          <div className="mt-3 form">
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              name="fullname"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="px-3 py-2 mt-3"
            />
          </div>
          <div className="d-grid gap-2 mt-5">
            <button
              type="submit"
              className="btn btn-login"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
