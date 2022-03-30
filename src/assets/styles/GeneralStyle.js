import {StyleSheet, Dimensions , Platform} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex:1,
      backgroundColor: "#FFF"
   },
   header : {
      width : width,
      paddingVertical: 14,
      flexDirection : 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFF',
   },
   headerText : {
      color : '#012647',
      fontSize : 19,
      fontFamily : 'Roboto-Medium',
      textAlign: 'center',
      alignSelf : 'center'
   },
   row :{
      flexDirection:'row',
      alignItems:'center'
   },
   rowSpaceBetween : {
      flexDirection : "row",
      justifyContent: 'space-between',
      alignItems : "center"
   },
   columnSpaceBetween : {
      flexDirection : "column",
      justifyContent: 'space-between',
      alignItems : "center"
   },
   primaryText : {
      color : '#5D0D57',
      fontFamily:'Roboto'
   },
   primaryBoldText : {
      color : '#5D0D57',
      fontFamily:'Roboto-Bold'
   },
   goldText : {
      color : '#D4AF37',
      fontFamily:'Roboto'
   },
   goldBoldText : {
      color : '#D4AF37',
      fontFamily:'Roboto-Bold'
   },
   secondaryText : {
      color : '#012647',
      fontFamily:'Roboto'
   },
   secondaryBoldText : {
      color : '#012647',
      fontFamily:'Roboto-Bold'
   },
   SecondaryButton : {
      backgroundColor: '#D4AF37',
      borderRadius:10,
      padding: 10,
      alignSelf:'center',
      alignItems: 'center',
      justifyContent:'center'
   },
   SecondaryButtonText : {
      color: '#FFF',
      fontFamily : 'Roboto',
   },
   blackBoldText : {
      color : '#000',
      fontFamily:'Roboto-Bold'
   },
   blackText : {
      color : '#000',
      fontFamily:'Roboto'
   },
   grayBoldText : {
      color : '#7B7B7B',
      fontFamily:'Roboto-Bold'
   },
   grayText : {
      color : '#7B7B7B',
      fontFamily:'Roboto'
   },
   //Tabs
   tabButtons : {
      width : '90%',
      flexDirection:'row',
      marginTop : 20,
      borderRadius : 12,
      overflow:'hidden',
      borderWidth :1.5,
      borderColor : '#D4AF37'
   },
   tabButton : {
      flex:1,
      justifyContent : 'center',
      alignItems:'center',
      padding : 10,
   },
   tabButtonText : {
      color: '#D4AF37'
   },

   //Category List container
   categoryContainer : {
      width : width / 4.8 ,
      alignItems:'center',
      justifyContent:'space-between'
   },
   categoryBox: {
      borderWidth : 1.3 ,
      borderColor : '#000',
      padding : 10,
      paddingHorizontal : 20,
      borderRadius : 8,
      justifyContent:'center',
      alignItems:'center'
   },
   categoryName :{
      color : '#D4AF37',
      fontFamily: 'Roboto-regular',
      fontWeight: '500',
      marginTop: 3
   },


   //Badge
   badge : {
      backgroundColor:'#012647' ,
      padding: 5,
      paddingHorizontal : 20,
      borderRadius: 20,
      marginEnd : 4,
      color: '#FFF'
   }
});