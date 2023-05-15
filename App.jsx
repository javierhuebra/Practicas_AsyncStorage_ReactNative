/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const [inputTexto, setInputTexto] = useState('')
  const [nombreStorage, setNombreStorage] = useState('')


  //PARA USAR ASYNCSTORAGE HAY QUE INSTALAR LA DEPENDENCIA npm install @react-native-async-storage/async-storage

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', inputTexto)
      setNombreStorage(inputTexto)
    } catch (error) {
      console.log(error)
    }
  }



  const obtenerDatosStorage = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombre')
      setNombreStorage(nombre)
    } catch (error) {
      console.log(error)
    }
  }

  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre')
      setNombreStorage('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerDatosStorage()
  }, [])
  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor='orange'
      />

      <View style={styles.contenedor}>

        {nombreStorage ? <Text>Hola: {nombreStorage}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder='Entrada de texto'
          onChangeText={texto => setInputTexto(texto)}
          value={inputTexto}

        />
        <Button
          title='Guardar'
          color='#333'

          onPress={() => guardarDatos()}

        />

        {nombreStorage ?
          <TouchableHighlight
            style={styles.btnEliminar}
            onPress={() => eliminarDatos()}
          >
            <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>
          </TouchableHighlight>
          : null}


      </View>

    </>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
    marginBottom: 5,
    color: 'black'
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10
  },
  textoEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  },



});

export default App;
