import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { successtoast, errortoast } from "../../../utils/toastconfig"
import moment from "moment"
import { Modal, Row, Col, Button, Container } from "react-bootstrap"
import {
  getToken,
  decodeToken,
} from "../../../utils/token"
import { urlstandart } from "../../../utils/url"
import "./ModalFacturaOperador.scss"
import {
  InputGroup,
  FormControl
} from "react-bootstrap"

//https://reactdatepicker.com/
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';


const url = `${urlstandart}/api/v1/facturaoperador/post`
const urlO = `${urlstandart}/api/v1/operador`
const urlS = `${urlstandart}/api/v1/servicio`

export default function ModalFactura(props) {
  const [startDate, setStartDate] = useState(new Date())
  const { show, setShow, title } = props
  const [operadores, setOperadores] = useState([])
  const [servicios, setServicios] = useState([])
  const [rif] = useState("")

  const [datos, setDatos] = useState([])

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const obtenerDatosOperadores = async () => {
    try {
      const data = await fetch(urlO)
      const operadoress = await data.json()
      setOperadores(operadoress)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerDatosServicios = async () => {
    try {
      const data = await fetch(urlS)
      const servicioss = await data.json()
      setServicios(servicioss)
    } catch (error) {
      console.debug(error)
    }
  }

  console.debug(rif)
  useEffect(() => {
    obtenerDatosOperadores()
    obtenerDatosServicios()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setDatos(
      [
        ...datos,
        {
          codigo_servicio: e.target.service_description.value.split("|")[0],
          descripcion_servicio: e.target.service_description.value.split("|")[0],
          operador: e.target.client.value.split("|")[0],
          fecha_factura: moment(Date.now()).format("DD-MM-YYYY"),
           total_mount: (e.target.seconds_calls.value * e.target.service_description.value.split("|")[1]).toFixed(2),
          rif: e.target.client.value.split("|")[1],
          numero_factura: parseInt(e.target.factura_numero.value),
          fecha_inicial: moment(startDate).format("DD-MM-YYYY"),
          fecha_final: moment(startDate)
            .add(1, "month")
            .format("DD-MM-YYYY"),
          hora_factura: moment(Date.now()).utcOffset("UTC -4").format("HH:mm:ss"),
          fecha_vencimiento: moment(datos.issue_date)
            .add(2, "months")
            .format("DD-MM-YYYY"),
          observacion: e.target.observaciones.value,
          
          created_at: moment(Date.now()).format("DD-MM-YYYY"),
          updated_at: moment(Date.now()).format("DD-MM-YYYY"),
          seconds_calls: e.target.seconds_calls.value,
          second_price: e.target.service_description.value.split("|")[1],
          user_id: nombreUsuario,
          status: true,
          totalfinal_ope:(e.target.seconds_calls.value * e.target.service_description.value.split("|")[1]).toFixed(2)
        }
      ],
      delete datos[0]
    )
  }

  const onClose = () => {
    setDatos([])
    setShow(false)
  }

  function createPost() {
    if (datos!=''){ 
    try {
      axios.post(url, datos , {
        headers: { Authorization: "Bearer " + token, userName: nombreUsuario }
      }).then((response) => {
        if (response.status === 200) {
          toast("Factura Registrada Correctamente", successtoast)
          setDatos([])
          setShow(false)
          console.debug(response)
        } else {
          console.debug("Error en Conexion")
        }
      })
    } catch (error) {
      console.debug(error)
    }
   }else{
    toast("Debe llenar los campos", errortoast)
    /*setShow(false)*/
    console.debug("Datos vacios")
   }
  }

  return (
    <Container fluid>
      <Modal
        size="lg"
        show={show}
        onHide={() => {
          setShow(false)
          setDatos([{}])
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col xs={6} md={5}>
                <label
                  for="operador"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Operador
                </label>
                <div className="input-group">
                  <select
                    className="form-select form-control"
                    name="client"
                    id="client"
                    required
                  >
                    <option value="">Seleccione un Operador</option>
                    {operadores.filter((item) => item.status === true).map((item) => (
                      <option value={item.operador + "|" + item.rif} className="text-uppercase">
                        {item.operador}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col xs={6} md={3}>
                <label
                  for="factura-operador"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Numero Factura
                </label>
                <input
                  className="form-control"
                  type="number"
                  name="factura_numero"
                  id="factura_numero"
                  required
                />
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
                /> */}
                                <label
                  htmlFor="fecha"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Fecha Facturacion
                </label>
                <DatePicker
                  showIcon
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  onFocus={(e) => (e.target.readOnly = true)}
                  dateFormat="MM-yyyy"
                  showMonthYearPicker
                  className="form-control"
                  locale={es}
                  withPortal
                  name="start_date"
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
                  name="observaciones"
                  id="observaciones"
                  maxLength={220}
                  rows="3"
                  
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
                    {servicios.filter((item) => item.status === true).map((item) => (
                      <option value={item.descripcion + "|" + item.precio}>
                        {item.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>

              <Col xs={12} md={4}>
                <label
                  for="precio_cargo"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Cantidad de Segundos
                </label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Seg.</InputGroup.Text>
                  <FormControl
                    placeholder="Cantidad de Segundos"
                    type="tel"
                    className="form-control  text-right"
                    name="seconds_calls"
                    maxLength={7}
                    pattern="^-?[0-9]\d*\.?\d*$"
                    required
                  />
                </InputGroup>
                {/* <input
                  type="text"
                  className="form-control  text-right"
                  name="seconds_calls"
                  required
                /> */}
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
                  <label>{item.codigo_servicio}</label>
                </Col>
                <Col xs={12} md={3}>
                  <label>{item.seconds_calls}</label>
                </Col>
                <Col xs={12} md={3}>
                  <label>{item.second_price}</label>
                </Col>
                <Col xs={12} md={3}>
                  <label>
                    {item.seconds_calls
                      ? (item.seconds_calls * item.second_price).toFixed(2)
                      : ""} Bs
                  </label>
                </Col>
              </Row>
            ))}
        </Modal.Body>
       
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
                onClick={createPost}
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
