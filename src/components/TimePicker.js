import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import I18n from '../lang/I18n';
import DatePicker from 'react-native-datepicker';

const TimePicker = ({...props}) => {
  const [selectedValue , setSelectedValue] = useState(props.selectedValue || '');

  useEffect(() => {
    setSelectedValue(selectedValue);
  }, []);
  
  return  <View style={{marginVertical : 7}}> 
    <Animatable.View style={Style.container} useNativeDriver={true}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        {
          props.name &&
          <Text style={[Style.placeholderText,{fontWeight : '700'}]}>
            {props.name}
          </Text>                     
        }
      </View>
      <DatePicker
        style={{ marginTop: 15}}
        mode="time"
        date={selectedValue}
        placeholder={props.name}
        confirmBtnText={I18n.t('confirm')}
        cancelBtnText={I18n.t('cancel')}
        theme="light"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: 5,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            borderRadius : 8,
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
        iconSource={require('../assets/icons/clock-gold.png')}
        onDateChange={(date) =>{setSelectedValue(date); props.onChangeValue(date);}}
      />
    </Animatable.View>
  </View>
};

const Style = StyleSheet.create({
  container : {
    borderRadius:7,
    alignSelf:'center',
    padding : 5,
  },
  itemText : {
    alignSelf: 'flex-start' ,
    color: '#5D0D57',
    fontFamily : "Roboto",
    fontSize: 16,
    marginVertical : 14,
  },
  placeholderText : {
    color: '#012647',
    fontFamily : "Roboto",
    fontSize: 14,
  }
});

export default TimePicker;
