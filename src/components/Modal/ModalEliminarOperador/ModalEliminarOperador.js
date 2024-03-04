import React from 'react'
import { Modal, Row, Col, Button} from "react-bootstrap"
import { toast } from 'react-toastify'
import { getToken, decodeToken} from "../../../utils/token"
import axios from "axios"
import {urlstandart} from "../../../utils/url"
import "./ModalEliminarOperador.scss"

const url = `${urlstandart}/api/v1/operador`

export default function ModalEliminarOperador(props) {
    const {showModalEliminar, setShowModalEliminar, title, idp} = props

    const token = getToken()
    const tokenDecode = decodeToken(token)
    const { nombreUsuario} = tokenDecode
    
    const onClose = () => {
        setShowModalEliminar(false);
    };

    const options = {
        autoClose: 3000,
        type: toast.TYPE.ERROR,
        hideProgressBar: true,
        position: toast.POSITION.TOP_RIGHT,
        toastClassName: "dark-toast"
    };

    function deletePost() {
        try {
            axios
                .delete(url+"/"+idp,{ headers: { Authorization: "Bearer " + token , UserName: nombreUsuario}})
                .then(() => {
                    toast("Operador Eliminado Correctamente",options);
                    setShowModalEliminar(false);
                });
        } catch (error) {
            console.debug(error);
        }
    }
    
    return (
        <Modal show={showModalEliminar} onHide={() => setShowModalEliminar(false)}>
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
