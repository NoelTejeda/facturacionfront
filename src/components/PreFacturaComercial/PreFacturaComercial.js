import React, { useState, useEffect } from "react"
import ModalFacturaComercial from "../Modal/ModalFacturaComercial"
import ModalAceptarFacturaComercial from "../Modal/ModalFacturaComercial/ModalAceptarFacturaComercial"
import ModalRechazoFacturaComercial from "../Modal/ModalFacturaComercial/ModalRechazoFacturaComercial"
import PdfPreFacturaComercial from "../Pdf/PdfPrefacturaComercial"
import pad from "../../utils/funciones"
import { getToken, decodeToken } from "../../utils/token"
import "./PreFacturaComercial.scss"
import { urlstandart } from "../../utils/url"
import useAuth from "../../hooks/useAuth"
//import ModalRutas from "../Modal/ModalFacturaComercial/ModalRutas/ModalRutas"

const url = `${urlstandart}/api/v1/facturacomercial`

const PreFacturacomercial = () => {
  const [facturaComercial, setFacturaComercial] = useState("")
  const [facturaComercialBusqueda, setFacturaComercialBusqueda] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState({})
  const [showModalAceptar, setShowModalAceptar] = useState(false)
  const [showModalRechazo, setShowModalRechazo] = useState(false)
  const [idp, setIdp] = useState()
  const [search, setSearch] = useState("")
  const [setBotonAprobada] = useState(false)
  const [parametroBusqueda, setParametroBusqueda] = useState("idservice")
  const [showPdf, setShowPdf] = useState()


  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const auth = useAuth()
  const {authority} = auth.auth.rol[0]
  const rol = authority.split("_")[1]


  useEffect(() => {
    obtenerDatos()
    //console.debug(facturaComercial)
    //removeSesion(iat)
  }, [showModal, showModalRechazo, showModalAceptar])

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    //console.debug(e.target.value);
    filtrar(e.target.value)
  }
  const handleInputParam = (e) => {
    setParametroBusqueda(e.target.value)
  }

  
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = facturaComercialBusqueda.filter((elemento) => {
      if (
          elemento[parametroBusqueda]
            .toString()
            .toLowerCase()
            .includes(terminoBusqueda.toLowerCase())
        ) {
          return elemento
        }
        return resultadosBusqueda
      })
      
      setFacturaComercial(resultadosBusqueda)
  }

  const botonValidar = () =>{
    if (facturaComercial.approval === "Aprobada"){
      setBotonAprobada(true)
    }else{
      setBotonAprobada(false)
    }
  }

  const obtenerDatos = async () => {
    try {
      const data = await fetch(url, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }
      })
      const invoicesComercials = await data.json()
      setFacturaComercial(invoicesComercials)
      setFacturaComercialBusqueda(invoicesComercials)
      botonValidar()
      console.log(facturaComercial)
    } catch (error) {
      console.debug(error)
    }
  }

  return (
    <div className="card mt-4 p-4">
      <div className="card-header">
          <h2 className="text-center">PreFacturacion Comercial</h2>
        <div className="input-group col-12">
          <button
            className="btn boton-cerezo ml-auto oculto-impresion"
            type="button"
            title="Imprimir"
            onClick={window.print}
          >
            <i className="fa fa-print" />
          </button>
        </div>
      </div>
      <div className="card-body p-2">
        <div className="mb-2 row">
        <div className="input-group col-2">
            <select className="form-control oculto-impresion"  onChange={handleInputParam}>
              <option value="idservice" selected>Parametro de Busqueda</option>
              <option value="id">N° Control</option>
              <option value="operador">Operador</option>
              <option value="idservice">Servicio</option>
              <option value="created_at">Fecha</option>
              <option value="approval">Estatus</option>
            </select>
          </div>
          <div className="input-group col-4">
            <input
              className="form-control oculto-impresion"
              type="search"
              onChange={handleInputChange}
              name="search"
              title={parametroBusqueda === "id" ? "Debe Escribir solo Números" : parametroBusqueda === "created_at" ? "Formato de Busqueda Mes-Año" : "Buscar..."}
              placeholder={parametroBusqueda === "id" ? "Debe Escribir solo Números" : parametroBusqueda === "created_at" ? "Formato de Busqueda Mes-Año" : "Buscar..."}
              aria-label="Search"
            />
            <div className="input-group-append oculto-impresion">
              <button className="btn boton-verde" type="submit">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
          <button
            className="btn boton-verde ml-auto oculto-impresion"
            title="Crear Factura Nueva"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-file-invoice mr-2" />
            Registrar
          </button>
        </div>
        <table className="table">
          <thead className="table-dark text-center">
            <tr>
              <td className="subtitulo">N° CONTROL</td>
              <td className="subtitulo">OPERADOR</td>
              <td className="subtitulo">SERVICIO</td>
              <td className="subtitulo">FECHA</td>
              <td className="subtitulo">MONTO TOTAL</td>
              <td className="subtitulo oculto-impresion">OPCIONES</td>
            </tr>
          </thead>

          <tbody>
            {!facturaComercial ? (
              <tr id="content">
                <td colspan="6" className="text-center">
                  No Existen Registros que Mostrar!!
                </td>
              </tr>
            ) : (
              facturaComercial &&
              facturaComercial.sort((a, b) => b.id - a.id)
                .map((item) => (
                <tr id="content" key={item.id} className={item.approval === 'Rechazada' ?  "text-danger text-bold" : ""}>
                  <td className="text-center">PF-{pad(item.id, 0, 6)}</td>
                  <td className="text-center text-uppercase">{item.operador ?? "-"}</td>
                  <td className="text-center text-uppercase">{item.idservice ?? "-"}</td>
                  <td className="text-center">{item.created_at ?? "-"}</td>
				          <td className="text-center">{(item.month_bs + Number(item.iva)).toFixed(2) ?? "-"} Bs</td>
                  <td className="text-center oculto-impresion">
                      {item.approval === 'Aprobada' ? <span className="badge badge-success mr-2">APROBADO</span> :   ''}
                      {item.approval === 'Rechazada' ? <span className="badge badge-danger mr-2">RECHAZADA</span> :   ''}

                      {item.approval === 'Aprobada' || item.approval === 'Rechazada' ? '' :
                      <button
                        className={rol === 'SUPERADMIN' ? "btn btn-sm boton-turquesa mr-2" : "btn btn-sm boton-turquesa mr-2"}
                        title="Aprobar"
                        type="button"
                        onClick={() => {
                          setShowModalAceptar(true)
                          setIdp(item.id)
                          setData(item)
                        }}
                        >
                        <i className="fas fa-check" />
                      </button>
                      }

                      {/* agregando ternaria para quitar el boton cuando anule */}
                      {item.approval === 'Rechazada' || item.approval === 'Aprobada' ? '' :
                      <button
                        className="btn btn-sm boton-cerezo mr-2"
                        xs={12}
                        md={4}
                        title="Rechazar"
                        type="button"
                        onClick={() => {
                          setShowModalRechazo(true)
                          setIdp(item.id)
                          setData(item)
                        }}
                      >
                        <i className="fas fa-times" />
                      </button>
                      }
                      
                      <button  
                        className="btn btn-sm boton-gris mr-2 oculto-impresion"
                        xs={12}
                        md={4}
                        title="Prefactura"
                        type="button"
                        onClick={() => {
                            setShowPdf(true)
                            setIdp(item.id)
                            setData(item)
                        }}
                      >
                        <i className="fa fa-eye" />
                      </button>
                   
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ModalFacturaComercial
        show={showModal}
        setShow={setShowModal}
        title="Registrar Factura Comercial"
      />

      <ModalAceptarFacturaComercial
        showModalAceptar={showModalAceptar}
        setShowModalAceptar={setShowModalAceptar}
        idp={idp}
        data={data}
        title="Aprobar Factura Comercial"
      />

      <ModalRechazoFacturaComercial
        showModalFacturaRechazo={showModalRechazo}
        setShowModalFacturaRechazo={setShowModalRechazo}
        idp={idp}
        data={data}
        title="Rechazar Factura Comercial"
      />

      <PdfPreFacturaComercial 
        showPdf={showPdf}
        setShowPdf={setShowPdf}
        idp={idp}
        datosM={data}
        title="Rechazar Factura Comercial"
      />
    </div>
  )
}

export default PreFacturacomercial
