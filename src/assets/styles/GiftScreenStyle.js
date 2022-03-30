import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex:1,
      backgroundColor:  '#FFF',
   },
   Text : {
      color : '#FFF',
      fontSize : 19
   },
   giftContainer : {
      width,
      alignItems:'center',
      justifyContent:'center',
   },
   giftImage:{
      width: '100%',
      height:height / 4,
   },
   text : {
      width : '85%',
      textAlign:'center'
   }



});