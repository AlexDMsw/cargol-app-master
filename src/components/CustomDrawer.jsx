import React from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const CustomDrawer = (props) => {
    
    const { state, descriptors } = props;

    // Filtrar las pantallas que tienen options.menu=true
    const filteredRoutes = state.routes.filter(
      (route) => descriptors[route.key].options.menu
    );


        



    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: '#eb4947' }}>
                <ImageBackground source={require('../../assets/img/vf-bg.jpg')}
                    style={{ padding: 20 }}>
                    <Image source={require('../../assets/img/logo-sin-rojo.png')} style={{ width: 200, height: 50, resizeMode: 'contain', borderRadius: 10, }} />
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>

            <TouchableOpacity onPress={() =>{
                props.navigation.navigate('Configurar');

            }} style={{paddingVertical:15}} >
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Ionicons name="settings-outline" size={22}  />
                <Text style={{fontSize:15, marginLeft:10}}>Configuració</Text>
                </View>
            </TouchableOpacity>
          
            </View>
        </View >
    );
}

export default CustomDrawer;