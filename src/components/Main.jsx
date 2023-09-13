import React, { useCallback, useState, useEffect } from 'react';
import { Text, View, ScrollView, FlatList, Image, TouchableWithoutFeedback, Linking, RefreshControl } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArticlesList from "./ArticlesList.jsx";
import PortadaItem from "./PortadaItem.jsx";
import categories from "../data/categories.js";

const Main = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [noticia, setNoticia] = useState(null);
    const [listaDeCategories, setListaDeCategories] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [publicitats, setPublicitats] = useState([]);

    useEffect(() => {
        fetch('https://cargol.outlius.com/noticies?limit=1')
            .then(response => response.json())
            .then(data => setNoticia(data[0]));
    }, []);

    useEffect(() => {
        //get from async storage the selected categories
        const recogerDatos = async () => {
            try {
                const value = await AsyncStorage.getItem('preferences');
                if (value !== null) {
                    setListaDeCategories(JSON.parse(value));
                    setSelectedCategory(JSON.parse(value)[0]);
                }
            } catch (e) {
                console.log(e);
            }
        };
        recogerDatos();
        getPublicitats();
    }, []);


    const getPublicitats = async () => {    
        try {
            fetch('https://cargol.outlius.com/publicitat/getpublicitat')
                .then(response => response.json())
                .then(data => setPublicitats(data.message));
                  //  setPublicitats(data.message));
        } catch (e) {
            console.log(e);
        }
    };
    



    return (
        noticia &&
        <>
            <FlatList
                style={{ paddingLeft: 15, paddingRight: 15, backgroundColor: '#fff' }}
                //ListHeaderComponent={<Header />}
                data={[{ key: 'portada' }, { key: 'publicitat' }, { key: 'ultimes' }]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            fetch('https://cargol.outlius.com/noticies?limit=1')
                                .then(response => response.json())
                                .then(data => {
                                    setNoticia(data[0]);
                                    setRefreshing(false);
                                });
                        }}
                    />
                }
                renderItem={({ item }) => {
                    switch (item.key) {

                        case 'portada':
                            return (
                                <View style={{ marginTop: 10 }}>
                                    <PortadaItem noticia={noticia} />
                                </View>
                            );

                        case 'publicitat':
                            return (
                                publicitats.length > 0 && 
                                <View style={{ marginTop: 25, marginBottom: 25 }}>
                                    <TouchableWithoutFeedback onPress={() => Linking.openURL(publicitats[0].url)}>
                                        <View>
                                            <Image source={{ uri: "https://cargol.outlius.com/publicitat/"+publicitats[0].nombre }} style={{ width: '100%', height: 120, marginTop: 10, objectFit: 'contain' }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            );

                        case 'ultimes':
                            return (
                                <View>
                                    <ArticlesList category={0} limit={9} start={1} />
                                </View>
                            );
                        default:
                            return null;
                    }
                }}
            />
        </>
    );
}

export default Main;
