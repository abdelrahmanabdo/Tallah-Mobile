import React, {
  useState
} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { BaseButton } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

const { height, width } = Dimensions.get('window');

export default ({ children, ...props }) => {
  const style = StyleSheet.create({
    container : {
      flexDirection: 'column',
      alignSelf: 'center',
      borderWidth: 0,
      marginVertical: 10,
      justifyContent: 'center',
      backgroundColor: (props.bgColor || '#D4AF37') ,
      borderRadius: 10,
      padding: height * .021,
      overflow: 'hidden'
    },
    label:{
      color : props.labelColor || '#000',
      textAlign : 'center',
      fontWeight:'700',
      paddingVertical: 3.5
    },
  });

  return <>
  {
    props.isModal
      ? <Pressable
        onPress ={props.onPress}
        android_ripple={{color:  props?.labelColor || '#D4AF37'}}
        disabled = {props.enabled ? !props.enabled : false}
        style={[style.container, props.style]} 
      >
        {
          children
          ? { ...children }
          : <Text style={style.label}>
              {props.label ?? ''}
          </Text>
        }
      </Pressable>
    : <BaseButton
        rippleColor={'#CCC'}
        onPress ={props.onPress}
        enabled={props.isLoading || !props.isDisabled}
        style = {[
          style.container,
          props.style,
          props.isLoading ? { 
            width: 55,
            borderRadius: 27
          } : null
        ]}
      >
        {
          props.isLoading
          ? <ActivityIndicator
            animating={props.isLoading}
            size="small"
            color="#FFF"
          />
          : <Text style={style.label}>
            {props.label ?? ''}
          </Text>
        }
      </BaseButton>
  }
  </>
};

