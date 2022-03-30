import React, {useState, useEffect} from 'react';
import { Text, View, ImageBackground, SafeAreaView, I18nManager } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

//Styles
import style from '../assets/styles/AboutStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

//Apis
import api from '../config/api';
import endpoints from '../config/endpoints';

// Components 
import Spinner from '../components/Spinner';

const About = props  => {
   const [isLoading, setIsLoading] = useState(true);
   const [data, setData] = useState(false);

    /**
    * Get categories
    */
    const getData = () => {
      api.get(endpoints.about).then(res => {
            setData(res.data.data);
            setIsLoading(false);
          });
    };

    useEffect(() => getData(), []);

    return (
      <SafeAreaView style={[GeneralStyle.container]}>
          <View style={GeneralStyle.header}>
            <View style={[GeneralStyle.rowSpaceBetween, {width : '90%'}]}>
              <TouchableOpacity onPress={()=>{props.navigation.goBack()}}>
                  <FastImage 
                    source={data?.image ? {uri: data.image} : require('../assets/icons/back-arrow.png')} 
                    style = {
                      {
                        width: 25,
                        height: 25,
                        transform: [{
                          rotate: I18nManager.isRTL ? '180deg' : '0deg'
                        }]
                      }
                    }
                    resizeMode="contain"
                  />
              </TouchableOpacity>
              <Text style={GeneralStyle.headerText}>
                  About us
              </Text>
              <View />
            </View>
          </View>
          <View style={{flex:1}}>
            {
              isLoading
                ? <Spinner />
                : <> 
              <FastImage source={require('../assets/images/about-us-image.png')}
                              resizeMode={'stretch'}
                              style={style.bgImage} />
              <ScrollView showsVerticalScrollIndicator={false} 
                          style={style.blocksContainer}>
                  {/* <View style={{flex:1,flexDirection:'row'}}>
                      <View style={[style.grayContainer,{marginEnd : 10}]}>
                          <Text style={[style.sectionTitle]}>
                              Our Mission
                          </Text>
                          <Text style={[style.sectionText]}>
                          Proposing new fashion solutions through virtual closet organizing, shopping and professional advisory. We are keen on leading the virtual fashion experience to minimize the time, effort and cost barriers.  
                          </Text>
                      </View>
                      <View style={style.grayContainer}>
                          <Text style={[style.sectionTitle]}>
                              Our Mission
                          </Text>
                          <Text style={[style.sectionText]}>
                          Expanding our customized fashion solutions and tools through virtual formats to provide sustainable and leading existence in the fashion and styling theme while maintaining the trendiest and most appealing looks for our clients.   
                          </Text>
                      </View>
                  </View> */}
                  {
                    data?.sections?.map((section) => {
                      return <View style={[style.grayContainer]}>
                        <Text style={[style.sectionTitle]}>
                          {section.title}
                        </Text>
                        <Text style={[style.sectionText]}>
                          {section.text}
                        </Text>
                    </View>
                    })
                  }
              </ScrollView>
              </>
            }
          </View>
      </SafeAreaView>
  );
}
 
export default About;
