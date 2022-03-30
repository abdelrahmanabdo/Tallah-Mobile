import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import FastImage from 'react-native-fast-image';
const {width, height} = Dimensions.get('window');

const Spinner = () => (
  <View style={style.container}>
    <FastImage
      source={require('../assets/images/spinner.gif')}
      style={style.logo}
      resizeMode="contain"
    />
  </View>);

export default Spinner;

const style = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height,
    width,
    backgroundColor: '#FFF',
  },
  logo: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: -150
  },
});
