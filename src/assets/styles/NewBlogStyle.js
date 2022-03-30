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
      flexDirection:'row',
      paddingHorizontal : 10 ,
      paddingVertical : 15,
      alignItems:'center'
   },
   blogImage :{
      width : width * .35,
      borderRadius : 12 ,
      padding : 6 , 
      backgroundColor:  "#FFF",
      alignItems:'flex-start',
      justifyContent:'center',
      marginHorizontal : 4
   },
   hashtagsCcntainer : {
      flexDirection : 'row',
      marginHorizontal  : 25, 
      flexWrap  : 'wrap'
   },
   addCurrentHashtag: {
     marginTop: 20
   },
   hashtag : {
      backgroundColor: '#D4AF37',
      padding : 10,
      borderRadius : 15,
      marginEnd : 4  ,
      color : '#FFF' , 
      marginVertical:2
   },
   actionsContainer :{
      backgroundColor: '#012647',
      height : height * .08,
      flexDirection : 'row',
      justifyContent:'space-between',
      alignItems:'center'
   }
});