import React from 'react'
import {Modal, Row, Col, Button} from "react-bootstrap"
import { getToken, decodeToken } from '../../../../utils/token'
import { toast } from 'react-toastify'
import moment from "moment"
import { urlstandart } from '../../../../utils/url'
import axios from "axios"

const url = `${urlstandart}/api/v1/facturacomercial/`
// Rechazar las PreFacturas 
export default function ModalRechazoFacturaComercial(props) {
  const {showModalFacturaRechazo, setShowModalFacturaRechazo, title, idp, data } = props
  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode


  const onClose = () => {
      setShowModalFacturaRechazo(false)
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

  function updatePost() {
    try {
        axios.post(url,{
            id:idp,
            destiny_path: data.destiny_path,
            idservice: data.idservice,
            invoice_type: data.invoice_type, 
            service_cod: data.service_cod,           
            lease: data.lease,
            maintenance: data.maintenance,
            month_dollars: data.month_dollars,
            origin_path: data.origin_path,
            service_activation_date: data.service_activation_date,
            service_type: data.service_type,
            tasa_bcv: data.tasa_bcv,
            transmition_speed: data.transmition_speed,
            month_bs: data.month_bs,
            total_mount: data.month_bs,
            iva: data.iva,
            rif: data.rif,
            username: nombreUsuario,
            created_at: data.created_at,
            updated_at: moment(Date.now()).format("DD-MM-YYYY"),
            approval: "Rechazada",
            issue_hour: moment(Date.now()).utcOffset("UTC -4").format("HH:mm:ss"),
            direccion: data.direccion,
            telefono: data.telefono, 
            status: false,
            operador: data.operador,
        }, { headers: { Authorization: "Bearer " + token , userName: nombreUsuario}})
            .then((response) => {
                toast("Factura Comercial Rechazada Correctamente",options);
                setShowModalFacturaRechazo(false);
                console.debug(response)
        }, (error) => {
            toast("Error al Rechazar la Factura Comercial", options2)
            setShowModalFacturaRechazo(false)
            console.debug(error)
        })
    } catch (error) {
        console.debug(error);
    }
}

  return (
    <Modal show={showModalFacturaRechazo} onHide={() => setShowModalFacturaRechazo(false)} idp={idp}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Seguro desea <b className="text-danger">{title}</b> N°{idp}</h2>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col>
                        <Button variant="outline-secondary" onClick={() => onClose()}>Cancelar</Button>
                    </Col>
                    <Col>
                        <Button className="boton-turquesa" type="submit" onClick={() => updatePost()} >Aceptar</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
  )
}
