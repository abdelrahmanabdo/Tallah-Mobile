import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({

   header : {
      width : width,
      padding : 30,
      flexDirection:'row',
      justifyContent: 'flex-start',
      backgroundColor: '#EAEAEA',
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
      justifyContent:'flex-end'
   },
   name : {
      position:'absolute',
      bottom : '20%',
      fontSize: 19,
      color : "#5D0D57",
      fontFamily:'Roboto-Bold',
      backgroundColor: '#EDEDED',
      padding: 10,
      borderRadius: 10,
      overflow: 'hidden'
   },
   uploadImageButton :{
      alignSelf:'flex-end',
      marginEnd : 20
   },
   uploadImage :{
      width:50,
      height : 50,
   },
   title : {
      color : '#000'
   },
   grayContainer : {
      width ,
      padding : 20 ,
      backgroundColor: '#FCFCFC',
      marginTop : 10,
      borderRadius : 10
   },
   sectionTitle : {
      color: "#012647",
      fontSize : 15,
      fontFamily : 'Roboto-Bold'
   },
   rowInfo :{
      marginTop : 20,
      color : '#000'
   }


});