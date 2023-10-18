import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Linking } from "react-native";
import { Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const Configurar = () => {
  const navigation = useNavigation();


  const handleClearCache = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Cache cleared successfully.');
    } catch (error) {
      console.log('Error clearing cache:', error);
    }
  };

  const handlePress = (navegation) => {
    if (navegation === 1) {
      navigation.navigate('Notificacions');
    }

  }
  return (
    <View style={{ width: '100%', backgroundColor: '#fff', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10 }}>
      <TouchableWithoutFeedback onPress={() => handlePress(1)}>
        <View style={styles.contenedorOpcion}>
          <View style={[styles.contenedorOpcionIconoTexto, { flex: 1 }]}>
            <Ionicons name="notifications-outline" size={20} />
            <Text style={styles.titolOpcio}>
              Notificacions
            </Text>
          </View>
          <View>
            <Ionicons name="chevron-forward-outline" color="black" size={20} />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.contenedorOpcion}>
        <TouchableOpacity
          style={styles.contenedorOpcionIconoTexto}
          onPress={() => Linking.openURL('https://elcargol.com/contactar')}>
 
          <View style={[styles.contenedorOpcionIconoTexto, { flex: 1 }]}>

            <Ionicons name="help-circle-outline" size={20} />
            <Text style={styles.titolOpcio}>
              Ajuda
            </Text>
          </View>
      
        </TouchableOpacity>
        <StatusBar style="dark" />
      </View>
      
    {/*
      <View style={styles.contenedorOpcion}>
        <TouchableOpacity
          style={styles.contenedorOpcionIconoTexto}
          onPress={handleClearCache}
        >
          <View style={[styles.contenedorOpcionIconoTexto, { flex: 1 }]}>
            <Ionicons name="bug-outline" size={20} />
            <Text style={styles.titolOpcio}>
              Natejar Cache
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    
      <View style={styles.contenedorOpcion}>
        <View style={[styles.contenedorOpcionIconoTexto, { flex: 1 }]}>
          <Ionicons name="moon-outline" size={20} />
          <Text style={styles.titolOpcio}>
            Mode Fosc
          </Text>
        </View>
        <View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />

        </View>
      </View>
      */}
      <View style={styles.contenedorVersio}>
        <Text style={styles.versio}>Versió 1.0.0</Text>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  contenedorOpcion: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 10,
  },
  contenedorVersio: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  versio: {
    fontFamily: 'PoppinsLight',
    fontSize: 11,
    textAlign: 'center',
  },

  contenedorOpcionIconoTexto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  titolOpcio: {
    marginTop: 3,
    fontSize: 18,
    fontFamily: 'PoppinsRegular',
    marginLeft: 10,
  },
});
export default Configurar;