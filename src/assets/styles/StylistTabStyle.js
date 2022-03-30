import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex:1,
      padding : 20,
   },
   shareButton : {
      alignSelf : 'flex-end',
      marginBottom : 20
   }, 
   image : {
      width : '100%',
      height : height / 3.3,
      marginBottom : 15
   },
   grayContainer : {
      width : width ,
      backgroundColor: '#F8F8F8',
      paddingVertical : 12,
      paddingHorizontal : 17
   },
   stylistBox :{
      width : width - 20,
      flexDirection:'row',
      padding : 10 ,
      backgroundColor: '#E3FDFF',
      marginVertical : 5,
   }

});