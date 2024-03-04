import React, { useState, useEffect } from "react"
import { Modal, Row, Col, Button, Container } from "react-bootstrap"
import { getToken, decodeToken } from "../../../utils/token"
import axios from "axios"
import moment from "moment"
import {urlstandart} from '../../../utils/url'
import pad from '../../../utils/funciones'
import { toast } from "react-toastify"
import { successtoast,  errortoast } from "../../../utils/toastconfig"
import "./ModalNotaCreditoOperador.scss"

//https://reactdatepicker.com/
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';


/* Este modal NCO funciona en NCMovilnet */

const urlNCO = `${urlstandart}/api/v1/nota-credito-operador`
const url = `${urlstandart}/api/v1/nota-credito-operador/post`
//const url = `${urlstandart}/api/v1/facturaoperador`
const urlS = `${urlstandart}/api/v1/servicio`
//const urlO = `${urlstandart}/api/v1/operador`
//const urlO = `${urlstandart}/api/v1/facturageneral`

const urlF = `${urlstandart}/api/v1/facturaoperador`

export default function ModalFactura(props) {
  const [startDate, setStartDate] = useState(new Date());
  const { showModal, setShowModal, title, } = props
  const [servicios, setServicios] = useState([])
  const [facturas, setFacturas] = useState([])
 // const [invoice, setInvoice] = useState([])
  const [atffacturaoperador, setAtffacturaoperador] = useState([])
  //const [operadores, setOperadores] = useState([])
  const [datos, setDatos] = useState([])

  const [error, setError]=useState(false)
  const [errorClient, setErrorClient]=useState(false)
  const [errorDate, setErrorDate]=useState(false)
  const [errorService,setErrorService]=useState(false)
  const [errorSeconds, setErrorSeconds]=useState(false)


  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const obtenerDatosServicios = async () => {
    try {
      const data = await fetch(urlS)
      const servicioss = await data.json()
      setServicios(servicioss)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerDatosFacturas = async () => {
    try {
      const data = await fetch(urlF)
      const Atffacturaoperador = await data.json()
      setAtffacturaoperador(Atffacturaoperador)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerDatosNotaCreditoOperador = async () => {
    try {
      const data = await fetch(urlNCO)
      const facturass = await data.json()
      setFacturas(facturass)
      console.debug(facturas)
    } catch (error) {
      console.debug(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setDatos(
      [
        ...datos,
        {
          
          numero_factura: e.target.client.value.split("|")[1],
          rif: e.target.client.value.split("|")[2],
          serie: "A",
          descripcion_servicio: e.target.service_description.value.split("|")[0],
          fecha_emision: moment(Date.now()).format("DD-MM-YYYY"),
          hora_emision: moment(Date.now())
          .utcOffset("UTC -4")
          .format("HH:mm:ss"),
          monto_iva: "",
          monto_total: e.target.seconds_calls.value * e.target.service_description.value.split("|")[1],
          observaciones: e.target.observaciones.value,
          status: true,
          created_at: moment(Date.now()).format("YYYY-MM-DD"),
          updated_at: moment(Date.now()).format("YYYY-MM-DD"),
          usuario: nombreUsuario,
          codigo_servicio: e.target.service_description.value.split("|")[2],

          //no puede leer propiedades de null (reading 'toUppercase' en NotaCreditoOperador)
          operador: e.target.client.value.split("|")[3],
          direccion: "",
          monto_exento: "",

          fecha_vencimiento: moment(Date.now())
            .add(2, "months")
            .format("DD-MM-YYYY"),
          segundos: e.target.seconds_calls.value,
          precio: e.target.service_description.value.split("|")[1],
        }
      ],console.debug('Noel',datos),
      delete datos[0]
    )
  }

  function createPost() {
    if(datos != ''){ 
    try{
      axios
        .post(url, datos, { headers: { Authorization: "Bearer " + token } })
        .then(
          (response) => {
            console.debug(response)
            toast("Nota de Credito Registrada Correctamente", successtoast)
            setDatos([])
            setShowModal(false)
            setError(false)
            setErrorClient(false)
            setErrorDate(false)
            setErrorService(false)
            setErrorSeconds(false)
           
          },
          (error) => {
            toast("Error al registrar la nota de Credito", errortoast)
            setDatos([])
            setShowModal(false)
            setError(false)
            setErrorClient(false)
            setErrorDate(false)
            setErrorService(false)
            setErrorSeconds(false)
          
            console.debug("Error en Conexión" + error)
          }
        )
    }catch (error) {
      setDatos()
      console.debug(error)
    }
  }else{
    toast("Debe llenar los campos", errortoast)
    /*setShow(false)*/
    console.debug("Datos vacios")
    console.debug(datos)
}
}
  


  useEffect(() => {
    obtenerDatosFacturas()
    obtenerDatosServicios()
    obtenerDatosNotaCreditoOperador()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal])

  const onClose = () => {
    setDatos([])
    setShowModal(false)
    setError(false)
    setErrorClient(false)
    setErrorDate(false)
    setErrorService(false)
    setErrorSeconds(false)
   
  }



  return (
    <Container fluid>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setDatos([{}]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <label
                  for="operador"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Facturas
                </label>
                <div className="input-group">
                  <select
                    className="form-select form-control"
                    name="client"
                    id="client"
                    required
                  >
                    <option value="">Seleccione una Factura</option>
                    {atffacturaoperador.map((item) => (
                      <option
                        value={
                          item.codigo_servicio +
                          "|" +
                          item.numero_factura +
                          "|" +
                          item.rif +
                          "|" +
                          item.operador
                        }
                        class="text-uppercase"
                      >
                        {item.operador +
                          " - TM-" +
                          pad(item.numero_factura, 0, 6)}
                      </option>
                    ))}
                  </select>
                </div>
                {errorClient ? (
                  <label className="small text-center text-danger ml-0">
                    {" "}
                    Debe seleccionar un Operador y Factura{" "}
                  </label>
                ) : (
                  ""
                )}
              </Col>
              <Col xs={6} md={4}>
                {/*  <label
                  for="start_date"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Fecha Facturacion
                </label>
                <input
                  className="form-control"
                  type="date"
                  name="start_date"
                  required
                /> 
              {errorDate ? <label className="small text-center text-danger ml-0"> Debe seleccionar una Fecha </label> : ''}*/}
                <label
                  htmlFor="fecha"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Fecha Facturacion
                </label>

                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  onFocus={(e) => (e.target.readOnly = true)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  locale={es}
                  withPortal
                />
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
                  className="form-control"
                  placeholder="Agregar Observaciones"
                  name="observaciones"
                  id="observaciones"
                  rows="3"
                  maxLength={220}
                />
              </Col>
            </Row>

            <div className="text-center mb-2 mt-2">
              <h3>Servicios y Cargos a Realizar</h3>
            </div>

            <Row>
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
                    name="service_description"
                    id="service_description"
                    required
                  >
                    <option value="">Seleccione un Servicio</option>
                    {servicios
                      .filter((item) => item.status === true)
                      .map((item) => (
                        <option
                          value={
                            item.descripcion +
                            "|" +
                            item.precio +
                            "|" +
                            item.codigo
                          }
                        >
                          {item.descripcion}
                        </option>
                      ))}
                  </select>
                </div>
                {errorService ? (
                  <label className="small text-center text-danger ml-0">
                    {" "}
                    El campo está vacio{" "}
                  </label>
                ) : (
                  ""
                )}
              </Col>

              <Col xs={12} md={4}>
                <label
                  for="precio_cargo"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Cantidad de Segundos
                </label>
                <input
                  type="text"
                  className="form-control  text-right"
                  name="seconds_calls"
                  id="seconds_calls"
                  pattern="^-?[0-9]\d*\.?\d*$"
                  maxLength={7}
                  required
                />
                {errorSeconds ? (
                  <label className="small text-center text-danger ml-0">
                    {" "}
                    El campo está vacio{" "}
                  </label>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <button
                  className="btn btn-block boton-turquesa mt-4 mb-4"
                  type="submit"
                >
                  Agregar
                </button>
              </Col>
            </Row>
          </form>
          <Row>
            <Col xs={12} md={3}>
              Servicio
            </Col>
            <Col xs={12} md={3}>
              Segundos de Llamadas
            </Col>
            <Col xs={12} md={3}>
              Precio de Llamada
            </Col>
            <Col xs={12} md={3}>
              Total
            </Col>
          </Row>
          {datos &&
            datos.map((item, index) => (
              <Row key={index}>
                <Col xs={12} md={3}>
                  <label>{item.descripcion_servicio}</label>
                </Col>
                <Col xs={12} md={3}>
                  <label>{item.segundos}</label>
                </Col>
                <Col xs={12} md={3}>
                  <label>{item.precio}</label>
                </Col>
                <Col xs={12} md={3}>
                  <label>
                    {item.segundos
                      ? (item.segundos * item.precio).toFixed(2)
                      : ""}
                  </label>
                </Col>
              </Row>
            ))}
        </Modal.Body>
        <div className="row">
          <p class="small text-center text-info mt-4 ml-4">
            {error ? (
              <label className="text-left text-danger">
                {" "}
                Los campos estan vacios{" "}
              </label>
            ) : (
              "* Debe llenar todos los campos del Formulario"
            )}
          </p>
        </div>
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
    </Container>
  );
}
