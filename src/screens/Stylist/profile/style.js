import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex: 1,
   },
   headerText: {
      color : '#012647',
      fontSize : 19,
      fontFamily : 'Roboto-Medium',
      textAlign: 'center',
      alignSelf : 'center'
   },
   bgImage: {
     width: width,
     height: height / 3.5,
     position: 'relative',
     alignItems: 'center',
     justifyContent: 'flex-end'
   },
   bioContainer :{
      padding: 10,
      paddingHorizontal:20,
      marginVertical: 10,
      borderBottomWidth : .5 ,
      borderBottomColor : '#D6D6D6'
   },
   bioText: {
      marginTop : 10,
      color : '#898989',
      fontSize : 15,
      lineHeight : 23
   },
   protfolioItem :{
      borderWidth : .8,
      padding : 35,
      borderColor : '#D6D6D6',
      marginHorizontal : 5,
      borderRadius: 10
   },
   grayContainer : {
      width : width ,
      backgroundColor: '#F8F8F8',
      borderRadius : 10,
      padding : 15,
      marginVertical : 8
   },
   tabButton :{
      padding : 10 , 
      borderBottomWidth  : .6,
      borderBottomColor : '#D6D6D6',
   },
   activeTab :{
      borderBottomColor : '#D4AF37',
      borderBottomWidth : 1,
   },
   tabContent :{
      padding : 10  
   }


});