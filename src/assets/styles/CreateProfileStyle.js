import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      backgroundColor: '#F6F6F6',
      flex:1,
   },
   header : {
      width : width,
      flexDirection: 'row',
      paddingVertical: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   createProfileText : {
      flex: 1.5,
      color: '#393B3C',
      fontSize : 16,
      alignSelf: 'center',
   },
   stepsContainer:{
      width : width - 40,
      marginTop : 25,
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F6F6F6',
   },
   stepsText :{
      flex:1,
      color : "#393B3C",
      fontSize : 16 , 
      textAlign:'center',
   },
   skipButton: {
      flex: .5,
      width : 20,
      borderRadius : 10,
   }, 
   skipText :{
      color : "#393B3C",
      fontSize : 16,
      textDecorationLine : "underline"
   },
   stepsNumberContainer : {
      height : height / 9.5,
      width : width,
      justifyContent: 'center',
   },
   stepIcon: {
      flex:1,
      width : 30,
      height: 30
   },
   activeLine :{
      flex:1,
      height : .9 ,
      borderWidth:.4,
      borderColor : '#5D0D57',
      opacity:.5
   },
   inActiveLine:{
      flex:1,
      height : .9 ,
      borderWidth:.5,
      borderColor : '#BEBBBB',
      opacity:.5
   },
   stepProcessContainer : {
      flex:1,
      height : height ,
      width : width,
      padding: 10,
   },
   //Step One
   stepHeaderText  : {
      color : "#5D0D57",
      fontSize : 18 , 
      marginBottom : 15,
      paddingHorizontal: 10,
      textAlign: 'center'
   },
   note :{
      marginVertical : 10,
      textAlign : 'center',
      backgroundColor: '#F8F8F8',
      paddingVertical: 20,
      paddingHorizontal: 10,
      color: '#000000',
      fontFamily: 'Roboto'
   },
   uploadPictureButton:{
      alignSelf : 'center',
      backgroundColor: '#012647',
      width : 140 ,
      height : 140 ,
      borderRadius : 70,
      justifyContent: 'center',
      alignItems: 'center',
   },
   //Step Two
   stepTwo : {

   }


});