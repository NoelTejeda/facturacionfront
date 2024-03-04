import React, { useState, useEffect } from "react"
import ModalFacturaComercial from "../Modal/ModalFacturaComercial"
import PdfFacturaComercial from "../Pdf/PdfFacturaComercial"
import ModalAnular from "../Modal/ModalAnular"
import pad from "../../utils/funciones"
import { getToken, decodeToken } from "../../utils/token"
import "./FacturaComercial.scss"
import { urlstandart } from "../../utils/url"
import useAuth from "../../hooks/useAuth"

const url = `${urlstandart}/api/v1/facturacomercial2`
/* const url = `${urlstandart}/api/v1/ ` */

const Facturacomercial = () => {
  const [facturaComercial, setFacturaComercial] = useState("")
  const [facturaComercialBusqueda, setFacturaComercialBusqueda] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState({})
  const [showModalAnular, setShowModalAnular] = useState(false)
  const [idp, setIdp] = useState()
  const [search, setSearch] = useState("")
  const [setBotonAprobada] = useState(false)
  const [parametroBusqueda, setParametroBusqueda] = useState("idservice")
  const [showPdf, setShowPdf] = useState()

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const auth = useAuth()
  const { authority } = auth.auth.rol[0]
  const rol = authority.split("_")[1]
  const TIPO_FACTURA = "ot"
  const TIPO_FACTURA2 = "comercial"


  useEffect(() => {
    obtenerDatos(nombreUsuario)
  }, [showModal, showModalAnular])

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }
  const handleInputParam = (e) => {
    setParametroBusqueda(e.target.value)
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

  const botonValidar = () => {
    if (facturaComercial.approval === "Aprobada") {
      setBotonAprobada(true)
    } else {
      setBotonAprobada(false)
    }
  }

  return (
    <div className="card mt-4 p-4">
      <div className="card-header">
        <h2 className="text-center">Facturacion Comercial</h2>
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
            <select className="form-control oculto-impresion" onChange={handleInputParam}>
              <option value="idservice" selected>Parametro de Busqueda</option>
              <option value="id">N° Factura</option>
              <option value="client">Operador</option>
              <option value="idservice">Servicio</option>
              <option value="created_at">Fecha</option>
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

        </div>
        <table className="table">
          <thead className="table-dark text-center">
            <tr>
              <td className="subtitulo">FACTURA</td>
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
              facturaComercial.filter((item) => item.invoice_type === TIPO_FACTURA || item.invoice_type === TIPO_FACTURA2).sort((a, b) => b.id - a.id) // Modificacion para Filtrar solo facturas Comerciales desde la Tabla Invoice 23/01/2024
                .map((item) => (
                  <tr id="content" key={item.id} className={item.status ? "" : "text-danger text-bold"}>
                    <td className="text-center">TM-{pad(item.id, 0, 6)}</td>
                    <td className="text-center text-uppercase">{item.client ?? "-"}</td>
                    <td className="text-center text-uppercase">{item.idservice ?? "-"}</td>
                    <td className="text-center">{item.created_at ?? "-"}</td>
                    <td className="text-center">{(item.month_bs + Number(item.iva)).toFixed(2) ?? "-"} Bs</td>
                    <td className="text-center oculto-impresion">
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
                            setData(item)
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
                        title="Mostrar Factura"
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

      <ModalAnular
        showModalAnular={showModalAnular}
        setShowModalAnular={setShowModalAnular}
        title="Anular Factura Comercial"
        idp={idp}
        datosM={data}
        tipo="comercial"
      />

      <PdfFacturaComercial
        showPdf={showPdf}
        setShowPdf={setShowPdf}
        idp={idp}
        datosM={data}
        title="Factura Comercial"
      />
    </div>
  )
}

export default Facturacomercial
