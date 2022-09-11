import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, StatusBar, I18nManager } from 'react-native';
import { useSelector } from 'react-redux';

import GeneralStyle from '../../assets/styles/GeneralStyle';

import I18n from '../../lang/I18n';
import style from '../../assets/styles/ProfileStyle';
import FastImage from 'react-native-fast-image';
import { RectButton, ScrollView, BorderlessButton } from 'react-native-gesture-handler';

// Components
import Spinner from '../../components/Spinner';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = ({...props}) => {
  const user = useSelector(state => state.user);
  const [data, setData ] = useState({});
  const [isLoading, setIsLoading] = useState(true);


   /**
    * Get Current User Profile
    */
   const getUserProfile = () => {
    api.get(endpoints.profile + '/' + user?.account?.profile.id)
        .then(res => {
          setData(res.data.data);
          setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
   };

   useEffect(() => {
    if (user.account.profile) getUserProfile();
    else props.navigation.navigate('createProfile');
   }, [user]);

   return <SafeAreaView style={[GeneralStyle.container]}>
       <View style={[GeneralStyle.header, {flexDirection : 'row',justifyContent:'space-between',padding  :10 }]}>
            <BorderlessButton 
              onPress={()=>{props.navigation.goBack()}}
              style={{flex: 1}}
            >
               <FastImage 
                  source={require('../../assets/icons/back-arrow.png')}
                  style = {
                    {
                      width: 23,
                      height: 23,
                      transform: [{
                        rotate: I18nManager.isRTL ? '180deg' : '0deg'
                      }]
                    }
                  }
                  resizeMode={'contain'}
               />
            </BorderlessButton>
            <Text style={[GeneralStyle.headerText,{flex: 1, textAlign: 'center'}]}>
               {I18n.t('profile')}
            </Text>
            <View style={{flex: 1}} />
       </View>
      {
        isLoading 
          ? <Spinner />
          : <>
            <View style={{flex:1}}>
              <ImageBackground 
                source={data.avatar ? {uri: data.avatar} : require('../../assets/images/profile-default.png')}
                resizeMode={'contain'}
                style={style.bgImage}
              >
                {
                  data.user?.name &&
                  <Text style={style.name}>
                    {data.user?.name}
                  </Text>
                }
                {/* <RectButton style={style.uploadImageButton}>
                    <FastImage 
                      source={require('../../assets/images/change-profile-image.png')}
                      style={style.uploadImage}
                    />
                </RectButton> */}
              </ImageBackground>
              <ScrollView showsVerticalScrollIndicator={false} >
              <View style={style.grayContainer}>
                <View style={GeneralStyle.rowSpaceBetween}>
                    <Text style={[style.sectionTitle]}>
                      {I18n.t('personalInfo')}
                    </Text>
                    <RectButton 
                      style={{ padding: 5, borderRadius: 5}}
                      onPress = {() => props.navigation.navigate('createProfile')} >
                      <FastImage 
                        source={require('../../assets/icons/edit.png')}
                        style={{width:20,height:20}}
                      />
                    </RectButton>
                </View>
                <Text style={[style.rowInfo]}>
                      {I18n.t('name')} : {data.user?.name}
                </Text>
                <Text style={[style.rowInfo]}>
                      {I18n.t('mobile')} : {data?.phone}
                </Text>
                <Text style={[style.rowInfo]}>
                      {I18n.t('country')} : {data.country?.name_en}
                </Text>
                {/* <Text style={[style.rowInfo]}>
                      {I18n.t('city')} : {data.city?.name_en}
                </Text> */}
                <Text style={[style.rowInfo]}>
                      {I18n.t('email')} : {data?.user?.email}
                </Text>
              </View>
              <View style={style.grayContainer}>
                <View style={GeneralStyle.rowSpaceBetween}>
                    <Text style={[style.sectionTitle]}>
                      {I18n.t('personalInfo')}
                    </Text>
                    <RectButton onPress = {() => props.navigation.navigate('createProfile', { activeStep: 2 })}>
                      <FastImage 
                        source={require('../../assets/icons/edit.png')}
                        style={{width:20,height:20}}
                      />
                    </RectButton>
                </View>
                <Text style={[style.rowInfo]}>
                  {I18n.t('bodyShape')} :  {data.body_shape?.title}
                </Text>
                <Text style={[style.rowInfo]}>
                  {I18n.t('undertoneColors')} : {data.skin_glow?.title}
                </Text>
                <Text style={[style.rowInfo]}>
                  {I18n.t('youAre')} : {data.jobs?.reduce((acc, cur, index, array) => acc + cur.title.toUpperCase() + (index !== array.length - 1 ? ', ' : ''), '') }
                </Text>
                <Text style={[style.rowInfo]}>
                  {I18n.t('yourGoal')} : {data.goals?.reduce((acc, cur, index, array) => acc + cur.title.toUpperCase() + (index !== array.length - 1 ? ', ' : ''), '') }
                </Text>
                <Text style={[style.rowInfo]}>
                  {I18n.t('yourStyle')} : {data.favourite_styles?.reduce((acc, cur, index, array) => acc + cur.title.toUpperCase() + (index !== array.length - 1 ? ', ' : ''), '') }
                </Text>
              </View>
            </ScrollView>
          </View>
        </>
      }
    </SafeAreaView>
};

export default Profile;
