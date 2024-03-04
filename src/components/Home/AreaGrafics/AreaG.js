import React, {useState, useEffect} from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'

import { Line } from "react-chartjs-2"
import { urlstandart } from "../../../utils/url"
import { getToken, decodeToken } from "../../../utils/token"

const url = `${urlstandart}/api/v1/facturacomercial2`

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

export const options = {
  responsive: true,
  layout: {
    padding: {
      left: 250
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

const LineChart = () => {
  
  const [enero, setEnero] = useState(0)
  const [febrero, setFebrero] = useState(0)
  const [marzo, setMarzo] = useState(0)
  const [abril, setAbril] = useState(0)
  const [mayo, setMayo] = useState(0)
  const [junio, setJunio] = useState(0)
  const [julio, setJulio] = useState(0)
  const [agosto, setAgosto] = useState(0)
  const [septiembre, setSeptiembre] = useState(0)
  const [octubre, setOctubre] = useState(0)
  const [noviembre, setNoviembre] = useState(0)
  const [diciembre, setDiciembre] = useState(0)

  const token = getToken()
  const tokenDecode = decodeToken(token)
  const { nombreUsuario } = tokenDecode

  const obtenerDatos = async () => {
    try {
      const data = await fetch(url, { headers: { Authorization: "Bearer " + token , UserName: nombreUsuario}})
      const invoicess = await data.json()
      invoicess.forEach(item => {
        const fecha = item.created_at 
        console.debug(fecha)
        const mes = fecha ? fecha.substring(3,5) : '01' // Formato de la Fecha 25-01-2022
       
        if ( mes === "12" ){
          setDiciembre(prevState => (prevState+1))
        }
        if ( mes === "11" ){
          setNoviembre(prevState => (prevState+1))
        }
        if ( mes === "10" ){
          setOctubre(prevState => (prevState+1))
        }
        if ( mes === "09" ){
          setSeptiembre(prevState => (prevState+1))
        }
        if ( mes === "08" ){
          setAgosto(prevState => (prevState+1))
        }
        if ( mes === "07" ){
          setJulio(prevState => (prevState+1))
        }
        if ( mes === "06" ){
          setJunio(prevState => (prevState+1))
        }
        if ( mes === "05" ){
          setMayo(prevState => (prevState+1))
        }
        if ( mes === "04" ){
          setAbril(prevState => (prevState+1))
        }
        if ( mes === "03" ){
          setMarzo(prevState => (prevState+1))
        }
        if ( mes === "02" ){
          setFebrero(prevState => (prevState+1))
        }
        if ( mes === "01" ){
          setEnero(prevState => (prevState+1))
        }
      })
    } catch (error) {
      console.debug(error)
    }
  }

  useEffect(() => {
    obtenerDatos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Facturacion Mensual",
                backgroundColor: "rgb(54, 162, 235)",
                borderColor: "rgb(54, 162, 235)",
                data: [enero, febrero, marzo,
                       abril, mayo, junio, 
                       julio, agosto, septiembre, 
                       octubre, noviembre, diciembre],
            },
        ],
    }
  
  return (
    <div style={{ width: "80%", height: "100%" }}>
      {LineChart ? 
        <Line options={options} data={data} />
      :
        'Error al Cargar Gráfica'
      } 
    </div>
  )
}

export default LineChart