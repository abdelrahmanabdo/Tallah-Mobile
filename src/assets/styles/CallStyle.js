import {StyleSheet, Dimensions , Platform} from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container : {
     backgroundColor: "#F8F8F8"
   },
   header: {
     flexDirection: 'row',
     width: '100%',
     justifyContent: 'space-between',
     alignItems: 'center',
     position: 'absolute',
     top: 75
   },
   headerButton: {
    width: '40%',
    backgroundColor: '#D4AF37',
    borderRadius: 10,
    padding: 8,
    margin: 10,
    borderBottomWidth: .5,
    borderBottomColor: '#F8F8F8'
   },
   headerButtonText: {
    color: '#FFF',
    textAlign: 'center'
   }


});