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
      backgroundColor: '#FFF',
      borderBottomLeftRadius : 20,
      borderBottomRightRadius : 20,
      overflow: 'hidden',
   },
   headerText : {
      color : '#FFF',
      fontSize : 19,
      fontFamily : 'Roboto-Medium'
   },
   grayContainer : {
      width : width ,
      backgroundColor: '#F8F8F8',
      paddingVertical : 12,
      paddingHorizontal : 17
   },
   tabButton :{
      padding: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      borderWidth:  1,
      borderColor: '#D4AF37',
      marginEnd: 5
   },
   tabButtonText :{
      fontSize : 16,
   },
   newBlogBox :{
      width : width * .4,
      borderRadius : 12 ,
      padding : 6 , 
      backgroundColor:"#FFF",
      alignItems:'flex-start',
      justifyContent:'center',
      marginHorizontal : 4
   },
   newBlogText  : {
      margin : 5,
      alignSelf : 'flex-start',
      color  : '#000',
      backgroundColor: '#F8F8F8',
      padding: 3,
      borderRadius: 5,
      fontSize : 14,
      lineHeight : 22,
   }

});