import React, { useState, useEffect } from "react"
import ModalAgregarUsuario from "../Modal/ModalUsuarios/ModalAgregarUsuario/"
import ModalAnularUsuario from "../Modal/ModalUsuarios/ModalAnularUsuario"
import ModalEditarUsuario from '../Modal/ModalUsuarios/ModalEditarUsuario'
import moment from "moment"
import { getToken, decodeToken } from "../../utils/token"
import { urlstandart } from "../../utils/url"
import "./Usuarios.scss"

const url = `${urlstandart}/api/v1/usuarios`

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [usuariosBusqueda, setUsuariosBusqueda] = useState([])
  const [loading, setLoading] = useState(false)
  const [datos, setDatos] = useState({})
  const [search, setSearch] = useState("")
  const [showAnular, setShowAnular] = useState(false)
  const [showModalEditar, setShowModalEditar] = useState(false)
  const [idp, setIdp] = useState("")
  const [showEliminar] = useState(false)//Mostrar el Boton Eliminar Desarrollo
  const [showModalAgregar, setShowModalAgregar] = useState(false)
  
  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode
  
  const handleInputChange = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = usuariosBusqueda.filter((elemento) => {
      if (
        elemento.nombre
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.nombreUsuario
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.created_at
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())  ||
        elemento.roles[0].rolNombre
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
  }

    const obtenerDatos = async () => {
        try {
            const data = await fetch(url,{headers: {'Authorization': `Bearer ${token}` , userName: nombreUsuario}})
            const usuarioss = await data.json()
            setUsuarios(usuarioss)
            setUsuariosBusqueda(usuarioss)
            if (usuarioss.length > 0)
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
    }, [loading, showModalAgregar, showEliminar, showAnular, showModalEditar])

  return (
    <div className="card mt-4 p-4">
      <div className="card-header">
          <h2 className="text-center">Usuarios</h2>
        <div className="input-group col-12">
          <button className="btn boton-cerezo ml-auto oculto-impresion" type="button" onClick={window.print} >
            <i className="fa fa-print" />
          </button>
        </div>
      </div>
      <div class="card-body p-2">
        <div className="mb-2 row">
         {/*  <div className="input-group col-2">
            <select className="form-control oculto-impresion"  onChange={handleInputParam}>
              <option value="nombre" selected>Parametro de Busqueda</option>
              <option value="nombreUsuario">Nombre de Usuario</option>
              <option value="nombre">Nombre</option>
              <option value="email">Correo Electrónico</option>
              <option value="created_at">Fecha</option>
              <option value="rolnombre">Roles</option>
            </select>
          </div> */}
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
            onClick={() => setShowModalAgregar(true)}
          >
            <i className="fa fa-user mr-2" />
            Nuevo Usuario
          </button>
        </div>
        <table className="table">
          <thead className="table-dark text-center">
            <tr>
              <td className="subtitulo">USUARIO</td>
              <td className="subtitulo">NOMBRE</td>
              <td className="subtitulo">EMAIL</td>
              <td className="subtitulo">CREACION</td>
              <td className="subtitulo">ROL</td>
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
              usuarios &&
              usuarios.sort((a, b) => b.id - a.id).map((item) => (
                !item.status ? 
                <tr id="content" className="text-danger" key={item.id ?? "-"}>
                  <td className="text-center" title={item.observacion ?? "-"}>{item.nombreUsuario ?? "-"}</td>
                  <td className="text-center">{item.nombre ?? "-"}</td>
                  <td className="text-center">{item.email ?? "-"}</td>
                  <td className="text-center">{!item.created_at ? "Sin Fecha de Creacion" : moment(item.created_at).format("DD-MM-YYYY") ?? "-"}</td>
                  <td className="text-center">
                    <span className="badge badge-danger">BLOQUEADO</span>
                  </td>
                  <td className="text-center oculto-impresion">
                    <button
                        className="btn btn-sm boton-cerezo mr-2"
                        type="button"
                        title="Editar Usuario"
                        onClick={()=>{
                          setShowModalEditar(true)
                          setIdp(item.id)
                          setDatos(item)
                          }}
                      >
                        <i className="fas fa-edit" />
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
                :
                <tr id="content" key={item.id ?? "-"}>
                  <td className="text-center">{item.nombreUsuario ?? "-"}</td>
                  <td className="text-center">{item.nombre ?? "-"}</td>
                  <td className="text-center">{item.email ?? "-"}</td>
                  <td className="text-center">{!item.created_at ? "Sin Fecha de Creacion" : moment(item.created_at).format("DD-MM-YYYY") ?? "-"}</td>
                  <td className="text-center">
                    {item.roles
                      .filter((item, index) => index === 0)
                      .map((item) => item.rolNombre.toLowerCase().slice(5) ?? "-")}
                  </td>
                  <td className="text-center oculto-impresion">
                    <button
                        className="btn btn-sm boton-cerezo mr-2"
                        type="button"
                        title="Editar Usuario"
                        onClick={()=>{
                          setShowModalEditar(true)
                          setIdp(item.id)
                          setDatos(item)
                          }}
                      >
                        <i className="fas fa-edit" />
                    </button>
                    <button
                        className="btn btn-sm boton-turquesa mr-2"
                        type="button"
                        title="Bloquear Usuario"
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

      <ModalAgregarUsuario
        show={showModalAgregar}
        setShow={setShowModalAgregar}
        title="Registrar Usuario"
      />

      <ModalEditarUsuario
        show={showModalEditar}
        setShow={setShowModalEditar}
        datos={datos}
        title="Editar Usuario"
        idp={idp}
      />

      <ModalAnularUsuario
        showModalAnular={showAnular}
        setShowModalAnular={setShowAnular}
        title="Bloquear Usuario"
        idp={idp}
        datosM={datos}
      />
    </div>
  )
}
