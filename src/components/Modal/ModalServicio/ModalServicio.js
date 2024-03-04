import React, { useState } from "react"
import { Modal, Row, Col, Button, Form } from "react-bootstrap"
import { getToken, decodeToken } from "../../../utils/token"
import { toast } from "react-toastify"
import { successtoast, errortoast } from "../../../utils/toastconfig"
import moment from "moment"
import axios from "axios"
import { urlstandart } from "../../../utils/url"
import "./ModalServicio.scss"

const url = `${urlstandart}/api/v1/servicio`

export default function ModalServicio(props) {
  const { show, setShow, title} = props
  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode
  
  const [error, setError]=useState(false)
  const [errorCodServ, setErrorCodServ] = useState(false)
  //const [errorTServicio, setErrorTServicio] = useState(false)
  const [descripcion,setDescripcion]=useState(false)
  const [precio,setPrecio]=useState(false)
  const [tipoServicio,setTipoServicio]=useState(false)
  const [detalle,setDetalle]=useState(false)

  const [datos, setDatos] = useState()
  const [servicio] = useState("")

/* 
  const handleInputChangeServ = (event) => {
    setServicio({
        ...servicio,
        [event.target.name]: event.target.value
      }
    )
  }
*/

const handleInputChange = (event) => {
  if(event.target.value){
    event.target.value.replace(",",".")
    console.log(event.target.value.replace(",","."))
  }
  setDatos({
    ...datos,
    [event.target.name]: event.target.value,
    servicio: servicio.servicio1===undefined || servicio.servicio1 === null ? "V" : servicio.servicio1 + servicio.servicio 
  })
  }
/* 
  const onClose = () => {
    setShow(false)
  }
 */

    function handleKeyPress(e){
       return Event.charCode>48 && 
              Event.charCode<=57
  }


  function createPost() {
    if (datos === undefined ){
      setError(true) 
      setTimeout(() => {
        setError(false)
      }, 2000)
    }else {
      if (datos.codigo === undefined ){
        setErrorCodServ(true)
        setTimeout(() => {
          setErrorCodServ(false)
        }, 2000)
      }else if (datos.descripcion === undefined){
        setDescripcion(true)
        setTimeout(() => {
          setDescripcion(false)
        }, 2000)
      }else if (datos.precio === undefined){
        console.debug(datos.precio)
        setPrecio(true)
        setTimeout(() => {
          setPrecio(false)
        }, 2000)
      }else if (datos.detalle === undefined){
        setDetalle(true)
        setTimeout(() => {
          setDetalle(false)
        }, 2000)
      }else if (datos.tipofactura === undefined){
        setTipoServicio(true)
        setTimeout(() => {
          setTipoServicio(false)
        }, 2000)
      }
    else{
    try {
      axios
        .post(url,{...datos,
                      fecha_creacion: moment(Date.now()).format("DD-MM-YYYY"),
                      status: true,
                      usuario: nombreUsuario},
                  { headers: { Authorization: "Bearer " + token } })
        .then(
          (response) => {
            toast("Servicio Registrado Correctamente", successtoast)
            setDatos()
            setShow(false)
            setError(false)
            setErrorCodServ(false)
            setDescripcion(false)
            setPrecio(false)
            setTipoServicio(false)
            setDetalle(false)
            console.debug(response)
          },
          (error) => {
            toast("Error al Registrar el Servicio", errortoast)
            setDatos()
            setShow(false)
            setError(false)
            setErrorCodServ(false)
            setDescripcion(false)
            setPrecio(false)
            setTipoServicio(false)
            setDetalle(false)
            console.debug(error)
          }
        )
    } catch (error) {
      setDatos()
      console.debug(error)
    }
  }}
  }

  const onClose = () => {
    setShow(false)
    setDatos()
    setError(false)
    setErrorCodServ(false)
    setDescripcion(false)
    setPrecio(false)
    setDetalle(false)
    setTipoServicio(false)
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col xs={12} md={3}>
              <label
                for="codigo"
                className="badge label-turquesa text-wrap badge-label"
              >
                Codigo de Servicio
              </label>
              <Form.Control
                placeholder="Código"
                onChange={handleInputChange}
                name="codigo"
                type="string"
                maxLength={8}
                required={true}
              />
               {errorCodServ ? <label className="small text-center text-danger ml-0"> Debe llenar el campo </label> : ''}
            </Col>
            <Col xs={12} md={6}>
              <label
                for="descripcion"
                className="badge label-turquesa text-wrap badge-label"
              >
                Descripcion
              </label>
              <Form.Control
                placeholder="Descripción"
                onChange={handleInputChange}
                name="descripcion"
                maxlenght={20}
                required
              />
              {descripcion ? <label className="small text-center text-danger ml-0"> Debe llenar el campo </label> : ''}
            </Col>
            <Col xs={12} md={3}>
              <label
                for="precio"
                className="badge label-turquesa text-wrap badge-label"
              >
                Precio
              </label>
              <Form.Control
                placeholder="Precio"
                onChange={handleInputChange}
                name="precio"
                //pattern="^-?[0-9]\d*\.?\d*$"
                maxLength={10}
                type="number"
                required
                onKeyPress={(e)=>handleKeyPress(e)}    
              />
              {precio ? <label className="small text-center text-danger ml-0"> Debe llenar el campo </label> : ''}
            </Col>
            <Col xs={12} md={6}>
              <label
                for="detalle"
                className="badge label-turquesa text-wrap badge-label"
              >
                Detalle
              </label>
              <Form.Control
                placeholder="Detalle"
                onChange={handleInputChange}
                name="detalle"
                id="detalle"
                type="text"
                required
              />
               {detalle ? <label className="small text-center text-danger ml-0"> Debe llenar el campo </label> : ''}
            </Col>
            <Col xs={12} md={6}>
              <label  
                for="tipofactura"
                className="badge label-turquesa text-wrap badge-label"
              >
                Tipo de Factura
              </label>
              <div className="input-group">
                <select name="tipofactura" onChange={handleInputChange} id="tipofactura" className="form-control" >
                  <option value="0" selected>Elegir Tipo de Facturacion Asociada</option>
                  <option value="ix">Interconexion</option>
                  <option value="tldi">TLDI</option>
                  <option value="comercial">Comercial</option>
                  <option value="ot">Otros Servicios</option>
                </select>
             
              </div>
              {tipoServicio ? <label className="small text-center text-danger ml-0"> Debe seleccionar un Tipo de Factura </label> : ''}
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