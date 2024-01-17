import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SectionList, Image, StyleSheet, Text, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';

export default function MealsScreen({ navigation, route }) {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const category = route.params.category

    const handleMealDetailsScreen = (idMeal) => {
        navigation.navigate('About the Meal', { idMeal });
    }

    const handleRandomMeal = () => {
        navigation.navigate('Random Meal')
    }

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
                const mealsData = response.data.meals;
                setMeals(mealsData);
                setLoading(false)
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
        <TouchableOpacity style={styles.categoryContainer} activeOpacity={0.7} onPress={() => handleMealDetailsScreen(item.idMeal)}>
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.categoryText}>{item.strMeal}</Text>
        </TouchableOpacity>
    );

    // Section List Footer
    const renderSectionFooter = () => (
        <TouchableOpacity style={styles.titleContainer} activeOpacity={0.7} onPress={() => handleRandomMeal()}>
            <Text style={{ ...styles.titleText, fontSize: 16 }}>Don't know what to cook? Click here for a random recipe</Text>
        </TouchableOpacity>
    );

    return (
        <>
            {loading &&
                <SafeAreaView style={styles.loader}>
                    <ActivityIndicator size="extra-large" />
                    <Text style={{ ...styles.titleText, fontSize: 16 }}>Loading...</Text>
                </SafeAreaView>
            }

            {!loading &&
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
                        renderSectionFooter={renderSectionFooter}
                        keyExtractor={(item) => item.idMeal}
                    />

                </SafeAreaView>
            }
        </>

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
    loader: {
        justifyContent: 'center',
        flex: 1
    }
});


