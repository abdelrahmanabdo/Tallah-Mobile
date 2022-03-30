import {StyleSheet, Dimensions , Platform} from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
      marginVertical : 10,
      flexDirection : 'row',
      marginHorizontal : 10
   },
   actionsSection :{
      flex: .6 , 
      flexDirection : 'column' ,
      justifyContent:'space-evenly',
      alignItems:'flex-start'
   },
   likesNumber :{
      color : '#D6D6D6',
      fontSize : 12,
      marginTop : 4
   },
   blogSection : {
    flex:3,
    borderRadius : 13,
    backgroundColor:"#FFF",
    padding : 10,
    shadowColor: '#707070',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1.3,
    shadowRadius: 10,
    elevation: 8,
   },
   blogImage :{ 
      flex: 3,
      height: 150,
      borderRadius : 10 ,
      overflow : 'hidden'
   },
   blogText :{
      marginTop : 10,
      color : '#7B7B7B',
      fontSize : 14 ,
      lineHeight : 18
   }

});