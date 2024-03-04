import React, { useState, useEffect } from "react"
import { Modal, Row, Col, Button, Container } from "react-bootstrap"
import { getToken, decodeToken } from "../../../utils/token"
import axios from "axios"
import moment from "moment"
import {urlstandart} from '../../../utils/url'
import { toast } from "react-toastify"
import "./ModalFactura.scss"
import {
  InputGroup,
  FormControl
} from "react-bootstrap"

const urlF = `${urlstandart}/api/v1/factura`
const url = `${urlstandart}/api/v1/factura/post`
const urlS = `${urlstandart}/api/v1/servicio`
const urlO = `${urlstandart}/api/v1/operador`

export default function ModalFactura(props) {
  const { show, setShow, title } = props
  const [servicios, setServicios] = useState([])
  const [facturas, setFacturas] = useState([])
  const [operadores, setOperadores] = useState([])
  const [datos, setDatos] = useState([])

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

  const obtenerDatosOperadores = async () => {
    try {
      const data = await fetch(urlO)
      const operadoress = await data.json()
      setOperadores(operadoress)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerDatosFacturas = async () => {
    try {
      const data = await fetch(urlF,{
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }
      })
      const facturass = await data.json()
      setFacturas(facturass)
      console.debug(facturas)
    } catch (error) {
      console.debug(error)
    }
  }

  const onClose = () => {
    setDatos([])
    setShow(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setDatos(
      [
        ...datos,
        {
          service_description: e.target.service_description.value.split("|")[0],
          client: e.target.client.value.split("|")[0],
          issue_date: moment(Date.now()).format("DD-MM-YYYY"),
          total_mount:
            e.target.service_description.value.split("|")[1] *
            e.target.service_description.value.split("|")[1],
          interconnection: "I",
          rif: e.target.client.value.split("|")[1],
          interconecction_id: 11,
          register_cod: "",
          second_price: e.target.service_description.value.split("|")[1],
          activo: 1,
          seconds_calls: e.target.seconds_calls.value,
          start_date: moment(e.target.start_date.value).format("DD-MM-YYYY"),
          end_date: moment(e.target.start_date.value)
            .add(1, "month")
            .format("DD-MM-YYYY"),
          service_cod: "12",
          termination_cod: "12",
          issue_hour: moment(Date.now()).utcOffset("UTC -4").format("HH:mm:ss"),
          expiration_date: moment(datos.issue_date)
            .add(2, "months")
            .format("DD-MM-YYYY"),
          observaciones: e.target.observaciones.value,
          conciliacion_id: "",
          created_at: moment(Date.now()).format("DD-MM-YYYY"),
          updated_at: moment(Date.now()).format("DD-MM-YYYY"),
          username: nombreUsuario,
          status: true
        }
      ],
      delete datos[0]
    )
  }

  const options = {
    autoClose: 3000,
    type: toast.TYPE.SUCCESS,
    hideProgressBar: true,
    position: toast.POSITION.TOP_RIGHT
  }

  const options2 = {
    autoClose: 3000,
    type: toast.TYPE.ERROR,
    hideProgressBar: true,
    position: toast.POSITION.TOP_RIGHT
  }

  function createPost() {
    axios
      .post(url, datos, { headers: { Authorization: "Bearer " + token, userName: nombreUsuario  } })
      .then(
        (response) => {
          console.debug(response)
          toast("Factura Registrada Correctamente", options)
          setDatos([])
          setShow(false)
        },
        (error) => {
          toast("Error al registrar la factura", options2)
          setDatos([])
          setShow(false)
          console.debug("Error en Conexión" + error)
        }
      )
  }

  useEffect(() => {
    obtenerDatosFacturas(nombreUsuario)
    obtenerDatosOperadores()
    obtenerDatosServicios()
    obtenerDatosFacturas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

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
              <Col xs={12} md={8}>
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
                    {operadores.map((item) => (
                      <option key={item.id} value={item.operador + "|" + item.rif}>
                        {item.operador}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col xs={6} md={4}>
                <label
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
                  rows="3"
                  maxLength={220}
                  required
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
                      <option key={item.id} value={item.descripcion + "|" + item.precio}>
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
                    className="form-control  text-right"
                    type="text"
                    placeholder="Seg."
                    name="seconds_calls"
                    maxLength={10}
                    pattern="^-?[0-9]\d*\.?\d*$"
                    required
                  />
                </InputGroup>
                {/* 
                <input
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
                  <label>{item.service_description}</label>
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
                      ? (item.total_mount= item.seconds_calls * item.second_price).toFixed(2)
                      : "" } Bs
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
