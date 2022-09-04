import React from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import SearchInput from './components/SearchInput';
import { fetchLocationId, fetchWeather } from './utils/api';
// import getImageForWeather from './utils/getImageForWeather';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      location: '',
      temperature: 0,
      weather: '',
    }
  };

  componentDidMount() {
    this.updateLocation('chicago');
  }

  updateLocation = (city) => {

    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        console.log('locatiotnId: ')
        const { location, weather, temperature } = await fetchWeather(locationId);

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        })
      }
      catch (e) {
        this.setState({
          loading: false,
          error: true
        })
      }
    });
  }

  render() {
    const { loading, error, location, temperature, weather } = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={require('./assets/background.png')}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`}
                    </Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.updateLocation}
                />
              </View>
            )}

          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    justifyContent: "center"
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
});
