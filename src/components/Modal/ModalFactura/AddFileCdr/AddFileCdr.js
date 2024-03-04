import React, { useState, useEffect } from "react"
import { Modal, Form, Row, Col, Button, Container, Spinner } from "react-bootstrap"
import { toast } from "react-toastify"
import { urlstandart } from "../../../../utils/url"
import { getToken, decodeToken } from "../../../../utils/token"
import "./AddFileCdr.scss"
import axios from "axios"
import moment from "moment"
import {successtoast, errortoast } from "../../../../utils/toastconfig"


const url = `${urlstandart}/api/v1/factura`
const urlnueva = `${urlstandart}/api/v1/facturageneral`


export default function AddFileCdr(props) {
  const { title, show, setShow } = props
  const [showSpinner, setShowSpinner] = useState(false)

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const readFile = (e) => {
    setShowSpinner(true)
    const file = e.target.files[0]
    const fileReader = new FileReader()
    
    if(fileValidation(e) === true){

      fileReader.readAsText(file)
      fileReader.onload = () => {
        e.preventDefault()
        var readFile = fileReader.result
        var nueva = readFile.split('\n')
        
        nueva.forEach(item => {
          var nueva2 = item.split(';')

          const array = {
            'interconnection': nueva2[0],
            'rif': nueva2[1],
            'client':  nueva2[2],
            'service_cod': nueva2[4],
            'seconds_calls': nueva2[6],
            'second_price': parseFloat(nueva2[7].replace(",",".")),
            'total_mount': nueva2[12],
            'start_date': nueva2[13],
            'end_date': nueva2[14],
            'interconecction_id': nueva2[15],
            'service_description': nueva2[16],
            'issue_date': moment(Date.now()).format("DD-MM-YYYY"),
            'register_cod': nueva2[17],
            'activo': true,
            'termination_cod': "12",
            'issue_hour': moment(Date.now()).utcOffset("UTC -4").format("HH:mm:ss"),
            'expiration_date':moment(Date.now())
                              .add(2, "months")
                              .format("DD-MM-YYYY"),
            'observaciones': "",
            'conciliacion_id': "",
            'created_at': moment(Date.now()).format("DD-MM-YYYY"),
            'updated_at': moment(Date.now()).format("DD-MM-YYYY"),
            'status': true
          }
          axios
          .post(url, array, {headers: {'Authorization': `Bearer ${token}`, UserName: nombreUsuario}})
            .then(response => {
              setShow(true)
            }).catch(error => {
              setShow(true)
              toast("Error al intentar cargar el archivo", errortoast)
            }) 
        })
      }
      setTimeout(function(){
        axios.post(urlnueva, null, {headers: {'Authorization': `Bearer ${token}`, UserName: nombreUsuario}})
          .then(response => {
            if(response.status === 201){
              toast("Cargado Correctamente", successtoast)
              setShow(false)
            }
          }).catch(error => {
            console.debug(error)
            setShow(false)
        })
      }, 3000)
      
    }else{
      setShow(false)  
      toast("Extension de Archivo inválida", errortoast)
    }
    fileReader.onerror = () => {
      console.debug( fileReader.error )
    }
    
  }

  function fileValidation(e){
    var file = e.target.files[0]
    var separado = file.name.split(".")
    var extension = separado[1]
    if(extension === "txt"){
      return true
    }else{
      return false
    } 
  }

  const onClose = () => {
    setShow(false)
    setShowSpinner(false)
  }

  useEffect(() => {
    setShowSpinner(false)
  }, [show])
  

  return (
    <Container fluid>
      <Modal size="xs" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      {showSpinner ? 
       <b className="d-flex justify-content-center">Cargando Archivo  <Spinner animation="border" variant="primary" className="ml-2" /></b>
      : 
          <Form>
            <Row>
              <input
                type="file"
                id="files"
                name="files"
                onChange={readFile}
                accept=".txt"
              />
            </Row>
          </Form>
            }
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button variant="outline-secondary" onClick={() => onClose()}>
                Cancelar
              </Button>
            </Col>
        
          </Row>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
