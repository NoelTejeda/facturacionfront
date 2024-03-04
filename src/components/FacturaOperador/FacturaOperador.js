import React, { useState, useEffect } from "react"
import ModalEliminarFacturaOperador from "../Modal/ModalEliminarFacturaOperador"
import ModalFacturaOperador from "../Modal/ModalFacturaOperador"
import {urlstandart} from '../../utils/url'
import pad from "../../utils/funciones" 
import "./FacturaOperador.scss"

const url = `${urlstandart}/api/v1/facturaoperador`

export default function FacturaOperador() {
  const [facturaOperador, setFacturaOperador] = useState([])
  const [facturaOperadorBusqueda, setFacturaOperadorBusqueda] = useState([])
  const [loading, setLoading] = useState(false)
  //const [showModalDetalle, setShowModalDetalle] = useState(false)
  const [idp, setIdp] = useState("")
  const [modalEliminar, setModalEliminar] = useState(false)//Mostrar Eliminar solo para desarrollo
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState("")
  const [parametroBusqueda, setParametroBusqueda] = useState("id")


/*   useEffect(() => {
    obtenerDatos()
  }, [loading])
 */  useEffect(() => {
    obtenerDatos()
  }, [showModal, modalEliminar])

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const handleInputParam = (e) => {
    setParametroBusqueda(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = facturaOperadorBusqueda.filter((elemento) => {
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
      
      setFacturaOperador(resultadosBusqueda)
  }

  /* const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = facturaOperadorBusqueda.filter((elemento) => {
      if (
        elemento.id
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.operador
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.descripcion_servicio
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.fecha_factura
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.total_mount
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) 
      ) {
        return elemento
      }
      return resultadosBusqueda
    })
    setFacturaOperador(resultadosBusqueda)
    console.debug(search)
  }
 */
  const obtenerDatos = async () => {
    try {
      const data = await fetch(url)
      const facturasOperador = await data.json()
      setFacturaOperador(facturasOperador)
      setFacturaOperadorBusqueda(facturasOperador)
      if (facturasOperador.length > 0) setLoading(true)
      else setLoading(false)
    } catch (error) {
      console.debug(error)
    }
  }

  return (
    <div className="card mt-4 p-4">
      <div className="card-header">
          <h2 className="text-center">Cuentas por pagar Ix</h2>
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
              <option value="id">N° Control</option>
              <option value="numero_factura">N° Factura</option>
              <option value="operador">Operador</option>
              <option value="descripcion_servicio">Servicio</option>
              <option value="fecha_factura">Fecha</option>
              <option value="total_mount">Monto</option>
            </select>
          </div>
          <div className="input-group col-4">
            <input
              className="form-control oculto-impresion"
              onChange={handleInputChange}
              type="search"
              name="search"
              placeholder="Buscar..."
              title="Formato de Busqueda por fecha Mes-Año"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn boton-verde oculto-impresion" type="submit">
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
            Registrar CtaXPagar
          </button>
        </div>
        <table className="table">
          <thead className="table-dark text-center">
            <tr>
              <td className="subtitulo">N° CONTROL</td>
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
                  No Existen Datos Registrados!!
                </td>
              </tr>
            ) : (
              facturaOperador &&
              facturaOperador.sort((a, b) => b.id - a.id)
              .map((item) => (
                <tr id="content" key={item.id}>
                  <td className="text-center">TM-0000{item.id ?? "-"}</td>
                  <td className="text-center">OF-{pad(item.numero_factura ?? "-", 0, 6)}</td>
                  <td className="text-center text-uppercase">{item.operador ?? "-"}</td>
                  <td className="text-center">{item.descripcion_servicio ?? "-"}</td>
                  <td className="text-center">{item.fecha_factura ?? "-"}</td>
                  <td className="text-center">{item.total_mount.toFixed(2) ?? "-"} Bs</td>
                  <td className="text-center oculto-impresion">
                    {/*<button
                      className="btn btn-sm boton-turquesa mr-2"
                      title="Detalle de Factura"
                      type="button"
                    >
                      <i className="fas fa-file" />
                    </button>
                  */}
                    <button
                      className="btn btn-sm boton-cerezo mr-2"
                      xs={12}
                      md={4}
                      title="Anular Factura"
                      type="button"
                      onClick={() => {
                        setModalEliminar(true)
                        setIdp(item.id)
                      }}
                    >
                      <i className="fas fa-times" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ModalFacturaOperador
        show={showModal}
        setShow={setShowModal}
        title="Registrar Factura de Operador"
      />

      <ModalEliminarFacturaOperador
        show={modalEliminar}
        setShow={setModalEliminar}
        title="Eliminar Factura de Operador"
        idp={idp}
      />
    </div>
  )
}
