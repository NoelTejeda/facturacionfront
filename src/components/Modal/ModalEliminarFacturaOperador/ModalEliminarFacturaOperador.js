import React from 'react'
import {Modal, Row, Col, Button} from "react-bootstrap"
import { getToken, decodeToken } from "../../../utils/token"
import {toast } from 'react-toastify'
import axios from "axios"
import {urlstandart} from "../../../utils/url"
import "./ModalEliminarFacturaOperador.scss"

const url = `${urlstandart}/api/v1/facturaoperador`

export default function ModalEliminarFacturaOperador(props) {
    const {show, setShow, title, idp} = props

    const token = getToken()
    const tokenDecode = decodeToken(token)
    const { nombreUsuario } = tokenDecode

    const onClose = () => {
        setShow(false)
    }

    const options = {
        autoClose: 3000,
        type: toast.TYPE.SUCCESS,
        hideProgressBar: true,
        position: toast.POSITION.TOP_RIGHT,
        toastClassName: "dark-toast"
    }

    function deletePost() {
        try {
            axios
                .delete(url+"/"+idp,{headers: { Authorization: "Bearer " + token ,  UserName: nombreUsuario }})
                .then(() => {
                    toast("Factura Eliminada Correctamente",options);
                    setShow(false);
                })
        } catch (error) {
            console.debug(error)
        }
    }
    
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Seguro desea <b className="text-danger">{title}</b> N° {idp}</h2>
            </Modal.Body>
            <Modal.Footer>
                    <Row>
                        <Col>
                            <Button variant="outline-secondary" onClick={() => onClose()}>Cancelar</Button>
                        </Col>
                        <Col>
                            <Button className="boton-turquesa" onClick={() => deletePost()} >Aceptar</Button>
                        </Col>
                    </Row>
            </Modal.Footer>
        </Modal>
    )
}
