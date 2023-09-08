import React  from 'react';
import { View, Text, Image, StyleSheet,Dimensions, useWindowDimensions,ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import HTML from "react-native-render-html";
import categories from '../data/categories.js';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = Math.round(dimensions.width * 0.95);

const DetallNoticia = ({ route }) => {
  
  const windowsWidth = useWindowDimensions().width;
  const { noticia } = route.params;
 
  const [noticiaData, setNoticiaData] = useState(null);

  useEffect(() => {
    fetch('https://cargol.outlius.com/noticies/' + noticia)
      .then(response => response.json())
      .then(data => setNoticiaData(data[0]));
  }, [noticia]);



return (
  noticiaData && (
    <ScrollView>
      <View style={styles.box}>
        <Image source={{ uri: noticiaData.imatge }} style={styles.image} />
        <Text style={styles.cat}>{categories.find(category => category.ID == noticiaData.category)?.nom}</Text>
        <Text style={styles.titol}>{noticiaData.titol}</Text>
        <HTML source={{ html: '<div style="text-align:justify">'+noticiaData.text+"</div>" }} contentWidth={windowsWidth} />
      </View>
    </ScrollView>
  )
);
};
const styles = StyleSheet.create({

  image: {
    width: imageWidth,
    height: imageHeight,
    justifyContent: 'center',
    resizeMode: 'cover',
    borderRadius: 10,
 
  }, 
  box: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  cat: {
    color: 'grey',
    fontSize: 12,
    fontWeight: 'light',
    paddingTop: 5,
    marginVertical: 5,
    textTransform: 'uppercase',
  },
  titol: {
    fontSize: 20,
    fontFamily: 'PoppinsRegular',
    marginVertical: 5,
  },

});


export default DetallNoticia;