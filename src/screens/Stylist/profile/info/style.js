import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      padding: 20,
   },
   headerText: {
      color : '#012647',
      fontSize : 19,
      fontFamily : 'Roboto-Medium',
      textAlign: 'center',
      alignSelf : 'center'
   },
});