import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import categories from "../data/categories.js";

const GuardarPreferencias = ({ onSelectedCategoriesChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategorySelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      // Si la categoría ya está seleccionada, la eliminamos
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      // Si la categoría no está seleccionada, la agregamos
      setSelectedCategories([...selectedCategories, categoryId]);
    }
      // Call the onSelectedCategoriesChange callback with the updated selected categories
      onSelectedCategoriesChange(selectedCategories);
  }; 

  useEffect(() => {
    // Llamada a la función onSelectedCategoriesChange después de que selectedCategories se haya actualizado
    onSelectedCategoriesChange(selectedCategories);
  }, [selectedCategories, onSelectedCategoriesChange]);

  return (
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '30%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '85%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
});

export default GuardarPreferencias;