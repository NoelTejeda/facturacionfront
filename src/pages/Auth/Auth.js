import React, { useState } from "react"
import { Container, Image } from "semantic-ui-react"
import LoginForm from "../../components/Auth/LoginForm"
import RegisterForm from "../../components/Auth/RegisterForm"
import movilnet from "../../assets/jpg/movilnetlogo.png"
//import movilnetfondo from "../../assets/jpg/fondo-movilnet.png";
import "./Auth.scss"

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <Container fluid className="auth">
      <Image src={movilnet} />

      <div className="container-form">
        {showLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>
    </Container>
  )
}
