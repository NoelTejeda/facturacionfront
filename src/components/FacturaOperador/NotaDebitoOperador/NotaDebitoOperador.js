import React, { useState, useEffect } from 'react'
import ModalNotaDebitoOperador from '../../Modal/ModalNotaDebitoOperador'
import pad from "../../../utils/funciones"
import ModalAnular from '../../Modal/ModalAnular'
import ModalEliminar from "../../Modal/ModalEliminar"
import { urlstandart } from '../../../utils/url'
import './NotaDebitoOperador.scss'

const url = `${urlstandart}/api/v1/nota-debito-operador`

export default function NotaDebitoOperador() {
    const [loading, setLoading] = useState(false)
    const [notaDebitoOperador, setNotaDebitoOperador] = useState([])
    const [notaDebitoOperadorBusqueda, setNotaDebitoOperadorBusqueda] = useState([])
    const [showEliminarButton] = useState(true)//Solo para Mostrar el Boton Eliminar Desarrollo
    const [showModal, setShowModal] = useState(false)
    const [showModalAnular, setShowModalAnular] = useState(false)
    const [idp, setIdp] = useState('')
    const [datos] = useState({})
    const [search, setSearch] = useState('')//Buscador
    const [parametroBusqueda, setParametroBusqueda] = useState("id")
    const [showModalEliminar, setShowModalEliminar] = useState(false)


    useEffect(() => {
        obtenerDatos()
    }, [loading, showModal, showModalAnular, showModalEliminar])


    const handleInputChange = e => {
        setSearch(e.target.value);
        filtrar(e.target.value);
    }

    const handleInputParam = (e) => {
        setParametroBusqueda(e.target.value)
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = notaDebitoOperadorBusqueda.filter((elemento) => {
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

        setNotaDebitoOperador(resultadosBusqueda)
    }

    /* const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=notaDebitoOperadorBusqueda.filter((elemento) => {
        if(
        elemento.id
            .toString()
            .toLowerCase()
            .includes(terminoBusqueda.toLowerCase()) ||
        elemento.factura_numero
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
        
        ){
            return elemento;
        }
            return resultadosBusqueda;
        });
        setNotaDebitoOperador(resultadosBusqueda);
        console.debug(search)
    } */

    const obtenerDatos = async () => {
        try {
            const data = await fetch(url)
            const notasDebitoOperador = await data.json()
            setNotaDebitoOperador(notasDebitoOperador)
            setNotaDebitoOperadorBusqueda(notasDebitoOperador)
            if (notasDebitoOperador.length > 0)
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
                <h2 className="text-center">Notas de débito cuentas por pagar Ix</h2>
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
                            <option value="id" selected>Parametro de Busqueda</option>
                            <option value="id">Nota Debito</option>
                            <option value="factura_numero">N° Factura</option>
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
                    <button className="btn boton-verde ml-auto btn-xxl oculto-impresion" type="button" title="Crear Nueva Nota de Debito" onClick={() => setShowModal(true)}>
                        Nueva ND
                        <i className="fas fa-file-invoice ml-2" />
                    </button>
                </div>
                <table className="table">
                    <thead className="table-dark text-center">
                        <tr>
                            <td className="subtitulo">N° NOTA DEBITO</td>
                            <td className="subtitulo">N° FACTURA</td>
                            <td className="subtitulo">FECHA DE EMISION</td>
                            <td className="subtitulo">MONTO</td>
                            <td className="subtitulo  oculto-impresion">OPCIONES</td>
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
                            notaDebitoOperador && notaDebitoOperador.sort((a, b) => b.id - a.id).map(item =>
                            (
                                <tr id="content" key={item.id} >
                                    {item.status === true ? (
                                        <td className="text-center">
                                            ND-{pad(item.id ?? "-", 0, 6)}
                                        </td>
                                    ) : (
                                        <td className="text-center anulada">
                                            ND-{pad(item.id ?? "-", 0, 6)}
                                            <span className="ml-2 badge badge-danger">ANULADA</span>
                                        </td>
                                    )}

                                    <td className="text-center">TM-{pad(item.factura_numero ?? "-", 0, 6)}</td>
                                    <td className="text-center">{item.fecha_emision ?? "-"}</td>
                                    <td className="text-center">{item.monto_total ?? "-"}</td>
                                    <td className="text-center oculto-impresion">
                                        {/*item.status ?
                                            <button
                                                className="btn btn-sm boton-cerezo mr-2"
                                                type="button"
                                                onClick={() => {
                                                    setShowModalAnular(true);
                                                    setIdp(item.id);
                                                    setDatos(item)
                                                }}
                                            >
                                                Anular
                                            </button>
                                            :
                                            ''
                                            */}
                                        {showEliminarButton ?
                                            <button className="btn btn-sm boton-turquesa"
                                                title="Eliminar Nota de Débito"
                                                type="button"
                                                onClick={() => {
                                                    setShowModalEliminar(true);
                                                    setIdp(item.id)
                                                }}
                                            >
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

            <ModalNotaDebitoOperador
                showModal={showModal}
                setShowModal={setShowModal}
                title="Registrar Nota de Debito"
            />

            <ModalAnular
                showModalAnular={showModalAnular}
                setShowModalAnular={setShowModalAnular}
                title="Anular Nota de Debito"
                idp={idp}
                datosM={datos}
                tipo="Anular"
            />

            <ModalEliminar
                showModalEliminar={showModalEliminar}
                setShowModalEliminar={setShowModalEliminar}
                title="Eliminar Nota de Debito"
                idp={idp}
                datosM={datos}
                tipo="ndo"
            />


        </div>
    )
}
