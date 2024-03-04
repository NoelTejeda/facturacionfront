import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
  size:{
    height: '100%',
    width: '100%'
  },
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page >
      <View style={styles.section}>
        <Text>Imagen</Text>
      </View>
    </Page>
  </Document>
)

export default MyDocument