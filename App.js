
import NavegationDrawerApp from './src/components/Navegation';
import Slider from './src/components/Slider';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useRef } from 'react';
import Manteniment from './src/components/Mateniment';
import Main from './src/components/Main';
import NavegationDrawerSuplemente from './src/components/NavegationSuplemente';
import { createStackNavigator } from '@react-navigation/stack';
import DetallNoticia from './src/components/DetallNoticia';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { Share } from 'react-native';
import Notificacions from './src/components/config/Notificacions';
import Explorar from './src/components/Explorar';
import categories from './src/data/categories';
import Configurar from './src/components/Configurar';
import CustomDrawer from './src/components/CustomDrawer';




export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [storage, setStorage] = useState(false);
  const [notiTouched, setNotiTouched] = useState(false);
  const [mantenimiento, setMantenimiento] = useState(false);



  useEffect(() => {


    getMantenimiento();

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      notificationCommonHandler(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification 
    // (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      notificationCommonHandler(response.notification);
      notificationNavigationHandler(response.notification.request.content);
    });

    // The listeners must be clear on app unmount
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const notificationCommonHandler = (notification) => {
    // save the notification to reac-redux store
    //console.log('A notification has been received', notification)
  }


  const notificationNavigationHandler = ({ data }) => {
    // navigate to app screen
    setNotiTouched(data.id);


  }

  const getMantenimiento = async () => {
    fetch('https://cargol.outlius.com/auth/mantinance')
      .then(response => response.json())
      .then(data => setMantenimiento(data.mantinance))
      .catch(error => console.log(error))
  }



  useEffect(() => {
    checkStorage();
  }, [storage]);




  const checkStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('preferencciasGuardadas');
      if (value !== null) {
        setStorage(true);
      } else {
        setStorage(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    setStorage(true);
  }

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsLight: require('./assets/fonts/Poppins-Light.ttf'),
    PoppinsMedium: require('./assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsThin: require('./assets/fonts/Poppins-Thin.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  function NavegationDrawerApp() {

    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
        initialRouteName="Portada"
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
            <Image source={require('./assets/img/logo.jpg')} style={{ width: 200, height: 50, resizeMode: 'contain', borderRadius: 10, }} />
          ),
          headerTitleAlign: 'center',
          headerBackground: () => (
            <Image
              style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'cover' }}
              //source={require('../../assets/img/REDBG.jpg')}
              source={{require:'./assets/img/REDBG.jpg'}}
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


  return (
    <NavigationContainer>

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

    </NavigationContainer>
  )

  /*
  return (
    <NavigationContainer>
      {!mantenimiento ? (
        storage ? (
         // <NavegationDrawerApp notiTouched={notiTouched} />
          <NavegationDrawerSuplemente notiTouched={notiTouched} />
        ) : (
          <Slider handleChange={handleChange} />
        )
      ) : (
        <Manteniment />
      )}
    </NavigationContainer>
  )
*/
}