import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Main from './Main';


function NavegationDrawerSuplemente() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName='Portada' >

      <Drawer.Screen name="Portada" component={Main} />

    </Drawer.Navigator>
  );
}
export default NavegationDrawerSuplemente;
