import React from 'react'
import {Modal, Row, Col, Button} from "react-bootstrap"
import { getToken, decodeToken } from '../../../../utils/token'
import { toast } from 'react-toastify'
import axios from "axios"
import pad from '../../../../utils/funciones'
import moment from 'moment'
import { urlstandart } from '../../../../utils/url'

const url=`${urlstandart}/api/v1/analisistf` 

export default function ModalAnular(props) {
    const {show, setShow, title, idp, datosM } = props;
    const token = getToken()
    const tokenDecode = decodeToken(token)
    const { nombreUsuario} = tokenDecode

    const onClose = () => {
        setShow(false);
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
              factura_id: datosM.factura_id,
              operador: datosM.operador,
              fecha_factura: moment(datosM.fechaFactura).format("DD-MM-YYYY"),
              monto_total: parseFloat(datosM.monto_total),
              servicio_id: datosM.servicio_id,
              observaciones: datosM.observaciones,
              created_at: datosM.created_at,
              updated_at: moment(Date.now()).format("DD-MM-YYYY"),
              status: false
            }, {headers: {'Authorization': `Bearer ${token}`, UserName: nombreUsuario }})
                .then((response) => {
                    toast(`${title} Anulada Correctamente`,options);
                    setShow(false);
                    console.debug(response)
            }, (error) => {
                toast(`Error al Anular la ${title}`, options2)
                setShow(false)
                console.debug(error)
            })
        } catch (error) {
            console.debug(error);
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} idp={idp}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Seguro desea <b className="text-danger">{title}</b> N° ATF-{pad(idp, 0 , 6)}</h2>
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