import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex:1,
      backgroundColor: '#FFF',
   },
   grayContainer : {
      width : width ,
      backgroundColor: '#F8F8F8',
      paddingVertical : 12,
      paddingHorizontal : 17
   },
   stylistBox :{
      width : width - 20,
      flexDirection:'row',
      padding : 10 ,
      backgroundColor: '#E3FDFF',
      marginVertical : 5,
   },
   searchInputContainer: {
     padding: 10,
     borderWidth: .5,
     borderColor: '#CCC',
     borderRadius: 6,
     color: '#000',
     width: width * .52,
     marginStart: 5
   }

})