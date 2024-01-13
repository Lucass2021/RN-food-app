import { useEffect, useState } from 'react';
import axios from 'axios';
import { Image, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MealsScreen({ route }) {
    const [meals, setMeals] = useState([]);

    const category = route.params.category



    useEffect(() => {
        console.log("category", category)
        const fetchMeals = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
                const mealsData = response.data.meals;
                setMeals(mealsData);
            } catch (error) {
                console.log("API error", error)
            }
        };

        fetchMeals();
    }, []);

    // Section List Header
    const renderSectionHeader = () => (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{category} menu</Text>
        </View>
    );

    // Section List Body
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.categoryContainer} activeOpacity={0.7} onPress={() => alert("oi")}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.categoryText}>{item.strMeal}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />

            <SectionList
                sections={[
                    {
                        title: 'Header',
                        data: meals,
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


