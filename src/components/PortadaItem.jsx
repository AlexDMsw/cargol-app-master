import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import categories from '../data/categories';


const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = Math.round(dimensions.width * 0.95);

const PortadaItem = (props) => {
  const navigation = useNavigation();
  const createdDate = moment(props.noticia.created);
  const today = moment();

  const handlePress = () => {
    navigation.navigate('DetallNoticia', { noticia: props.noticia.id });
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Image source={{ uri: props.noticia.imatge || "https://picsum.photos/100/100" }} style={styles.image} />
        <View>
          <Text style={styles.cat}>{categories.find(category => category.ID == props.noticia.category)?.nom}</Text>
          <Text style={styles.strong}>{props.noticia.titol}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: 'grey' }}>
              <Ionicons name="time-outline" size={13} />{' '}
              {createdDate.isSame(today, 'day') ? (
                createdDate.format('HH:mm')
              ) : (
                createdDate.format('DD-MM-YYYY')
              )}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingTop: 5,
  },
  strong: {
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
    paddingTop: 1,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    justifyContent: 'center',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cat: {
    color: 'grey',
    fontSize: 12,
    fontWeight: 'light',
    paddingTop: 5,
    textTransform: 'uppercase',
  },
});

export default PortadaItem;