import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default  style = StyleSheet.create({
   container : {
      flex:1 , 
      width : width ,
      alignSelf: 'center',
      backgroundColor: '#FFF',
   },
   notificationContainer : {
      width : width ,
      flexDirection : 'row' ,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10 ,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#ddd',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      marginVertical : 6,
      borderRadius : 8,
      
   },
   notificationDetailsContainer :{
      flex:4,
      flexDirection : 'column',
      justifyContent: 'space-between',
   }, 
   text : {
      color : '#000',
      fontSize : 15,
      fontFamily : 'Roboto'
   }
})