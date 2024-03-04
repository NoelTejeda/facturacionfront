import React, { useState, useEffect } from "react"
import { getToken, decodeToken } from "../../../utils/token"
import { urlstandart } from '../../../utils/url'

const url = `${urlstandart}/api/v1/factura`
const urlO = `${urlstandart}/api/v1/operador`
const urlS = `${urlstandart}/api/v1/servicio`
const urlPreFactura = `${urlstandart}/api/v1/facturacomercial`

export default function CardHead() {
  //const [invoices, setInvoices] = useState([])
  const [contadorI, setContadorI] = useState()
  //const [operadores, setOperadores] = useState([])
  const [contadorO, setContadorO] = useState()
  //const [servicios, setServicios] = useState([])
  const [contadorS, setContadorS] = useState()
  const [contadorPrefactura, setContadorPrefactura] = useState()

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const obtenerDatos = async () => {
    try {
      const data = await fetch(url, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }
      })
      const invoicess = await data.json()
      //setInvoices(invoicess)
      setContadorI(invoicess.length)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerDatosOperadores = async () => {
    try {
      const data = await fetch(urlO, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }
      })
      const operadoress = await data.json()
      //setOperadores(operadoress)
      setContadorO(operadoress.length)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerDatosServicios = async () => {
    try {
      const data = await fetch(urlS, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }
      })
      const servicioss = await data.json()
      //setServicios(servicioss)
      setContadorS(servicioss.length)
    } catch (error) {
      console.debug(error)
    }
  }

  const obtenerDatosPreFacturas = async () => {
    try {
      const data = await fetch(urlPreFactura, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }
      })
      const prefacturas = await data.json()
      const aprobadas = prefacturas.filter(element => element.approval === "")
      setContadorPrefactura(aprobadas.length)
    } catch (error) {
      console.debug(error)
    }
  }

  useEffect(() => {
    obtenerDatos()
    obtenerDatosOperadores()
    obtenerDatosServicios()
    obtenerDatosPreFacturas()
  }, [])

  return (
    <div className="home-grafics">
      <div className="row">
      
        {/* FACTURAS PENDIENTES */}
        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              {!contadorPrefactura ? (
                <div className="spinner-border text-info" role="status">
                  <span className="sr-only">Cargando...</span>
                </div>
              ) : (
                <h3>{contadorPrefactura}</h3>
              )}
              <p>Facturas Pendientes</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
          </div>
        </div>
        {/* FACTURAS PENDIENTES */}
        
        {/* FACTURAS COMERCIAL */}
        <div className="col-lg-3 col-6">
          <div className="small-box bg-info">
            <div className="inner">
              {!contadorI ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Cargando...</span>
                </div>
              ) : (
                <h3>{contadorI}</h3>
              )}
              <p>Facturas Comerciales</p>
            </div>

            <div className="icon">
              <i className="ion ion-bag" />
            </div>
          </div>
        </div>
        {/* FACTURAS COMERCIAL */}

        {/* FACTURAS OPERADORES */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-success">
            <div className="inner">
              {!contadorO ? (
                <div className="spinner-border text-dark" role="status">
                  <span className="sr-only">Cargando...</span>
                </div>
              ) : (
                <h3>{contadorO}</h3>
              )}
              <p>Operadores</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
          </div>
        </div>
        {/* FACTURAS OPERADORES */}
        
        {/* FACTURAS SERVICIOS */}
        <div className="col-lg-3 col-6">
          {/* small box */}
          <div className="small-box bg-warning">
            <div className="inner">
              {!contadorS ? (
                <div className="spinner-border text-danger" role="status">
                  <span className="sr-only">Cargando...</span>
                </div>
              ) : (
                <h3>{contadorS}</h3>
              )}
              <p>Servicios</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>
          </div>
        </div>
        {/* FACTURAS SERVICIOS */}
        
      </div>
      {/* /.row */}
    </div>
  )
}
