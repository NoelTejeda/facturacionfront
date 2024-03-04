import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Button } from "react-bootstrap"
import pad from "../../../utils/funciones"
import { getToken, decodeToken } from "../../../utils/token"
import { toast } from "react-toastify"
import { successtoast, errortoast } from "../../../utils/toastconfig"
import axios from "axios"
import moment from "moment"
import { urlstandart } from "../../../utils/url"
import "./ModalNotaDebitoOperador.scss"

const url = `${urlstandart}/api/v1/facturaoperador`
const urls = `${urlstandart}/api/v1/servicio`
//const urlO = `${urlstandart}/api/v1/operador`
const urlND = `${urlstandart}/api/v1/nota-debito-operador/post`

export default function ModalNotaDebito(props) {
  const { showModal, setShowModal, title } = props
  /*const [facturas, setFacturas] = useState([])*/
  const [facturaoperador, setFacturaoperador] = useState([])
  const [servicios, setServicios] = useState([])
  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const [datos, setDatos] = useState([])

  const [error, setError]=useState(false)
  const [errorClient, setErrorClient]=useState(false)
  const [errorService,setErrorService]=useState(false)
  const [errorSeconds, setErrorSeconds]=useState(false)
  const [errorPrecio]=useState(false)

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
      errorClient: errorClient.errorClient1 ===undefined || errorClient.errorClient1 === null ? "V" : errorClient.errorClient1 + errorClient.errorClient1 
    })
  }

