import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MealsScreen from './screens/MealsScreen';

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <Stack.Navigator initialRouteName="Category">
            <Stack.Screen name="Category" component={HomeScreen} />
            <Stack.Screen name="Meals" component={MealsScreen} />
        </Stack.Navigator>
    );
};

