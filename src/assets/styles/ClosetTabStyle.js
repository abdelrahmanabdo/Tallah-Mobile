import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   header : {
      width : width,
      padding :20,
      flexDirection : 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EAEAEA',
      borderBottomLeftRadius : 20,
      borderBottomRightRadius : 20,
      overflow: 'hidden',
   },
   headerText : {
      color: '#012647',
      fontSize : 19
   },
   giftContainer : {
      width : '90%',
      alignSelf:'center',
      marginBottom: 10,
      padding : 15,
      borderRadius : 10,
      backgroundColor: '#F8F8F8',
      flexDirection : 'row',
   },
   categoriesRow :{
      width : width,
      marginBottom: 20
   }, 
   closetItemsListContainer :{
      flex:1,
      width : width - 20,
      alignSelf:'center',
   }

});