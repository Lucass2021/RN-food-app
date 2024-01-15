import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MealsScreen from './screens/MealsScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import RandomMealScreen from './screens/RandomMealScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <Stack.Navigator initialRouteName="Category">
            <Stack.Screen name="Category" component={HomeScreen} />
            <Stack.Screen name="Meals" component={MealsScreen} />
            <Stack.Screen name="About the Meal" component={MealDetailsScreen} />
            <Stack.Screen name="Random Meal" component={RandomMealScreen} />
            <Stack.Screen name="Results" component={SearchScreen} />
        </Stack.Navigator>
    );
};

