import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BorderlessButton , RectButton} from 'react-native-gesture-handler';
import * as ImagePicker from "react-native-image-picker";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import { updateStylistProfile } from '../../../../redux/actions/stylist';

//Styles
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import stepsStyle from '../../../../assets/styles/CreateProfileStyle';

//Components
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Dropdown from '../../../../components/Dropdown';
import Snackbar from '../../../../components/Snackbar';
import Phone from '../../../../components/Phone';

import I18n from '../../../../lang/I18n';

//Apis
import api from '../../../../config/api';
import endpoints from '../../../../config/endpoints';

const StepOne = props => {
  const user = useSelector(state => state.user);
  const stylist = useSelector(state => state.stylist);
  const dispatch = useDispatch();
  const [currentPhoneNumber , setCurrentPhoneNumber ] = useState('');
  const [countries , setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stepOneData, setStepOneData] = useState({
    'user_id': user.account.id,
    'mobile_numbers': [],
  });

  /**
    * Get Countries
    */
  const getCountries = () => {
    api.get(endpoints.countries)
        .then(res => setCountries(res.data.data));
  };

  const launchImageLibrary = () => {
      let options = {
        storageOptions: {
          skipBackup: true,
        },
      };
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          const avatarResult = response.assets[0];
          setStepOneData({...stepOneData, avatar: avatarResult});
        }
      });
  };

   /**
      * Validator
   */
   const validator = () => {
      if (!stepOneData.email) return new Snackbar({text : I18n.t('emailIsRequired') , type : 'danger'}), false;
      if (!stepOneData.country_id) return new Snackbar({text : I18n.t('countryIsRequired') , type : 'danger'}), false;
      return true;
   };

   /**
    * Submit current step
    */
   const submitStep = async () => {
      //if not valid data
      if (!validator()) return;
      setIsLoading(true);

      let data = new FormData();
      data.append('user_id', user.account.id);
      data.append('email', stepOneData.email);
      data.append('country_id', stepOneData.country_id);
      if (stepOneData.mobile_numbers.length) {
        stepOneData.mobile_numbers
          .map((mobile, index) => data.append(`mobile_numbers[${index}]`, mobile));
      }
      if (stepOneData.avatar) data.append('avatar', stepOneData.avatar);
      console.log(JSON.stringify(stepOneData.mobile_numbers))
      const token = await AsyncStorage.getItem('token');
      await fetch(endpoints.baseUrl + endpoints.stylist, {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: data,
        })
        .then((res) => res.json())
        .then((res) => {
          setIsLoading(false);
          // Update redux stored stylist profile
          dispatch(updateStylistProfile({...res.data}));
          //Go to next step
          props.goToNext();
        })
        .catch(err => {
          setIsLoading(false);
          new Snackbar({text : I18n.t('unknownError') , type : 'danger'});
        });

   };

   useEffect(() => {
      getCountries();

      //restore previous registered data
      if (stylist.profile) {
         setStepOneData({
            ...stepOneData,
            avatar: stylist.profile.avatar ?? null,
            mobile_numbers:  stylist.profile.mobile_numbers ?? [],
            country_id: stylist.profile.country_id,
            email: stylist.profile.email,
         });
      }
   }, []);

   return (
   <View style={{height : '90%'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[stepsStyle.stepHeaderText , {color : '#000' , marginStart : 25}]}>
          {I18n.t('uploadYourPicture')}
        </Text>
        <RectButton 
              onPress={launchImageLibrary}
              style={[stepsStyle.uploadPictureButton, {backgroundColor: '#CCC'}]}>
          {
            stepOneData.avatar ?
              <Image source={
                  typeof stepOneData.avatar === 'string' 
                    ? {uri: stepOneData.avatar}
                    : stepOneData.avatar
                  }
                  style={stepsStyle.uploadPictureButton}
              />
              :
              <>
                <FastImage source={require('../../../../assets/icons/camera.png')}
                          resizeMode="contain"
                          style={{width : 30 , height:30}}/>
                <Text style={{color : '#FFF' ,textAlign : 'center',width:'60%'}}>
                  Upload Your Picture
                </Text>
              </>
          }
        </RectButton>
        <Input 
          name={I18n.t('email')} 
          placeholderText={I18n.t('email')}  
          defaultValue={stepOneData.email}   
          onChangeText={value => setStepOneData({...stepOneData, email: value})}
          placeholderColor={'#ccc'} 
          color={'#000'}
          isEmail={true}
        />
        <Dropdown 
          items={countries}
          name={'country'}
          placeholderText={'#000'}
          selectedValue={stepOneData.country_id}
          onChangeValue={value => setStepOneData({...stepOneData, country_id: value})}
        />

        <View style={{backgroundColor : '#F8F8F8',borderTopLeftRadius : 10 , 
                      borderTopLeftRadius : 10, paddingHorizontal : 25 , marginVertical : 10}}>
          <Text style={[GeneralStyle.blackText , {fontSize: 15 , marginVertical : 10 , fontWeight : '600'}]}>
              Please Add another active mobile number :
          </Text>
          <View style={[GeneralStyle.columnSpaceBetween ]}>
              <View style={[GeneralStyle.row , { justifyContent:'center' , alignItems:'center' }]}>
              <Phone
                  placeholderColor={'#CCC'} 
                  placeholderText={'Add new number'}
                  onChangeText={(value) => setCurrentPhoneNumber(value)}
                  color={'#5D0D57'}
                  style={{ flex: 2 }}
              />
                <BorderlessButton
                    rippleColor={'#CCC'} 
                    enabled={currentPhoneNumber !== ''}
                    onPress={() => {
                      if(!currentPhoneNumber)
                          return
                      else if(currentPhoneNumber.length != 13)
                          return new Snackbar({text  : 'Please Insert Valid number' , type  : 'danger'})
                      else 
                          stepOneData.mobile_numbers.push(currentPhoneNumber)
                          setStepOneData({...stepOneData, mobile_numbers: stepOneData.mobile_numbers})
                          setCurrentPhoneNumber('');
                    }}
                >
                    <FastImage 
                      source={require('../../../../assets/icons/plus.png')}
                      style={{flex:1,width : 35 , height : 35, marginStart: 10 }}
                      resizeMode="contain"
                    />
                </BorderlessButton>
              </View>
              {
                stepOneData.mobile_numbers.map((item , key) => {
                    return <View key={key}
                            style={[GeneralStyle.rowSpaceBetween , 
                                    {width:'100%',padding : 15}]}
                          >
                    <Text style={[GeneralStyle.blackBoldText  , {fontSize: 16}]}>
                      {item}
                    </Text>
                    {
                      key !== 0 &&
                      <BorderlessButton
                        onPress= {() => {
                          stepOneData.mobile_numbers.splice(key, 1);
                          setStepOneData({
                            ...stepOneData,
                            mobile_numbers: stepOneData.mobile_numbers
                          });
                        }}
                      >
                        <FastImage 
                            source={require('../../../../assets/icons/close-colored.png')}
                            style={{width : 20 , height : 20}}
                            resizeMode={'contain'}
                        />
                      </BorderlessButton>
                    }
                </View>
                })
              }
          </View>
        </View>
      </ScrollView>
      <Button 
        onPress={submitStep}
        labelColor = "#FFF"
        label = {I18n.t('next')}
        bgColor = "#D1AD67"
        style={{ padding: 15 , width: '91%' }}
        isLoading={isLoading}
      />
     </View>
   )
}

export default StepOne ;