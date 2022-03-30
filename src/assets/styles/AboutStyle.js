import {StyleSheet, Dimensions , Platform} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   header : {
      width : width,
      ...Platform.select({
         ios: {
            paddingTop: getStatusBarHeight() + 10
         },
         android: {
            paddingTop:  15

      }}), 
      paddingBottom :24,
      flexDirection : 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius : 8,
      borderBottomRightRadius : 8,
      overflow: 'hidden',
   },
   bgImage : {
      width : width ,
      height : height / 4,
      position:'relative',
      alignItems:'center',
      justifyContent:'flex-end'
   },
   blocksContainer :{
      paddingHorizontal : 19,
      paddingBottom: 10
   },
   grayContainer : {
      flex:1,
      padding : 15 ,
      backgroundColor: '#F8F8F8',
      marginTop : 15,
      borderRadius : 10,
   },
   sectionTitle : {
      color: "#D4AF37",
      fontSize : 15,
      fontFamily : 'Roboto-Bold',
      textAlign:'center'
   },
   sectionText:{
      color : "#000",
      fontSize : 13,
      fontFamily : 'Roboto',
      lineHeight : 22,
      marginTop : 5,
      alignSelf:'flex-start'
   },
   rowInfo :{
      marginTop : 20
   }


});