import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default  style = StyleSheet.create({
   container :{
      width : width - 50,
      marginTop : 15,
      alignSelf:'center',
      flex:.4,
      flexDirection : 'column' ,
      justifyContent:'space-between' ,

   },
   iconsContainer :{
      marginVertical : 20,
      flexDirection:'row',
      justifyContent:'space-between'
   },
   orImage : {
      height : 20,
      marginVertical : 10
   },
   socialImage : {
      height:50 ,
       width:50
   }
})