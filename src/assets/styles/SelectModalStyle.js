import {StyleSheet, Dimensions} from 'react-native';


const {width} = Dimensions.get('screen');
export default StyleSheet.create({
   container : {
      alignSelf :'center',
      width : width ,
      backgroundColor: '#FFF',
      borderTopLeftRadius : 15,
      borderTopRightRadius : 15,
      position: 'absolute',
      bottom:-20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.22,
      elevation: 2,
   },
   header:{
      flexDirection : 'row',
      justifyContent: 'space-between',
      alignItems :'center',
      marginBottom : 15
   },
   title :{
      color:"#000",
      fontFamily : "Roboto",
      fontSize: 19,
   },
   text : {
      color : '#0A627C',
      fontFamily : "Roboto",
      fontSize: 14,
      marginTop  : 25,
      lineHeight : 28,
      textAlign : 'center',
      marginHorizontal : 15
   },
   socialLinks:{
      flexDirection:'row' ,
      justifyContent:'space-between',
      alignItems:'center',
      margin:25
   }
 
});


