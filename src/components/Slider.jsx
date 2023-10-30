import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecibirNotificaciones from './RecibirNotificaciones';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';


const registerForPushNotificationsAsync = async () => {
    let token = "";

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
        // alert('Must use physical device for Push Notifications');
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


const Slider = ({ handleChange }) => {

    const [quiereRecibirNotificaciones, setQuiereRecibirNotificaciones] = useState(true);
    const sliderRef = useRef(null);
    const [slideIndex, setSlideIndex] = useState(0);





    const handleQuiereRecibirNotificacionesChange = (quiereRecibirNotificaciones) => {
        setQuiereRecibirNotificaciones(quiereRecibirNotificaciones);
    };


    const slides = [
        {
            key: 'slide1',
            title: 'Informació Legal',
            text: 'Accedeix a El Cargol Magazine, la revista referència al Penedès a través de la nostra nova aplicació.',
            image: require('../../assets/img/slide1.png'),
        },


        {
            key: 'slide2',
            title: 'Notificacions',
            text: 'No et preocupis, només enviarem notificacions rellevants, sempre podràs canviar-ho després',
            image: require('../../assets/img/slide2.png'),
            component: <RecibirNotificaciones
                onQuiereRecibirNotificacionesChange={handleQuiereRecibirNotificacionesChange}
                quiereRecibirNotificaciones={quiereRecibirNotificaciones}
            />,
        },
    ];


    const renderItem = ({ item }) => {
        return (

            <View style={styles.slide}>
                <View style={styles.backgroundContainer}>
                    <Image source={item.image} style={styles.backgroundImage} />
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
                <View style={styles.component}>
                    {item.component}
                </View>
            </View>
        );
    };

    const renderDoneButton = () => {
        const handleDonePress = async () => {
            await savePreferences();
        };



        const savePreferences = async () => {
            try {

                const jsonValue2 = JSON.stringify(quiereRecibirNotificaciones);
                await AsyncStorage.setItem('preferencciasGuardadas', "true");
                await AsyncStorage.setItem('quiereRecibirNotificaciones', jsonValue2);


                if (quiereRecibirNotificaciones) {
                    const token = await registerForPushNotificationsAsync();
                    await AsyncStorage.setItem('token-notificacion', JSON.stringify(token));
                    //haz una llamda post para guardar el token en la base de datos

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

                }
                handleChange(true);
            } catch (error) {
                console.log('Error saving preferences:', error);
            }
        };



        return (
            <View style={styles.button}>
                <TouchableOpacity onPress={handleDonePress}>
                    <Text style={styles.buttonText}>Finalitzar</Text>
                </TouchableOpacity>
            </View>
        );
    };
    const renderNextButton = () => {
        return (
            <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                <Text style={styles.buttonText}>Seguent</Text>
            </TouchableOpacity>
        );
    }

    const handleNextPress = () => {
        sliderRef.current?.goToSlide(slideIndex + 1);
        setSlideIndex(slideIndex + 1);
    };


    return (
        <AppIntroSlider
            ref={sliderRef}
            data={slides}
            renderItem={renderItem}
            renderDoneButton={renderDoneButton}
            renderNextButton={renderNextButton}
            onSlideChange={(index) => setSlideIndex(index)} // Actualizamos el estado del índice del slide
        />
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    backgroundContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    backgroundImage: {
        width: '100%',
        height: 500,
        resizeMode: 'cover', // Añade esta línea para ajustar la imagen a todo el espacio disponible
        //que empieze desde arriba

    },
    contentContainer: {
        paddingHorizontal: 32,
    },
    title: {
        fontSize: 22,
        marginTop: 12,
        marginHorizontal: 32,
        color: 'black',
        fontFamily: 'PoppinsBold',
        textAlign: 'left', // Añade esta línea para centrar el texto
    },
    text: {
        marginTop: -3,
        fontSize: 12,
        marginBottom: 10,
        marginHorizontal: 32,
        textAlign: 'left',
        color: '#4E4B66',
        fontFamily: 'PoppinsRegular',
    },
    button: {
        backgroundColor: '#eb4947',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center', // Añade esta línea para centrar el botón
        fontFamily: 'PoppinsRegular',
    },
    buttonText: {
        color: '#FFFFFF',
    },
});


export default Slider;