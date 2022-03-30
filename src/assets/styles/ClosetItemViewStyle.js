import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({

   header : {
      width : width,
      padding : 25,
      flexDirection:'row',
      justifyContent: 'space-between',
      backgroundColor: '#FFF',
      alignItems: 'center',
      borderBottomLeftRadius : 15,
      borderBottomRightRadius : 15,
      overflow: 'hidden',
   },
   headerText : {
      color : '#FFF',
      fontSize : 19,
      marginStart : 10
   },
   bgImage : {
      width : width ,
      height : height / 3.5,
      position:'relative',
      alignItems:'center',
      justifyContent:'flex-start'
   },
   uploadImageButton :{
      alignSelf:'flex-end',
      marginEnd : 20,
      marginTop: 10
   },
   uploadImage :{
      width:30,
      height : 30,
   },
   grayContainer : {
      width ,
      padding : 20 ,
      backgroundColor: '#F8F8F8',
      marginTop : 10,
      borderRadius : 10
   },
   sectionTitle : {
      color : "#80196C",
      fontSize : 15,
      fontFamily : 'Roboto-Bold'
   },
   rowInfo :{
      marginTop : 15
   },
   line : {
      width : '90%',
      alignSelf:'center',
      borderWidth : 1 ,
      borderColor : "#000"
   },
   relatedItemsText : {
      marginStart : 10,
      marginVertical : 15,
      fontSize : 18 , 
      color : '#012647',
      fontFamily : 'Roboto-Bold'
   },
   geastureContainer :{
      flex:1,
      flexDirection : 'row',
      flexWrap :'wrap'
   },
   whiteBox :{
      flex: 3,
      width : width ,
      backgroundColor : '#F8F8F8',
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