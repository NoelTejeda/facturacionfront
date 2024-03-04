import React, {useState, useEffect} from "react"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { urlstandart } from "../../../utils/url"
import { getToken, decodeToken } from "../../../utils/token"

ChartJS.register(ArcElement, Tooltip, Legend)

const url = `${urlstandart}/api/v1/factura`
const urlO = `${urlstandart}/api/v1/operador`
const urlS = `${urlstandart}/api/v1/servicio`
const urlPreFactura = `${urlstandart}/api/v1/facturacomercial`

export const options = {
  responsive: true,
  layout: {
    align: {
      center: "center"
    },
    padding: {
      left: 150,
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Interconectados',
    },
  },
}

const PieChart = () => {

  const [contadorI, setContadorI] = useState(0)
  const [contadorO, setContadorO] = useState(0)
  const [contadorS, setContadorS] = useState(0)
  const [contadorPrefactura, setContadorPrefactura] = useState(0)

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

  const data = {
 
    labels: ["Facturas Pendientes", "Facturas Comercial", "Operadores"],
    datasets: [
      {
        label: "Cantidad Registrada",
        data: [ contadorPrefactura, contadorI, contadorO],
        backgroundColor: [
          "#e03444", // Facturas Pendientes
          "#18a4b4", // Facturas Comerciales 
          "#28ac44"  // Operadores
        ],
        borderColor: [
          //verde
          "rgba(75, 192, 192, 1)",
          //amarillo
          "rgba(255, 206, 86, 1)",
          //azul 
          "rgba(54, 162, 235, 1)",
          //rojo
          "rgba(255,99,132,1)"
        ],
        borderWidth: 1,
      },
    ],
}

  useEffect(() => {
    obtenerDatos()
    obtenerDatosOperadores()
    obtenerDatosServicios()
    obtenerDatosPreFacturas()
  }, [])

  return (
    <div style={{ paddingLeft: "10%", width: "50%" }}>
      {PieChart ?
        <Pie options={options} data={data} />
      :
        'Error al Cargar La gráfica'
      }
    </div>
  )
}
export default PieChart