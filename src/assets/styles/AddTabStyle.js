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
      color : '#FFF',
      fontSize : 19
   },
   container : {
      flex:1,
      width : width ,
      height : height,
   }, 
   imageContainer :{
      width : width - 80,
      alignSelf:'center',
      padding : 15,
   },
   editIcon : {
      width : 30,
      height : 30,
      position: 'absolute',
      bottom : 15,
      right : 10
   },
   imageBackground : {  
      width : '100%',
      height : height / 4
   },
   tabContainer : {
      flex:1,
      width : width,
      marginTop : 30
   },
   tabContent :{
      width : width - 30 ,
      alignSelf:'center'
   },
   sectionHeaderText :{
      fontSize : 16,
      fontFamily : 'Roboto-medium',
      color :'#000',
      marginVertical: 13,
   },
   outfitContainer :{
      flex:1,
      width: width,
      backgroundColor:'#EAEAEA'
   },
   geastureContainer :{
      flex:1,
      flexDirection : 'row',
      flexWrap :'wrap'
   },
   whiteBox :{
      flex: 1.8 ,
      width : width ,
      backgroundColor : '#FFF',
      borderTopRightRadius : 25,
      borderTopLeftRadius : 25,
      padding : 15
   },
   selectedItemContainer :{
      width : 100 ,
      height : 100,
      borderRadius : 50,
      margin : 15
   }

});