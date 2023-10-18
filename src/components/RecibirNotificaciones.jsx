import React, { useState } from 'react';
import { Text, Switch, View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecibirNotificaciones = ({ onQuiereRecibirNotificacionesChange, quiereRecibirNotificaciones }) => {
  const [quiereRecibirNotificacionesLocal, setQuiereRecibirNotificacionesLocal] = useState(JSON.parse(quiereRecibirNotificaciones));



  useEffect(() => {

    const registerForPushNotificationsAsync = async () => {
      let token;

      if (Constants.isDevice) {
        // we check if we have access to the notification permission
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;


        if (existingStatus !== 'granted') {
          // if we dontt have access to it, we ask for it
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
       

        // obtain the expo token
        token = (await Notifications.getDevicePushTokenAsync()).data;

        // log the expo token in order to play with it
      } else {
        // notifications only work on physcal devices
        alert('Must use physical device for Push Notifications');
      }

      // some android configuration
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      return token;
    }
    onQuiereRecibirNotificacionesChange(quiereRecibirNotificacionesLocal);

    const jsonValue2 = JSON.stringify(quiereRecibirNotificacionesLocal);
    AsyncStorage.setItem('quiereRecibirNotificaciones', jsonValue2);


    if (quiereRecibirNotificacionesLocal) {
      const registerForPushNotifications = async () => {
        let token = await registerForPushNotificationsAsync();
        AsyncStorage.setItem('token-notificacion', token);
        fetch('https://cargol.outlius.com/notifications/tokennotificacions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: token,
            operacio: 'crear'
          })
        })
          .then((response) => response.json())
          .then((json) => {
          })
          .catch((error) => {
            console.error(error);
          });
      };
      registerForPushNotifications();




    } else {

      const eliminarToken = async () => {
        let token = await registerForPushNotificationsAsync();

        fetch('https://cargol.outlius.com/notifications/tokennotificacions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: token,
            operacio: 'eliminar'
          })
        })
          .then((response) => response.json())
          .then((json) => {
            AsyncStorage.setItem('token-notificacion', '');
          })
          .catch((error) => {
            console.error(error);
          });

      };
      eliminarToken();


    }


  }, [quiereRecibirNotificacionesLocal]);

  const handleQuiereRecibirNotificacionesLocalChange = (value) => {
    setQuiereRecibirNotificacionesLocal(value);
  };

  return (
    <View style={styles.categoriesContainer}>
      <View style={styles.askWrapper}>
        <Text style={{ marginRight: 10 }}>Vols que t'enviem notificacions amb les noticies més rellevants?</Text>
        <Switch
          value={quiereRecibirNotificacionesLocal}
          onValueChange={handleQuiereRecibirNotificacionesLocalChange}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  askWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '85%',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
  },
});

export default RecibirNotificaciones;