import {StyleSheet, Dimensions , Platform} from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex:1,
      backgroundColor:"#FFF"
   },
   grayContainer :{
      flex:1,
      borderRadius : 20,
      backgroundColor:'#F8F8F8'
   }

});