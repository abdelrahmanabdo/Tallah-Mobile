import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, I18nManager} from 'react-native';
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';
import * as Animatable from 'react-native-animatable';
import style from '../screens/Auth/social-login/style';

const {width , height} = Dimensions.get('window');

const Phone = ({ ...props }) => {
   const [ showCountryPicker, setShowCountryPicker ] = useState(null);
   const [ country, setCountry] = useState('eg');
  
   const Style = StyleSheet.create({
      container: {
         width: width - 40,
         alignSelf:'center',
         marginVertical : 7,
         padding : 5,
         alignItems:'flex-start',
         justifyContent:'flex-start',
      },
      placeholderText: {
         color: props.placeholderColor || '#CCC',
         fontFamily : "Roboto",
         fontSize: 13,
      },
      title: {
         color: props.color || '#5D0D57',
         fontFamily : "Roboto",
         fontSize: 14,
      },
      input: {
         borderRadius: 7,
         backgroundColor: '#FFF',
         width: '100%',
         marginTop: 8,
         padding: 13,
         borderWidth: 1,
         borderColor: '#E0E0E0',
         color: props.color || '#000',
         textAlign: I18nManager.isRTL ? 'right' : 'left',
      }
   });

    const onPressFlag = () => {
      return null;
      setShowCountryPicker(true);
    };

   return <Animatable.View animation={'pulse'} style={[Style.container, props.style]}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        { props.name &&
          <Text style={[Style.title,{fontWeight : '700'}]}>
              {props.name}
          </Text> }
      </View>
      <PhoneInput
        onPressFlag={onPressFlag}
        initialCountry={country}
        initialValue={props.defaultValue}
        onChangePhoneNumber={props.onChangeText}
        style={Style.input}
        returnKeyType={'done'}
        textStyle={{
          color: '#012647',
        }}
      />
      <CountryPicker
        visible={showCountryPicker}
        withFilter={true}
        onSelect={setCountry}
        onClose={() => setShowCountryPicker(false)}
      />
    </Animatable.View>
};

export default Phone;

