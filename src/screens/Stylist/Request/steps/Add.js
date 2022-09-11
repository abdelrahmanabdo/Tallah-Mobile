import React from 'react';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { BorderlessButton } from 'react-native-gesture-handler';
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import style from '../../../../assets/styles/StylistRequestStyle';

const Add = props => {
   return <Animatable.View
            animation="bounceIn"
            style={style.addContainer}
            useNativeDriver={true}
         >
      <Text style={[GeneralStyle.blackText , {fontSize : 16 , marginBottom: 10}]}>
        Add new {props.type}
      </Text>
      <BorderlessButton  
        style={[GeneralStyle.row , 
                {backgroundColor : '#FFF' , padding : 13 , 
                borderRadius : 10 , marginVertical : 10 }]}
        onPress={props.onPress}
      >
        <FastImage 
          source={require('../../../../assets/icons/add-dashed.png')}
          style={{width : 35 , height : 35}}
        />
        <Text style={[GeneralStyle.goldText , {marginStart : 10}]}>
            Add {props.type}
        </Text>
      </BorderlessButton>
  </Animatable.View>
};

export default Add;
