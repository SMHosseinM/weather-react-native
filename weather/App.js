import React from 'react';
import { StyleSheet, Text, Platform, KeyboardAvoidingView, ImageBackground, View } from 'react-native';
import SearchInput from './components/SearchInput';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  };

  componentDidMount() {
    this.updateLocation('San Francisco');
  }

  updateLocation = (city) => {
    this.setState({
      location: city
    });
  }

  render() {
    const { location } = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground
          source={require('./assets/background.png')}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
            <Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
            <Text style={[styles.largeText, styles.textStyle]}>24°</Text>
            <SearchInput
              placeholder="Search any city"
              onSubmit={this.updateLocation}
            />
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
