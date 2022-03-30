import React, { useState } from 'react';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

//Styles
import style from '../assets/styles/SettingsStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';

const Error = props => {

    return  <View style={[GeneralStyle.container]}>
      <Text>An Error happened</Text>
    </View>
}
 
export default Error;
