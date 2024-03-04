import React, { useState, useEffect } from "react"
import ModalNotaCredito from "../Modal/ModalNotaCredito/ModalNotaCredito"
//import ModalNotaCredito from "../Modal/ModalNotaCreditoOperador/ModalNotaCreditoOperador"
import ModalAnular from "../Modal/ModalNotaCredito/ModalAnularNotaCredito"
import pad from "../../utils/funciones"
import ModalEliminar from "../Modal/ModalEliminar"
import { urlstandart } from "../../utils/url"
import "./NotaCredito.scss"
import PdfNCMovilnet from '../Pdf/PdfNCMovilnet'
import { getToken, decodeToken } from "../../utils/token"

const url = `${urlstandart}/api/v1/nota-credito`

export default function NotaCredito() {
  const [notaCredito, setNotaCredito] = useState([])
  const [notaCreditoBusqueda, setNotaCreditoBusqueda] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [idp, setIdp] = useState("")
  const [botonEliminar] = useState(false)
  const [datos, setDatos] = useState({})
  const [showModalEliminar, setShowModalEliminar] = useState(false)
  const [showModalAnular, setShowModalAnular] = useState(false)
  const [search, setSearch] = useState("")
  const [showPdf, setShowPdf] = useState(false)
  const [parametroBusqueda, setParametroBusqueda] = useState("id")
  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  useEffect(() => {
    obtenerDatos()
  }, [loading, showModal, showModalAnular, showModalEliminar])

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const handleInputParam = (e) => {
    setParametroBusqueda(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = notaCreditoBusqueda.filter((elemento) => {
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
      
      setNotaCredito(resultadosBusqueda)
  }

  const obtenerDatos = async () => {
    try {
      const data = await fetch(url, { headers: { Authorization: "Bearer " + token , UserName: nombreUsuario}})
      const notaCreditos = await data.json()
      setNotaCredito(notaCreditos)
      setNotaCreditoBusqueda(notaCreditos)
      if (notaCreditos.length > 0) setLoading(true)
      else setLoading(false)
    } catch (error) {
      console.debug(error)
    }
  }

  console.debug(notaCredito)

  return (
    <div className="card mt-4 p-4">
      <div className="card-header">
          <h2 className="text-center">Notas de Crédito</h2>
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
              <option value="id" selected>Parametro de Busqueda</option>
              <option value="id">Nota Credito</option>
              <option value="factura">N° Factura</option>
              <option value="fecha_emision">Fecha</option>
              <option value="monto_total">Monto</option>
            </select>
          </div>
          <div className="input-group col-4">
            <input
              className="form-control oculto-impresion"
              onChange={handleInputChange}
              type="search"
              name="search"
              title="Formato de Busqueda por fecha Mes-Año"
              placeholder="Buscar..."
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn boton-verde oculto-impresion" type="submit">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
          <button
            className="btn boton-verde ml-auto col-2 btn-xxl oculto-impresion"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-file-invoice mr-2" />
            Nueva NC
          </button>
        </div>
        <table className="table">
          <thead className="table-dark text-center">
            <tr>
              <td className="subtitulo">N° NOTA CREDITO</td>
              <td className="subtitulo">N° FACTURA</td>
              <td className="subtitulo">FECHA DE EMISION</td>
              <td className="subtitulo">MONTO</td>
              <td className="subtitulo oculto-impresion">OPCIONES</td>
            </tr>
          </thead>

          <tbody>
            {!loading ? (
              <tr id="content">
                <td colSpan="5" className="text-center">
                  No Existen Registros que Mostrar!!
                </td>
              </tr>
            ) : (
              notaCredito &&
              notaCredito
                .sort((a, b) => b.id - a.id)
                .map((item) => (
                  <tr id="content" key={item.id ?? "-"} className={item.status ? '': 'text-danger'}>
                    <td className="text-center">
                      TM-{pad(item.id ?? "-", 0, 6)}
                      {item.status ? '' : <span className="badge badge-danger ml-2"> ANULADA</span>}
                    </td>
                     <td className="text-center">
                      TM-{pad(item.factura ?? "-", 0, 6)}
                    </td>
                    <td className="text-center">{item.fecha_emision ?? "-"}</td>
                    <td className="text-center">{item.monto_total ?? "-"}</td>
                    <td className="text-center oculto-impresion">
                      {item.status ?
                      <button
                        className="btn btn-sm boton-cerezo mr-2"
                        type="button"
                        onClick={() => {
                          setShowModalAnular(true)
                          setIdp(item.id)
                          setDatos(item)
                        }}
                      >
                        <i className="fas fa-times" />
                      </button>
                      :''
                    }
                      <button  
                        className="btn btn-sm boton-gris mr-2"
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

                      {botonEliminar ? (
                        <button
                          className="btn btn-sm boton-turquesa"
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

      <ModalNotaCredito
        showModal={showModal}
        setShowModal={setShowModal}
        title="Crear Nota de Credito"
      />
      <ModalEliminar
        showModalEliminar={showModalEliminar}
        setShowModalEliminar={setShowModalEliminar}
        title="Eliminar Nota de Credito"
        id={idp}
      />
      <ModalAnular
        showModalAnular={showModalAnular}
        setShowModalAnular={setShowModalAnular}
        title="Anular Nota de Credito"
        datosM={datos}
        idp={idp}
      />
      <PdfNCMovilnet 
        showPdf={showPdf}
        setShowPdf={setShowPdf}
        title="Pdf"
        idp={idp}
        datosM={datos}
      />

    </div>
  )
}
