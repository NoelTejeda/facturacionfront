import React, {useState, useEffect} from 'react'
import axios from "axios";
import {toast } from 'react-toastify';
import moment from "moment";
import {Modal, Form, Row, Col, Button, Container } from "react-bootstrap";
import "./ModalFactura.scss";

const url='http://localhost:8080/carriers/api/v1/factura';
const urlO='http://localhost:8080/carriers/api/v1/operador';
const urlS='http://localhost:8080/carriers/api/v1/servicio';

export default function ModalFactura(props) {
  const { show, setShow, title} = props;
  const [operadores, setOperadores] = useState([])
  const [servicios, setServicios] = useState([])

  const [datos, setDatos] = useState([{}])
  const [prueba, setPrueba] = useState({
    service_description:''
  })
  
  const obtenerDatosOperadores = async () => {
      try {
          const data = await fetch(urlO)
          const operadoress = await data.json()
          setOperadores(operadoress)
      } catch (error) {
          console.debug(error)
      }
  }

  useEffect(() => {
      obtenerDatosOperadores()
      obtenerDatosServicios()
  }, [])

  const handleInputChange = (event) => {
          
          setDatos([{
              ...datos,
              [event.target.name] : event.target.value.split("|")[0],
              rif: event.target.value.split("|")[1],
              activo: 1,
              interconecction_id: 27,
              interconnection: 'I',
              status: 1
          }])
          console.debug(datos)
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

  const options = {
      autoClose: 3000,
      type: toast.TYPE.SUCCESS,
      hideProgressBar: true,
      position: toast.POSITION.TOP_RIGHT,
  };

  const onClose = () => {
      setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setPrueba(e.target.service_description)
    console.debug(prueba)
    alert(prueba)
    e.preventDefault()
  }

  
  function createPost() {
      try {
          axios
          .post(url, datos)
          .then((response) => {
              if(response.status === 200){
                  toast("Factura Registrada Correctamente",options);
                  setShow(false);
                  console.debug(response)
              }else{
                  console.debug("Error en Conexion")
              }
          });
      } catch (error) {
          console.debug(error)
      }
  }


  return (
      <Container fluid>
      <Modal size="lg" show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

              <Form>
                  <Row>
                      <Col xs={12} md={8}>
                          <label for="operador" className="badge label-turquesa text-wrap badge-label">Operador</label>
                          <div className="input-group">
                              <select 
                                  className="form-select form-control" 
                                  onChange={handleInputChange} 
                                  name="client" 
                                  aria-label="Seleccione un Operador"
                                  id="client"
                                  >
                                  <option value="null" >Seleccione un Operador</option>
                                  {
                                      operadores.map(item =>
                                          (
                                              <option value={item.operador+"|"+item.rif}>{item.operador}</option>
                                          )

                                    )
                                  }
                              </select>
                          </div>
                      </Col>
                      <Col xs={6} md={4}>
                          <label for="issue_date" className="badge label-turquesa text-wrap badge-label">Fecha de Facturación</label>
                          <input className="form-control" type="date" name="issue_date"  onChange={handleInputChange}   />
                      </Col>
                  </Row>
                  <Row>
                      <Col xs={6} md={4}>
                          <label for="start_date"  className="badge label-turquesa text-wrap badge-label">Fecha Inicial</label>
                          <input className="form-control" type="date" name="start_date"  onChange={handleInputChange}  />
                      </Col>
                      <Col xs={6} md={4}>
                          <label for="end_date"  className="badge label-turquesa text-wrap badge-label">Fecha Final</label>
                          <input className="form-control" type="date" name="end_date" onChange={handleInputChange}   />
                      </Col>
                      <Col xs={6} md={4}>
                          <label for="fecha_vencimiento" className="badge label-turquesa text-wrap badge-label">Fecha Vencimiento</label>
                          <input className="form-control" name="expiration_date" value={moment(datos.end_date).add(2,'months').format('DD/MM/YYYY')} onChange={handleInputChange} readonly   />
                      </Col>
                  </Row>
                  <div className="text-center mb-2 mt-2">
                      <h3>Servicios y Cargos a Realizar</h3>
                  </div>
                  <form onSubmit={handleSubmit} >
                    <Row>
                        <Col xs={12} md={5}>
                            <label for="servicio"  className="badge label-turquesa text-wrap badge-label">Servicio</label>
                            <div className="input-group">
                                <select className="form-select form-control"  onChange={handleInputChange}   name="service_description" aria-label="Seleccion de un Servicio">
                                    <option selected>Seleccione un Servicio</option>
                                    {
                                        servicios.map(item=>(
                                            <option value={item.descripcion}>{item.descripcion}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </Col>
                        <Col xs={12} md={5}>
                            <label for="cargo" className="badge label-turquesa text-wrap badge-label">Cargo</label>
                            <div className="input-group">
                                <select className="form-select form-control"  onChange={handleInputChange}   name="service_description" aria-label="Seleccion de un Servicio">
                                    <option value="prueba" selected>Seleccione un Cargo</option>
                                    {
                                        servicios.map(item=>(
                                            <option value={item.descripcion}>{item.descripcion}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </Col>
                        <Col xs={12} md={2}>
                            <label for="precio_cargo" className="badge label-turquesa text-wrap badge-label">Precio del Cargo</label>
                            <input type="text" className="form-control" disabled required />
                        </Col>
                    </Row>
                    <Row>
                      <Col>
                        <button type="submit" >Agregar</button>                
                      </Col>
                    </Row>
                  </form>
                  <Row className="mt-2">
                      <Col xs={12} md={6}>
                          <label for="cantidad"  className="badge label-turquesa text-wrap badge-label">Segundos de Llamadas</label>
                          <Form.Control placeholder="Cantidad" name="seconds_calls" onChange={handleInputChange}  />
                      </Col>
                      <Col xs={12} md={6}>
                          <label for="precio"  className="badge label-turquesa text-wrap badge-label">Precio</label>
                          <Form.Control placeholder="Precio" name="total_mount" onChange={handleInputChange}  />
                      </Col>
                  </Row>
              </Form>
          </Modal.Body>
          <Modal.Footer>
                  <Row>
                      <Col>
                          <Button variant="outline-secondary" onClick={onClose}>Cancelar</Button>
                      </Col>
                      <Col>
                          <Button className="boton-turquesa" type="submit" onClick={createPost}>Guardar</Button>
                      </Col>
                  </Row>
                  
          </Modal.Footer>
      </Modal>
      </Container>
  )
}
