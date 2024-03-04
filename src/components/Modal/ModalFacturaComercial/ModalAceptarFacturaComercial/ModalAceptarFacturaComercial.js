import React from 'react'
import {Modal, Row, Col, Button} from "react-bootstrap"
import axios from 'axios'
import { toast } from "react-toastify"
import moment from "moment"
import { getToken, decodeToken} from "../../../../utils/token"
import { urlstandart } from '../../../../utils/url'
import "./ModalAceptarFacturaComercial.scss"

const url = `${urlstandart}/api/v1/facturacomercial/`
const urlf = `${urlstandart}/api/v1/factura/`

export default function ModalAceptarFacturaComercial(props) {
  const {showModalAceptar, setShowModalAceptar, title, idp, data } = props
  console.debug(props)

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const onClose = () => {
      setShowModalAceptar(false)
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
            id: idp,
            operador: data.operador, // Operador Agregado
            destiny_path: data.destiny_path,
            idservice: data.idservice,
            invoice_type: data.invoice_type,            
            lease: data.lease,
            rif: data.rif, // RIF Agregado
            maintenance: data.maintenance,
            month_dollars: data.month_dollars,
            origin_path: data.origin_path,
            service_activation_date: data.service_activation_date,
            service_type: data.service_type,
            tasa_bcv: data.tasa_bcv,
            transmition_speed: data.transmition_speed,
            month_bs: data.month_bs,
            total_mount: data.month_bs,
            username: nombreUsuario,
            service_cod: data.service_cod,
            issue_hour: data.issue_hour, // Colocar Hora
            created_at: data.created_at,
            updated_at: moment(Date.now()).format("DD-MM-YYYY"),
            approval: "Aprobada",
            direccion: data.direccion,
            telefono: data.telefono,
            iva: data.iva,
            status: true
        }, { headers: { Authorization: "Bearer " + token , userName: nombreUsuario}})
            .then((response) => {

                axios.post(urlf, {
                    client: data.operador, // Operador Agregado
                    destiny_path: data.destiny_path,
                    idservice: data.idservice,
                    invoice_type: data.invoice_type,            
                    lease: data.lease,
                    rif: data.rif, // RIF Agregado
                    maintenance: data.maintenance,
                    month_dollars: data.month_dollars,
                    origin_path: data.origin_path,
                    service_activation_date: data.service_activation_date,
                    service_type: data.service_type,
                    tasa_bcv: data.tasa_bcv,
                    transmition_speed: data.transmition_speed,
                    month_bs: data.month_bs,
                    total_mount: data.month_bs,
                    username: nombreUsuario,
                    service_cod: data.service_cod,
                    issue_hour: data.issue_hour, // Colocar Hora
                    created_at: data.created_at,
                    updated_at: moment(Date.now()).format("DD-MM-YYYY"),
                    iva: data.iva,
                    direccion: data.direccion,
                    telefono: data.telefono,
                    status: true
                }, { headers: { Authorization: "Bearer " + token , userName: nombreUsuario}})

                toast("Factura Comercial Aprobada Correctamente",options);
                setShowModalAceptar(false);
                console.debug(response)
        }, (error) => {
            toast("Error al Aprobar la Factura Comercial", options2)
            setShowModalAceptar(false)
            console.debug(error)
        })
    } catch (error) {
        console.debug(error);
    }
}

  return (
    <Modal show={showModalAceptar} onHide={() => setShowModalAceptar(false)} idp={idp}>
    <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <h2>Seguro desea <b className="text-danger">{title}</b> N° TM-0000{idp}</h2>
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
