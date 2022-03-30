import {StyleSheet, Dimensions, I18nManager } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default  style = StyleSheet.create({
   container :{
    flex:1,
   },
   onboardingImage: {
     width: '100%',
     height: '100%',
   },
   headerContainer: {
     flexDirection: 'row',
     justifyContent: 'space-around',
     alignSelf: 'center',
     position: 'absolute',
     top: 50,
   },
   skipButton: {
     padding: 10,
     borderRadius: 5,
     overflow: 'hidden'
   }, 
   skipButtonText: {
     textDecorationLine: 'underline',
     color: '#012647',
     fontSize: 16,
   },
   textContainer : {
      flex: 1,
      alignItems:'center',
      justifyContent: 'center',
      paddingVertical: 5,
   },
   largeText: {
      color: '#012647',
      fontSize: 23 ,
      textAlign:'center',
      marginBottom: 25
   },
   mediumText: {
      color: '#012647',
      fontSize: 17 ,
      textAlign:'center',
   },
   footerContainer: {
      flex: .7,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 11
   },
   dotsContainer: {
     flex: 1,
     flexDirection: 'row',
     alignItems: 'center',
   },
   dot: {
      width: 7,
      height: 7,
      borderRadius : 5,
      backgroundColor: '#FFF',
      marginHorizontal: 8
   },
   active: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#012647',
   },
   nextButton: {
      justifyContent: I18nManager.isRTL ? 'flex-start' : 'flex-end',
      backgroundColor: '#D4AF37',
      paddingHorizontal: 25,
      paddingVertical: 8,
      borderRadius: 6,
   },
   nextButtonText: {
     color: '#FFF',
     fontSize: 15,
   },
})