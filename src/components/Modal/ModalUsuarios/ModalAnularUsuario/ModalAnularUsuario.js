import React , { useState}from 'react'
import { Modal, Row, Col, Button } from "react-bootstrap"
import { getToken, decodeToken } from '../../../../utils/token'
import { toast } from 'react-toastify'
import axios from "axios"
import {urlstandart } from "../../../../utils/url"
import "./ModalAnularUsuario.scss"

const url=`${urlstandart}/api/v1/usuarios` 

export default function ModalAnularUsuario(props) {
    const {showModalAnular, setShowModalAnular, title, idp, datosM } = props
    const [observacion, setObservacion] = useState("")

    const token = getToken()
    const tokenDecode = decodeToken(token)
    const { nombreUsuario } = tokenDecode
    
    const onClose = () => {
        setShowModalAnular(false)
    }

    const handleInputChange = (event) => {
        console.debug(observacion)
        setObservacion(event.target.value)
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
        if(!observacion){
            toast(`Debe Llenar el Motivo de Bloqueo`, options2)
            setShowModalAnular(false)
        } else {
            try {
                axios.put(url + "/" + idp, {...datosM, status: false, observacion} , {headers: {'Authorization': `Bearer ${token}` , userName: nombreUsuario}})
                    .then((response) => {
                        toast(`Bloqueado Correctamente`,options)
                        console.debug(response)
                        setShowModalAnular(false)
                        
                }, (error) => {
                    toast(`Error al ${title}`, options2)
                    setShowModalAnular(false)
                    console.debug(error)
                })
                setObservacion("")
            } catch (error) {
                console.debug(error);
            }
        }
    }

    return (
        <Modal show={showModalAnular} onHide={() => setShowModalAnular(false)} idp={idp}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Seguro desea <b className="text-danger">{title}</b> {datosM.nombreUsuario}</h2>
                <Row>
                    <Col xs={12} md={12}>
                    <label
                        for="observacion"
                        className="badge label-turquesa text-wrap badge-label"
                    >
                        Motivo de Bloqueo
                    </label>
                    <textarea id="observacion" name="observacion" className="form-control" placeholder="Motivo de Bloqueo" onChange={handleInputChange} />
                    </Col>
                </Row>
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