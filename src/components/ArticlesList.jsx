import React, { useState, useEffect } from "react";
import { FlatList, View, Text, Image, TouchableWithoutFeedback, Linking, RefreshControl } from "react-native";
import ArticleItem from "./ArticleItem";
import categories from "../data/categories";

const ArticlesList = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [noticies, setNoticies] = useState([]);
    const [publicitats, setPublicitats] = useState(false);
    const [contador, setContador] = useState(0);
    let categoryId;
    //busca el id de la categoria del listado de categorias a partir del nombre de la categoria qye se pasa por props
    if (props.category !== 0) {

        categoryId = categories.find(category => category.nom === props.category).ID;
    }

    const getPublicitats = async () => {
        try {
            fetch('https://cargol.outlius.com/publicitat/getpublicitat')
                .then(response => response.json())
                .then(data => setPublicitats(data.message));
            //  );
        } catch (e) {
            console.log(e);
        }
    };


    useEffect(() => {
        getPublicitats();
    }, []);

    useEffect(() => {

        if (props.category === 0) {
            fetch('https://cargol.outlius.com/noticies?limit=' + props.limit + '&start=' + props.start + '')
                .then(response => response.json())
                .then(data => setNoticies(data));
        } else {
            fetch('https://cargol.outlius.com/noticies?limit=' + props.limit + '&category=' + categoryId + '&start=' + props.start + '')
                .then(response => response.json())
                .then(data => setNoticies(data));
        }

    }, [props]);

    const renderArticleItem = ({ item: article, index }) => (

        <>
            <ArticleItem {...article} />
            {(index + 1) % 3 === 0 &&

                (
                    publicitats.length > 0 &&
                    <View style={{ marginTop: 25, marginBottom: 25 }}>

                        <TouchableWithoutFeedback onPress={() => Linking.openURL(publicitats[Math.floor((index + 1) / 3) -1  ]?.url ||
                            'https://elcargol.com'
                        )
                        }>

                            < View >
                                <Image
                                    source={{
                                        uri:
                                            'https://cargol.outlius.com/publicitat/' +
                                            publicitats[Math.floor((index + 1) / 3) -1 ]?.nombre,
                                    }} style={{ width: '100%', height: 120, marginTop: 10, objectFit: 'contain' }} />
                            </View>
                        </TouchableWithoutFeedback>

                    </View >
                )}

        </>
    );

    return (
        <>
            <FlatList
                data={noticies}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                renderItem={renderArticleItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            if (props.category === 0) {
                                fetch('https://cargol.outlius.com/noticies?limit=' + props.limit + '&start=' + props.start + '')
                                    .then(response => response.json())
                                    .then(data => setNoticies(data));
                            } else {
                                fetch('https://cargol.outlius.com/noticies?limit=' + props.limit + '&category=' + categoryId + '&start=' + props.start + '')
                                    .then(response => response.json())
                                    .then(data => setNoticies(data));
                            }
                            setRefreshing(false);

                        }}
                    />
                }
            />
        </>
    );
};

export default ArticlesList;