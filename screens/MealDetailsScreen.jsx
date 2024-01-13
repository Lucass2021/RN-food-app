import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SectionList, Image, StyleSheet, Text, View, TouchableOpacity, StatusBar, Linking } from 'react-native';

export default function MealDetailsScreen({ route }) {
    const [mealDetails, setMealDetails] = useState([])

    const idMeal = route.params.idMeal

    useEffect(() => {
        const fetchIdMeals = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                const idMealsData = response.data.meals;
                setMealDetails(idMealsData);
            } catch (error) {
                console.log("API error", error)
            }
        };

        fetchIdMeals();
    }, [idMeal]);

    // Section List Header
    const renderSectionHeader = () => (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Recipe</Text>
        </View>
    );

    // Section List Body
    const renderItem = ({ item }) => (
        <View style={styles.categoryContainer}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.categoryText}>{item.strMeal}</Text>
            <Text style={styles.categoryText}>Recipe Origin: {item.strArea}</Text>
            <View style={styles.optionsContainer}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL(item.strYoutube)}>
                    <Text style={styles.recipeButton}>Recipe Video</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL(item.strSource)}>
                    <Text style={styles.recipeButton}>Recipe Article</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />

            <SectionList
                sections={[
                    {
                        title: 'Header',
                        data: mealDetails,
                    },
                ]}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item) => item.idMeal}
            />

        </SafeAreaView>
    );
}


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
        marginBottom: 20,
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
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
    },
    recipeButton: {
        backgroundColor: 'red',
        padding: 10,
        color: 'white',
    }
});
