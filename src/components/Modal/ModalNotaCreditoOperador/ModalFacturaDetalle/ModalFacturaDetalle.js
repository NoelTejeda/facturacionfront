import React from 'react'
import { Modal, Row, Col, Button, Form} from 'react-bootstrap'
import pad from '../../../../utils/funciones'
import './ModalFacturaDetalle.scss'

export default function ModalFacturaDetalle(props) {
    const {show, setShow, title, idp, datos } = props;
    const onClose = () => {
        setShow(false);
    };

    
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{!datos.status ? <><span className="badge badge-danger text-center">FACTURA ANULADA</span><br /></> : ''} {title} N°- TM-{pad(idp,0,6)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Row>
                        <Col xs={5} md={5}>
                            <label for="operador" className="badge label-turquesa text-wrap badge-label">Operador</label>
                            <label for="servicio" className="badge label-turquesa text-wrap badge-label">Servicio</label>
                            <label for="descripcion" className="badge label-turquesa text-wrap badge-label">Fecha de Factura</label>
                            <label for="cargo" className="badge label-turquesa text-wrap badge-label">Cargo</label>
                            <label for="segundos_llamadas" className="badge label-turquesa text-wrap badge-label">Segundos de Llamadas</label>
                            <label for="precio" className="badge label-turquesa text-wrap badge-label">Precio</label>
                            <label for="total" className="badge label-turquesa text-wrap badge-label">Total</label>
                            <label for="observaciones"  className="badge label-turquesa text-wrap badge-label">Observaciones</label>
                        </Col>
                        <Col xs={7} md={7}>
                            <Row>
                                <label className="text-center">{datos.client}</label>
                            </Row>
                            <Row>
                                <label className="text-center">{datos.service_description}</label>
                            </Row>
                            <Row>
                                <label className="text-center">{datos.issue_date}</label>
                            </Row>
                            <Row>
                                <label className="text-center">{datos.service_description}</label>
                            </Row>
                            <Row>
                                <label className="text-center">{datos.seconds_calls}</label>
                            </Row>
                            <Row>
                                <label className="text-center">{datos.second_price}</label>
                            </Row>
                            <Row>
                                <label className="text-center">{datos.total_mount}</label>
                            </Row>
                            <Row>
                                <label className="text-justified">{!datos.observaciones ? 'Sin Observaciones' : datos.observaciones}</label>
                            </Row>
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