/*   const obtenerDatos = async () => {
    try {
      const data = await fetch(url)
      const facturass = await data.json()
      setFacturas(facturass)
      console.debug(facturas)
    } catch (error) {
      console.debug(error)
    }
  } */
  const obtenerDatos = async () => {
    try {
      const data = await fetch(url)
      const facturaoperadorX = await data.json()
      setFacturaoperador(facturaoperadorX)
  
    } catch (error) {
      console.debug("error "+error)
    }
  }

  const obtenerDatosS = async () => {
    try {
      const data = await fetch(urls)
      const servicioss = await data.json()
      setServicios(servicioss)
    } catch (error) {
      console.debug("error "+error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setDatos(
      [
        ...datos,
        {
          factura_numero: e.target.factura.value.split("|")[0],
          rif: e.target.factura.value.split("|")[1],
          serie: "C",
          fecha_emision: moment(Date.now()).format("DD-MM-YYYY"),
          created_at: moment(Date.now()).format("YYYY-MM-DD"),
          updated_at: moment(Date.now()).format("DD-MM-YYYY"),
          hora_emision: moment(Date.now())
            .utcOffset("UTC -4")
            .format("HH:mm:ss"),
          fecha_vencimiento: moment(Date.now())
            .add(2, "months")
            .format("DD-MM-YYYY"),
          concepto_servicio: e.target.concepto_servicio.value,
          segundos: e.target.segundos.value,
          precio: e.target.precio.value,
          monto_iva: "",
          monto_total: e.target.segundos.value * e.target.precio.value,
          observaciones: e.target.observaciones.value,
          id_servicio: parseInt(e.target.factura.value.split("|")[4]),
          operador: e.target.factura.value,
          direccion: "",
          monto_exento: "",
          status: true,
          usuario: nombreUsuario
        }
      ],

      delete datos[0]
      )
    }
    

  function createPost() {
    if (datos !=''){ 
    try {
      axios
        .post(urlND, datos, { headers: { Authorization: "Bearer " + token } })
        .then(
          (response) => {
            toast("Nota de Debito Registrada Correctamente", successtoast)
            setDatos([])
            setShowModal(false)
          
          },
          (error) => {
            toast("Error al Registrar la Nota de Debito", errortoast)
            setDatos([])
            setShowModal(false)
            console.debug("error "+error)
            console.debug(datos)
          }
        )
    } catch (error) {
      setDatos([])
      console.debug("error "+error)
    }
   }else{
    toast("Debe llenar los campos", errortoast)
    /*setShow(false)*/
    console.debug("datos vacios")
   }
  }

  useEffect(() => {
    obtenerDatos()
    obtenerDatosS()
  }, [])

  const onClose = () => {
    setDatos([])
    setShowModal(false)
    setError(false)
    setErrorSeconds(false)
    setErrorService(false)
    setErrorClient(false)

  }

  return (
    <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} md={4}>
              <label
                for="factura"
                className="badge label-turquesa text-wrap badge-label"
              >
                {title}
              </label>
              <div className="input-group" required>
                <select
                  className="form-select form-control"
                  aria-label="Seleccion de una Factura"
                  name="factura"
                  id="factura"
                >
                
                    {/*muestra los datos de la tabla atffactura*/}
                  <option selected>Seleccione...</option>
                  {facturaoperador.map((item) => (
                      <option
                        value={
                          item.numero_factura +
                          "|" +
                          item.rif +
                          "|" +
                          item.client +
                          "|" +
                          item.total_mount +
                          "|" +
                          item.id
                        }
                        className="text-uppercase"
                      >
                        {item.operador} - TM-{pad(item.numero_factura, 0,6)}
                      </option>
                    ))}
                </select>
              </div>
            </Col>
            <Col xs={12} md={8}>
              <label
                for="servicio"
                className="badge label-turquesa text-wrap badge-label"
              >
                Servicio
              </label>
              <div className="input-group">
                <select
                  className="form-select form-control"
                  aria-label="Seleccion de un Servicio"
                  name="concepto_servicio"
                  id="concepto_servicio"
                  required
                >
               
                  <option value="" selected>Seleccione...</option>
                  {servicios &&
                    servicios.map((item) => (
                      <option value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    ))}
                </select>
              </div>
              {errorService ? <label className="small text-center text-danger ml-0"> Debe seleccionar una Fecha </label> : ''}
            </Col>
          </Row>

          <Row className="mt-2">
            <Col xs={12} md={6}>
              <label
                for="cantidad"
                className="badge label-turquesa text-wrap badge-label"
              >
                Segundo de Llamadas
              </label>
              <Form.Control
                name="segundos"
                id="segundos"
                placeholder="Segundos de Llamadas"
                maxLength={7}
                pattern="^-?[0-9]\d*\.?\d*$"
                required
                />
                {errorSeconds ? <label className="small text-center text-danger ml-0"> Debe seleccionar una Fecha </label> : ''}
            </Col>
            <Col xs={12} md={6}>
              <label
                for="precio"
                className="badge label-turquesa text-wrap badge-label"
              >
                Precios
              </label>
              <Form.Control 
                name="precio"
                id="precio" 
                placeholder="Precio"
                maxLength={10}
                pattern="^-?[0-9]\d*\.?\d*$"
                required
                />
              {errorPrecio ? <label className="small text-center text-danger ml-0"> Debe seleccionar una Fecha </label> : ''}
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12}>
              <label
                for="observaciones"
                className="badge label-turquesa text-wrap badge-label"
              >
                Observaciones
              </label>
              <textarea
                className="form-textarea form-control"
                placeholder="Agregar Observaciones"
                name="observaciones"
                id="observaciones"
                maxLength={220}
              ></textarea>
            </Col>
          </Row>
          <Row>
            <Col>
              <button
                className="btn btn-block boton-turquesa mt-4 mb-4"
                type="submit"
                onChange={handleInputChange}

              >
                Agregar
              </button>
            </Col>
          </Row>
        </form>
        <Row>
          <Col xs={12} md={5}>
            Servicio
          </Col>
          <Col xs={12} md={2}>
            Segundos de Llamadas
          </Col>
          <Col xs={12} md={2}>
            Precio de Llamada
          </Col>
          <Col xs={12} md={3}>
            Total
          </Col>
        </Row>
        {datos &&
          datos.map((item, index) => (
            <Row key={index}>
              <Col xs={12} md={5}>
                <label>{item.concepto_servicio}</label>
              </Col>
              <Col xs={12} md={2}>
                <label>{item.segundos}</label>
              </Col>
              <Col xs={12} md={2}>
                <label>{item.precio}</label>
              </Col>
              <Col xs={12} md={3}>
                <label>{(item.segundos * item.precio).toFixed(2)}</label>
              </Col>
            </Row>
          ))}
      </Modal.Body>
      <div className="row">
          <p class="small text-center text-info mt-4 ml-4">
              {error ? <label className="text-left text-danger"> Los campos estan vacios </label> : "* Debe llenar todos los campos del Formulario"}
          </p>
        </div>
      <Modal.Footer>
        <Row>
          <Col>
            <Button variant="outline-secondary" onClick={onClose}>
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button
              className="boton-turquesa"
              type="submit"
              onClick={()=>createPost()}
            >
              Guardar
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  )
}
