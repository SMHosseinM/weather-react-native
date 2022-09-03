import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Platform, KeyboardAvoidingView, ImageBackground, View } from 'react-native';
import SearchInput from './components/SearchInput';

export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View>
          <Text style={[styles.largeText, styles.textStyle]}>San Francisco</Text>
          <Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
          <Text style={[styles.largeText, styles.textStyle]}>24°</Text>
          <SearchInput placeholder="Search any city" />
          <StatusBar style="auto" />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  largeText: {
    fontSize: 44,
    color: "white"
  },
  smallText: {
    fontSize: 18,
    color: "white"
  },
  imageContainer: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
