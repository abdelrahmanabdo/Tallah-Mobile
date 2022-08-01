import {StyleSheet, Dimensions , Platform} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      flex:1,
      backgroundColor: '#FFF',
   },
   postButton : {
      backgroundColor: '#D4AF37',
      paddingVertical : 10 ,
      paddingHorizontal : 35,
      borderRadius : 15
   },
   postButtonText : {
      color : "#FFF",
      fontSize : 15,
      fontFamily : "Roboto"
   },
   userInfoContainer : {
      width: '75%',
      alignSelf: 'center',
      paddingTop : 5,
      paddingBottom: 15,
      alignItems:'center',
      justifyContent : 'center',
   },
   userInfoBox :{
      width: '100%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor: '#FFF',
      paddingHorizontal  : 20,
      borderColor : '#FFF',
      paddingVertical  : 10,
      borderRadius : 40,
      shadowColor: '#707070',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 1.3,
      shadowRadius: 10,
      elevation: 8,
   },
   followButton :{
      backgroundColor: '#012647',
      paddingHorizontal : 15,
      paddingVertical : 5,
      borderRadius : 10
   },
   followButtonText :{
      color : "#FFF",
      fontSize : 13
   },
   blogContentContainer :{
      width:width ,
      backgroundColor: '#CCC',
      justifyContent:'space-between',
      alignItems:'flex-start',
      padding:  10,
      marginBottom: 20
   },
   blogText :{
      alignSelf:'flex-end',
      backgroundColor:"#CCC",
      color: '#000',
      padding: 10,
      fontSize: 16,
      borderRadius:6,
      overflow:'hidden',
      opacity:.7,
      lineHeight: 24,
      marginVertical: 10,
      fontWeight: '600',
      textAlign: 'left'
   },
   commentsContainer: {
      flex:1,  
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginBottom: 25
   },
   commentContainer :{
      width : width,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginVertical: 10
   },
   newCommentContainer :{
      width : width ,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor: '#FFF',
      paddingHorizontal  : 10,
      paddingVertical : 15,
      borderTopWidth : 1 ,
      borderTopColor : '#CCC',
   }
});