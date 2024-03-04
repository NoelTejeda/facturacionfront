import React from 'react'
import { Modal, Row, Col, Button, Form} from "react-bootstrap";
import "./ModalFacturaDetalle.scss";

export default function ModalFacturaDetalle(props) {
    const {show, setShow, title, idp, setDatos } = props;
    console.debug("Operador: "+setDatos.client)

    const onClose = () => {
        setShow(false);
    };


    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{title} N°- {idp} </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Row>
                        <Col xs={12} md={8}>
                            <label for="codigo" className="badge label-turquesa text-wrap badge-label">Operador</label>
                            <label className="text-center">{setDatos.client}</label>
                        </Col>
                        <Col xs={12} md={4}>
                            <label for="descripcion" className="badge label-turquesa text-wrap badge-label">Fecha de Factura</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={3}>
                            <label for="servicio" className="badge label-turquesa text-wrap badge-label">Servicio</label>
                        </Col>
                        <Col xs={12} md={3}>
                            <label for="cargo" className="badge label-turquesa text-wrap badge-label">Cargo</label>
                        </Col>
                        <Col xs={12} md={3}>
                            <label for="segundos_llamadas" className="badge label-turquesa text-wrap badge-label">Segundos de Llamadas</label>
                        </Col>
                        <Col xs={12} md={3}>
                            <label for="precio" className="badge label-turquesa text-wrap badge-label">Precio</label>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={8}>
                            <label for="observaciones"  className="badge label-turquesa text-wrap badge-label">Observaciones</label>
                        </Col>
                        <Col xs={12} md={4}>
                            <label for="total" className="badge label-turquesa text-wrap badge-label">Total</label>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                    <Row>
                        <Col>
                            <Button variant="outline-secondary" onClick={() => onClose()}>Cerrar</Button>
                        </Col>
                    </Row>
            </Modal.Footer>
        </Modal>
    )
}
