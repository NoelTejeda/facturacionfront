import React from "react"
import { Modal, Row, Col, Button } from "react-bootstrap"
import { getToken, decodeToken } from "../../../../utils/token"
import { toast } from "react-toastify"
import { successtoast, errortoast } from "../../../../utils/toastconfig"
import moment from "moment"
import axios from "axios"
import { urlstandart } from "../../../../utils/url"
import "./ModalAnularNotaCredito.scss"

const url = `${urlstandart}/api/v1/nota-credito`

export default function ModalAnularNotaCredito(props) {
  const { showModalAnular, setShowModalAnular, title, idp, datosM } = props

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const onClose = () => {
    setShowModalAnular(false)
  }

  function updatePost() {
    try {
      axios
        .post(
          url,
          {
            id: datosM.id,
            factura: datosM.factura,
            rif: datosM.rif,
            serie: "C",
            fecha_emision: moment(Date.now()).format("DD-MM-YYYY"),
            hora_emision: moment(Date.now())
              .utcOffset("UTC -4")
              .format("HH:mm:ss"),
            fecha_vencimiento: datosM.fecha_vencimiento,
            concepto_servicio: datosM.concepto_servicio,
            segundos: datosM.segundos,
            precio: datosM.precio,
           
            monto_iva: datosM.iva,
            monto_total: parseFloat(datosM.monto_total),
            observaciones: datosM.observaciones,
            id_servicio: datosM.id.servicio,
            operador: datosM.operador,
            direccion: datosM.direccion,
            monto_exento: parseFloat(datosM.monto_exento),
            status: false,
            usuario: nombreUsuario
          },
          { headers: { Authorization: "Bearer " + token } }
        )
        .then(
          (response) => {
            toast("Nota de Credito Anulada Correctamente", successtoast)
            setShowModalAnular(false)
            console.debug(response)
          },
          (error) => {
            toast("Error al Anular la Nota de Credito", errortoast)
            setShowModalAnular(false)
            console.debug(error)
          }
        )
    } catch (error) {
      console.debug(error)
    }
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
