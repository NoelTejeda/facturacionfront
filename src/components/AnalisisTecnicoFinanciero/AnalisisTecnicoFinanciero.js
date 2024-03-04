import React, { useState, useEffect } from "react";
import { urlstandart } from "../../utils/url"
import { getToken, decodeToken } from "../../utils/token"
//import ModalAgregarAnalisisTF from "../Modal/ModalAnalisisTF/ModalAgregarAnalisisTF"
import ModalAnularAnalisisTF from "../Modal/ModalAnalisisTF/ModalAnularAnalisisTF"
import pad from '../../utils/funciones'
import "./AnalisisTecnicoFinanciero.scss"
//import { forEach } from 'lodash'
//import Table from "react-bootstrap/Table"
//import moment from "moment";
 


//const url = `${urlstandart}/api/v1/analisistf`
const urlf = `${urlstandart}/api/v1/facturageneral`
const urlo = `${urlstandart}/api/v1/facturaoperador` 
const urlnd = `${urlstandart}/api/v1/nota-debito` 
const urlnc = `${urlstandart}/api/v1/nota-credito` 
const urlndo = `${urlstandart}/api/v1/nota-debito-operador` 
const urlnco = `${urlstandart}/api/v1/nota-credito-operador` 

export default function AnalisisTecnicoFinanciero() {
  const [atfBusqueda, setAtfBusqueda] = useState([])
  
  
  const [setLoading] = useState(false)
  //const [showModal, setShowModal] = useState(false)
  const [showModalAnular, setShowModalAnular] = useState(false)
  //const [showEliminarButton] = useState(false) //Solo para Mostrar el Boton Eliminar Desarrollo
  const [search, setSearch] = useState("")
  const [datosM] = useState({})
  const [idp] = useState()
  const [facturas, setFacturas] = useState()
  const [facturasOperadores, setFacturasOperadores] = useState()
  const [parametroBusqueda, setParametroBusqueda] = useState("client")
  const [nd, setNd] = useState()
  const [nc, setNc] = useState()
  const [ndOperadores, setNdOperadores] = useState()
  const [ncOperadores, setNcOperadores] = useState()
  const [unificado, setUnificado] = useState([])

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode
  //var atfunificado = []

  useEffect(() => {
    obtenerFacturas()  
    agrupar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = atfBusqueda.filter((elemento) => {
      if (
        elemento.client
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento
      }
      return resultadosBusqueda
    })
    setAtfBusqueda(resultadosBusqueda)
  }
  const handleInputParam = (e) => {
    setParametroBusqueda(e.target.value)
  }

  /******************************** Fetch de Facturacion Movilnet */
  const obtenerFacturas = async () => {
    try {
      const data = await fetch(urlf, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario },
      })
      const facturass = await data.json()
      setFacturas(facturass)
      console.debug(facturas)
    if (facturass.length > 0) setLoading(true)
      else setLoading(false)
    } catch (error) {
      console.debug(error)
    }
  }
  
  const obtenerNotasDebito = async () => {
    try {
      const data = await fetch(urlnd, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario },
      })
      const notasDebitos = await data.json()
      setNd(notasDebitos)
      console.debug(nd)
    } catch (error) {
      console.debug(error)
    }
  }
  
  const obtenerNotasCredito = async () => {
    try {
      const data = await fetch(urlnc, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario },
      })
      const notasCreditos = await data.json()
      setNc(notasCreditos)
      console.debug(nc)
    } catch (error) {
      console.debug(error)
    }
  }
  
  /******************************** Fetch de Facturacion Operadores */
  const obtenerFacturasOperadores = async () => {
    try {
      const data = await fetch(urlo, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario },
      })
      const facturasOperadoress = await data.json()
      setFacturasOperadores(facturasOperadoress)
      console.debug(facturasOperadores)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerNdOperadores = async () => {
    try {
      const data = await fetch(urlndo, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario },
      })
      const notasDebitoOperadores = await data.json()
      setNdOperadores(notasDebitoOperadores)
      console.debug(ndOperadores)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerNcOperadores = async () => {
    try {
      const data = await fetch(urlnco, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario },
      })
      const notasCreditoOperadores = await data.json()
      setNcOperadores(notasCreditoOperadores)
      console.debug(ncOperadores)
    } catch (error) {
      console.debug(error)
    }
  }

  const agrupar = async () => {
    try {
      await obtenerFacturas()
      await obtenerNotasDebito()
      await obtenerNotasCredito()
      await obtenerFacturasOperadores()
      await obtenerNdOperadores()
      await obtenerNcOperadores()
      setUnificado([...facturas ?? 0,...nd ?? 0, ...nc ?? 0, ...facturasOperadores ?? 0, ...ndOperadores ?? 0, ...ncOperadores ?? 0])
    }catch(error){
      console.debug(error)
    }
    console.debug(unificado)
  }

  return (
    <div className="card mt-4 p-4">
      <div className="card-header">
        <h2 className="text-center">Análisis Técnico Financiero</h2>
        <div className="input-group col-12">
          <button
            className="btn boton-cerezo ml-auto oculto-impresion"
            type="button"
            onClick={window.print}
          >
            <i className="fa fa-print" />
          </button>
        </div>
      </div>
      <div className="card-body p-2">
        <div className="mb-2 row">
          <div className="input-group col-2">
            <select
              className="form-control oculto-impresion"
              onChange={handleInputParam}
            >
              <option value="client" selected>
                Parametro de Busqueda
              </option>
              <option value="operador">Operador</option>
              <option value="created_at">Fecha</option>
              <option value="total_mount">Monto</option>
            </select>
          </div>
          <div className="input-group col-3 oculto-impresion">
            <input
              className="form-control"
              onChange={handleInputChange}
              type="search"
              name="search"
              placeholder="Buscar..."
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn boton-verde" type="submit">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
          {/*       <button
                        className="btn boton-verde ml-auto col-2 oculto-impresion"
                        title="Crear Analisis Tecnico Financiero"
                        type="button"
                        onClick={() => setShowModal(true)}
                    >
                    <i className="fas fa-file-invoice mr-2" />
                        Crear Analisis
                     </button> */}
        </div>
     
        <table Style={"width: 100%"}>
          <tr>
            <td>
              <table
                align="left"
                className="table table-hover"
                Style={"width: 99%"}
              >
                <th className="text-center text-bold" colSpan={12}>
                  MOVILNET
                </th>
                <tr className="text-bold bg-black text-center">
                  <th Style={"width:10%"}>Nro.Fact</th>
                  <th Style={"width:10%"}>Fecha</th>
                  <th Style={"width:20%"}>Operador</th>
                  <th Style={"width:8%"}>Mto.Factura</th>
                  <th Style={"width:8%"}>ND</th>
                  <th Style={"width:8%"}>NC</th>
                  <th Style={"width:8%"}>Total</th>
                </tr>

                {facturas &&
                  facturas.map((item, index) => (
                    <tr key={index} className="text-center">
                      {/* Movilnet */}
                      <td Style={"width:15%"}>TM-{pad(item.id ?? "-", 0, 6)}</td> 
                      <td Style={"width:15%"}>{item.created_at.slice(3) ?? "-"}</td>
                      <td title={item.service_description ?? "-"}>{item.client ?? "-"}</td>
                      <td Style={"width:25%"}>{item.total_2.toFixed(2) ?? "-"}</td>
                      <td Style={"width:8%"} className="text-danger">
                        {item.total_nd.toFixed(2) ?? "-"}
                      </td>
                      <td Style={"width:8%"}>{item.total_nc.toFixed(2) ?? "-"}</td>
                      <td Style={"width:8%"}>
                        {item.total_nd === 0 && item.total_nc === 0
                          ? item.total_2.toFixed(2) ?? "-"
                          : item.total_final.toFixed(2) ?? "-"}
                      </td>
                    </tr>
                  ))}
              </table>
            </td>
         
              <table
                align="left"
                className="table table-hover"
                Style={"width: 100%"}
              >
                <th className="text-center text-bold"  colSpan={12}>
                  OPERADORES
                </th>
                <tr className="text-bold bg-black text-center">
                  <th Style={"width:10%"}>Nro.Fact</th>
                  <th Style={"width:10%"}>Fecha</th>
                  <th Style={"width:20%"}>Operador</th>
                  <th Style={"width:8%"}>Mto.Factura</th>
                  <th Style={"width:8%"}>ND</th>
                  <th Style={"width:8%"}>NC</th>
                  <th Style={"width:8%"}>Total</th>
         
                  
                </tr>

                {/*                     {
                     
                     facturasOperadores && facturasOperadores.map((item2)=>(
                       <tr className="text-center">
                        
                         <td>TM-{pad(item2.numero_factura, 0, 6)}</td>
                         <td>{item2.created_at.slice(3)}</td>
                         <td >{item2.operador.toUpperCase()}</td>
                         <td>{item2.total_mount.toFixed(2)}</td> 
                      
                         <td className="text-danger">{item2.total_nd_ope.toFixed(2)}</td> 
                         <td>{item2.total_nc_ope.toFixed(2)}</td> 

                         <td>{item2.total_nd_ope === 0  &&  
                         item2.total_nc_ope === 0
                          ? item2.total_mount.toFixed(2) : item2.totalfinal_ope.toFixed(2) }</td>
                      
                       </tr>
                     ))}
 */}

                {facturasOperadores &&
                  facturasOperadores.map((item2) => (
                    <tr className="text-center">
                      <td Style={"width:15%"}>
                        TM-{pad(item2.numero_factura ?? "-", 0, 6)}
                      </td>
                      <td Style={"width:15%"}>{item2.created_at.slice(3) ?? "-"}</td>
                      <td Style={"width:25%; text-transform: uppercase;"}title={item2.descripcion_servicio ?? "-"}>
                        {item2.operador ?? "-"} {/** Cambiado Uppercase a CSS para evitar problemas en ejecucion de metodo JS */}
                      </td>
                      <td Style={"width:8%"}>{item2.total_mount.toFixed(2) ?? "-"}</td>

                      <td Style={"width:8%"} className="text-danger">
                        {item2.total_nd_ope.toFixed(2) ?? "-"}
                      </td>
                      <td>{item2.total_nc_ope.toFixed(2) ?? "-"}</td>

                      <td Style={"width:8%"}>
                        {item2.total_nd_ope === 0 && item2.total_nc_ope === 0
                          ? item2.total_mount.toFixed(2) ?? "-"
                          : item2.totalfinal_ope.toFixed(2) ?? "-"}
                      </td>
                    </tr>
                  ))}

                  
           
              </table>
               {/*  
               <table align="right"className="table table-hover"Style={"width: 10%"}>
                <th className="text-center text-bold">
                  DIFERENCIA
                </th>
                <tr className="text-bold bg-black text-center">
                  <th Style={"width:8%"}>Total</th>
                </tr>

              {facturas &&
                  facturas.map((item, index) => (
                    <tr key={index} className="text-center">
                    <td Style={"width:8%"}>
                    {item.total_dif.toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </table> 
               */}
           
          </tr>
        </table>
        
      </div>

      {/*
      <ModalAgregarAnalisisTF
        show={showModal}
        setShow={setShowModal}
        title="Crear Analisis Tecnico Financiero"
      />
*/}
      <ModalAnularAnalisisTF
        show={showModalAnular}
        setShow={setShowModalAnular}
        idp={idp}
        datosM={datosM}
        title="Anular Analisis Tecnico Financiero"
      />
    </div>
  );}
