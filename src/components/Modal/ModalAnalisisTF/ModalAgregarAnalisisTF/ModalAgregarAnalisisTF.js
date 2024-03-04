import React, {useState, useEffect} from 'react'
import { Modal, Row, Col, Button, Container, Form } from "react-bootstrap"
import { getToken,decodeToken } from '../../../../utils/token'
import moment from 'moment'
import axios from 'axios'
import { toast } from 'react-toastify'
import pad from '../../../../utils/funciones'
import { urlstandart } from '../../../../utils/url'

const url = `${urlstandart}/api/v1/factura`
const urlATF = `${urlstandart}/api/v1/analisistf`

export default function ModalAgregarAnalisisTF(props) {
  const { show,setShow, title }= props
  const [facturas, setFacturas] = useState()
  const [analisisData, setAnalisisData] = useState({
    factura: "",
    operador: "",
    fecha_factura: "",
    monto_total: "",
    servicio_id: "",
    observaciones: "",
    created_at: moment(Date.now()).format("DD-MM-YYYY"),
    updated_at: moment(Date.now()).format("DD-MM-YYYY"),
    status: true
    }
  )

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario} = tokenDecode

  const obtenerDatosFacturas = async () => {
    try {
      const data = await fetch(url,{headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }})
      const facturass = await data.json()
      setFacturas(facturass)
    } catch (error) {
      console.debug(error)
    }
  }

  const onClose = () => {
    setShow(false)
    setAnalisisData()
  }

  const handleInputChange = (event) => {
    setAnalisisData({
      ...analisisData,
      [event.target.name]: event.target.value,
    })
  }

  const captureType = (e) => {
    setAnalisisData({ 
      factura_id: e.target.value.split("|")[0],
      operador: e.target.value.split("|")[1],
      fecha_factura: e.target.value.split("|")[2],
      monto_total: parseFloat(e.target.value.split("|")[3]),
      servicio_id: 1,
      created_at: moment(Date.now()).format("DD-MM-YYYY"),
      updated_at: moment(Date.now()).format("DD-MM-YYYY"),
      status: true,
    })
  }
  console.debug(analisisData)


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
      .post(urlATF, analisisData , { headers: { Authorization: "Bearer " + token , UserName: nombreUsuario  } })
      .then(
        (response) => {
          toast("Análisis Tecnico Financiero Registrado Correctamente", options)
          console.debug(response)
          setAnalisisData()
          setShow(false)
        },
        (error) => {
          toast("Error al registrar el Análisis Tecnico Financiero", options2)
          setAnalisisData()
          setShow(false)
          console.debug("Error en Conexión" + error)
        }
      )
  }


  useEffect(() => {
    obtenerDatosFacturas()
  }, [])
  

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
          <Form>
            <Row>
              <Col xs={12} md={12}>
                <label for="facturas" className="badge label-turquesa text-wrap badge-label">Factura</label>
                <div className="input-group">
                  <select 
                    name="factura" 
                    id="factura" 
                    className="form-select form-control" 
                    onChange={captureType}
                    required={true}>
                    
                      <option value="" >Seleccione una Factura</option>
                      {facturas && facturas.filter((item) => item.status === true)
                                            .map((item) => (
                        <option key={item.id} value={item.id + "|" + item.client + "|" + item.issue_date + "|" + item.total_mount + "|" + item.service_description}>
                          TM-{pad(item.id, 0, 6)}-{item.client} 
                        </option>
                      ))
                      }
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <label
                  for="observacioness"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Observaciones
                </label>
                <div className="input-group">
                  <textarea
                    className="form-control"
                    name="observaciones"
                    id="observaciones"
                    onKeyUp={handleInputChange}
                    rows="3"
                    required={true}
                  />
                </div>
              </Col>
            </Row>
            </Form>
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
