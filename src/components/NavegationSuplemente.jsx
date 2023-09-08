import { createDrawerNavigator } from '@react-navigation/drawer';
//import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Main from './Main';
//import CustomDrawer from './CustomDrawer';
//import { Ionicons } from '@expo/vector-icons';
//import Explorar from './Explorar';


const Drawer = createDrawerNavigator();

function NavegationDrawerSuplemente() {

  return (
    <Drawer.Navigator 
    initialRouteName='Portada'
    //drawerContent={props => <CustomDrawer {...props} />}

    /*
      screenOptions={{
        drawerActiveBackgroundColor: '#eb4947',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#000',
        headerTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 15,
        },

        headerTitle: () => (
          <Image source={require('../../assets/img/logo.jpg')} style={{ width: 200, height: 50, resizeMode: 'contain', borderRadius: 10, }} />
        ),
        headerTitleAlign: 'center',
        headerBackground: () => (
          <Image
            style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'cover' }}
            source={require('../../assets/img/REDBG.jpg')}
          />
        ),

      }

      }
      */
    >
      <Drawer.Screen name="Portada" component={Main}  
     
       /* ultimo coment
      
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="trending-up" size={22} color={color} />
        ),
        menu: true
      }

      }
      */ />
      {
        /*
      <Drawer.Screen name="Societat" component={Explorar} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="people-outline" size={22} color={color} />

        ),
      }
      }
      />
      <Drawer.Screen name="Política" component={Explorar} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="megaphone-outline" size={22} color={color} />
        ),
      }
      } />
      <Drawer.Screen name="Economia" component={Explorar} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="wallet-outline" size={22} color={color} />
        ),
      }
      } />
      <Drawer.Screen name="Cultura" component={Explorar} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="ribbon-outline" size={22} color={color} />
        ),
      }
      } />
      <Drawer.Screen name="Vins i caves" component={Explorar} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="wine-outline" size={22} color={color} />
        ),
      }
      } />
      <Drawer.Screen name="Mon Casteller" component={Explorar} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="body-outline" size={22} color={color} />
        ),
      }
      } />

      <Drawer.Screen name="Esports" component={Explorar} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="football-outline" size={22} color={color} />
        ),
      }
      } />
      <Drawer.Screen name="Entrevistes" component={Explorar} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="book-outline" size={22} color={color} />
        ),
      }
      } />
      <Drawer.Screen name="Salut" component={Explorar} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="medkit-outline" size={22} color={color} />
        ),
      }
      } />
      */
      }

    </Drawer.Navigator>
  );
}
export default NavegationDrawerSuplemente;