import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground , ScrollView , SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton , BorderlessButton, TextInput  } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';  
import moment from 'moment';

//Styles
import style from '../../../assets/styles/CallStyle';
import GeneralStyle from '../../../assets/styles/GeneralStyle';


const Answer = (props) => {
  const user = useSelector(state => state.user);
  const stylist = useSelector(state => state.stylist);

  useEffect(() => {

  }, []);

  return (<>
    <SafeAreaView style={style.container}>
      <Text>Answer</Text>
    </SafeAreaView>
  </>);
}

export default Answer;
