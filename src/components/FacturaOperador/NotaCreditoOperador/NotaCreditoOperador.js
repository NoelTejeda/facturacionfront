import React, { useState, useEffect } from 'react'
import ModalEliminar from '../../Modal/ModalEliminar'
import ModalAnular from '../../Modal/ModalAnular'
import ModalNotaCreditoOperador from '../../Modal/ModalNotaCreditoOperador'
import pad from '../../../utils/funciones'
import { getToken, decodeToken } from '../../../utils/token'
import './NotaCreditoOperador.scss'
import { urlstandart } from "../../../utils/url"

const url = `${urlstandart}/api/v1/nota-credito-operador`

export default function NotaCreditoOperador() {
    const [loading, setLoading] = useState(false)
    const [notaCreditoOperador, setNotaCreditoOperador] = useState([])
    const [notaCreditoOperadorBusqueda, setNotaCreditoOperadorBusqueda] = useState([])
    const [showModalEliminar, setShowModalEliminar] = useState(false)
    const [showModalAnular, setShowModalAnular] = useState(false)
    const [idp, setIdp] = useState('')
    const [datos] = useState({})
    const [showEliminarButton] = useState(true)//Solo para Mostrar el Boton Eliminar Desarrollo
    const [showModal, setShowModal] = useState(false)
    const [search, setSearch] = useState('')
    const [parametroBusqueda, setParametroBusqueda] = useState("descripcion")

    const token = getToken()
    const tokenDecode = decodeToken(token)
    const { nombreUsuario } = tokenDecode


    useEffect(() => {
        obtenerDatos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, showModal, showModalAnular, showModalEliminar])

    const handleInputChange = e => {
        setSearch(e.target.value);
        filtrar(e.target.value);
    }

    const handleInputParam = (e) => {
        setParametroBusqueda(e.target.value)
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = notaCreditoOperadorBusqueda.filter((elemento) => {
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

        setNotaCreditoOperador(resultadosBusqueda)
    }
   
    const obtenerDatos = async () => {
        try {
            const data = await fetch(url, {headers: {'Authorization': `Bearer ${token}`, UserName: nombreUsuario}})
            const notasCreditoOperador = await data.json()
            setNotaCreditoOperador(notasCreditoOperador)
            setNotaCreditoOperadorBusqueda(notasCreditoOperador)
            if (notasCreditoOperador.length > 0)
                setLoading(true)
            else
                setLoading(false)
        } catch (error) {
            console.debug(error)
        }
    }


    return (
        <div className="card mt-4 p-4">
            <div className="card-header">
                <h2 className="text-center">Notas de crédito Operador cuentas por pagar Ix</h2>
                <div className="input-group col-12">
                    <button className="btn boton-cerezo ml-auto oculto-impresion" type="button" onClick={window.print} >
                        <i className="fa fa-print" />
                    </button>
                </div>
            </div>
            <div className="card-body p-2">
                <div className="mb-2 row">
                    <div className="input-group col-2">
                        <select className="form-control oculto-impresion" onChange={handleInputParam}>
                            <option value="descripcion" selected>Parametro de Busqueda</option>
                            <option value="id">Nota Crédito</option>
                            <option value="numero_factura">N° Factura</option>
                            <option value="fecha_emision">Fecha</option>
                            <option value="monto_total">Monto</option>
                        </select>
                    </div>
                    <div className="input-group col-4">
                        <input className="form-control oculto-impresion" 
                                onChange={handleInputChange} 
                                title="Formato de Busqueda por fecha Mes-Año"
                                type="search" 
                                name="search" 
                                placeholder="Buscar..." 
                                aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn boton-verde oculto-impresion" type="submit">
                                <i className="fas fa-search" />
                            </button>
                        </div>
                    </div>
                    <button className="btn boton-verde ml-auto btn-xxl oculto-impresion" type="button" title="Crear Nota Credito Operador" onClick={() => setShowModal(true)}  >
                        <i className="fas fa-file-invoice mr-2" />
                        Nueva NC
                    </button>
                </div>
                <table className="table">
                    <thead className="table-dark text-center">
                        <tr>
                            <td className="subtitulo">N° NOTA CREDITO</td>
                            <td className="subtitulo">OPERADOR</td>
                            <td className="subtitulo">N° FACTURA</td>
                            <td className="subtitulo">FECHA DE EMISION</td>
                            <td className="subtitulo">MONTO</td>
                            <td className="subtitulo oculto-impresion">OPCIONES</td>
                        </tr>
                    </thead>

                    <tbody>
                        {!loading ?
                            <tr id="content">
                                <td colSpan="5" className="text-center">
                                    No Existen Registros que Mostrar!!
                                </td>
                            </tr>
                            :
                            notaCreditoOperador && notaCreditoOperador.sort((a, b) => b.id - a.id).map(item =>
                            (
                                <tr id="content" key={item.id} >
                                    <td className="text-center">NCO-{pad(item.id ?? "-", 0, 6)}</td>
                                    {item.status ?
                                    <td className="text-center text-uppercase">{item.operador ?? "-" }</td>
                                    :
                                    <td className="text-center text-danger text-uppercase">{item.operador ?? "-"}</td>
                                    }
                                    {item.status ?
                                    <td className="text-center">FO-{pad(item.numero_factura ?? "-", 0, 6)}</td>
                                    :
                                    <td className="text-center text-danger">FO-{pad(item.numero_factura ?? "-", 0, 6)} - <span className="badge badge-danger">ANULADA</span></td>
                                    }
                                    <td className="text-center">{item.fecha_emision ?? "-"}</td>
                                    <td className="text-center">{item.monto_total ?? "-"}</td>
                                    <td className="text-center oculto-impresion">
                                        {/*
                                        <button
                                            className="btn btn-sm boton-cerezo mr-2"
                                            type="button"
                                            onClick={() => {
                                                setShowModalAnular(true);
                                                setIdp(item.id);
                                                setDatos(item)
                                            }
                                            } >
                                            Anular
                                        </button>
                                        */
                                        }
                                        {showEliminarButton ?
                                            <button className="btn btn-sm boton-turquesa"
                                                title="Eliminar Factura"
                                                type="button"
                                                onClick={() => {
                                                    setShowModalEliminar(true);
                                                    setIdp(item.id)
                                                }
                                                }>
                                                <i className="fas fa-eraser" />
                                            </button>
                                            : ''}
                                    </td>
                                </tr>

                            )
                            )
                        }
                    </tbody>
                </table>
            </div>

            <ModalNotaCreditoOperador
                showModal={showModal}
                setShowModal={setShowModal}
                title="Registrar Nota de Credito"
            />

            <ModalEliminar
                showModalEliminar={showModalEliminar}
                setShowModalEliminar={setShowModalEliminar}
                title="Eliminar Nota de Credito"
                tipo="nc"
                idp={idp}

            />

            <ModalAnular
                showModalAnular={showModalAnular}
                setShowModalAnular={setShowModalAnular}
                title="Anular Nota de Credito"
                tipo="Anular"
                idp={idp}
                datosM={datos}
            />

        </div>
    )
}
