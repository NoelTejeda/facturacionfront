import React, { useState, useEffect } from "react"
import {
  Container,
  Modal,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl
} from "react-bootstrap"
import axios from "axios"
import { toast } from "react-toastify"
import { successtoast, errortoast } from "../../../utils/toastconfig"
import moment from "moment"
import {
  getToken,
  decodeToken
} from "../../../utils/token"
import { urlstandart } from "../../../utils/url"
import "./ModalFacturaComercial.scss"

//https://reactdatepicker.com/
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'

const urlF = `${urlstandart}/api/v1/facturacomercial`
const url = `${urlstandart}/api/v1/facturacomercial/post`
const urlS = `${urlstandart}/api/v1/servicio`
const urlO = `${urlstandart}/api/v1/operador`
const urlRutas = `${urlstandart}/api/v1/rutas`

const Modalfacturacomercial = (props) => {
  const [startDate, setStartDate] = useState(new Date())
  const { show, setShow, title } = props

  const [servicios, setServicios] = useState([])
  const [facturas, setFacturas] = useState([])
  const [operadores, setOperadores] = useState([])
  const [datos, setDatos] = useState([])
  const [rutas, setRutas] = useState([])
  const [arrendamiento, setArrendamiento] = useState(0)
  const [mantenimiento, setMantenimiento] = useState(0)
  const [displayArrMan, setDisplayArrMan] = useState(true)
  const [total, setTotal] = useState(0)

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const obtenerDatosServicios = async () => {
    try {
      const data = await fetch(urlS, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }
      })
      const servicioss = await data.json()
      setServicios(servicioss)
      //console.debug(servicios)
    } catch (error) {
      //console.debug(error)
    }
  }

  const obtenerDatosOperadores = async () => {
    try {
      const data = await fetch(urlO, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }
      })
      const operadoress = await data.json()
      setOperadores(operadoress)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerDatosFacturas = async () => {
    try {
      const data = await fetch(urlF, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }
      })
      const facturass = await data.json()
      setFacturas(facturass)
      //console.debug(facturas)
    } catch (error) {
      //console.debug(error)
    }
  }

  const obtenerRutas = async () => {
    try {
      const data = await fetch(urlRutas, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }
      })
      const rutass = await data.json()
      setRutas(rutass)
      //console.debug(rutas)
    } catch (error) {
      //console.debug(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (displayArrMan){
      setDatos(
        [
          ...datos,
          {
            destiny_path: e.target.destiny_path.value,
            idservice: e.target.descripcion.value.split("|")[0],
            invoice_type: "comercial",
            lease: e.target.lease.value,
            maintenance: e.target.maintenance.value,
            month_dollars: e.target.month_dollars.value,
            origin_path: e.target.origin_path.value,
            service_activation_date: moment(Date.now()).format("DD-MM-YYYY"),
            service_type: e.target.service_type.value,
            tasa_bcv: e.target.tasa_bcv.value.replace(",","."),
            transmition_speed: "2048",
            month_bs: (e.target.tasa_bcv.value.replace(",",".") * e.target.month_dollars.value.replace(",",".")).toFixed(2),
            total_mount: (e.target.tasa_bcv.value.replace(",",".") *  e.target.month_dollars.value.replace(",",".")).toFixed(2),
            username: nombreUsuario,
            created_at: moment(Date.now()).format("DD-MM-YYYY"),
            updated_at: moment(Date.now()).format("DD-MM-YYYY"),
            approval: "",
            iva: ((0.16) * (e.target.tasa_bcv.value.replace(",",".") *  e.target.month_dollars.value.replace(",","."))).toFixed(2),
            status: true,
            issue_hour: moment(Date.now()).utcOffset("UTC -4").format("HH:mm:ss"),
            rif: e.target.client.value.split("|")[1],
            operador: e.target.client.value.split("|")[0],
            service_cod: e.target.descripcion.value.split("|")[1],
            direccion: e.target.client.value.split("|")[2],
            telefono: e.target.client.value.split("|")[3]
          }
        ],
        delete datos[0]
      )
    } else {
      console.debug("otro")
      setDatos(
        [
          ...datos,
          {
            destiny_path: e.target.destiny_path.value,
            idservice: e.target.descripcion.value.split("|")[0],
            invoice_type: "ot",
            lease: 0,
            maintenance: 0,
            month_dollars: "0",
            origin_path: e.target.origin_path.value,
            service_activation_date: moment(Date.now()).format("DD-MM-YYYY"),
            service_type: e.target.descripcion.value.split("|")[2],  /// Revisar
            tasa_bcv: e.target.tasa_bcv.value.replace(",","."),
            transmition_speed: "2048", // Revisar
            month_bs:  (e.target.descripcion.value.split("|")[3] * e.target.cantidad.value),
            total_mount: (e.target.descripcion.value.split("|")[3] * e.target.cantidad.value).toFixed(2),
            username: nombreUsuario,
            created_at: moment(Date.now()).format("DD-MM-YYYY"),
            updated_at: moment(Date.now()).format("DD-MM-YYYY"),
            approval: "",
            cantidad: e.target.cantidad.value,
            iva: 0.16 * (e.target.descripcion.value.split("|")[3] * e.target.cantidad.value),
            status: true,
            issue_hour: moment(Date.now()).utcOffset("UTC -4").format("HH:mm:ss"),
            rif: e.target.client.value.split("|")[1],
            operador: e.target.client.value.split("|")[0],
            service_cod: e.target.descripcion.value.split("|")[1],
            direccion: e.target.client.value.split("|")[2],
            telefono: e.target.client.value.split("|")[3]
          }
        ],
        delete datos[0]
      )
    }
  }

  const onClose = () => {
    setDatos([])
    setShow(false)
    setArrendamiento(0)
    setMantenimiento(0)
    setTotal(0)
  }

  function createPost() {
    //console.debug(datos)
    if ( datos != "" ) {
    axios
      .post(url, datos, {
        headers: { Authorization: "Bearer " + token, userName: nombreUsuario }
      })
      .then(
        (response) => {
          //console.debug(response)
          toast("Factura Registrada Correctamente", successtoast)
          setDatos([])
          setArrendamiento(0)
          setMantenimiento(0)
          setShow(false)
          setTotal(0)
        },
        (error) => {
          toast("Error al registrar la factura", errortoast)
          setDatos([])
          setShow(false)
          setArrendamiento(0)
          setMantenimiento(0)
          setTotal(0)
          //console.debug("Error en Conexión" + error)
        }
      )
     }else{
      toast("Debe llenar los campos", errortoast)
      //console.debug("Datos vacios")
    }
  }

  const handleInputChangeServicio = (event) => {
    if (event.target.value.split("|")[2] === "ot") {
      setDisplayArrMan(false)
    } else {
      setDisplayArrMan(true)
    }
  }

  const handleInputArrendamiento = (event) => {
    setArrendamiento([event.target.value.replace(",",".")])
  }

  const handleInputMantenimiento = (event) => {
    setMantenimiento([event.target.value.replace(",",".")])
  }

  const suma = () => {
    setTotal(parseFloat(arrendamiento) + parseFloat(mantenimiento))
  }

  useEffect(() => {
    obtenerDatosOperadores()
    obtenerDatosServicios()
    obtenerDatosFacturas()
    obtenerRutas()
    suma()
  }, [show, arrendamiento, mantenimiento])

  return (
    <Container fluid>
      <Modal
        size="lg"
        show={show}
        onHide={() => {
          setShow(false)
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
                    className="form-select form-control text-uppercase"
                    name="client"
                    id="client"
                    required
                  >
                    <option value="" >Seleccione un Operador</option>
                    {!operadores ? (
                      <option value="">Cargando Datos...</option>
                    ) : (
                      operadores
                        .filter((item) => item.status === true)
                        .map((item) => (
                          <option value={item.operador + "|" + item.rif + "|" + item.direccion + "|" + item.telefono} >
                            {item.operador}
                          </option>
                        ))
                    )}
                  </select>
                </div>
              </Col>
              <Col xs={6} md={4}>
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
              <Col xs={6} md={4}>
                <label
                  for="destiny_path"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Ruta de Origen
                </label>
                <select
                  className="form-control"
                  name="origin_path"
                  id="origin_path"
                  required
                >
                  <option value="" selected>
                    Elija un Origen
                  </option>
                 
                  {rutas && rutas.filter((item) => item.status === true).map((item) => (
                      <option value={item.origin}>
                        {item.origin}
                      </option>
                    ))
                  }
                </select>
              </Col>
              <Col xs={4} md={4}>
                <label
                  for="destiny_path"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Ruta de Destino
                </label>
                <select
                  className="form-control"
                  name="destiny_path"
                  id="destiny_path"
                  required
                >
                  <option value="" selected>
                    Elija un Destino
                  </option>
                  {rutas && rutas.filter((item) => item.status === true).map((item) => (
                      <option value={item.origin}>
                        {item.origin}
                      </option>
                    ))
                  }
                </select>
              </Col>
              <Col xs={4} md={4}>
                <label
                  for="destiny_path"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Tasa Cambio BCV
                </label>

                <InputGroup className="mb-3">
                  <InputGroup.Text>Bs X $</InputGroup.Text>
                  <FormControl
                    placeholder="Tasa Cambiaria BCV"
                    aria-label="Tasa Cambiaria BCV"
                    aria-describedby="basic-addon1"
					          maxLength={11}
                    pattern="^-?[0-9]\d*\.?\d*$"
                    name="tasa_bcv"
                    id="tasa_bcv"
                    required
                  />
                </InputGroup>
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
                    name="descripcion"
                    id="descripcion"
                    required
                    onChange={handleInputChangeServicio}
                  >
                    <option value="">Seleccione un Servicio</option>
                    {!servicios ? (
                      <option value="">Cargando Datos...</option>
                    ) : (
                      servicios && servicios
                        .filter((item) => item.status === true && (item.tipofactura === "comercial" || item.tipofactura === "ot"))
                        .map((item) => (
                          <option value={item.descripcion + "|" + item.codigo + "|" + item.tipofactura + "|" + item.precio}>
                            {item.descripcion}
                          </option>
                        ))
                    )}
                  </select>
                </div>
              </Col>

              {displayArrMan ? 
              <Col xs={12} md={4}>
                <label
                  for="service_type"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Tipo de Servicio
                </label>
                <select
                  className="form-control"
                  name="service_type"
                  id="service_type"
                  required
                >
                  <option value="" selected>
                    Elija un Tipo de Servicio
                  </option>
                  <option value="Interurbano">Interurbano</option>
                  <option value="Urbano">Urbano</option>
                </select>
              </Col>
              : 
              <Col xs={12} md={4}>
                <label
                  for="cantidad"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Cantidad
                </label>
                <input
				          placeholder="Cantidad"
                  name="cantidad"
                  type="number"
                  id="cantidad"
                  pattern="^-?[0-9]\d*\.?\d*$"
				          maxLength="10"
                  className="form-control"
                />
              </Col>
              }
            </Row>

              {displayArrMan ? 
            <Row>
              <Col xs={12} md={4}>
                <label
                  for="lease"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Arrendamiento ($)
                </label>
                <input
				          placeholder="Arrendamiento"
                  name="lease"
                  type="text"
                  id="lease"
                  pattern="^-?[0-9]\d*\.?\d*$"
				          maxLength="10"
                  className="form-control"
                  onChange={handleInputArrendamiento}
                ></input>
              </Col>
            
              <Col xs={12} md={4}>
                <label
                  for="mantenimiento"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Mantenimiento ($)
                </label>
                <input
                  placeholder="Mantenimiento"
                  max="20"
                  name="maintenance"
                  type="text"
                  id="maintenance"
                  pattern="^-?[0-9]\d*\.?\d*$"
                  maxLength="10"
                  className="form-control"
                  onChange={handleInputMantenimiento}
                ></input>
              </Col>

              <Col xs={12} md={4}>
                <label
                  for="month_dollars"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Monto ($)
                </label>
                <input
                  name="total_dollars"
                  type="text"
                  id="month_dollars"
                  className="form-control"
				          pattern="^-?[0-9]\d*\.?\d*$"
                  maxLength={5}
                  value={isNaN(total) ? '0' : total}
                  disabled
                ></input>
              </Col>
            </Row> 
            : ''}
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
            <Col xs={12} md={2}>
              Servicio
            </Col>
            <Col xs={12} md={2}>
              Origen
            </Col>
            <Col xs={12} md={2}>
              Destino
            </Col>
            <Col xs={12} md={2}>
              Tipo de Servicio
            </Col>
            {displayArrMan ?
            <Col xs={12} md={2}>
              Precio
            </Col>
            :
            <Col xs={12} md={2}>
              Cantidad
            </Col>}
            <Col xs={12} md={2}>
              Total
            </Col>
          </Row>
          {datos &&
            datos.map((item, index) => (
              <Row key={index}>
                <Col xs={12} md={2}>
                  <label>{item.idservice}</label>
                </Col>
                <Col xs={12} md={2}>
                  <label>{item.origin_path}</label>
                </Col>
                <Col xs={12} md={2}>
                  <label>{item.destiny_path}</label>
                </Col>
                {displayArrMan ?
                <Col xs={12} md={2}>
                  <label>{item.service_type}</label>
                </Col>
                :
                <Col xs={12} md={2}>
                  <label>Otros Servicios</label>
                </Col>
                }
                {displayArrMan ? 
                <Col xs={12} md={2}>
                  <label>{item.month_dollars}</label>
                </Col>
                :
                <Col xs={12} md={2}>
                  <label>{item.cantidad}</label>
                </Col>}
                <Col xs={12} md={2}>
                  <label>
                    {displayArrMan ? (item.total_mount = item.month_dollars * item.tasa_bcv).toFixed(2) : Number(item.total_mount).toFixed(2)}
                  </label> Bs
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

export default Modalfacturacomercial
