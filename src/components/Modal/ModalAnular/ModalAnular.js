import React from 'react'
import {Modal, Row, Col, Button} from "react-bootstrap"
import { getToken, decodeToken } from '../../../utils/token'
import { toast } from 'react-toastify'
import axios from "axios"
import { urlstandart } from "../../../utils/url"
import moment from 'moment'
import "./ModalAnular.scss"
import {successtoast, errortoast} from "../../../utils/toastconfig"

const url=`${urlstandart}/api/v1/factura`
const urlNDO=`${urlstandart}/api/v1/nota-credito-operador/post` 

export default function ModalAnular(props) {
    const {showModalAnular, setShowModalAnular, title, idp, datosM , tipo} = props

    const token = getToken()
    const tokenDecode = decodeToken(token)
    const { nombreUsuario } = tokenDecode

    const onClose = () => {
        setShowModalAnular(false)
    }
   
    function updatePost() {  // Anular Facturas por Interconexion
        try {
            axios.post(url,{
                id: datosM.id,
                client: datosM.client,
                issue_date: datosM.issue_date,
                service_description: datosM.service_description,
                total_mount: parseFloat(datosM.total_mount),
                interconnection: datosM.interconnection,
                rif: datosM.rif,
                interconecction_id: datosM.interconecction_id,
                register_cod: datosM.register_cod,
                second_price: parseFloat(datosM.second_price),
                activo: datosM.activo,
                seconds_calls: datosM.seconds_calls,
                start_date: datosM.start_date,
                end_date: datosM.end_date,
                service_cod: datosM.service_cod,
                termination_cod: datosM.termination_cod,
                invoice_number: datosM.invoice_number,
                issue_hour: datosM.issue_hour,
                expiration_date: datosM.expiration_date,
                observaciones: datosM.observaciones,
                conciliacion_id: datosM.conciliacion_id,
                created_at: moment(Date.now()).format("DD-MM-YYYY"),
                updated_at: moment(Date.now()).format("DD-MM-YYYY"),
                username: nombreUsuario,
                status:0
            }, {headers: {'Authorization': `Bearer ${token}`, UserName: nombreUsuario}})
                .then((response) => {
                    toast(`Factura Anulada Correctamente`,successtoast);
                    setShowModalAnular(false);
                    console.debug(response)
            }, (error) => {
                toast(`Error al ${title} `, errortoast)
                setShowModalAnular(false)
                console.debug(error)
            })
        } catch (error) {
            console.debug(error);
        }
    }

    function anularNDO() { // Anular Notas de Debito de Operadores
        try {
            axios.post(urlNDO,[{
                id: datosM.id,
                numero_factura: datosM.numero_factura,
                rif: datosM.rif,
                serie: datosM.serie,
                fecha_emision: datosM.fecha_emision,
                hora_emision: datosM.hora_emision,
                fecha_vencimiento: datosM.fecha_vencimiento,
                concepto_servicio: datosM.concepto_servicio,
                segundos: datosM.segundos,
                precio: datosM.precio,
                monto_iva: datosM.monto_iva,
                monto_total: datosM.monto_total,
                observaciones: "",
                id_servicio: datosM.id_servicio,
                operador: datosM.operador,
                direccion:datosM.direccion,
                monto_exento:datosM.monto_exento,
                telefono: datosM.telefono,
                status: false,
                usuario: datosM.usuario
            }], {headers: {'Authorization': `Bearer ${token}`, UserName: nombreUsuario}})
                .then((response) => {
                    toast(`Nota Debito Operador Anulada Correctamente`,successtoast);
                    setShowModalAnular(false);
                    console.debug(response)
            }, (error) => {
                toast(`Error al ${title} `, errortoast)
                setShowModalAnular(false)
                console.debug(error)
            })
        } catch (error) {
            console.debug(error);
        }
    }

    function anularComercial() { // Anular Facturas Comerciales
        try {
            axios.post(url,{
                id: datosM.id,
                client: datosM.client, // Operador Agregado
                destiny_path: datosM.destiny_path,
                idservice: datosM.idservice,
                invoice_type: datosM.invoice_type,            
                lease: datosM.lease,
                rif: datosM.rif, // RIF Agregado
                maintenance: datosM.maintenance,
                month_dollars: datosM.month_dollars,
                origin_path: datosM.origin_path,
                service_activation_date: datosM.service_activation_date,
                service_type: datosM.service_type,
                tasa_bcv: datosM.tasa_bcv,
                transmition_speed: datosM.transmition_speed,
                month_bs: datosM.month_bs,
                total_mount: datosM.month_bs,
                username: nombreUsuario,
                service_cod: datosM.service_cod,
                issue_hour: datosM.issue_hour, // Colocar Hora
                created_at: datosM.created_at,
                direccion: datosM.direccion,
                telefono: datosM.telefono,
                updated_at: moment(Date.now()).format("DD-MM-YYYY"),
                iva: datosM.iva,
                status:0
            }, {headers: {'Authorization': `Bearer ${token}`, UserName: nombreUsuario}})
                .then((response) => {
                    toast(`Factura Comercial Anulada Correctamente`,successtoast);
                    setShowModalAnular(false);
                    console.debug(response)
            }, (error) => {
                toast(`Error al ${title} `, errortoast)
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
                    {tipo === "Anular" ?
                    <Col>
                        <Button className="boton-turquesa" type="submit" onClick={() => anularNDO()} >
                        Aceptar
                        </Button>
                    </Col>    
                    :
                    tipo === "comercial" ?
                    <Col>
                        <Button className="boton-turquesa" type="submit" onClick={() => anularComercial()} >
                        Aceptar
                        </Button>
                    </Col>
                    :
                    <Col>
                        <Button className="boton-turquesa" type="submit" onClick={() => updatePost()} >
                        Aceptar
                        </Button>
                    </Col>
                    }
                
                </Row>
            </Modal.Footer>
        </Modal>
    )
}
