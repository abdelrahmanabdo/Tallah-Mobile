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
   grayRow : {
      width,
      flexDirection : 'row',
      backgroundColor: '#F8F8F8',
      paddingVertical  : 15,
      paddingStart : 5,
      alignItems:'center',
      justifyContent:'center',
   },
   circle:{
      width  : 30 ,
      height : 30 ,
      borderRadius : 15
   },
   text : {
      fontSize : 16,
      fontFamily : 'Roboto',
      textAlign:'center',
      marginStart : 10
   },
   upcomingContainer : {
      width ,
      marginTop : 20,
      flexDirection :'row'
   },
   mettingText:{
      color : '#14675A',
      fontSize : 17,
      fontFamily : 'Roboto',
      fontWeight : '700'
   },
   mettingDate:{
      color : '#BFBFBF',
      fontSize : 15,
      marginTop : 8,
      fontFamily : 'Roboto',
   }



});