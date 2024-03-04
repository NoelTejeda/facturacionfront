import React, { useEffect, useState } from "react"
import ModalFactura from "../Modal/ModalFactura"
import ModalEliminar from "../Modal/ModalEliminar"
import ModalAnular from "../Modal/ModalAnular"
import AddFileCdr from "../Modal/ModalFactura/AddFileCdr/AddFileCdr"
import useAuth from "../../hooks/useAuth"
import Pdf from '../Pdf'
import pad from "../../utils/funciones"
import ModalFacturaDetalle from "../Modal/ModalFactura/ModalFacturaDetalle/ModalFacturaDetalle"
import { getToken, decodeToken} from "../../utils/token"
import { urlstandart } from "../../utils/url"
import "./FacturasTldi.scss"

const url = `${urlstandart}/api/v1/factura`

export default function FacturasTldi() {
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
  const [search, setSearch] = useState("")
  const [facturaFiltrada, setFacturaFiltrada] = useState("")

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
  }, [showModalEliminar, showModal, showModalDetalle, showModalAnular, loading, showModalCdr])

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = invoicesBusqueda.filter((elemento) => {
      if (
        elemento.client
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.service_description
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.id
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) || 
        elemento.issue_date
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())||
        elemento.total_mount
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())  
      ) {
        return elemento
      }
      return resultadosBusqueda
    })
    setInvoices(resultadosBusqueda)
    console.debug(search)
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

  const clientFilter = invoices.reduce((acum, item) => {
    return !acum[item.client] 
    ? {...acum, [item.client]: parseFloat(item.total_mount), item} 
    : { ...acum, [item.client]: acum[item.client] + parseFloat(item.total_mount), item }
  },{ })

    useEffect(() => {
      setFacturaFiltrada(clientFilter)
    }, [invoices])
    
    console.debug(facturaFiltrada)
  

  return (
    <div className="card mt-4 p-4">
      <div className="card-header">
          <h2 className="text-center">Facturas TLDI</h2>
        <div className="input-group col-12">
          <button className="btn boton-cerezo ml-auto oculto-impresion" type="button" onClick={window.print} >
            <i className="fa fa-print" />
          </button>
        </div>
      </div>
      <div className="card-body p-2">
        <div className="mb-2 row">
          <div className="input-group col-6">
            <input
              className="form-control oculto-impresion"
              onChange={handleInputChange}
              type="search"
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
              <td className="subtitulo">FECHA DE FACTURACION</td>
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
                  <tr id="content" key={item.id ?? "-"}>
                    <td className="text-center">
                      TM-{pad(item.id, 0, 6)}
                    </td>
                    {item.status === true ? (
                      <td className="text-left">{item.client ?? "-"}</td>
                    ) : (
                      <td className="text-left anulada">
                        {item.client ?? "-"} -{" "}
                        <span className="badge badge-danger">ANULADA</span>
                      </td>
                    )}
                    <td className="text-center">{item.service_description ?? "-"}</td>
                    <td className="text-center">{item.issue_date ?? "-"}</td>
                    <td className="text-right">
                      {item.total_mount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") ?? "-"}{" "}
                      Bs.
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
                      {item.status === true && rol === "SUPERADMIN" ? (
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

      <Pdf 
        showPdf={showPdf}
        setShowPdf={setShowPdf}
        title="Pdf"
        idp={idp}
        datosM={datos}
      />

    </div>
  )
}
