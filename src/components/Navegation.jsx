import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Main from './Main';
import CustomDrawer from './CustomDrawer';
import { Ionicons } from '@expo/vector-icons';
import Explorar from './Explorar';
import DetallNoticia from './DetallNoticia';
import Notificacions from './config/Notificacions';
import Configurar from './Configurar';
import { Share } from 'react-native';
import categories from '../data/categories';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



function NavegationDrawerApp() {

  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
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
    >
      <Drawer.Screen name="Portada" component={Main} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="trending-up" size={22} color={color} />
        ),
        menu: true
      }
      } />

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


    </Drawer.Navigator>
  );
}


const MainNavigation = ({ notiTouched }) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (notiTouched) {
      navigation.navigate('DetallNoticia', { noticia: notiTouched });
    }


  }, [notiTouched])



  return (
    <Stack.Navigator
      initialRouteName="NavegationDrawerApp"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "black",
        },
      }}
    >
      <Stack.Screen
        name="-"
        component={NavegationDrawerApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetallNoticia"
        component={DetallNoticia}
        options={({ route }) => ({
          headerShown: true, title: "", headerStyle: { borderBottomWidth: 0, },
          headerRight: () => (<TouchableOpacity style={{ marginRight: 20 }}
            onPress={() => {
          
              fetch('https://cargol.outlius.com/noticies/' + route.params.noticia)
                .then(response => response.json())
                .then(data => {
                  //busca el nom de la categoria a partir de data[0].category
                  let catName = categories.find(category => category.ID == data[0].category)?.nom.toLowerCase();

                 // let catName = categories.find(category => category.ID == route.params.noticia)?.nom.toLowerCase();
                  catName = catName.replace(/ /g, "-");
                  
                  let urlShare = "https://elcargol.com/" + catName + "/" + data[0].id + "-" + data[0].alias;


                  Share.share({
                    message: data[0].titol + "\n" + urlShare
                  });
                })

            }} >

            <Ionicons name="share-social-outline" size={22} color="black" />
          </TouchableOpacity>),
        })}


      />
      <Stack.Screen name="Notificacions" component={Notificacions}
        options={{
          headerShown: true,
          headerStyle: {
            borderBottomWidth: 0,
          },
        }}
      />
      <Stack.Screen name="Configurar" component={Configurar}
        options={{
          headerShown: true,
          headerStyle: {
            borderBottomWidth: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};



export default MainNavigation;