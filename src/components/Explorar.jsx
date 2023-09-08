import { Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import categories from '../data/categories.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArticlesList from './ArticlesList.jsx';
const Explorar = (props) => {

    useEffect(() => {
       
    }, [props.route.name]);


    return (
        <View style={{ padding: 15 , backgroundColor: '#fff' }} >
             
                <ArticlesList category={props.route.name} limit={25} />

        </View>
    )
}
export default Explorar;
