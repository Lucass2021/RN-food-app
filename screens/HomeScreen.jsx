import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SectionList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default HomeScreen = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
                const categoriesData = response.data.categories;
                setCategories(categoriesData);
            } catch (error) {
                console.log('API error', error);
            }
        };

        fetchCategories();
    }, []);

    // Section List Header
    const renderSectionHeader = () => (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>What type of food do you want to eat?</Text>
        </View>
    );

    // Section List Body
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryContainer} activeOpacity={0.7} onPress={() => handleMealsScreen(item.strCategory)}>
            <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
            <Text style={styles.categoryText}>{item.strCategory}</Text>
        </TouchableOpacity>
    );

    const handleMealsScreen = (category) => {
        alert(`Selected category: ${category}`);
    }

    return (
        <View>
            <SectionList
                sections={[
                    {
                        title: 'Header',
                        data: categories,
                    },
                ]}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item) => item.idCategory}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        marginBottom: 50,
    },
    categoryText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "bold",
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 15
    },
    titleContainer: {
        marginVertical: 20,
        marginBottom: 50
    },
    titleText: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
