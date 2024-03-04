import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Button } from "react-bootstrap"
import pad from "../../../utils/funciones"
import { getToken, decodeToken } from "../../../utils/token"
import { toast } from "react-toastify"
import { successtoast, errortoast } from "../../../utils/toastconfig"
import axios from "axios"
import moment from "moment"
import { urlstandart } from "../../../utils/url"
import "./ModalNotaCredito.scss"

const urlF = `${urlstandart}/api/v1/facturacomercial2`

const urls = `${urlstandart}/api/v1/servicio`
const urlnc = `${urlstandart}/api/v1/nota-credito/post`

export default function ModalNotaCredito(props) {
  const { showModal, setShowModal, title } = props
  const [facturas, setFacturas] = useState([])
  const [servicios, setServicios] = useState([])
  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const [datos, setDatos] = useState([])

  const obtenerDatos = async () => {
    try {
      const data = await fetch(urlF, { headers: { Authorization: "Bearer " + token , UserName: nombreUsuario}})
      const facturass = await data.json()
      setFacturas(facturass)
      console.debug(facturas)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerDatosS = async () => {
    try {
      const data = await fetch(urls, { headers: { Authorization: "Bearer " + token , UserName: nombreUsuario}})
      const servicioss = await data.json()
      setServicios(servicioss)
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
          concepto_servicio: e.target.concepto_servicio.value.split("|")[0], 
          operador: e.target.factura.value.split("|")[2],
          fecha_emision: moment(Date.now()).format("DD-MM-YYYY"),
          monto_total:
            e.target.factura.value.split("|")[3] *
            e.target.segundos.value,
          rif: e.target.factura.value.split("|")[1],
          factura: e.target.factura.value.split("|")[0],
          hora_emision: moment(Date.now()).utcOffset("UTC -4").format("HH:mm:ss"),
          observaciones: e.target.observaciones.value,
          created_at: moment(Date.now()).format("DD-MM-YYYY"),
          updated_at: moment(Date.now()).format("DD-MM-YYYY"),
          segundos: e.target.segundos.value, 
          monto_iva: (0.16 * (e.target.segundos.value * e.target.concepto_servicio.value.split("|")[1])),
          seconds_calls: e.target.segundos.value, 
          second_price: e.target.concepto_servicio.value.split("|")[1],
          fecha_vencimiento: moment(datos.fecha_emision)
          .add(2, "months")
          .format("DD-MM-YYYY"),
          id_servicio: e.target.factura.value.split("|")[4],

          status: true,
          usuario: nombreUsuario
        }
      ],
      delete datos[0]
    )
  }

  function createPost() {
    if (datos !=='' ){
    console.debug(datos)
    try {
      axios
        .post(urlnc, datos, { headers: { Authorization: "Bearer " + token, userName: nombreUsuario } })
        .then(
          (response) => {
            toast("Nota de Credito Registrada Correctamente", successtoast)
            setDatos([])
            setShowModal(false)
            console.debug(response)
          },
          (error) => {
            toast("Error al Registrar la Nota de Credito", errortoast)
            setDatos([])
            setShowModal(false)
            console.debug(error)
          }
        )
    } catch (error) {
      setDatos({})
      console.debug(error)
    }
   }else{
    toast("Debe llenar los campos", errortoast)
    setShowModal(false)
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
  }

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
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
                Factura
              </label>
              <div className="input-group" required>
                <select
                  className="form-select form-control"
                  aria-label="Seleccion de una Factura"
                  name="factura"
                  id="factura"
                  required
                >
                  <option value="" selected>Seleccione...</option>
                  {facturas &&
                    facturas.map((item) => (
                      <option
                      value={
                        item.id +
                        "|" +
                        item.rif +
                        "|" +
                        item.client +
                        "|" +
                        item.total_mount +
                        "|" +
                        item.service_cod
                      }
                      className="text-uppercase"
                      >
                        {item.client} TM-{pad(item.id, 0, 6)}
                      </option>
                        
                    ))
                     }
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
                    servicios.filter((item) => item.tipofactura === "comercial" || item.tipofactura === "ot").map((item) => (
                      <option value={item.descripcion + "|" + item.precio}>
                        {item.descripcion}
                      </option>
                    ))}
                </select>
              </div>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col xs={12} md={12}>
              <label
                for="cantidad"
                className="badge label-turquesa text-wrap badge-label"
              >
                Segundo de Llamadas
              </label>
              <Form.Control
                name="segundos"
                id="segundos"
                maxLength={7}
                pattern="^-?[0-9]\d*\.?\d*$"
                required
                placeholder="Segundos de Llamadas"
              />
            </Col>
            {/* <Col xs={12} md={6}>
              <label
                for="precio"
                className="badge label-turquesa text-wrap badge-label"
              >
                Precio
              </label>
              <Form.Control
               name="precio"
               id="precio"
               placeholder="Precio"
               maxLength={7}
               pattern="^-?[0-9]\d*\.?\d*$"
               required />
              </Col>  */}
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
                <label>{item.concepto_servicio}</label>
              </Col>
              <Col xs={12} md={3}>
                <label>{item.seconds_calls}</label>
              </Col>
              <Col xs={12} md={3}>
                <label>{item.second_price}</label>
              </Col>
              <Col xs={12} md={3}>
                <label>{item.monto_total=(parseFloat(item.seconds_calls) * parseFloat(item.second_price)).toFixed(2)} Bs</label>
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
  )
}
