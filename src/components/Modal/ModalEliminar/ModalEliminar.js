import React from 'react'
import {Modal, Row, Col, Button} from "react-bootstrap"
import {toast } from 'react-toastify'
import { successtoast } from '../../../utils/toastconfig'
import {getToken, decodeToken} from "../../../utils/token"
import {urlstandart} from "../../../utils/url"
import axios from "axios"
import "./ModalEliminar.scss"

const url = `${urlstandart}/api/v1/factura`
const urlNC = `${urlstandart}/api/v1/nota-credito-operador`
const urlNDO = `${urlstandart}/api/v1/nota-debito-operador`

export default function ModalEliminar(props) {
    const {showModalEliminar, setShowModalEliminar, title, idp, tipo} = props;
    const token = getToken()
    const tokenDecode = decodeToken(token)
    const { nombreUsuario } = tokenDecode

    const onClose = () => {
        setShowModalEliminar(false)
    }

    function deletePost() {
        try {
            axios
                .delete(url+"/"+idp,{headers: {'Authorization': `Bearer ${token}`, userName: nombreUsuario}})
                .then(() => {
                    toast("Factura Eliminada Correctamente",successtoast)
                    setShowModalEliminar(false)
                });
        } catch (error) {
            console.debug(error)
        }
    }

    function deletePostNC() {
        try {
            axios
                .delete(urlNC+"/"+idp,{headers: {'Authorization': `Bearer ${token}`, userName: nombreUsuario}})
                .then(() => {
                    toast("Node de Credito Eliminada Correctamente",successtoast)
                    setShowModalEliminar(false)
                });
        } catch (error) {
            console.debug(error);
        }
    }

    function deletePostNDO() {
        try {
            axios
                .delete(urlNDO+"/"+idp,{headers: {'Authorization': `Bearer ${token}`, userName: nombreUsuario}})
                .then(() => {
                    toast("Node de Debito Eliminada Correctamente",successtoast)
                    setShowModalEliminar(false)
                });
        } catch (error) {
            console.debug(error);
        }
    }
    
    return (
        <Modal show={showModalEliminar} onHide={() => setShowModalEliminar(false)} idp={idp}>
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
                            {tipo === "nc" ? 
                                 <Button className="boton-turquesa" onClick={() => deletePostNC()} >AceptarNC</Button>
                                 : tipo === "ndo" ? 
                                    <Button className="boton-turquesa" onClick={() => deletePostNDO()} >AceptarND</Button>
                                    :
                                        <Button className="boton-turquesa" onClick={() => deletePost()} >Aceptar</Button>
                            }
                            
                        </Col>
                    </Row>
            </Modal.Footer>
        </Modal>
    )
}
