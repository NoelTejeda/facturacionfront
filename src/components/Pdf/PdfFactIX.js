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

export default function App(props) {
  const {showPdf, setShowPdf,datosM,idp} = props
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
      marginLeft: "20px"
    },
    caja2: {
      flex: 1,
      marginTop: "70px"
    },
    membrete: {
      fontSize: "12px",
      fontWeight: "bold",
      fontStyle: "italic",
      padding: "3px"
    },
    membrete2: {
      fontSize: "10px",
      padding: "3px"
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
      fontSize: "10px",
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
      marginLeft: "20px",
      marginTop: "130px",
      marginRight: "20px",
      padding: "10px"
    },
    observaciones: {
      fontSize: "10px",
      marginLeft: "30px"
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
              <Text style={styles.membrete3}>{datosM.end_date ? datosM.end_date.slice(3,10): ''}
              </Text>
              <Svg viewBox="0 0 220 100">
                <Rect width="30%" height="1" fill="black" x="2" />
              </Svg>
              <Text style={styles.membrete4}>Periodo de Facturacion</Text>
            </View>
            <View style={styles.caja2}>
              <Text style={styles.membrete}>{datosM.client}</Text>
              <Text style={styles.membrete2}>RIF - {datosM.rif}</Text>
              <Text style={styles.membrete2}>
                Urb. Palos Grandes, Av. Francisco de Miranda
              </Text>
              <Text style={styles.membrete2}>
                C.C. El Parque. Nivel 6, Ofic. 6
              </Text>
              <Text style={styles.membrete2}>Caracas - Venezuela</Text>
              {!loading ? (
                <Text style={styles.membrete2}>
                  FACTURA N° PRUEBA SIN VALOR COMERCIAL
                </Text>
              ) : (
                <Text style={styles.membrete2}>FACTURA N° TM-{pad(idp, 0, 6)}</Text>
              )}
              <Text style={styles.membrete2}>Serie "A"</Text>
              <Text style={styles.fechas}>
                <Text style={styles.fechas2}>{datosM.created_at}{"            "}</Text>
                <Text style={styles.fechas2}>{datosM.fecha_emision}{" "}</Text>
                <Text style={styles.fechas2}>{datosM.issue_hour}{"         "}</Text>
                <Text style={styles.fechas2}>{datosM.hora_emision}{"         "}</Text>
                <Text style={styles.fechas2}>{datosM.created_at}{"   "}</Text>
                <Text style={styles.fechas2}>{datosM.fecha_vencimiento}</Text>
              </Text>
              <Text style={styles.idfecha}>
                <Text>Fecha Emision{"              "}</Text>
                <Text>Hora{"                  "}</Text>
                <Text>Fecha Vencimiento</Text>
              </Text>
            </View>
          </View>

          <View style={styles.direccion}>
            <Svg viewBox="0 0 220 100">
              <Rect width="90%" height="0.5" fill="black" x="8" />
            </Svg>
          </View>
          <View style={styles.caja3}>
            <Text>
              <Text>CARGOS DEL PERIODO{"                      "}</Text>
              <Text>Monto Imponible (Bs){"         "}</Text>
              <Text>Monto Exento (Bs){"              "}</Text>
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
            <Text>
              <Text>{datosM.service_cod} - {datosM.service_description}</Text>
              <Text style={styles.monto}>
                {
                  "                                                                                                                                               "
                }
                {datosM.total_mount ? datosM.total_mount.toFixed(2) :  datosM.total_2 ? datosM.total_2.toFixed(2) : ''  }
                {datosM.monto_total}{" "}
              </Text>
            </Text>
          </View>
          <View style={styles.caja4}>
            {/* <Text style={styles.monto2}>{datosM.total_mount ? datosM.total_mount.toFixed(2) :  datosM.total_2 ? datosM.total_2.toFixed(2) : ''  }</Text> */}
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
              <Text>{"         "}16%</Text>
              <Text>{"                   "}{datosM.iva}</Text>
              <Text>{"                               "}0,00</Text>
              <Text>
                {"                                         "}
                {datosM.iva}
              </Text>
            </Text>
            <Text>AGREGADO 16%</Text>
          </View>
          <View style={styles.caja4}>
            <Text style={styles.monto2}>{datosM.iva}</Text>
          </View>
          <View style={styles.direccion2}>
            <Svg viewBox="0 0 220 100">
              <Rect width="90%" height="0.5" fill="black" x="8" />
            </Svg>
          </View>
          <View style={styles.caja6}>
            <Text>
              <Text>TOTAL FACTURADO {"                             "}</Text>
              <Text>
                {
                  "                                                                                                          "
                }
                Monto (Bs)
              </Text>
            </Text>
          </View>

          <View style={styles.caja4}>
            <Text style={styles.monto2}>{datosM.total_mount ? datosM.total_mount.toFixed(2) :  datosM.total_2 ? datosM.total_2.toFixed(2) : ''  }</Text>
          </View>
          
          <View style={styles.caja4}>
{/*             <Text style={styles.monto2}>{datosM.total_mount ? datosM.total_mount.toFixed(2) :  datosM.total_2 ? datosM.total_2.toFixed(2) : ''  }</Text>*/}
          </View>

          <View style={styles.caja7}>
            <Text style={styles.observaciones}>Observaciones: {datosM.observaciones}</Text>
          </View>
          <View style={styles.caja7}>
            <Text style={styles.piepagina}>
              Documento Fiscal emitido por Telecomunicaciones Movilnet, C.A.,
              Registro Único de Información Fiscal No. G-20016137-0, conforme a
              las disposiciones establecidas en la Providencia Administrativa
              No. 0091, publicada en la Gaceta Oficial No. 39.259 de fecha 08 de
              septiembre de 2009
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
    </Modal>
  )
}
