import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import HomeScreen from './Components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar />

        <HomeScreen />

      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30
  },
});
