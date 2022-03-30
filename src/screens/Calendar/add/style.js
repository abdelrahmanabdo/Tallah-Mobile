import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
   container: {
    flex: 1,
   },
   Text: {
    color: '#FFF',
    fontSize: 19
   },
   buttonSpaceRow: {
    width,
    flexDirection: 'row',
    paddingVertical : 10,
    alignItems:'center',
    alignSelf: 'center',
    justifyContent:'center',
   },
   circle:{
    width: 30,
    height: 30,
    borderRadius: 15
   },
   boxTitle: {
     marginStart: 20,
     marginTop: 15,
     fontWeight: '500',
     fontSize: 15
   },
   text: {
    fontSize: 16,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginStart: 10
   },
   upcomingContainer: {
    width,
    marginTop: 20,
    flexDirection:'row'
   },
   meetingText: {
    color: '#14675A',
    fontSize: 17,
    fontFamily: 'Roboto',
    fontWeight: '700'
   },
   meetingDate: {
    color : '#BFBFBF',
    fontSize : 15,
    marginTop : 8,
    fontFamily : 'Roboto',
   }
});