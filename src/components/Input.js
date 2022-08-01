import React from 'react';
import { Text, View ,TextInput ,  StyleSheet , Dimensions, I18nManager} from 'react-native';
import {
  TextArea,
  Box,
  NativeBaseProvider
} from 'native-base';
import * as Animatable from 'react-native-animatable';

const {width , height} = Dimensions.get('window');

const Input = ({ ...props }) => {
   
   const Style = StyleSheet.create({
      container: {
         width: width - 40,
         alignSelf:'center',
         marginVertical : 7,
         padding : 5,
         alignItems:'flex-start',
         justifyContent:'flex-start',
      },
      required: {
         color: "#F90909",
         fontSize: 16
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
         padding: 13,
         borderWidth: 1,
         borderColor: '#E0E0E0',
         color: props.color || '#000',
         textAlign: I18nManager.isRTL ? 'right' : 'left',
      }
   });


   return <Animatable.View animation={'pulse'} style={[Style.container, props.style]}>
        <View style={{ flexDirection:'row',alignItems:'center', marginBottom: 8, }}>
          {
            props.required &&
            <Text style={Style.required}>*</Text>
          }
          {
            props.name &&
            <Text style={[Style.title,{fontWeight : '700'}]}>
                {props.name}
            </Text>                     
          }
        </View>
        <TextInput
          multiline={props.isTextarea}
          numberOfLines={props.rowsCount || 7}
          autoFocus={props.autoFocus}
          onChangeText={props.onChangeText}
          placeholder={props.placeholderText}
          defaultValue={props.defaultValue}
          value={props.value}
          style={[Style.input , props.style, { 
            height: props.isTextarea ? 150 : 45,
          }]}
          placeholderTextColor={props.placeholderColor}
          secureTextEntry={props.password}
          returnKeyType={'done'}
          keyboardType={props.isNumeric ? 'number-pad' : props.isEmail ? 'email-address': 'default'}
        />
    </Animatable.View>
    
};

export default Input;

