import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SectionList, Image, StyleSheet, Text, View, TouchableOpacity, StatusBar, Linking } from 'react-native';

export default function RandomMealScreen() {
    const [randomMeal, setRandomMeal] = useState([])


    useEffect(() => {
        const fetchRandomMeal = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`);
                const randomMealData = response.data.meals;
                setRandomMeal(randomMealData);
            } catch (error) {
                console.log("API error", error)
            }
        };

        fetchRandomMeal();
    }, []);

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
                    <Text style={{ ...styles.recipeButton, backgroundColor: 'darkred' }}>Recipe Video</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL(item.strSource)}>
                    <Text style={{ ...styles.recipeButton, backgroundColor: 'darkblue' }}>Recipe Article</Text>
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
                        data: randomMeal,
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
        padding: 15,
        paddingHorizontal: 30,
        color: 'white',
        borderRadius: 5,
    }
});

