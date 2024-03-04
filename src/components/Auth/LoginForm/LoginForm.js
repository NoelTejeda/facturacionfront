import React, { useState } from "react"
import { Form, Button } from "semantic-ui-react"
import { useFormik } from "formik"
import { setToken, decodeToken } from "../../../utils/token"
import useAuth from "../../../hooks/useAuth"
import axios from "axios"
import * as Yup from "yup"
import "./LoginForm.scss"
import { urllogin } from "../../../utils/url"



const url = `${urllogin}/login`

export default function LoginForm() {
  const { setUser } = useAuth()
  const [error, setError] = useState("")

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object({
      nombreUsuario: Yup.string().required(
        "El nombre de Usuario es Obligatorio"
      ),
      password: Yup.string().required("La Contraseña es Obligatoria")
    }),
    onSubmit: (formData) => {
      axios.post(url, formData, { headers: { userName: formData.nombreUsuario } }).then(
        (response) => {
          console.debug(response.status)
          const { token } = response.data
          setToken(token)
          setUser(decodeToken(token))
        },
        (error) => {
          if (error.message === "Network Error") {
            setError("Error de Conexión")
            console.debug("Network Error en LoginForm")
            formik.resetForm()
            setTimeout(() => {
              setError("")
            }, 3000)
          } else if (error.response.status === 401) {
            setError("Usuario Bloqueado")
            setTimeout(() => {
              setError("")
            }, 3000)
          } else {
            setError("Error en el Usuario o Contraseña")
            console.debug(error.message)
            formik.resetForm()
            setTimeout(() => {
              setError("")
            }, 3000)
          }
        }
      )
    }
  })

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <h2>Ingresa al Sistema</h2>
      <Form.Input
        icon='user'
        iconPosition='left'
        type="text"
        placeholder="Usuario"
        name="nombreUsuario"
        autoComplete="current-password"
        value={formik.values.nombreUsuario}
        onChange={formik.handleChange}
        error={formik.errors.nombreUsuario && true}
      />
      <Form.Input
        icon='key'
        iconPosition='left'
        type="password"
        placeholder="Contraseña"
        name="password"
        autoComplete="current-password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password && true}
      />
      <Button type="submit" className="btn-submit">
        Iniciar Sesion
      </Button>
      {error && <p className="submit-error">{error}</p>}
    </Form>
  )
}

function initialValues() {
  return {
    nombreUsuario: "",
    password: ""
  }
}
