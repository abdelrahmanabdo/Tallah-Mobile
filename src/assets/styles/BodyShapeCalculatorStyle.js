import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex:1,
   },
   createProfileText : {
     flex:1,
      color : '#FFF',
      fontSize : 19
   },
   calculationContainer :{
      width: width,
      height : height / 2.3,
      backgroundColor: '#E3CFDE',
      padding: 20,
      opacity: .9,
      paddingTop :50,
      borderTopRightRadius : 25,
      borderTopLeftRadius : 25,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.22,
      elevation: 2,
   }



});