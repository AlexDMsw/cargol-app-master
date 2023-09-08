
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
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Portada" component={Main} />
        <Stack.Screen name="Slider" component={Slider} />
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