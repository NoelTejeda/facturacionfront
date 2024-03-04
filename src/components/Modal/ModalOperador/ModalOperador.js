import React, { useState } from "react"
import { Modal, Row, Col, Button, Form } from "react-bootstrap"
import axios from "axios"
import { getToken, decodeToken } from "../../../utils/token"
import { toast } from "react-toastify"
import { successtoast, errortoast } from "../../../utils/toastconfig"
import moment from "moment"
import { urlstandart } from "../../../utils/url"
import "./ModalOperador.scss"
//import { Input } from "semantic-ui-react"

const url = `${urlstandart}/api/v1/operador`

export default function ModalOperador(props) {
  const { show, setShow, title } = props
  const [error, setError] = useState(false)
  
  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const [erroroperador,setErroroperador] = useState(false)
  const [errorrif,setErrorrif] = useState(false)
  const [errortelefono,setErrortelefono] = useState(false)
  const [errordireccion,setErrordireccion] = useState(false)


  const [datos, setDatos] = useState()
  const [rif, setRif] = useState("")

  const handleInputChangeRif = (event) => {
    setRif({
        ...rif,
        [event.target.name]: event.target.value
      }
    )
  }

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
      rif: rif.rif1===undefined || rif.rif1 === null || rif.rif1 === "0" ? "V" + rif.rif : rif.rif1 + rif.rif, 
      fecha_registro: moment(Date.now()).format("DD-MM-YYYY"),
      hora_registro: moment(Date.now()).utcOffset("UTC -4").format("HH:mm:ss"),
      usuario: nombreUsuario,
      status: 1
    })
  }
  
  function handleKeyPress(e){
    if (e.target.value.length === 12) {
      e.preventDefault()
    }
  }

  function createPost() {
    if (datos === undefined ){
      setError(true) 
      setTimeout(() => {
        setError(false)
      }, 2000)
    }else {
      if (datos.operador === undefined ){
        setErroroperador(true)
        setTimeout(() => {
          setErroroperador(false)
        }, 2000)
      }else if (rif.rif === undefined || rif.rif.length < 8){
        setErrorrif(true)
        setTimeout(() => {
          setErrorrif(false)
        }, 2000)
      }else if (datos.telefono === undefined ){
        setErrortelefono(true)
        setTimeout(() => {
          setErrortelefono(false)
        }, 2000)
      }else if (datos.direccion === undefined){
        setErrordireccion(true)
        setTimeout(() => {
          setErrordireccion(false)
        }, 2000)
    }
    else{
    try {
      axios
        .post(url, datos, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(
          (response) => {
            toast("Operador Registrado Correctamente", successtoast)
            setShow(false)
            setDatos()
            setError(false)
            setErroroperador(false)
            setErrorrif(false)
            setErrortelefono(false)
            setErrordireccion(false)
            console.debug(response)
          },
          (error) => {
            toast("Error al Registrar el Operador", errortoast)
            setShow(false)
            setDatos()
            setError(false)
            setErroroperador(false)
            setErrorrif(false)
            setErrortelefono(false)
            setErrordireccion(false)
            console.debug(
              "Error al Registrar el Operador | Error en Conexion | Token Vencido" +
              error
            )
          }
        )
    } catch (error) {
      console.debug(error)
    }
  }}
  }

  const onClose = () => {
    setShow(false)
    setDatos()
    setRif([])
    setError(false)
    setErroroperador(false)
    setErrorrif(false)
    setErrortelefono(false)
    setErrordireccion(false)
  }

  return (
    <Modal show={show} onHide={() => {setShow(false) 
     }}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col xs={12} md={12}>
              <label
                for="operador"
                className="badge label-turquesa text-wrap badge-label"
              >
                Operador
              </label>
              <Form.Control
                placeholder="Operador"
                name="operador"
                onChange={handleInputChange}
                maxLength={30}
                required={true}
                />
              {erroroperador ? <label className="small text-center text-danger ml-0"> Debe llenar el campo </label> : ''}
            </Col>
            <Col xs={12} md={6}>
              <label
                for="rif"
                className="badge label-turquesa text-wrap badge-label"
              >
                RIF
              </label>
              <div className="input-group">
                <select name="rif1" onChange={handleInputChangeRif} id="rif1" className="form-control col-4" >
                  <option value="0" selected>-</option> 
                  <option value="V">V</option>
                  <option value="E">E</option>
                  <option value="J">J</option>
                  <option value="G">G</option>
                </select>
                <Form.Control onChange={handleInputChangeRif} type="text" name="rif" id="rif" placeholder="Número" minLength={9} maxLength={10} className="form-control" />   
              </div>
              {errorrif ? <label className="small text-center text-danger ml-0"> Debe llenar el campo al menos 9 caracteres </label> : ''} 
            </Col>
            <Col xs={12} md={6}>
              <label
                for="telefono"
                className="badge label-turquesa text-wrap badge-label"
              >
                Telefono
              </label>
              <Form.Control
                type="number"
                placeholder="Número"
                name="telefono"
                id="telefono"
                onChange={handleInputChange}
                pattern="^-?[0-9]\d*\.?\d*$"
                maxLength={12}
                //uso esta validación porque type='number' no se compatible con firefox
                onKeyPress={(e) => handleKeyPress(e)}
                required
              />
               {errortelefono ? <label className="small text-center text-danger ml-0"> Debe llenar el campo </label> : ''} 
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <label
                for="direccion"
                className="badge label-turquesa text-wrap badge-label"
              >
                Direccion
              </label>
              <Form.Control
                placeholder="Direccion"
                name="direccion"
                onChange={handleInputChange}
                maxLength={220}
              />
               {errordireccion ? <label className="small text-center text-danger ml-0"> Debe llenar el campo </label> : ''}
            </Col>

            <div className="row">
              <p class="small text-center text-info mt-4 ml-4">
              {error ? <label className="text-center text-danger"> Los campos estan vacios </label> : "* Debe llenar todos los campos del Formulario"}
                
              </p>
            </div>
          </Row>
          </Form>
          </Modal.Body>

      <Modal.Footer>
        <Row>
          <Col>
            <Button variant="outline-secondary" onClick={() => onClose()}>
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button
              className="boton-turquesa"
              type="submit"

              onClick={() => createPost()}
              >
              Guardar
            </Button>
          </Col>
        </Row>
    </Modal.Footer>
    </Modal>
  )
}
