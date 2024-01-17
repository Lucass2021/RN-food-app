import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SectionList, Image, StyleSheet, Text, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';

export default SearchScreen = ({ navigation, route }) => {
    const [searchMeals, setSearchMeals] = useState([]);
    const [emptyMeals, setEmptyMeals] = useState(false);
    const [loading, setLoading] = useState(true);
    const searchInputResult = route.params.textInput

    const handleMealDetailsScreen = (idMeal) => {
        navigation.navigate('About the Meal', { idMeal });
    }

    const handleRandomMeal = () => {
        navigation.navigate('Random Meal')
    }

    useEffect(() => {
        const fetchSearchMeals = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputResult}`);
                const searchMealsData = response.data.meals;

                if (searchMealsData === null) {
                    setEmptyMeals(true)
                    setLoading(false)
                } else {
                    setSearchMeals(searchMealsData);
                    setLoading(false)
                }

            } catch (error) {
                console.log("API error", error)
            }
        };

        fetchSearchMeals();
    }, []);

    // Section List Header
    const renderSectionHeader = () => (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{searchInputResult} meals</Text>
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

                    {searchMeals != '' &&
                        <SectionList
                            sections={[
                                {
                                    title: 'Header',
                                    data: searchMeals,
                                },
                            ]}
                            renderItem={renderItem}
                            renderSectionHeader={renderSectionHeader}
                            renderSectionFooter={renderSectionFooter}
                            keyExtractor={(item) => item.idMeal}
                        />
                    }

                    {emptyMeals &&
                        <TouchableOpacity style={styles.titleContainer} activeOpacity={0.7} onPress={() => handleRandomMeal()}>
                            <Text style={{ ...styles.titleText, fontSize: 16 }}>
                                There are no meals with this ingredient.
                            </Text>
                            <Text style={{ ...styles.titleText, fontSize: 16 }}>
                                Click here for a random meal instead.
                            </Text>
                        </TouchableOpacity>
                    }

                </SafeAreaView>
            }

        </>

    )
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