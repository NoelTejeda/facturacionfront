import React from 'react';
import { Form , Button } from "semantic-ui-react";
import "./RegisterForm.scss";

export default function RegisterForm(props) {
    const {setShowLogin} = props;
    console.debug(setShowLogin);

    const onSubmit = () =>{
        console.debug("Enviando Formulario")

    }

    return (
        <>
            <h2 className="register-form-title">Registrate para Ingresar al Sistema</h2>
            <Form className="register-form" onSubmit={onSubmit}>
                <Form.Input
                    type="text"
                    placeholder="Nombre y Apellido"
                    name="name"
                />
                <Form.Input
                    type="text"
                    placeholder="Usuario"
                    name="username"
                />
                <Form.Input
                    type="text"
                    placeholder="Correo Electronico"
                    name="email"
                />
                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                />
                <Form.Input
                    type="text"
                    placeholder="Repetir Contraseña"
                    name="repeatPassword"
                />
                <Button type="submit" className="btn-submit">Registrarse</Button>
            </Form>
        </>
    )
}
