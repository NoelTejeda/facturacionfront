import React, { useState, useEffect } from "react"
import ModalNotaDebito from "../Modal/ModalNotaDebito"
//import ModalAnular from '../Modal/ModalAnular';
import pad from "../../utils/funciones"
import ModalEliminar from "../Modal/ModalEliminar"
import ModalAnularNotaDebito from "../Modal/ModalNotaDebito/ModalAnularNotaDebito"
import { urlstandart } from "../../utils/url"
import "./NotaDebito.scss"
//import Pdf from '../Pdf'
import PdfNDMovilnet from '../Pdf/PdfNDMovilnet'


const url = `${urlstandart}/api/v1/nota-debito`

export default function NotaDebito(props) {
  const [notaDebito, setNotaDebito] = useState([])
  const [notaDebitoBusqueda, setNotaDebitoBusqueda] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalAnular, setShowModalAnular] = useState(false)
  const [idp, setIdp] = useState("")
  const [botonEliminar] = useState(false)
  const [datos, setDatos] = useState({})
  const [showModalEliminar, setShowModalEliminar] = useState(false)
  const [search, setSearch] = useState("") //Estado para Realizar Busquedas
  //const [showPdfNDMovilnet, setShowPdfNDMovilnet] = useState(false)
  const [parametroBusqueda, setParametroBusqueda] = useState("id")
  const [showPdf, setShowPdf] = useState()



/*   const call = () =>{
    setShowPdf(true)
  }
 */
  useEffect(() => {
    obtenerDatos()
  }, [loading, showModal, showModalEliminar, showModalAnular])

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const handleInputParam = (e) => {
    setParametroBusqueda(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = notaDebitoBusqueda.filter((elemento) => {
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
      
      setNotaDebito(resultadosBusqueda)
  }
/*   const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = notaDebitoBusqueda.filter((elemento) => {
      if (
        elemento.id
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.fecha_emision
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.monto_total
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())  
      ) {
        return elemento
      }
      return resultadosBusqueda
    })
    setNotaDebito(resultadosBusqueda)
    console.debug(search)
  } */

  const obtenerDatos = async () => {
    try {
      const data = await fetch(url)
      const notaDebitos = await data.json()
      setNotaDebito(notaDebitos)
      setNotaDebitoBusqueda(notaDebitos)
      if (notaDebitos.length > 0) setLoading(true)
      else setLoading(false)
    } catch (error) {
      console.debug(error)
    }
  }
  
  console.debug(notaDebito)

  return (
    <div className="card mt-4 p-4">
      <div className="card-header">
          <h2 className="text-center">Notas de Débito</h2>
        <div className="input-group col-12">
          <button className="btn boton-cerezo ml-auto oculto-impresion" type="button" onClick={window.print}>
            <i className="fa fa-print" />
          </button>
        </div>
      </div>
      <div className="card-body p-2">
        <div className="mb-2 row">
        <div className="input-group col-2">
            <select className="form-control oculto-impresion"  onChange={handleInputParam}>
              <option value="id" selected>Parametro de Busqueda</option>
              <option value="id">Nota Debito</option>
              <option value="factura">N° Factura</option>
              <option value="fecha_emision">Fecha</option>
              {/* <option value="status">Estatus</option> */}
              <option value="monto_total">Monto</option>
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
            className="btn boton-verde ml-auto col-2 btn-xxl oculto-impresion"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <i className="fas fa-file-invoice mr-2" />
            Nueva ND
          </button>
        </div>
        <table className="table">
          <thead className="table-dark text-center">
            <tr>
              <td className="subtitulo">N° NOTA DEBITO</td>
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
              notaDebito &&
              notaDebito
                .sort((a, b) => b.id - a.id)
                .map((item) => (
                  <tr id="content" key={item.id ?? "-"} className={item.status ? '' : 'text-danger'}>
                    <td className="text-center">
                      ND-{pad(item.id ?? "-", 0, 6)} 
                      {item.status ? '' : <span className="badge badge-danger ml-2">ANULADA</span>}
                    </td>
                    <td className="text-center">
                      TM-{pad(item.factura ?? "-", 0, 6)}
                    </td>
                    <td className="text-center">{item.fecha_emision ?? "-"}</td>
                    <td className="text-center">{item.monto_total ?? "-"} Bs</td>
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
                     : 
                      ""
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
                            //setShowPdf(true)
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

      <ModalNotaDebito
        showModal={showModal}
        setShowModal={setShowModal}
        title="Crear Nueva Nota de Debito"
        //coloqué datos como preuba
        //datosM={datos}
      />
      <ModalAnularNotaDebito
        showModalAnular={showModalAnular}
        setShowModalAnular={setShowModalAnular}
        title="Anular Nota de Debito"
        datosM={datos}
        idp={idp}
      />
      <ModalEliminar
        showModalEliminar={showModalEliminar}
        setShowModalEliminar={setShowModalEliminar}
        title="Eliminar Nota de Debito"
        idp={idp} //Debo Agregar el Componente Exclusivo de Eliminar Nota de Debito ya que esta usando uno Generico
      />
      <PdfNDMovilnet 
        showPdf={showPdf}
        setShowPdf={setShowPdf}
        title="Pdf"
        idp={idp}
        datosM={datos}
      />

    </div>
  )
}
