import { Text } from "react-native"

export default SearchScreen = ({ route }) => {
    const searchInputResult = route.params.textInput

    return (
        <Text>oioioioioio {searchInputResult}</Text>
    )
}