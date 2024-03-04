import React, { useState, useEffect } from "react"
import ModalAgregarRutas from "../Modal/ModalRutas/ModalAgregarRutas/ModalAgregarRutas"
import ModalAnularRutas from "../Modal/ModalRutas/ModalAnularRutas/ModalAnularRutas"
import moment from "moment"
import { getToken, decodeToken } from "../../utils/token"
import { urlstandart } from "../../utils/url"
import "./Rutas.scss"

const url = `${urlstandart}/api/v1/rutas` 

export default function Rutas() {
  const [rutas, setRutas] = useState([])
  const [rutasBusqueda, setRutasBusqueda] = useState([])
  const [loading, setLoading] = useState(false)
  const [datos, setDatos] = useState({})
  const [search, setSearch] = useState("")
  const [showAnular, setShowAnular] = useState(false)
  const [showModalEditar] = useState(false)
  const [idp, setIdp] = useState("")
  const [showEliminar] = useState(false)//Mostrar el Boton Eliminar Desarrollo
  const [showModalAgregarRutas, setShowModalAgregarRutas] = useState(false)
  const [parametroBusqueda, setParametroBusqueda] = useState("nombre")
  const [data] = useState({})
  
  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode
  
  const handleInputChange = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const handleInputParam = (e) => {
    setParametroBusqueda(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = rutasBusqueda.filter((elemento) => {
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
      
      setRutas(resultadosBusqueda)
  }

  /*const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = usuariosBusqueda.filter((elemento) => {
      if (
        elemento.roles
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.nombreUsuario
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
          elemento.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
          elemento.email
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
          elemento.created_at
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento
      }
      return resultadosBusqueda
    })
    setUsuarios(resultadosBusqueda)
    console.debug(search)
  }*/

    const obtenerDatos = async () => {
        try {
            const data = await fetch(url,{headers: {'Authorization': `Bearer ${token}` , userName: nombreUsuario}})
            const rutass = await data.json()
            setRutas(rutass)
            setRutasBusqueda(rutass)
            if (rutass.length > 0)
                setLoading(true)
            else
                setLoading(false)
        } catch (error) {
            console.debug(error)
        }
    }

    useEffect(() => {
      obtenerDatos()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, showModalAgregarRutas, showEliminar, showAnular, showModalEditar])

  return (
    <div className="card mt-4 p-4">
      <div className="card-header">
          <h2 className="text-center">Rutas</h2>
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
              <option value="origin" selected>Parametro de Busqueda</option>
              <option value="created_at">Fecha</option>
              <option value="origin">Ruta</option>
            </select>
          </div>
          <div className="input-group col-4">
            <input
              className="form-control oculto-impresion"
              onChange={handleInputChange}
              title="Formato de Busqueda por fecha Mes-Año"
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
            title="Nueva Ruta"
            onClick={() => setShowModalAgregarRutas(true)}
          >
            <i className="fa fa-road mr-2" />
            Nueva Ruta
          </button>
        </div>
        <table className="table">
          <thead className="table-dark text-center">
            <tr>
              <td className="subtitulo">RUTA</td>
              <td className="subtitulo">FECHA REGISTRO</td>
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
              rutas &&
              rutas.sort((a, b) => b.id - a.id).map((item) => (
                !item.status ? 
                <tr id="content" className="text-danger" key={item.id ?? "-"}>
                  <td className="text-center">{item.origin ?? "-"}</td>
                  <td className="text-center">{!item.created_at ? "Sin Fecha de Creacion" : moment(item.created_at).format("DD-MM-YYYY") ?? "-"}</td>
                  <td className="text-center oculto-impresion">
                    {!item.status ? 
                      <span className="badge badge-danger">BLOQUEADO</span>
                      :
                      ''
                    }
                    {showEliminar ? (
                        <button
                          className="btn btn-sm boton-turquesa"
                          title="Eliminar Ruta"
                          type="button"
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
                  <td className="text-center">{item.origin ?? "-"}</td>
                  <td className="text-center">{!item.created_at ? "Sin Fecha de Creacion" : moment(item.created_at).format("DD-MM-YYYY") ?? "-"}</td>
                  <td className="text-center oculto-impresion">
                    <button
                        className="btn btn-sm boton-turquesa mr-2"
                        type="button"
                        title="Anular Ruta"
                        onClick={()=>{
                          setShowAnular(true)
                          setIdp(item.id)
                          setDatos(item)
                          }}
                      >
                        <i className="fas fa-user-slash" />
                    </button>
                    {showEliminar ? (
                        <button
                          className="btn btn-sm boton-turquesa"
                          title="Eliminar Servicio"
                          type="button"
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

      <ModalAgregarRutas
        showModalAgregarRutas={showModalAgregarRutas}
        setShowModalAgregarRutas={setShowModalAgregarRutas}
        setShow={setShowModalAgregarRutas}
        data={data}
        title="Ruta"
      />

      <ModalAnularRutas
        showModalAnular={showAnular}
        setShowModalAnular={setShowAnular}
        title="Anular la Ruta"
        idp={idp}
        datosM={datos}
      />
    </div>
  )
}
