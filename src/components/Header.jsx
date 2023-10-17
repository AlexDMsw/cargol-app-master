import React from 'react';
import { Text, View, Image } from "react-native";
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Header = () => {
    return (
        <>
         
            <View style={styles.headerContainer}>
                <Image source={require('../../assets/img/logo.jpg')} style={styles.logo} />
                <View style={styles.boxBox}>
                    <View style={styles.boxIcon}>
                        <View style={styles.shadow}>
                            <Icon name="bell" style={styles.icon} size={18} color="black" />
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    headerContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        backgroundColor: 'transparent',
    },
    boxBox: {

    },
    boxIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 35,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: 'center', // Agregamos esta propiedad
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export default Header;
