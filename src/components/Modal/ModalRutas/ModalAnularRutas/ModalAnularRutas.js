import React , {}from 'react'
import {Modal, Row, Col, Button} from "react-bootstrap"
import { getToken, decodeToken } from '../../../../utils/token'
import { toast } from 'react-toastify'
import axios from "axios"
import {urlstandart } from "../../../../utils/url"
import "./ModalAnularUsuario.scss"

const url=`${urlstandart}/api/v1/rutas` 

export default function ModalAnularRuta(props) {
    const {showModalAnular, setShowModalAnular, title, idp, datosM } = props
    
    const token = getToken()
    const tokenDecode = decodeToken(token)
    const { nombreUsuario } = tokenDecode
    
    const onClose = () => {
        setShowModalAnular(false);
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
            axios.post(url, {...datosM, id: idp, status: false} , {headers: {'Authorization': `Bearer ${token}` , userName: nombreUsuario}})
                .then((response) => {
                    toast(`Ruta Anulada Correctamente`,options)
                    console.debug(response)
                    setShowModalAnular(false)
                    
            }, (error) => {
                toast(`Error al ${title}`, options2)
                setShowModalAnular(false)
                console.debug(error)
            })
        } catch (error) {
            console.debug(error);
        }
    }

    return (
        <Modal show={showModalAnular} onHide={() => setShowModalAnular(false)} idp={idp}>
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