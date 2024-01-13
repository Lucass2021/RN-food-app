import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MealsScreen from './screens/MealsScreen';

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="MealsScreen" component={MealsScreen} />
        </Stack.Navigator>
    );
};

