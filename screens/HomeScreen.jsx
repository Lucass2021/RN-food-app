import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SectionList, Image, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default HomeScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);

    const handleMealsScreen = (category) => {
        navigation.navigate('Meals', { category });
    }

    const handleRandomMeal = () => {
        navigation.navigate('Random Meal')
    }

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

    // Section List Footer
    const renderSectionFooter = () => (
        <TouchableOpacity style={styles.titleContainer} activeOpacity={0.7} onPress={() => handleRandomMeal()}>
            <Text style={{ ...styles.titleText, fontSize: 16 }}>Don't know what to cook? Click here for a random recipe</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />

            <SectionList
                sections={[
                    {
                        title: 'Header',
                        data: categories,
                    },
                ]}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                renderSectionFooter={renderSectionFooter}
                keyExtractor={(item) => item.idCategory}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30
    },
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
