import React, { useState } from "react"
import { Modal } from "react-bootstrap"
//import moment from "moment"
import pad from "../../utils/funciones"
import logo from "../../assets/jpg/movilnetlogo3.png"
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  PDFViewer,
  Rect,
  Svg
} from "@react-pdf/renderer"

export default function PdfFacturaComercial(props) {
  const { showPdf, setShowPdf, datosM, idp } = props
  const [loading] = useState(true)
  //const year = moment(Date.now()).format("YYYY")


  const styles = StyleSheet.create({
    direccion: {
      flexDirection: "row",
      marginTop: "10px"
    },
    direccion2: {
      flexDirection: "row"
    },
    caja3: {
      fontSize: "10px",
      marginTop: "-265px",
      marginLeft: "20px",
      marginRight: "35px",
      fontWeight: "bold",
      backgroundColor: "#D3D3D3",
      padding: "10px"
    },
    caja6: {
      fontSize: "10px",
      marginTop: "-265px",
      marginLeft: "20px",
      marginRight: "35px",
      fontWeight: "bold",
      backgroundColor: "#D3D3D3",
      padding: "5px"
    },
    caja7: {
      fontSize: "10px",
      padding: "5px",
      marginBottom: "50px"
    },
    caja5: {
      fontSize: "10px",
      marginTop: "-265px",
      marginLeft: "25px",
      fontWeight: "bold"
    },
    caja4: {
      marginTop: "10px",
      fontSize: "10px",
      marginRight: "50px"
    },
    monto: {
      textAlign: "right",
      alignContent: "flex-end"
    },
    monto2: {
      textAlign: "right",
      alignContent: "flex-end"
    },
    monto3: {
      marginTop: "-270px",
      textAlign: "right",
      alignContent: "flex-end",
      marginLeft: "85%",
      backgroundColor: "#D3D3D3",
      padding: "10px"
    },
    caja: {
      flex: 1,
      marginLeft: "20px",
    },
    caja2: {
      flex: 1,
      marginTop: "70px"
    },
    membrete: {
      fontSize: "11px",
      fontWeight: "bold",
      fontStyle: '100px',
      textTransform: 'uppercase'
    },
    membrete2: {
      fontSize: "9px",
      padding: "3px",
      marginRight: "50px"
    },
    membrete3: {
      fontSize: "9px",
      marginTop: "20px",
      padding: "3px"
    },
    membrete4: {
      fontSize: "9px",
      marginTop: "-130px",
      padding: "3px"
    },
    fechas: {
      marginTop: "30px"
    },
    fechas2: {
      fontSize: "9px",
      marginRight: "100px"
    },
    idfecha: {
      fontSize: "9px"
    },
    page: {
      flexDirection: "row"
    },
    section: {
      margin: 10,
      padding: 10
    },
    sectiontext: {
      margin: 40,
      padding: 10,
      flexGrow: 1
    },
    piepagina: {
      fontSize: "9px",
      textAlign: 'center',
      marginLeft: "20px",
      marginTop: "150px",
      marginRight: "20px",
      padding: "10px",
      paddingTop: "10px"
    },
    observaciones: {
      fontSize: "9px",
      marginLeft: "30px",
      paddingTop: "-20px",
      paddingBottom: "-50px"
    },
    prefactura: {
//      fontSize: "14px",
      padding: "3px",
      color: "red",
      fontWeight:"ultrabold"
    },
    prefacturaAprobada: {
      fontSize: "10px",
      padding: "3px",
      color: "green"
    },
    bold: {
      fontWeight: 'bold',
    },

    cajaoperacion: {
      flex: 1,
      marginLeft: "20px",
      marginTop: "10px"
    },
    codigoOperacion: {
      fontSize: "9px",
      fontWeight: "ultrabold"
    },
    tasaBcv: {
      fontSize: "9px",
      paddingTop: '80px',
      textAlign: 'left',
    },
    original: {
      fontSize: "9px",
      textAlign: 'center'
    },
    separacion: {
      paddingTop: "4px",
    }
  })

  return (
    <Modal
      size="xl"
      show={showPdf}
      onHide={() => {
        setShowPdf(false)

      }}
    >
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Document>
          <Page size="A4">
            <View style={styles.direccion}>
              <View style={styles.caja}>
                <Image
                  src={logo}
                  style={{
                    maxWidth: "240px",
                    maxHeight: "90px",
                    padding: "10px"
                  }}
                ></Image>
                <Text style={styles.membrete}>
                  TELECOMUNICACIONES MOVILNET, C.A.
                </Text>
                <Text style={styles.membrete2}>
                  Avenida Venezuela, C.C. El Recreo
                </Text>
                <Text style={styles.membrete2}>
                  Torre Sur, Piso 13, Bello Monte.
                </Text>
                <Text style={styles.membrete2}>Caracas - Venezuela</Text>
                <Text style={styles.membrete2}>Telf: (0212) 705.7555</Text>
                <Text style={styles.membrete2}>G-20016137-0</Text>
                <Text style={styles.membrete3}>{datosM.created_at ? datosM.created_at.slice(3) : ''}{/* para poder usar datosM.created_at es necesario validarlo con una ternaria para evitar el error */}
                </Text>
                <Svg viewBox="0 0 220 100">
                  <Rect width="30%" height="1" fill="black" x="2" />
                </Svg>
                <Text style={styles.membrete4}>Periodo de Facturacion</Text>
              </View>
              <View style={styles.caja2}>
                <Text style={styles.membrete}>{datosM.operador ? datosM.operador : datosM.client}</Text>
                <Text style={styles.membrete2}>RIF - {datosM.rif}</Text>
                <Text style={styles.membrete2}>
                  {datosM.direccion}
                </Text>
                <Text style={styles.membrete2}>
                  Telf: {datosM.telefono}
                </Text>
            
                {!loading ? (
                  <Text style={styles.membrete2}>
                    FACTURA N° PRUEBA SIN VALOR COMERCIAL
                  </Text>
                ) : (
                  <Text style={styles.membrete2}>Factura N° TM-{pad(idp, 0, 6)}</Text>
                )}
                  {datosM.status ? '' : <Text style={styles.prefactura}>Anulada</Text>}
                <Text>
                  <Text>{''} </Text>
                  <Text style={styles.fechas2}>{datosM.created_at}{"            "}</Text>
                  <Text style={styles.fechas2}>{datosM.fecha_emision}{" "}</Text>
                  <Text style={styles.fechas2}>{datosM.issue_hour}{"                        "}</Text>
                </Text>
                <Text style={styles.idfecha}>

                  <Text>Fecha Emision{"               "}</Text>
                  <Text>Hora{"                      "}</Text>
                </Text>
              </View>
            </View>

            <Text style={styles.cajaoperacion}>
              <Text style={styles.codigoOperacion}> Codigo de operacion Seniat: {datosM.service_cod}</Text>
            </Text>
            <View style={styles.direccion}>
              <Svg viewBox="0 0 220 100">
                <Rect width="90%" height="0.5" fill="black" x="8" />
              </Svg>
            </View>
            <View style={styles.caja3}>
            <Text>
              <Text>CARGOS DEL PERIODO{"                      "}</Text>
              <Text>Monto Imponible (Bs){"               "}</Text>
              <Text>Monto Exento (Bs){"            "} </Text>
              <Text style={styles.monto}>
                {"                   "}Monto (Bs)
              </Text>
            </Text>
            </View>
            <View style={styles.direccion2}>
              <Svg viewBox="0 0 220 100">
                <Rect width="90%" height="0.5" fill="black" x="8" />
              </Svg>
            </View>
            <View style={styles.caja5}>
              <Text>{'   '} </Text>
              <Text>
                <Text>{datosM.service_cod} - {datosM.service_description}{datosM.idservice} </Text>
                <Text style={styles.monto}>
                  {
                    "                                                                                                                            "
                  }
                  {datosM.monto_total}{" "}
                  {/*     {datosM.total_mount ? datosM.total_mount.toFixed(2) :  datosM.total_2 ? datosM.total_2.toFixed(2) : ''  } */}
                </Text>
              </Text>
            </View>
            <View style={styles.caja4}>
              <Text style={styles.monto2}>{datosM.total_mount ? datosM.total_mount : datosM.total_2 ? datosM.total_2.toFixed(2) : ''}</Text>
              <Text style={styles.monto2}>{datosM.monto_total}</Text>
            </View>

            <View style={styles.direccion}>
              <Svg viewBox="0 0 220 100">
                <Rect width="90%" height="0.5" fill="black" x="8" />
              </Svg>
            </View>
            <View style={styles.caja3}>
            <Text>
              <Text>IMPUESTOS{"                      "}</Text>
              <Text>
                Alicuota %
                {"                                                     "}
              </Text>
              <Text style={styles.monto}>
                {"                                                        "}
                Monto (Bs)
              </Text>
            </Text>
            </View>
            <View style={styles.direccion2}>
              <Svg viewBox="0 0 220 100">
                <Rect width="90%" height="0.5" fill="black" x="8" />
              </Svg>
            </View>
            <View style={styles.caja5}>
            <Text>
              <Text>IMPUESTO AL VALOR</Text>
              <Text>{"            "}16%</Text>
              <Text>{"                   "}{Number(datosM.total_mount) ? Number(datosM.total_mount) : ''}</Text>
              <Text>{"                                         "}0,00</Text>
              <Text>
                {"                                             "}
                {datosM.iva}
              </Text>
            </Text>
            <Text>AGREGADO</Text>
            
            <Text style={styles.separacion}>
              <Text>DIVISAS</Text>
              <Text>{"                                                               "}0,00</Text>
              <Text>{"                                         "}0,00</Text>
              <Text>{"                                               "}0,00</Text>
            </Text>
            <Text style={styles.separacion}>
              <Text>IGTF</Text>
              <Text>{"                                           "}3 %</Text>
              <Text>{"                    "}0,00</Text>
              <Text>{"                                         "}0,00</Text>
              <Text>{"                                               "}0,00</Text>
            </Text>
            
            </View>

            {/* <View style={styles.caja4}>
              <Text style={styles.monto2}>{datosM.iva}</Text>
            </View> */}

            <View style={styles.direccion2}>
              <Svg viewBox="0 0 220 100">
                <Rect width="90%" height="0.5" fill="black" x="8" />
              </Svg>
            </View>

            <View style={styles.caja6}>


              <Text>
                <Text style={styles.tasaBcv}>Tasa BCV de fecha: {datosM.created_at}</Text>
                <Text>{"                                                                                                             "} Total Monto a Pagar Bs</Text>
              </Text>
            </View>

            <View style={styles.caja4}>
              <Text style={styles.monto2}>{datosM.total_mount ? (Number(datosM.total_mount) + Number(datosM.iva)).toFixed(2) : datosM.total_2 ? datosM.total_2.toFixed(2) : ''} Bs</Text>

            </View>

            {/*      <View style={styles.caja4}>
            <Text style={styles.monto2}>{datosM.total_mount ? datosM.total_mount.toFixed(2) :  datosM.total_2 ? datosM.total_2.toFixed(2) : ''  }</Text>
          </View> */}

            <Text>{''} </Text>

            <View style={styles.caja7}>
              <Text style={styles.observaciones}>Observaciones: {datosM.observaciones}</Text>
            </View>
              <View style={styles.caja7}>
                <Text style={styles.piepagina}>
                  Impreso por Telecomunicaciones Movilnet, C.A. RIF No. G-20016137-0 
                </Text>
                  <Text style={{textAlign:'center'}}>ORIGINAL</Text>
              </View>
            {/*             <View style={styles.caja7}>
              <Text style={styles.piepagina}>
                Documento Fiscal emitido por Telecomunicaciones Movilnet, C.A.,
                Registro Único de Información Fiscal No. G-20016137-0, conforme a
                las disposiciones establecidas en la Providencia Administrativa
                No. 0091, publicada en la Gaceta Oficial No. 39.259 de fecha 08 de
                septiembre de 2009
              </Text>
            </View> */}

          </Page>
        </Document>
      </PDFViewer>
    </Modal>
  )
}
