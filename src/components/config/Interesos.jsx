import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import categories from "../../data/categories.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Interesos = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleCategorySelect = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            // Si la categoría ya está seleccionada, la eliminamos
            setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
        } else {
            // Si la categoría no está seleccionada, la agregamos
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    useEffect(() => {
        //get from async storage the selected categories
        const recogerDatos = async () => {
            try {
                const value = await AsyncStorage.getItem('preferences');
                if (value !== null) {
                    setSelectedCategories(JSON.parse(value));
                }
            } catch (e) {
                console.log(e);
            }
        };
        recogerDatos();
    }, []);

    useEffect(() => {
        //save to async storage the selected categories
        const guardarDatos = async () => {
            try {
                await AsyncStorage.setItem('preferences', JSON.stringify(selectedCategories));
            } catch (e) {
                console.log(e);
            }
        };
        guardarDatos();
    }, [selectedCategories]);

    return (
        <View style={{ width: '100%', backgroundColor: '#fff', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 0 }}>
            <View style={styles.backgroundContainer}>
                <View style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category.ID}
                            style={[
                                styles.categoryButton,
                                selectedCategories.includes(category.ID) && styles.selectedCategoryButton,
                            ]}
                            onPress={() => handleCategorySelect(category.ID)}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedCategories.includes(category.ID) && styles.selectedCategoryText,
                                ]}
                            >
                                {category.nom}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryButton: {
        marginVertical: 3,
        marginHorizontal: 2,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        height: 31, // Reducimos la altura del botón
    },
    selectedCategoryButton: {
        backgroundColor: '#eb4947',
        borderColor: '#eb4947',
    },
    categoryText: {
        fontSize: 12, // Reducimos el tamaño de fuente del texto
        fontFamily: 'PoppinsLight',
    },
    selectedCategoryText: {
        color: 'white',
        fontWeight: 'regular',
    },
    backgroundContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '95%',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
    },
});

export default Interesos;