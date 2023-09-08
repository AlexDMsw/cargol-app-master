import React, { useState, useEffect } from "react";
import { View } from "react-native";
import RecibirNotificaciones from "../RecibirNotificaciones.jsx";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notificacions = () => {
    const [quiereRecibirNotificaciones, setQuiereRecibirNotificaciones] = useState(null);

    useEffect(() => {
        //get from async storage if user wants to receive notifications
        const recogerDatos = async () => {
            try {
                const value = await AsyncStorage.getItem('quiereRecibirNotificaciones');
                if (value !== null) {
                    setQuiereRecibirNotificaciones(value);
                }
            } catch (e) {
                console.log(e);
            }
        };
        recogerDatos();
    }, []);

    const handleQuiereRecibirNotificacionesChange = (quiereRecibirNotificaciones) => {
        setQuiereRecibirNotificaciones(quiereRecibirNotificaciones);
        //save to async storage if user wants to receive notifications
        const guardarDatos = async () => {
            try {
                await AsyncStorage.setItem('quiereRecibirNotificaciones', JSON.stringify(quiereRecibirNotificaciones));
            } catch (e) {
                console.log(e);
            }
        }
        guardarDatos();


    };

    return (
        quiereRecibirNotificaciones !== null &&
        <View style={{ width: '100%', backgroundColor: '#fff', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 0 }}>
            <RecibirNotificaciones onQuiereRecibirNotificacionesChange={handleQuiereRecibirNotificacionesChange} quiereRecibirNotificaciones={quiereRecibirNotificaciones} />
        </View>
    );
};

export default Notificacions;