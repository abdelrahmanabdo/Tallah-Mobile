import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  I18nManager,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';


//Styles
import style from './style';
import GeneralStyle from '../../../assets/styles/GeneralStyle';

import I18n from '../../../lang/I18n';

// Components
import TallaButton from '../../../components/Button';
import Snackbar from '../../../components/Snackbar';
import Input from '../../../components/Input';
import Dropdown from '../../../components/Dropdown';
import TimePicker from '../../../components/TimePicker';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';

const { width } = Dimensions.get('screen');

const CreateQuotation = ({ navigation, route })  => {
  const user = route.params.user;
  const stylist = useSelector(state => state.stylist);
  const [data, setData] = useState({
    userId: user.id,
  });
  const [specializations , setSpecializations ] = useState([]);

  /**
    * Get Notifications
    */
  const getStylistSpecializations  = () => {
    api.get(`${endpoints.stylistSpecialization}?stylist_id=${stylist.profile?.id}`)
      .then(res => {
        res.data.data.map((specialization) => {
          specialization.name_en = specialization.title;
          specialization.name = specialization.title;
        });
        setSpecializations(res.data.data);
      });
  };


  const submitQuotation = () => {
    if (!data.sessionTypeId || !data.fees || !data.date) return;
    navigation.navigate('quotationPlaceOrder', { data });
  };

  const setSession = (sessionId) => {
    setData({
      ...data,
      sessionTypeId: sessionId,
      sessionTitle: specializations.find((item) => item.id = sessionId).title,
    });
  };

  useEffect(() => {
    getStylistSpecializations();
  }, []);
    
  return  <SafeAreaView style={[GeneralStyle.container]}>
      <SafeAreaView style={[GeneralStyle.rowSpaceBetween, { marginBottom: 15 }]}>
        <RectButton 
          style={{ marginHorizontal: 10, padding: 8, borderRadius: 4}}
          onPress={()=> navigation.goBack()}
        >
          <FastImage 
            source={require('../../../assets/icons/back-arrow.png')} 
            style = {{
              width: 23,
              height: 23,
              transform: [{
                rotate: I18nManager.isRTL ? '180deg' : '0deg'
              }]
            }}
            resizeMode="contain"
          />
        </RectButton>
        <Text style={[GeneralStyle.headerText, { flex: 2 }]}>
            New quotation
        </Text>
        <View style={{ flex:1 }} />
      </SafeAreaView>
      <ScrollView style={style.container}>
        <Text style={[ style.stylistName ]}>
          Name:  {user?.name}
        </Text>
        <View style={style.graySectionContainer}>
          <Dropdown
            name={'Session type'}
            items={specializations}
            onChangeValue={setSession}
            placeholderText={'Session type'}
          />
        </View>
        <View style={style.graySectionContainer}>
          <Text style={style.inputText}>
            Preferred Dates for the session
          </Text>
          <DatePicker
            style={{ width: '90%', marginTop: 15, marginStart: 15 }}
            mode="date"
            date={data.date}
            format="YYYY-MM-DD"
            minDate="01-01-2022"
            theme="light"
            confirmBtnText={I18n.t('confirm')}
            cancelBtnText={I18n.t('cancel')}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                right: 5,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderRadius : 8,
                width : width - 30,
                justifyContent:'center',
                alignItems:'center',
                height: 50,
                backgroundColor: '#FFF',
                borderColor: '#E0E0E0'
              },
              datePickerCon: {
                backgroundColor: Platform.OS === 'ios' ? '#043B6C' : '#FFF',
              },
              btnTextConfirm: {
                color: '#D4AF37',
                fontWeight: 'bold'
              }
            }}
            iconSource={require('../../../assets/icons/calendar-gold.png')}
            onDateChange={(value) => setData({ ...data, date: value})}
          />
        </View>
        <View style={style.graySectionContainer}>
          <Text style={style.inputText}>
            Preferred Time
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 10}}>
            <TimePicker
              name={'From'}
              onChangeValue={(value) => setData({ ...data, from: value})}
            />
             <TimePicker
              name={'To'}
              onChangeValue={(value) => setData({ ...data, to: value})}
            />
          </View>
        </View>
        <View style={style.graySectionContainer}>
          <Input
            name={'Fees'}
            onChangeText={(value) => setData({...data, fees: value})}
            placeholderText={'Fees in EGP'}
            isNumeric
            color={'#393B3C'}
            placeholderColor={'#C3C3C3'}
            returnKeyType={'done'}
          />
        </View>
      </ScrollView>
      <View style={style.buttonsContainer}>
        <TallaButton
          onPress={() => navigation.goBack()}
          label={'Cancel'}
          style={{ flex: 1, marginEnd: 10, borderWidth: 1, borderColor: '#D4AF37'}}
          bgColor={'#FFF'}
          labelColor={'#D4AF37'}
        />
        <TallaButton
          onPress={submitQuotation}
          label={'Done'}
          style={{ flex: 1 }}
          bgColor={'#D4AF37'}
          labelColor ={'#FFF'}
        />
      </View>
  </SafeAreaView>
}
 
export default CreateQuotation;
