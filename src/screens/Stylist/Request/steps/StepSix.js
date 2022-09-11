import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { BorderlessButton } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import style from '../../../../assets/styles/StylistRequestStyle';
import ModalStyle from '../../../../assets/styles/ModalStyle';
import Snackbar from '../../../../components/Snackbar';

import Input from '../../../../components/Input';
import TallahButton from '../../../../components/Button';

import TAndC from '../../../../modals/TAndC';

//Apis
import api from '../../../../config/api';
import endpoints from '../../../../config/endpoints';

const StepSix = ({ navigation }) => {
   const stylist = useSelector(state => state.stylist);
   const [card , setCard ] = useState({});
   const [showTAndCModal , setShowTAndCModal] = useState(false);
   const [showSubmitModal , setShowSubmitModal ] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   /**
    * Submit current step
    */
   const submitStep = () => {
      if (!card.name) 
         return new Snackbar({text : 'Please insert your name' , type : 'danger'});  
      if (!card.accountNumber) 
         return new Snackbar({text : 'Please insert your Account Number' , type : 'danger'});     
      if (card.accountNumber.length > 16 || card.accountNumber.length < 13) 
         return new Snackbar({text : 'Please check your account number again' , type : 'danger'});
      if (!card.swiftCode) 
         return new Snackbar({text : 'Please insert Swift Code' , type : 'danger'});
      if (!card.branchName) 
         return new Snackbar({text : 'Please insert branch name' , type : 'danger'});
      if (!card.branchAddress) 
         return new Snackbar({text : 'Please insert branch address' , type : 'danger'});
      
      setIsLoading(true);

      // Submit project specializations to api
      api  
         .post(endpoints.stylistBankAccount , { 
            'stylist_id' : stylist.profile.id,
            'name' : card.name,
            'account_number' : card.accountNumber,
            'iban': card.iban,
            'swift_code': card.swiftCode,
            'branch_name' : card.branchName,
            'branch_address' : card.branchAddress,
          })
         .then(res => {
           setIsLoading(false);
           setShowTAndCModal(true);
         })
         .catch(err => {
            setIsLoading(false);
            new Snackbar({text : err.response.data.message , type : 'danger'});
         });
   };

   useEffect(() => {
    if (stylist.profile.bank_account) {
      const { bank_account } = stylist.profile;
      const info = {
        ...bank_account,
        accountNumber: bank_account.account_number,
        swiftCode: bank_account.swift_code,
        branchName: bank_account.branch_name,
        branchAddress: bank_account.branch_address,
      };
      setCard({ ...info });
    }
   },[showSubmitModal]);
   
   /**
    * Submit Modal
    **/
   const SubmitModal = () => {
      return <Modal isVisible={showSubmitModal}
                    animationIn={'bounceIn'}
                    backdropOpacity={.7}
             >
         <View style={ModalStyle.container}>
            <FastImage source={require('../../../../assets/icons/done-modal-icon.png')}
                        resizeMode="contain"
                        style={{width : 60  , height:  60 }}
            />
            <Text style={ModalStyle.text}>
               Your Application is submitted!
            </Text>
            <BorderlessButton onPress={() => {
              setShowSubmitModal(false); 
              navigation.goBack();
            }}
                        style={ModalStyle.SecondaryButton}>
               <Text style={ModalStyle.SecondaryButtonText}>
                  ok
               </Text>
            </BorderlessButton>
         </View>
      </Modal>
   }

   return <KeyboardAvoidingView style={{height : '90%'}}>
      <ScrollView style={[{padding:15}]}>
        <Text style={[GeneralStyle.blackBoldText , 
                {fontSize : 18 , color : '#353535'}]}>
        Add bank account details
        </Text>
          <Input
            name={'Account Owner Name'}
            color={'#000'}
            placeholderText={'Account Owner Name'}
            placeholderColor={'#CCC'}
            defaultValue={card.name}
            style={{marginTop:20}}
            onChangeText = {(value) => setCard({...card , name : value})}
          />
          <Input
            name={'Account Number'}
            color={'#000'}
            defaultValue={card.accountNumber}
            placeholderColor={'#CCC'}
            placeholderText={'Card Number'}
            isNumeric
            onChangeText = {(value) => setCard({...card , accountNumber : value})}
         />
          <Input
            name={'IBAN'}
            color={'#000'}
            placeholderColor={'#CCC'}
            defaultValue={card.iban}
            placeholderText={'IBAN'}
            isNumeric
            onChangeText = {(value) => setCard({...card , iban : value})}
         />
          <Input
            name={'Bank Swift Code'}
            color={'#000'}
            placeholderColor={'#CCC'}
            defaultValue={card.swiftCode}
            placeholderText={'Bank Swift Code'}
            onChangeText = {(value) => setCard({...card , swiftCode : value})}
          />
          <Input
            name={'Bank Branch Name'}
            color={'#000'}
            placeholderColor={'#CCC'}
            defaultValue={card.branchName}
            placeholderText={'Bank Branch Name'}
            onChangeText = {(value) => setCard({...card , branchName : value})}
          />
          <Input
            name={'Bank Branch Address'}
            color={'#000'}
            placeholderText={'Bank Branch Address'}
            defaultValue={card.branchAddress}
            placeholderColor={'#CCC'}
            style={{marginBottom: 10}}
            onChangeText = {(value) => setCard({...card , branchAddress : value})}
          />  
      </ScrollView>
      <TallahButton 
        onPress={submitStep}
        labelColor = "#FFF"
        label = {'Send Request'}
        bgColor = "#D4AF37"
        style={{ padding: 15, width: '91%' }}
        isLoading={isLoading}
      />
      <SubmitModal />
      <TAndC 
        showModal={showTAndCModal}
        onCloseModal={() => setShowTAndCModal(false)}
        onAgree={() => {
          setShowSubmitModal(true);
          setShowTAndCModal(false);
        }}
      />
   </KeyboardAvoidingView>
}

export default StepSix ;