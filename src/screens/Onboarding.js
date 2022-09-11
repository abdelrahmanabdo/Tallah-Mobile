import React, { useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  I18nManager
} from 'react-native';
import { useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
  BorderlessButton,
  RectButton,
  TouchableOpacity
} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

import I18n from '../lang/I18n';
import { changeFirstTimeStatus } from '../redux/actions/user';

import style from '../assets/styles/OnboardingStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

const Onboarding = ({...props}) => {
  const dispatch = useDispatch();
  const [activeScreen, setActiveScreen] = useState(0);
  const screens = [{
      image: require('../assets/images/onboarding-1.png'),
      title: 'welcomeLadies',
      text: 'expectMoreRewarding'
    }, {
      image: require('../assets/images/onboarding-2.png'),
      title: 'tallahMatters',
      text: 'organizedCloset'
    }, {
      image: require('../assets/images/onboarding-3.png'),
      title: '',
      text: 'taylorSwiftSays'
    },
  ];

  // When user clicks skip button
  const skipClickHandler = () => {
    dispatch(changeFirstTimeStatus());
    props.navigation.navigate('Auth');
    setActiveScreen(0);
  };

  // When user clicks next button
  const nextClickHandler = () => {
    if ([0,1].includes(activeScreen))
      setActiveScreen(activeScreen + 1);
    else
      skipClickHandler();
  };
    
  return <View style={style.container}>
       <StatusBar backgroundColor="transparent" translucent barStyle='dark-content' />
        <View style={{flex: 1.3}} >
          <Animatable.View animation="slideInRight" duration={1600} useNativeDriver={true}>
            <FastImage
              source={screens[activeScreen].image}
              style={style.onboardingImage}
              resizeMode="cover"
            />
          </Animatable.View>
          <View style={style.headerContainer}>
            <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
              <TouchableOpacity onPress={()=> setActiveScreen(activeScreen - 1)}>
                  <FastImage 
                    source={require('../assets/icons/back-arrow.png')} 
                    style = {
                      {
                        width: 25,
                        height: 25,
                        transform: [{
                          rotate: I18nManager.isRTL ? '180deg' : '0deg'
                        }],
                        display: activeScreen !== 0 ? 'flex' : 'none'
                      }
                    }
                    resizeMode="contain"
                  />
              </TouchableOpacity>
              <RectButton onPress={skipClickHandler} style={style.skipButton}>
                <Text style={style.skipButtonText}>
                  Skip
                </Text>
              </RectButton>
            </View>
          </View>
        </View>
        <View style={{flex: .65}} >
          <Animatable.View 
            animation="bounceIn" 
            duration={1500} 
            style={style.textContainer}
            useNativeDriver={true}
          >
              <Text style={style.largeText}>
                  {
                    screens[activeScreen].title
                      ? I18n.t(screens[activeScreen].title)
                      : ''
                  }
              </Text>
              <Text style={[style.mediumText ,{width : '90%',lineHeight:30} ]}>
                    {I18n.t(screens[activeScreen].text)}
              </Text>
          </Animatable.View>
          <View style={style.footerContainer}>
            <View style={{flex: 1}}/>
            <View style={style.dotsContainer}>
              <View style={[style.dot, activeScreen === 0 ? style.active : null]} />
              <View style={[style.dot, activeScreen === 1 ? style.active : null]} />
              <View style={[style.dot, activeScreen === 2 ? style.active : null]} />
            </View>
            <BorderlessButton 
              style={style.nextButton} 
              onPress={nextClickHandler}
            >
              <Text style={style.nextButtonText}>
                {I18n.t(activeScreen === 2 ? 'finish' : 'next')}
              </Text>
            </BorderlessButton>
          </View>
        </View>
    </View>
};

export default Onboarding;
