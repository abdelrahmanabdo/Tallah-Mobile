import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default  style = StyleSheet.create({
   container : {
      flex:1 , 
      width : width - 30,
      alignSelf: 'center',
      backgroundColor: '#FFF',
   },
   itemContainer : {
      flexDirection : 'row' ,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20 ,
      borderBottomWidth : 1 ,
      borderBottomColor : '#ECEFF2'
   },
   title :{
      color : '#242424'
   },
   headerText : {
      color : '#000',
      fontSize : 20,
      fontWeight : '600'
   },
   label : {
      color : '#000',
      fontSize : 13
   }
})