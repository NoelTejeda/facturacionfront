import React from "react"
import { Modal, Row, Col, Button } from "react-bootstrap"
import { getToken, decodeToken } from "../../../../utils/token"
import { toast } from "react-toastify"
import moment from "moment"
import axios from "axios"
import { urlstandart } from "../../../../utils/url"
import "./ModalAnularNotaDebito.scss"

const url = `${urlstandart}/api/v1/factura-comercial`

export default function ModalAnularFacturaComercial(props) {
  const { showModalAnular, setShowModalAnular, title, idp, datosM } = props

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario, iat } = tokenDecode

  const onClose = () => {
    setShowModalAnular(false)
  }

  function updatePost() {
    try {
        axios.post(url,{
          destiny_path: datosM.value.destiny_path,
          idservice: datosM.idservice,
          invoice_type: datosM.invoice_type,
          iva: datosM.iva,
          lease: e.target.lease.value,
          maintenance: e.target.maintenance.value,
          month_dollars: e.target.month_dollars.value,
          origin_path: e.target.origin_path.value,
          service_activation_date: e.target.service_activation_date.value,
          service_type: e.target.service_type.value,
          service_description: e.target.service_description.value,
          tasa_bcv: e.target.tasa_bcv.value,
          total_mount: e.target.total_mount.value,
          transmition_speed: "2048",
          username: nombreUsuario,
          client: e.target.client.value.split("|")[0], //Nombre del Proveedor
          rif: e.target.client.value.split("|")[1], //Numero de RIF del Proveedor 
          created_at: moment(Date.now()).format("DD-MM-YYYY"),
          update_at: moment(Date.now()).format("DD-MM-YYYY"),
          approval: "",
          status: false
        }, {headers: {'Authorization': `Bearer ${token}`, userName: nombreUsuario }})
            .then((response) => {
                toast("Factura Comercial Anulada Correctamente",options);
                setShowModalAnular(false);
                console.debug(response)
        }, (error) => {
            toast("Error al Anular la Factura Comercial", options2)
            setShowModalAnular(false)
            console.debug(error)
        })
    } catch (error) {
        console.debug(error);
    }
}

  const options = {
    autoClose: 3000,
    type: toast.TYPE.SUCCESS,
    hideProgressBar: true,
    position: toast.POSITION.TOP_RIGHT
  }

  const options2 = {
    autoClose: 3000,
    type: toast.TYPE.ERROR,
    hideProgressBar: true,
    position: toast.POSITION.TOP_RIGHT
  }
  
  return (
    <Modal
      show={showModalAnular}
      onHide={() => setShowModalAnular(false)}
      idp={idp}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>
          Seguro desea <b className="text-danger">{title}</b> N° {idp}
        </h2>
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Col>
            <Button variant="outline-secondary" onClick={() => onClose()}>
              Cancelar
            </Button>
          </Col>
          <Col>
            <Button
              className="boton-turquesa"
              type="submit"
              onClick={() => updatePost()}
            >
              Aceptar
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  )
}
