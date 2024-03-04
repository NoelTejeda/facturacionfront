import React, { useState, useEffect } from "react"
import ModalOperador from "../Modal/ModalOperador"
import ModalEliminarOperador from "../Modal/ModalEliminarOperador"
import ModalAnular from "../Modal/ModalOperador/ModalAnularOperador"
import { getToken, decodeToken} from "../../utils/token"
import { urlstandart } from "../../utils/url"
import "./Operador.scss"

const url = `${urlstandart}/api/v1/operador`

export default function Operador() {
  const [operadores, setOperadores] = useState([])
  const [operadoresBusqueda, setOperadoresBusqueda] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showEliminarButton] = useState(false) //Solo para Mostrar el Boton Eliminar Desarrollo
  const [showModalEliminar, setShowModalEliminar] = useState(false)
  const [showModalAnular, setShowModalAnular] = useState(false)
  const [idp, setIdp] = useState("")
  const [search, setSearch] = useState("")
  const [datos, setDatos] = useState({})
  const [parametroBusqueda, setParametroBusqueda] = useState("operador")

  //let filterNumbers = operadores.filter((status) => (status = false))

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario} = tokenDecode

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
    var resultadosBusqueda = operadoresBusqueda.filter((elemento) => {
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
      
      setOperadores(resultadosBusqueda)
  }

/*   const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = operadoresBusqueda.filter((elemento) => {
      if (
        elemento.operador
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.rif
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.telefono
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.direccion
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.fecha_registro
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())  
      ) {
        return elemento
      }
      return resultadosBusqueda
    })
    setOperadores(resultadosBusqueda)
    console.debug(search)
  } */

  const obtenerDatos = async () => {
    try {
      const data = await fetch(url,{ headers: { Authorization: "Bearer " + token , UserName: nombreUsuario}})
      const operadoress = await data.json()
      setOperadores(operadoress)
      setOperadoresBusqueda(operadoress)
      if (operadoress.length > 0) setLoading(true)
      else setLoading(false)
    } catch (error) {
      console.debug(error)
    }
  }

  return (
    <div className="card mt-4 p-3">
      <div className="card-header">
          <h2 className="text-center">
            Operadores
          </h2>
        <div className="input-group col-12">
          <button className="btn boton-cerezo ml-auto oculto-impresion" type="button" onClick={window.print} >
            <i className="fa fa-print" />
          </button>
        </div>          
      </div>
      <div class="card-body p-2">
        <div className="mb-2 row">
        <div className="input-group col-2">
            <select className="form-control oculto-impresion"  onChange={handleInputParam}>
              <option value="operador" selected>Parametro de Busqueda</option>
              <option value="operador">Operador</option>
              <option value="rif">Rif</option>
              <option value="telefono">Teléfono</option>
              <option value="fecha_registro">Fecha</option>
              <option value="direccion">Dirección</option>
            </select>
          </div>
          <div className="input-group col-4">
            <input
              className="form-control oculto-impresion"
              onChange={handleInputChange}
              type="search"
              title="Formato de Busqueda por fecha Mes-Año"
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
            Nuevo Oper.
          </button>
        </div>
        <table className="table" id="seleccion">
          <thead className="table-dark text-center">
            <tr>
              <td className="subtitulo">OPERADOR</td>
              <td className="subtitulo">RIF</td>
              <td className="subtitulo">TELEFONO</td>
              <td className="subtitulo">DIRECCION</td>
              <td className="subtitulo">FECHA DE REGISTRO</td>
              <td className="subtitulo oculto-impresion">OPCIONES</td>
            </tr>
          </thead>

          <tbody>
            {!operadores ? (
              <tr id="content">
                <td colSpan="6" className="text-center">
                  No Existen Registros que Mostrar!!
                </td>
              </tr>
            ) : (
              operadores &&
              operadores.sort((a, b) => b.id - a.id)
                .map((item) => ( 
                  <tr id="content" className={!item.status ? "text-danger text-uppercase" : "text-uppercase"} key={item.id ?? "-"}>
                    <td className="text-center">{item.operador ?? "-"}</td>
                    <td className="text-center">{item.rif ?? "-"}</td>
                    <td className="text-center">{item.telefono ?? "-"}</td>
                    <td className="text-center">
                      {!item.direccion
                        ? "Sin Direccion"
                        : item.direccion.length > 10
                        ? item.direccion.substring(0, 7) ?? "-"
                        : item.direccion ?? "-"}
                    </td>
                    <td className="text-center">{item.fecha_registro ?? "-"}</td>
                    <td className="text-center oculto-impresion">
                      <span className={!item.status ? "badge badge-danger mr-2" : "badge badge-danger mr-2 d-none"}>ANULADO</span>
                        <button 
                          className={item.status ? "btn btn-sm boton-cerezo oculto-impresion" : "btn btn-sm boton-cerezo oculto-impresion d-none"}
                          type="button"
                          title="Anular Operador"
                          onClick={() => {
                            setShowModalAnular(true)
                            setIdp(item.id)
                            setDatos(item)
                          }}>
                          
                          <i className="fas fa-times" />
                        </button>
                        <button
                          className={!showEliminarButton ? "btn btn-sm boton-turquesa oculto-impresion d-none" : "btn btn-sm boton-turquesa oculto-impresion "}
                          type="button"
                          title="Eliminar Operador"
                          onClick={() => {
                            setShowModalEliminar(true)
                            setIdp(item.id)
                          }}
                        >
                          <i className="fas fa-eraser" />
                        </button>
                    </td>
                  </tr>
                  ))
            )}
          </tbody>
        </table>
      </div>

      <ModalOperador
        show={showModal}
        setShow={setShowModal}
        title="Registrar Operador"
      />

      <ModalEliminarOperador
        showModalEliminar={showModalEliminar}
        setShowModalEliminar={setShowModalEliminar}
        title="Eliminar Operador"
        idp={idp}
      />

      <ModalAnular
        showModalAnular={showModalAnular}
        setShowModalAnular={setShowModalAnular}
        datosM={datos}
        title="Anular Operador"
        idp={idp}
      />
    </div>
    
  )
}
