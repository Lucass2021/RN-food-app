import { StyleSheet, Text, View } from 'react-native';

export default function MealsScreen({ category }) {
    return (
        <View style={styles.container}>

            <Text>Meals component {category}</Text>

        </View>
    );
}

const styles = StyleSheet.create({

});


