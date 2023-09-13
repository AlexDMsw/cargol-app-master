import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, useWindowDimensions,TouchableWithoutFeedback } from 'react-native';
import categories from '../data/categories.js';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';


const ArticleItem = (props) => {
    const MAX_CHARACTERS = 80;
    const textToShow = props.titol.length > MAX_CHARACTERS ? props.titol.substring(0, MAX_CHARACTERS) + "..." : props.titol;
    const createdDate = moment(props.created);
    const today = moment();
    const navigation = useNavigation();
  


    const handlePress = () => {
        navigation.navigate('DetallNoticia', { noticia: props.id });
      }


    return (
        <ScrollView>
          <TouchableWithoutFeedback onPress={handlePress}>
            <View key={props.ID} style={styles.container}>
                <Image source={{ uri: props.imatge || "https://picsum.photos/100/100" }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.textCat}>{categories.find(category => category.ID == props.category)?.nom}</Text>
                    <Text style={styles.strong}>{textToShow}</Text>
                    <Text style={styles.created}>{createdDate.isSame(today, 'day') ? (
                        createdDate.format('HH:mm')
                    ) : (
                        createdDate.format('DD-MM-YYYY')
                    )}
                    </Text>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        flexDirection: "row",
    },
    textCat: {
        color: 'grey',
        fontSize: 12,
        fontWeight: 'light',
        paddingTop: 5,
        textTransform: 'uppercase',

    },

    textContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    strong: {
        fontFamily: "PoppinsRegular",
        color: "black",
        fontSize: 16,
    },
    image: {
        width: 120,
        height: 120,
        alignSelf: "center",
        resizeMode: "cover",
        borderRadius: 10,
    },
    created: {
        fontSize: 12,
        color: 'grey'
    }
});

export default ArticleItem;