import React, { useState, useEffect } from "react";
import { urlstandart } from "../../utils/url";
import { getToken, decodeToken } from "../../utils/token";
import ModalAgregarAnalisisTF from "../Modal/ModalAnalisisTF/ModalAgregarAnalisisTF";
import ModalAnularAnalisisTF from "../Modal/ModalAnalisisTF/ModalAnularAnalisisTF";
//import pad from '../../utils/funciones'
import "./AnalisisTecnicoFinanciero.scss";
//import { forEach } from 'lodash'
import Table from "react-bootstrap/Table";

const url = `${urlstandart}/api/v1/analisistf`;
const urlf = `${urlstandart}/api/v1/factura`;
const urlo = `${urlstandart}/api/v1/facturaoperador`;

export default function AnalisisTecnicoFinanciero() {
  const [atf, setAtf] = useState([]);
  const [atfBusqueda, setAtfBusqueda] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalAnular, setShowModalAnular] = useState(false);
  const [showEliminarButton] = useState(false); //Solo para Mostrar el Boton Eliminar Desarrollo
  const [search, setSearch] = useState("");
  const [datosM, setDatosM] = useState({});
  const [idp, setIdp] = useState();
  const [facturas, setFacturas] = useState();
  const [facturasOperadores, setFacturasOperadores] = useState();
  const [facturasUnidas, setFacturasUnidas] = useState([]);
  const [parametroBusqueda, setParametroBusqueda] = useState("client");

  const token = getToken();
  const tokenDecode = decodeToken(token);
  const { nombreUsuario } = tokenDecode;

  useEffect(() => {
    //obtenerDatos()
    obtenerFacturas();
    obtenerFacturasOperadores();
    //comparacion()
  }, [loading, showModal, showModalAnular]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = atfBusqueda.filter((elemento) => {
      if (
        elemento.client
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
      return resultadosBusqueda;
    });
    setAtfBusqueda(resultadosBusqueda);
  };
  const handleInputParam = (e) => {
    setParametroBusqueda(e.target.value);
  };

  /*const obtenerDatos = async () => {
        try {
            const data = await fetch(url, {
                headers: { Authorization: "Bearer " + token, UserName: nombreUsuario }
              })
            const atfs = await data.json()
            setAtf(atfs)
            setAtfBusqueda(atfs)
            if(atfs.length > 0)
                setLoading(true)
            else
                setLoading(false)
        } catch (error) {
            console.debug(error)
        }
    }*/

  const obtenerFacturas = async () => {
    try {
      const data = await fetch(urlf, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario },
      });
      const facturass = await data.json();
      setFacturas(facturass);
      if (facturass.length > 0) setLoading(true);
      else setLoading(false);
    } catch (error) {
      console.debug(error);
    }
  };

  const obtenerFacturasOperadores = async () => {
    try {
      const data = await fetch(urlo, {
        headers: { Authorization: "Bearer " + token, UserName: nombreUsuario },
      });
      const facturasOperadoress = await data.json();
      setFacturasOperadores(facturasOperadoress);
    } catch (error) {
      console.debug(error);
    }
  };
  /* 
    const comparacion = () => {
        if (facturas !== "" && facturasOperadores !== "" ){
            facturas.forEach(element => 
                facturasOperadores.forEach(function(elemento) {
                    if (element.client.toLowerCase() === elemento.operador.toLowerCase() && element.issue_date.slice(3,5) === elemento.fecha_factura.slice(3,5)){
                        let suma = element.total_mount - elemento.total_mount
                        setFacturasUnidas(...facturas, suma)
                        console.debug("Facturas Unidas " + facturasUnidas)
                    } else {
                        console.debug("No se han Cargado los Datos ....")
                    }
                } 
                    
            ))
    
        } else {
            console.debug("Estados Vacios")
        }
    }
 */

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
              <option value="client">Operador</option>
              <option value="issue_date">Fecha</option>
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
        <Table striped bordered hover size="sm">
          <thead className="text-center">
            <tr>
              <td className="subtitulo" colSpan={5}>
                MOVILNET
              </td>
              <td className="subtitulo" colSpan={7}>
                OPERADORES
              </td>
            </tr>
            <tr>
              <td className="subtitulo">Mes</td>
              <td className="subtitulo">Operador</td>
              <td className="subtitulo">Factura</td>
              <td className="subtitulo">ND</td>
              <td className="subtitulo">NC</td>
              <td className="subtitulo">Operador</td>
              <td className="subtitulo">Factura</td>
              <td className="subtitulo">ND</td>
              <td className="subtitulo">NC</td>
              <td className="subtitulo">Total</td>
            </tr>
          </thead>

          <tbody>
            {facturas &&
              facturas.map((item, index) => (
                <tr id="content" key={index}>
                  <td className="text-center">{item.created_at.slice(3)}</td>
                  <td className="text-center">{item.client}</td>
                  <td className="text-center">{item.total_mount}</td>
                  <td className="text-center">{item.total_mount}</td>
                  <td className="text-center">{item.total_mount}</td>
                  <td className="text-center">{item.client}</td>
                  <td className="text-center">{item.total_mount}</td>
                  <td className="text-center">{item.total_mount}</td>
                  <td className="text-center">{item.total_mount}</td>
                  <td className="text-center">
                    {item.total_mount + item.total_mount}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <ModalAgregarAnalisisTF
        show={showModal}
        setShow={setShowModal}
        title="Crear Analisis Tecnico Financiero"
      />

      <ModalAnularAnalisisTF
        show={showModalAnular}
        setShow={setShowModalAnular}
        idp={idp}
        datosM={datosM}
        title="Anular Analisis Tecnico Financiero"
      />
    </div>
  );
}
