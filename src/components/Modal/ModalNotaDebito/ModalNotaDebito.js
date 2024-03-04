import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Button } from "react-bootstrap"
import pad from "../../../utils/funciones"
import { getToken, decodeToken } from "../../../utils/token"
import { toast } from "react-toastify"
import { successtoast, errortoast } from "../../../utils/toastconfig"
import axios from "axios"
import moment from "moment"
import { urlstandart } from "../../../utils/url"
import "./ModalNotaDebito.scss"

/* carga las facturas generales de la tabla total en Bd */
//const url = `${urlstandart}/api/v1/facturageneral`
const urlComercial = `${urlstandart}/api/v1/factura`
/* carga las facturas del cdr
 const url = `${urlstandart}/api/v1/factura` */
const urls = `${urlstandart}/api/v1/servicio`
const urlND = `${urlstandart}/api/v1/nota-debito/post`

export default function ModalNotaDebito(props) {
  const { showModal, setShowModal, title } = props
  const [facturas, setFacturas] = useState([])
  const [servicios, setServicios] = useState([])
  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const [datos, setDatos] = useState([])

  const obtenerDatos = async () => {
    try {
      const data = await fetch(urlComercial)
      const facturass = await data.json()
      setFacturas(facturass)
      console.debug(facturas)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerDatosS = async () => {
    try {
      const data = await fetch(urls)
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
          factura: e.target.factura.value.split("|")[0],
          rif: e.target.factura.value.split("|")[1],
          serie: "C",
          fecha_emision: moment(Date.now()).format("DD-MM-YYYY"),
          hora_emision: moment(Date.now())
            .utcOffset("UTC -4")
            .format("HH:mm:ss"),
          fecha_vencimiento: moment(Date.now())
            .add(2, "months")
            .format("DD-MM-YYYY"),
          concepto_servicio: e.target.concepto_servicio.value.split("|")[0],
          segundos: e.target.segundos.value,
          precio: e.target.concepto_servicio.value.split("|")[1],
          monto_iva: (0.16 * (e.target.segundos.value * e.target.concepto_servicio.value.split("|")[1])),
          monto_total: (e.target.segundos.value *  e.target.concepto_servicio.value.split("|")[1]),
          observaciones: e.target.observaciones.value,
          id_servicio: e.target.factura.value.split("|")[4],
          operador: e.target.factura.value.split("|")[2],
          direccion: e.target.factura.value.split("|")[6],
          monto_exento: "",
          created_at: moment(Date.now()).format("DD-MM-YYYY"),
          status: true,
          usuario: nombreUsuario,
          telefono: e.target.factura.value.split("|")[5]
        }
      ],
      delete datos[0]
      
    )
  }

  function createPost() {
    if (datos != '' ){  
      try {
        axios
          .post(urlND, datos, { headers: { Authorization: "Bearer " + token } })
          .then(
            (response) => {
              toast("Nota de Debito Registrada Correctamente", successtoast)
              setDatos([])
              setShowModal(false)
              console.debug(response)
            },
            (error) => {
              toast("Error al Registrar la Nota de Debito", errortoast)
              setDatos([])
              setShowModal(false)
              console.debug(error)
            }
          )
      } catch (error) {
        setDatos([])
        console.debug(error)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <div className="input-group" >
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
                        item.service_cod +
                        "|" +
                        item.telefono +
                        "|" +
                        item.direccion
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
                    servicios.map((item) => (
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
                placeholder="Segundos de Llamadas"
                maxLength={10}
                pattern="^-?[0-9]\d*\.?\d*$"
                required
              />
            </Col>
            <Col xs={12} md={6}>
              <Form.Control type="hidden" name="precio" id="precio" placeholder={datos.precio} />
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
                <label>{item.segundos}</label>
              </Col>
              <Col xs={12} md={3}>
                <label>{item.precio}</label>
              </Col>
              <Col xs={12} md={3}>
                <label>{(item.segundos * item.precio).toFixed(2)} Bs</label>
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
