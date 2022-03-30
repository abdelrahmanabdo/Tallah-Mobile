import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container :{
      alignItems : 'flex-start',
      justifyContent: 'flex-start',
   },
   headerText : {
      color : '#DCB77C',
      fontSize :29,
      alignSelf:'flex-start',
      fontFamily :"Luminari-Regular",
      marginBottom : 15
   },
   rowContainer : {
      flexDirection:'row' , 
      alignItems:'center' ,
      marginVertical:5
   },
   primaryMediumText :{
      color : "#CCC",
      fontSize:16 , 
      fontWeight:'700' 
   }, 
   primarySmallText :{
      color : "#707070" ,
      marginEnd:10 , 
      fontSize:13,
      fontWeight:'900'
   },
   termsText :{
      color : '#FFF',
   }
})