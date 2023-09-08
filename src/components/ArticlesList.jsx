import React, { useState, useEffect } from "react";
import { FlatList, View, Text, Image, TouchableWithoutFeedback, Linking, RefreshControl } from "react-native";
import ArticleItem from "./ArticleItem";
import categories from "../data/categories";

const ArticlesList = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [noticies, setNoticies] = useState([]);
    let categoryId;
    //busca el id de la categoria del listado de categorias a partir del nombre de la categoria qye se pasa por props
    if (props.category !== 0) {

        categoryId = categories.find(category => category.nom === props.category).ID;
    }

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
            {(index + 1) % 3 === 0 && (
                <View style={{ marginTop: 25, marginBottom: 25 }}>
                    <TouchableWithoutFeedback onPress={() => Linking.openURL('https://dmsolucionsweb.com')}>
                        <View>
                            <Text style={{ fontFamily: 'PoppinsLight', fontSize: 10, position: 'absolute', top: 10, right: 0, paddingHorizontal: 10, zIndex: 1 }}>Publicitat</Text>
                            <Image source={{ uri: "https://dmsolucionsweb.com/wp-content/uploads/2023/07/dm-solucions-promo-scaled.jpg" }} style={{ width: '100%', height: 120, marginTop: 10 }} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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