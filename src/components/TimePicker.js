import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const TimePicker = ({...props}) => {
  const [ date, setDate ] = useState(new Date());
  const [ selectedValue, setSelectedValue ] = useState();
  const [ showPicker, setShowPicker ] = useState(false);

  const onChangeTime = (event, selectedDate) => {
    setShowPicker(false);
    const currentTime = `${selectedDate.getHours()}:${selectedDate.getMinutes()}`;
    setSelectedValue(currentTime);
    setDate(selectedDate);
    props.onChangeValue(currentTime);
  };

  return  <View style={{ marginVertical: 7 }}> 
    <Animatable.View style={Style.container}>
      <View style={{ flexDirection:'row', alignItems:'center' }}>
        {
          props.name &&
          <Text style={[Style.placeholderText, { fontWeight: '700' }]}>
            {props.name}
          </Text>                     
        }
      </View>
      <TouchableOpacity style={Style.input} onPress={() => setShowPicker(true)}>
        <Text style={Style.inputTitle}>
          { selectedValue || props.name}
        </Text>
        <FastImage 
          source={require('../assets/icons/clock-gold.png')} 
          style = {{ width: 23, height: 23 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View>
      {
        showPicker &&
        <DateTimePicker
          mode="time"
          value={date}
          onChange={onChangeTime}
        />
      }
      </View>
    </Animatable.View>
  </View>
};

const Style = StyleSheet.create({
   container : {
      flexDirection: 'row',
      alignSelf:'center',
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
   },
   input: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     width: 100,
     paddingVertical: 10,
     paddingHorizontal: 8,
     backgroundColor: '#FFF',
     borderWidth: 1,
     borderColor: '#B9B9B9',
     borderRadius: 10,
     marginStart: 20,
   },
   inputTitle: {
     color: '#D6D6D6',
     fontSize: 14,
     fontWeight: '600',
   }
});

export default TimePicker;