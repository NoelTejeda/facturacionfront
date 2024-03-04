import React, { useState } from 'react'
import {Modal, Row, Col, Button} from "react-bootstrap"
import { getToken, decodeToken } from '../../../../utils/token'
import { toast } from 'react-toastify'
import moment from "moment"
import { urlstandart } from '../../../../utils/url'
import axios from "axios"

const url = `${urlstandart}/api/v1/rutas`

export default function ModalRutas(props) {
  const {showModalRutas, setShowModalRutas, title } = props
  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode
  const [datos, setDatos] = useState('')

  const onClose = () => {
      setShowModalRutas(false)
  }
 
  const options = {
      autoClose: 3000,
      type: toast.TYPE.SUCCESS,
      hideProgressBar: true,
      position: toast.POSITION.TOP_RIGHT,
  }
  
  const options2 = {
      autoClose: 3000,
      type: toast.TYPE.ERROR,
      hideProgressBar: true,
      position: toast.POSITION.TOP_RIGHT,
  }

  const handlesubmit = (e) => {
    setDatos(e.target.value)
  }

  console.debug(datos)

  function createPost() {
    try {
        axios.post(url,{
            origin: datos,
            created_at: moment(Date.now()),
            updated_at: moment(Date.now()),
            status: true
          }, { headers: { Authorization: "Bearer " + token , userName: nombreUsuario}})
            .then((response) => {
                toast("Ruta registrada Correctamente",options);
                setShowModalRutas(false);
                console.debug(response)
        }, (error) => {
            toast("Error al registrar Ruta", options2)
            setShowModalRutas(false)
            console.debug(error)
        })
    } catch (error) {
        console.debug(error);
    }
}

  return (
    <Modal show={showModalRutas} onHide={() => setShowModalRutas(false)} >
            <Modal.Header closeButton>
                <Modal.Title>Crear Nueva <b className="text-danger">{title}</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label
                  for="ruta"
                  className="badge label-turquesa text-wrap badge-label"
                >
                  Ruta
                </label>
                <input
                  name="origin"
                  type="text"
                  id="origin"
                  placeholder='Nombre de la Ruta'
                  className="form-control"
                  onChange={handlesubmit}
                  required
                ></input>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col>
                        <Button variant="outline-secondary" onClick={() => onClose()}>Cancelar</Button>
                    </Col>
                    <Col>
                        <Button className="boton-turquesa" type="submit" onClick={() => createPost()} >Guardar</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
  )
}