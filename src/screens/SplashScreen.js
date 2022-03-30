import React , {useEffect} from 'react';
import { Text, View ,StatusBar} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = ({ params}) => {
   const navigation = useNavigation();
   useEffect(()=>{
      setTimeout(()=>{
         navigation.reset({
            index: 0,
            routes: [{ name: 'onboarding' }],
          });
      },3000)
   },[])

   return <View style={{flex:1}}>
       <StatusBar  hidden />
        <FastImage style={{flex:1,width:'100%',height:'100%'}}   
                   resizeMode={'stretch'}
                   source={require('../assets/images/splashScreen.png')} />
    </View>
};

export default SplashScreen;
