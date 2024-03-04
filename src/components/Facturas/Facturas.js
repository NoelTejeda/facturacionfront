import React, { useEffect, useState } from "react"
import ModalFactura from "../Modal/ModalFactura"
import ModalEliminar from "../Modal/ModalEliminar"
import ModalAnular from "../Modal/ModalAnular"
import AddFileCdr from "../Modal/ModalFactura/AddFileCdr/AddFileCdr"
import useAuth from "../../hooks/useAuth"
import PdfFactIX from '../Pdf/PdfFactIX'
import pad from "../../utils/funciones"
import ModalFacturaDetalle from "../Modal/ModalFactura/ModalFacturaDetalle/ModalFacturaDetalle"
import { getToken, decodeToken} from "../../utils/token"
import { urlstandart } from "../../utils/url"
import "./Factura.scss"

const url = `${urlstandart}/api/v1/facturageneral`
//const urlo = `${urlstandart}/api/v1/operador`

export default function Facturas() {
  const [invoices, setInvoices] = useState([])
  const [invoicesBusqueda, setInvoicesBusqueda] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModalDetalle, setShowModalDetalle] = useState(false)
  const [showEliminarButton] = useState(false) //Solo para Mostrar el Boton Eliminar Desarrollo
  const [idp, setIdp] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showModalEliminar, setShowModalEliminar] = useState(false)
  const [showModalAnular, setShowModalAnular] = useState(false)
  const [datos, setDatos] = useState({})
  const [showModalCdr, setShowModalCdr] = useState(false)
  const [showPdf, setShowPdf] = useState(false)
  const [setSearch] = useState("")
  //const [facturaFiltrada, setFacturaFiltrada] = useState("")
  const [parametroBusqueda, setParametroBusqueda] = useState("client")
  //const [operadores, setOperadores] = useState({})
  //const [suma, setSuma] = useState(0)


  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const auth = useAuth()
  const {authority} = auth.auth.rol[0]
  const rol = authority.split("_")[1]

