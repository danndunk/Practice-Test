import { useState } from "react";

import FormRegister from "../components/form/formRegister";
import FormLogin from "../components/form/formLogin";

import { Container, Row, Col } from "react-bootstrap";
import "./landingPage.css";

import Kopi from "../assets/image/kopi.png";

export default function LandingPage() {
  const [isRegist, setIsRegist] = useState(false);

  const switchFormLogin = () => {
    setIsRegist(false);
  };

  const switchFormRegister = () => {
    setIsRegist(true);
  };

  return (
    <div className="bg-black">
      <Container>
        <Row className="vh-100 d-flex align-items-center">
          <Col md="6">
            <img
              src={Kopi}
              alt=""
              style={{ width: "264px", height: "264px" }}
            />
            <div className="text-auth-header mt-4">#SEDUHAN_TERNYAMAN</div>
            <p className="text-auth-parag mt-3">
              <b>Kurensia Coffee</b>
              <br />
              Bridging Your Desire Of Coffee
            </p>
            <div className="mt-5">
              <button onClick={switchFormLogin} className="btn btn-login px-5">
                Login
              </button>
              <button
                onClick={switchFormRegister}
                className="btn btn-register px-5"
              >
                Register
              </button>
            </div>
          </Col>
          <Col md="6">{isRegist ? <FormRegister /> : <FormLogin />}</Col>
        </Row>
      </Container>
    </div>
  );
}
