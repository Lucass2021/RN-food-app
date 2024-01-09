import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import HomeScreen from './Components/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <HomeScreen />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30
  },
});
