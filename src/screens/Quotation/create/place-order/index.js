import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  I18nManager,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

//Styles
import style from './style';
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import ModalStyle from '../../../../assets/styles/ModalStyle';

import I18n from '../../../../lang/I18n';

// Components
import TallaButton from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';

//Apis
import api from '../../../../config/api';
import endpoints from '../../../../config/endpoints';

const CreateQuotation = ({ navigation, route})  => {
  const user = useSelector(state => state.user);
  const stylist = useSelector(state => state.stylist);
  const data = route.params.data;
  const [showModal, setShowModal] = useState(false);
  const [isAcceptTerms, setIsAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const TAXES = 5;
  const totalValue = TAXES + Number(data?.fees);

  const placeQuotation = async () => {
    if (!isAcceptTerms) return;

    setIsLoading(true);
    const requestData = {
      stylist_id: stylist.profile.id,
      user_id: data.userId,
      session_type_id: data.sessionTypeId,
      fees: Number(data.fees),
      date: data.date,
      time: `${data.from} - ${data.to}`,
      total_paid: totalValue,
    };
    console.log({ requestData });
    await api
      .post(`${endpoints.quotations}`, requestData)
      .then(res => {
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => setIsLoading(false));
  };

  const ThanksModal = () => {
    const submitModal = () => {
      setShowModal(false);
      navigation.pop(2);
    };

    return <Modal isVisible={showModal}
                    animationIn={'bounceIn'}
                    backdropOpacity={.7}>
        <View style={ModalStyle.container}>
          <FastImage 
            source={require('../../../../assets/icons/added-blue.png')} 
            style = {{
              width: 50,
              height: 50,
            }}
            resizeMode="contain"
          />
          <Text style={[ModalStyle.text,{ lineHeight: 22, paddingHorizontal: 25, fontWeight: '600' }]}>
            Your request was sent successfully 
          </Text>
          <TallaButton 
            isModal={true}
            label={'Ok'}
            bgColor={'#D4AF37'}
            labelColor ={'#FFF'}
            onPress={submitModal}
            style={ModalStyle.SecondaryButton}
          />
        </View>
    </Modal>
  };

  return  <SafeAreaView style={[GeneralStyle.container]}>
      <SafeAreaView style={[GeneralStyle.rowSpaceBetween, { marginBottom: 10 }]}>
        <RectButton 
          style={{ marginHorizontal: 10, padding: 8, borderRadius: 4}}
          onPress={()=> navigation.goBack()}
        >
          <FastImage 
            source={require('../../../../assets/icons/back-arrow.png')} 
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
        <View style={style.quotationRow}>
          <Text style={style.rowTitle}>
            Session Type
          </Text>
          <Text style={style.rowValue}>
            {data?.sessionTitle}
          </Text>
        </View>
        <View style={style.quotationRow}>
          <Text style={style.rowTitle}>
            Preferred Dates for the session
          </Text>
          <Text style={style.rowValue}>
            {data?.date}
          </Text>
        </View>
        <View style={style.quotationRow}>
          <Text style={style.rowTitle}>
            Preferred Time for the session 
          </Text>
          <Text style={style.rowValue}>
            {data?.from} To {data?.to}
          </Text>
        </View>
        <View style={style.quotationRow}>
          <Text style={style.rowTitle}>
            Fees
          </Text>
          <Text style={style.rowValue}>
            {data?.fees} EGP
          </Text>
        </View>
        <View style={style.quotationInfo}>
          <View style={style.priceContainer}>
            <Text style={style.priceTitle}>
              Taxes
            </Text>
            <Text style={style.priceValue}>
              {TAXES} EGP
            </Text>
          </View>
          <View style={style.priceContainer}>
            <Text style={style.priceTitle}>
              Fees
            </Text>
            <Text style={style.priceValue}>
              {data?.fees} EGP
            </Text>
          </View>
        </View>
        <View style={style.totalContainer}>
          <Text style={style.totalTitle}>
            Total
          </Text>
          <Text style={style.totalValue}>
            {totalValue} EGP
          </Text>
        </View>
        <View style={{flexDirection:'row' , marginVertical: 30, alignItems:'center'}}>
          <Checkbox onChange={(value) => setIsAcceptTerms(value)} />
          <RectButton
            onPress={()=> navigation.navigate('TAndC')} >
            <Text style={style.termsText}>
              {I18n.t('agreeTermsAndConditions')} 
            </Text>
          </RectButton>
        </View>
      </ScrollView>
      <View style={style.buttonsContainer}>
        <TallaButton
          onPress={placeQuotation}
          label={'Place Order'}
          style={{ flex: 1 }}
          bgColor={'#D4AF37'}
          labelColor ={'#FFF'}
          isLoading={isLoading}
        />
      </View>
      <ThanksModal />
  </SafeAreaView>
}
 
export default CreateQuotation;
