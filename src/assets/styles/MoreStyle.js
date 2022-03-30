import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   header : {
      width : width,
      padding : 25,
      flexDirection:'row',
      justifyContent: 'space-between',
      backgroundColor: '#FFF',
      alignItems: 'center',
      borderBottomLeftRadius : 15,
      borderBottomRightRadius : 15,
      overflow: 'hidden',
   },
   headerText : {
      color : '#FFF',
      fontSize : 19,
      marginStart : 10
   },
   moreContainer : {
      flex: 1,
      paddingHorizontal: 20
   },
   topSection : {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
   },
   avatar : {
      width: 90,
      height: 90,
      borderRadius : 45,
      overflow: 'hidden',
      marginBottom : 3,
      justifyContent:'flex-end'
   },
   listSection: {
    flex: 2.2
   },
   itemContainer:{
      width : width - 40,
      flexDirection:'row',
      justifyContent:'space-between',
      alignSelf:'center',
      backgroundColor : '#F8F8F8',
      padding : 11,
      borderRadius : 20,
      marginBottom : 13
   }, 
   itemText : {
      color : '#707070',
      fontSize : 17,
      fontFamily : 'Roboto'
   },
   infoText: {
      color : '#161A28',
      fontFamily : "Roboto",
      fontSize : 14,
      marginTop :2
   } ,   
   line :{
      borderWidth : .9,
      borderColor : '#F8F8F8',
      marginVertical : 13
   },
   beStylistButton : {
      alignSelf:'center',
      marginVertical : 15
   },
   beStylistButtonText :{
      color : '#D4AF37',
      fontSize : 22,
      fontFamily : 'Roboto-Bold'
   }

});