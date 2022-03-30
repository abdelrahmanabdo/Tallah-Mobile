import React, {useState, useEffect} from 'react';
import { Text, View, ImageBackground ,ScrollView, I18nManager} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RectButton,  } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../assets/styles/GeneralStyle';

//Apis
import api from '../config/api';
import endpoints from '../config/endpoints';

// Components 
import Spinner from '../components/Spinner';
import { SafeAreaView } from 'react-native-safe-area-context';

const TAndC = props  => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(false);

  const getData = () => {
    api.get(endpoints.tAndC)
      .then(res => {
        setData(res.data.data);
        setIsLoading(false);
      });
  };

  useEffect(() => getData(), []);

  return ( 
    <View style={[GeneralStyle.container]}>
      <SafeAreaView style={[GeneralStyle.rowSpaceBetween, { marginStart: 15}]}>
        <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
            <RectButton onPress={()=>{props.navigation.goBack()}}>
              <FastImage 
                source={require('../assets/icons/back-arrow.png')} 
                style = {
                  {
                    width: 23,
                    height: 23,
                    transform: [{
                      rotate: I18nManager.isRTL ? '180deg' : '0deg'
                    }]
                  }
                }
                resizeMode="contain"
              />
            </RectButton>
            <Text style={GeneralStyle.headerText}>
                Terms and conditions
            </Text>
            <View></View>
        </View>
      </SafeAreaView>
      <ScrollView style={{padding : 20}}>
      {
        isLoading
          ? <Spinner />
          : <Text style={[GeneralStyle.grayText , {fontSize : 15 , lineHeight : 24}]} >
          {I18nManager.isRTL ? data.text_ar : data.text}
        </Text>
      }
      </ScrollView>
    </View>
  );
};
 
export default TAndC;