/*   const call = () =>{
    setShowPdf(true)
  } */

  useEffect(() => {
    obtenerDatos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModalEliminar, showModal, showModalDetalle, showModalAnular, loading, showModalCdr])

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const handleInputParam = (e) => {
    setParametroBusqueda(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = invoicesBusqueda.filter((elemento) => {
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
      
      setInvoices(resultadosBusqueda)
  }

  const obtenerDatos = async () => {
    try {
      const data = await fetch(url,{ headers: { Authorization: "Bearer " + token , UserName: nombreUsuario}})
      const invoicess = await data.json()
      setInvoices(invoicess)
      setInvoicesBusqueda(invoicess)
      if (invoicess.length > 0) setLoading(true)
      else setLoading(false)
    } catch (error) {
      console.debug(error)
    }
  }

/*   const obtenerOperadores = async () => {
    try {
      const data = await fetch(urlo,{ headers: { Authorization: "Bearer " + token , UserName: nombreUsuario}})
      const operadoress = await data.json()
      setOperadores(operadoress)
      if (operadores.length > 0) setLoading(true)
      else setLoading(false)
    } catch (error) {
      console.debug(error)
    }
  } */

/*   const clientFilter = invoices.reduce((acum, item) => {
    return !acum[item.client] 
    ? {...acum, [item.client]: parseFloat(item.total_mount), item} 
    : { ...acum, [item.client]: acum[item.client] + parseFloat(item.total_mount), item }
  },{ }) */

 /* const comparacion = () => {
    console.debug(operadores)
    if(invoices.length > 0 && operadores.length >0){
      invoices.forEach(element => 
          operadores.forEach(function(elemento) {
              if (element.client.toLowerCase() === elemento.operador.toLowerCase() ){
                  setSuma(...suma + element.total_mount)
                  //setFacturasUnidas(...facturas, suma)
                  console.debug("Facturas Unidas "+ suma)
              } else {
                  console.debug("No se han Cargado los Datos ....")
              }
          } 
      ))
    }else{
      console.debug(operadores)
    }
  }*/

  

  return (
    <div className="card mt-4 p-4">
      <div className="card-header">
          <h2 className="text-center">Facturas Ix</h2>
        <div className="input-group col-12">
          <button className="btn boton-cerezo ml-auto oculto-impresion" type="button" onClick={window.print} >
            <i className="fa fa-print" />
          </button>
        </div>
      </div>
      <div className="card-body p-2">
        <div className="mb-2 row">
        <div className="input-group col-2">
            <select className="form-control oculto-impresion"  onChange={handleInputParam}>
              <option value="client" selected>Parametro de Busqueda</option>
              <option value="id">N° Factura</option>
              <option value="client">Operador</option>
              <option value="service_description">Servicio</option>
              <option value="created_at">Fecha Emision</option>
              <option value="end_date">Fecha Facturacion</option>
              <option value="total_mount">Monto</option>
            </select>
          </div>
          <div className="input-group col-4">
            <input
              className="form-control oculto-impresion"
              onChange={handleInputChange}
              type="search"
              title="Formato de Busqueda por fecha Mes-Año"
              //type="text" buscar diferencia con search
              //value={search}
              name="search"
              placeholder="Buscar..."
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn boton-verde oculto-impresion" type="submit">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        {/*  <button
            className="btn boton-verde ml-auto col-2 oculto-impresion"
            title="Crear Factura Nueva"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-file-invoice mr-2" />
            Crear Factura
          </button>
 */}
          <button
            className="btn boton-verde mr-2 ml-auto col-2 oculto-impresion"
            title="Cargar CDR"
            type="button"
            onClick={() => setShowModalCdr(true)}
          >
            <i className="fas fa-file-invoice mr-2" />
            Cargar CDR
          </button>
        </div>
        <table className="table">
          <thead className="table-dark text-center">
            <tr>
              <td className="subtitulo">N° FACTURA</td>
              <td className="subtitulo">OPERADOR</td>
              <td className="subtitulo">SERVICIO</td>
              <td className="subtitulo">FECHA DE EMISION</td>
              <td className="subtitulo">FECHA FACTURACION</td>
              <td className="subtitulo">MONTO TOTAL</td>
              <td className="subtitulo oculto-impresion">OPCIONES</td>
            </tr>
          </thead>

          <tbody>
            {!loading ? (
              <tr id="content">
                <td colSpan="6" className="text-center">
                  No Existen Registros que Mostrar!!
                </td>
              </tr>
            ) : (
              invoices &&
              invoices
                .sort((a, b) => b.id - a.id)
                .map((item) => (
                  <tr id="content" key={item.id}>
                    <td className="text-center">
                      TM-{pad(item.id, 0, 6)}
                    </td>
                    {item.status === true ? (
                      <td className="text-center">{item.client ?? "-"}</td>
                    ) : (
                      <td className="text-center anulada">
                        {item.client ?? "-"} -{" "}
                        <span className="badge badge-danger">ANULADA</span>
                      </td>
                    )}
                    <td className="text-center">{item.service_description ?? "-"}</td>
                    <td className="text-center">{item.created_at ?? "-"}</td>
                    <td className="text-center">{item.end_date.slice(3,10) ?? "-"} </td>
                    <td className="text-right">
                      {item.total_2.toFixed(2) ?? "-"} Bs
                    </td>
                    <td className="text-center oculta-impresion">
                      <button
                        className="btn btn-sm boton-turquesa mr-2 oculto-impresion"
                        title="Detalle de Factura"
                        type="button"
                        onClick={() => {
                          setShowModalDetalle(true)
                          setIdp(item.id)
                          setDatos(item)
                        }}
                      >
                        <i className="fas fa-file" />
                      </button>
                      {item.status === true && (rol === "SUPERADMIN" || rol === "ADMIN") ? (
                        <button
                          className="btn btn-sm boton-cerezo mr-2 oculto-impresion"
                          xs={12}
                          md={4}
                          title="Anular Factura"
                          type="button"
                          onClick={() => {
                            setShowModalAnular(true)
                            setIdp(item.id)
                            setDatos(item)
                          }}
                        >
                          <i className="fas fa-times" />
                        </button>
                      ) : (
                        ""
                      )}
                      <button  
                        className="btn btn-sm boton-gris mr-2 oculto-impresion"
                        xs={12}
                        md={4}
                        title="Imprimir Factura"
                        type="button"
                        onClick={() => {
                            setShowPdf(true)
                            setIdp(item.id)
                            setDatos(item)
                        }}
                      >
                        <i className="fa fa-print" />
                      </button>

                      {showEliminarButton ? (
                        <button
                          className="btn btn-sm boton-turquesa"
                          title="Eliminar Factura"
                          type="button"
                          onClick={() => {
                            setShowModalEliminar(true)
                            setIdp(item.id)
                          }}
                        >
                          <i className="fas fa-eraser" />
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      <ModalFacturaDetalle
        show={showModalDetalle}
        setShow={setShowModalDetalle}
        title="Detalle de la Factura"
        datos={datos}
        idp={idp}
      />

      <ModalFactura
        show={showModal}
        setShow={setShowModal}
        title="Crear Factura"
      />

      <AddFileCdr
        show={showModalCdr}
        setShow={setShowModalCdr}
        title="Cargar CDR"
      />

      <ModalEliminar
        showModalEliminar={showModalEliminar}
        setShowModalEliminar={setShowModalEliminar}
        title="Eliminar Factura"
        idp={idp}
      />

      <ModalAnular
        showModalAnular={showModalAnular}
        setShowModalAnular={setShowModalAnular}
        title="Anular Factura"
        idp={idp}
        datosM={datos}
      />

      <PdfFactIX
        showPdf={showPdf}
        setShowPdf={setShowPdf}
        title="Pdf"
        idp={idp}
        datosM={datos}
      />

    </div>
  )
}
