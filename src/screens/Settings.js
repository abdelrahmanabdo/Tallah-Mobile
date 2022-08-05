import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView , Switch, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Modal from 'react-native-modal';

//Styles
import style from '../assets/styles/SettingsStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';
import ModalStyle from '../assets/styles/ModalStyle';

import Snackbar from '../components/Snackbar';
import TallaButton from '../components/Button';

//Apis
import api from '../config/api';
import endpoints from '../config/endpoints';

import I18n from '../lang/I18n';

import { logoutUser } from '../redux/actions/user';
import { resetStylistData } from '../redux/actions/stylist';
import { unassignUserToken } from '../helpers/Auth';

const Settings = props  => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [data , setData] = useState({
    show_working_hours: true,
    show_in_stylists: true,
    send_reservations: true,
    send_before_reservations: true,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

   const getUserSettings = () => {
     api.get(endpoints.getUserSettings + '?user_id=' + user.account.id)
       .then(res => {
         if (res.data.status && res.data.data) {
           let userSettings = res.data.data;
           userSettings = Object.keys(userSettings).reduce((obj, key) => {
              return Object.assign(obj, {
                [key]: userSettings[key] === '1' ? true : false,
              });
            }, {});
           setData(userSettings);
         }
       });
   };

  /**
    * Delete account modal
    */
  const DeleteAccountModal = () => {

   const deleteUserAccount = () => {
     api.post(endpoints.deleteUserAccount, { user_id: user.account.id })
       .then(async (res) => {
         if (res.data.status) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
            unassignUserToken(user?.account?.id);
            let keys = await AsyncStorage.getAllKeys();
            keys = keys.filter((key) => !['deviceToken', 'isFirstTime'].includes(key));
            await AsyncStorage.multiRemove(keys);
            dispatch(logoutUser());
            dispatch(resetStylistData());
         } else {
          console.log({ err });
         }
       })
       .catch((err) => {
          console.log({ err: err.response });
       });
   };

    return <Modal 
              isVisible={showDeleteModal}
              animationIn={'bounceIn'}
              backdropOpacity={.7}
          >
      <View style={ModalStyle.container}>                
        <FastImage 
          source={require('../assets/icons/delete-red.png')}
          resizeMode="contain"
          style={{width :  60  , height:  60 }}
        />
        <Text style={[ModalStyle.text,{fontFamily : 'Roboto-Bold'}]}>
            Are you sure that you want to delete your account?
        </Text>
        <View style={{flexDirection:"row"}}>
          <TallaButton   
            onPress={() => setShowDeleteModal(false) }
            label={'Cancel'}
            isModal
            labelColor={'#686868'}
            style={[ModalStyle.SecondaryButton,{
              backgroundColor:'#FFF',  marginEnd: 10, flex: 1,
              borderColor: '#CCC', borderWidth: 1}]}
          />
          <TallaButton  
            onPress={deleteUserAccount}
            label={'Delete'}
            isModal
            labelColor={'#FFF'}
            style={[ModalStyle.SecondaryButton, {backgroundColor: '#FF0000', flex: 1}]}
          />
        </View>
      </View>
    </Modal>
  }

   const upsertUserSettings = (data) => {
     const updatedData = { 
       ...data,
       user_id: user.account.id,
     };

     api.post(endpoints.upsertUserSettings, updatedData)
       .catch((err) => {
         new Snackbar({text : I18n.t('unknownError') , type : 'danger'});
       });
   };


  useEffect(() => {
    getUserSettings();
  }, []);

  return  <SafeAreaView style={[GeneralStyle.container]}>
    <View style={GeneralStyle.header}>
      <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
        <RectButton 
          style={{ paddingVertical: 3, borderRadius: 5}}
          onPress={()=>{props.navigation.goBack()}}>
          <FastImage 
            source={require('../assets/icons/back-arrow.png')} 
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
        <Text style={GeneralStyle.headerText}>
          Settings
        </Text>
        <View style={{flexDirection : 'row'}}>
          {
            user.isLoggedIn && 
              <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
                <FastImage source={require('../assets/icons/notification.png')}
                        resizeMode={'contain'}
                        style={{width : 25,height : 25}} />
              </BorderlessButton>
          }
        </View>
      </View>
    </View>
    <ScrollView style={style.container}>
      <View style={style.itemContainer}>
        <Text style={style.headerText}>
            Reservations
        </Text>
      </View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
          Show my working hours
        </Text>
        <Switch 
          value={data.show_working_hours}
          ios_backgroundColor={data.show_working_hours ? "#D4AF37" : "#707070"}
          trackColor={{ false: "#707070", true: "#D4AF37" }}
          thumbColor={'#FFF'}
          onValueChange ={(isOn) => {
            setData({ ...data, show_working_hours: isOn});
            upsertUserSettings({ ...data, show_working_hours: isOn});
          }}
        />
      </Animatable.View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
            Show me in stylist list
        </Text>
        <Switch 
          value={data.show_in_stylists ? true : false}
          ios_backgroundColor={data.show_in_stylists ? "#D4AF37" : "#707070"}
          trackColor={{ false: "#707070", true: "#D4AF37" }}
          thumbColor={'#FFF'}
          onValueChange ={(isOn) => {
            setData({ ...data, show_in_stylists: isOn});
            upsertUserSettings({ ...data, show_in_stylists: isOn});
          }}
        />
      </Animatable.View>

      <View style={style.itemContainer}>
        <Text style={style.headerText}>
            Notifications
        </Text>
      </View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
              Send notifications for new reservations
        </Text>
        <Switch 
          value = {data.send_reservations ? true : false}
          ios_backgroundColor={data.send_reservations ? "#D4AF37" : "#707070"}
          trackColor={{ false: "#707070", true: "#D4AF37" }}
          thumbColor={'#FFF'}
          onValueChange ={(isOn) => {
            setData({ ...data, send_reservations: isOn});
            upsertUserSettings({ ...data, send_reservations: isOn});
          }}
        />
      </Animatable.View>
      <Animatable.View animation={'slideInRight'}  style={style.itemContainer}>
        <Text style={style.title}>
            Send notifications before sessions
        </Text>
        <Switch 
          value={data.send_before_reservations ? true : false}
          ios_backgroundColor={data.send_before_reservations ? "#D4AF37" : "#707070"}
          trackColor={{ false: "#707070", true: "#D4AF37" }}
          thumbColor={'#FFF'}
          onValueChange ={(isOn) => {
            setData({ ...data, send_before_reservations: isOn});
            upsertUserSettings({ ...data, send_before_reservations: isOn});
          }}
        />
      </Animatable.View>

      <View style={[style.itemContainer, { marginTop: 30}]}>
        <Text style={style.headerText}>
            Account
        </Text>
      </View>
      <Animatable.View animation={'slideInUp'} style={style.itemContainer}>
        <Text style={style.title}>
          Delete your account
        </Text>
        <RectButton
          value={data.send_before_reservations ? true : false}
          style={style.deleteButton}
          onPress={() => setShowDeleteModal(true)}
        >
          <Text style={style.deleteButtonText}>
            Delete
          </Text>
        </RectButton>
      </Animatable.View>

      <DeleteAccountModal />

    </ScrollView>
  </SafeAreaView>
}
 
export default Settings;
