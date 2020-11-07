import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, SafeAreaView, StatusBar, YellowBox, Button } from "react-native";
import Form from './src/components/Form';
import Footer from './src/components/Footer';
import ResultCalculation from './src/components/ResultCalculation';
import colors from './src/utils/colors';

YellowBox.ignoreWarnings(["Picker has been extracted"]);



export default function App() {

  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [month, setMonth] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (capital && interest && month)? calculate(): reset();
  }, [capital, interest, month]);

  const calculate = () => {
    reset();
    if (!capital) {
      setErrorMessage('Añade la cantidad que quieres solicitar');
    } else if (!interest) {
      setErrorMessage('Añade el interés del prestamo');
    } else if (!month) {
      setErrorMessage('Selecciona los meses a pagar');
    } else {
      const i = interest / 100;
      const fee = capital / ((1 - Math.pow((i + 1), -month)) / i);
      setTotal({
        monthlyFee: fee.toFixed(2),
        totalPayable: (fee * month).toFixed(2)
      });
    }

  }

  const reset = () => {
    setErrorMessage('');
    setTotal(null);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background} />
        <Text style={styles.titleApp}>Cotizador de Prestamos</Text>
        <Form
          setCapital={setCapital}
          setInterest={setInterest}
          setMonth={setMonth}
        />
      </SafeAreaView>

      <ResultCalculation
        capital={capital}
        interest={interest}
        month={month}
        total={total}
        errorMessage={errorMessage}
      />

      <Footer calculate={calculate} />

    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center"
  },

  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1
  },

  titleApp: {
    fontSize: 25,
    fontWeight: "bold",
    color: '#FFF',
    marginTop: 15

  }


});
