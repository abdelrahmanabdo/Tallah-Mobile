import React, {
  useState,
  useEffect
} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  I18nManager,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import { Button } from 'react-native-share';
import TallaButton from '../components/Button';

import ModalStyle from '../assets/styles/ModalStyle';

//Apis
import api from '../config/api';
import endpoints from '../config/endpoints';

const TAndC = props => {
  const [data, setData] = useState(false);

  const getData = () => {
    api
      .get(endpoints.tAndC)
      .then(res => {
        setData(res.data.data);
      });
  };
  
  useEffect(() => getData(), []);

  return <Modal isVisible={props.showModal} style={[style.container]} >
    <View 
      style={[ModalStyle.actionModalContainer, { justifyContent: 'space-between' }]}
    >
      <View style={[ModalStyle.actionModalHeader, { marginBottom: 10 }]}>
        <Text style={[ModalStyle.headerText,{flex: 2, textAlign: I18nManager.isRTL ? 'right' : 'left'}]}>
          Terms and conditionstions
        </Text>
        <Button
          style={{ flex: .2 }}
          transparent  
          onPress={props.onCloseModal}
        >
          <FastImage source={require('../assets/icons/close-colored.png')}
                      style={{width: 22, height: 22, flex:1}}
                      resizeMode={'contain'} />
        </Button>
      </View>
      <ScrollView>
          <Text style={{lineHeight : 24 ,marginTop : 10 , marginBottom:50}}>
            {I18nManager.isRTL ? data.text_ar : data.text}
          </Text>
      </ScrollView>
      <View style={{flexDirection:'row',marginBottom : 10}}>
        <TallaButton   
          onPress={props.onCloseModal}
          label ={'cancel'}
          labelColor={'#D4AF37'}
          isModal
          style={[ModalStyle.SecondaryButton,{
            backgroundColor: '#FFF',
            marginEnd: 10,
            flex: 1,
            borderColor : '#D4AF37' , 
            borderWidth: 1
          }]}
        >
        </TallaButton>
        <TallaButton   
          onPress={props.onAgree}
          label={'Agree & continue'}
          labelColor={'#FFF'}
          isModal
          style={[ModalStyle.SecondaryButton,{ flex: 1 }]}
        >
        </TallaButton>
      </View>
    </View>
  </Modal>
}

const style = StyleSheet.create({
   container : {
      margin: 0,
      justifyContent:'flex-end' ,
   }
});
export default TAndC;