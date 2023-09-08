import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';


const Manteniment = () => {
    const [text, setText] = useState('Estam en manteniment');

    useEffect(() => {
        const getMantenimientoText = async () => {
            fetch('https://cargol.outlius.com/auth/mantinancetext')
                .then(response => response.json())
                .then(data => setText(data[0].text))
        }
         getMantenimientoText();
    }
        , []);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/img/logo-sin-rojo.png')} style={{ width: 200, objectFit: 'contain' }} />
            <Text style={styles.text}>{text}</Text>
            <Button
                title="Veure a la web"
                onPress={() => Linking.openURL('https://elcargol.com/')}
                color="#20232a"
                titleStyle={styles.title}
               
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eb4947'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
    },
    title: {
        color: '#eb4947',
    },


});

export default Manteniment;