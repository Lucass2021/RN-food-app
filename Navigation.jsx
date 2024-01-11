import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import MealsScreen from './screens/MealsScreen';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="MealsScreen" component={MealsScreen} />
            </Stack.Navigator>
            <Text>oi 2</Text>
        </NavigationContainer>

    );
};

export default Navigation;
