import React, { useState, useEffect } from "react"
import ModalServicio from "../Modal/ModalServicio/ModalServicio"
import ModalAnularServicio from "../Modal/ModalServicio/ModalAnularServicio"
import ModalEliminar from "../Modal/ModalEliminar"
import { getToken, decodeToken } from "../../utils/token"
import { urlstandart } from "../../utils/url"
import "./Servicio.scss"

const url = `${urlstandart}/api/v1/servicio` 

export default function Servicio() {
  const [servicios, setServicios] = useState([])
  const [serviciosBusqueda, setServiciosBusqueda] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showEliminarButton] = useState(false) //Solo para Mostrar el Boton Eliminar Desarrollo
  const [showModalEliminar, setShowModalEliminar] = useState(false)
  const [showModalAnular, setShowModalAnular] = useState(false)
  const [idp, setIdp] = useState("")
  const [datos, setDatos] = useState({})
  const [search, setSearch] = useState("")
  const [parametroBusqueda, setParametroBusqueda] = useState("descripcion")

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  useEffect(() => {
    obtenerDatos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, showModal, showModalAnular, showModalEliminar])

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const handleInputParam = (e) => {
    setParametroBusqueda(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = serviciosBusqueda.filter((elemento) => {
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
      
    setServicios(resultadosBusqueda)
  }

  /*const filtrar2 = (terminoBusqueda) => {
    var resultadosBusqueda = serviciosBusqueda.filter((elemento) => {
      if (
        elemento.descripcion
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.codigo
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.precio
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())  ||
          elemento.tipofactura
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento
      }
      return resultadosBusqueda
    })
    setServicios(resultadosBusqueda)
    console.debug(search)
  }*/

  const obtenerDatos = async () => {
    try {
      const data = await fetch(url, { headers: { Authorization: "Bearer " + token , UserName: nombreUsuario}})
      const servicioss = await data.json()
      setServicios(servicioss)
      setServiciosBusqueda(servicioss)
      if (servicioss.length > 0) setLoading(true)
      else setLoading(false)
    } catch (error) {
      console.debug(error)
    }
  }

  return (
    <div className="card mt-4 p-4">
      <div className="card-header">
          <h2 className="text-center">Servicios</h2>
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
              <option value="descripcion" selected>Parametro de Busqueda</option>
              <option value="codigo">Codigo</option>
              <option value="descripcion">Descripcion</option>
              <option value="tipofactura">Tipo de Servicio</option>
            </select>
          </div>
          <div className="input-group col-4">
            <input
              className="form-control oculto-impresion"
              onChange={handleInputChange}
              type="search"
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
          <button
            className="btn boton-verde ml-auto btn-xxl oculto-impresion"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-file-invoice mr-2" />
            Nuevo Servicio
          </button>
        </div>
        <table className="table">
          <thead className="table-dark text-center">
            <tr>
              <td className="subtitulo">CODIGO</td>
              <td className="subtitulo">DESCRIPCION</td>
              <td className="subtitulo">TIPO DE SERVICIO</td>
              <td className="subtitulo">PRECIO</td>
              <td className="subtitulo oculto-impresion">OPCIONES</td>
            </tr>
          </thead>

          <tbody className="text-center">
            {!loading ? (
              <tr id="content">
                <td colSpan="4" className="text-center">
                  No Existen Registros que Mostrar!!
                </td>
              </tr>
            ) : (
              servicios &&
              servicios.sort((a, b) => b.id - a.id)
                .map((item, index) => (
                  !item.status ? 
                  <tr id="content" className="text-danger" key={item.id ?? "-"}>
                    <td className="text-center">{item.codigo ?? "-"}</td>
                    <td className="text-center">{item.descripcion ?? "-"}</td>
                    <td className="text-center text-uppercase">{item.tipofactura ? item.tipofactura ?? "-" : ''}</td>
                    <td className="text-center">{item.precio ?? "-"} Bs</td>
                    <td>
                      <span className="badge badge-danger oculto-impresion">ANULADO</span>
                      {showEliminarButton ? (
                        <button
                          className="btn btn-sm boton-turquesa"
                          title="Eliminar Servicio"
                          type="button"
                          onClick={() => setShowModalEliminar(true)}
                        >
                          <i className="fas fa-eraser" />
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                  :
                  <tr id="content" key={item.id ?? "-"}>
                    <td className="text-center">{item.codigo ?? "-"}</td>
                    <td className="text-center">{item.descripcion ?? "-"}</td>
                    <td className="text-center text-uppercase">{item.tipofactura ? item.tipofactura ?? "-" : ''}</td>
                    <td className="text-center">{item.precio ?? "-"} Bs</td>
                    <td className="oculto-impresion">
                      <button
                        className="btn btn-sm boton-cerezo mr-2"
                        title="Anular Servicio"
                        type="button"
                        onClick={() => {
                          setShowModalAnular(true)
                          setIdp(item.id)
                          setDatos(item)
                        }}
                      >
                        <i className="fas fa-times" />
                      </button>
                      {showEliminarButton ? (
                        <button
                          className="btn btn-sm boton-turquesa"
                          title="Eliminar Servicio"
                          type="button"
                          onClick={() => setShowModalEliminar(true)}
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

      <ModalServicio
        show={showModal}
        setShow={setShowModal}
        title="Registrar Servicio"
      />

      <ModalAnularServicio
        showModalAnular={showModalAnular}
        setShowModalAnular={setShowModalAnular}
        datos={datos}
        title="Anular Servicio"
        idp={idp}
      />

      <ModalEliminar
        showModalEliminar={showModalEliminar}
        setShowModalEliminar={setShowModalEliminar}
        title="Eliminar Servicio"
        idp={idp}
      />
    </div>
  )
}
