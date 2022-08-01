import React  , {useState , useEffect}from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import FastImage from 'react-native-fast-image';
import { RectButton, ScrollView, BorderlessButton } from 'react-native-gesture-handler';
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

import style from './style';

import Button from '../../../../components/Button';

const StylistInfo = ({ route, data }) => {
  const [info, setInfo] = useState({});

  useEffect(() => {

  }, []);

  return <ActionSheet id="stylist-info-sheet">
    <SafeAreaView style={style.container}>
      <Text>stylist-info-sheet</Text>
    </SafeAreaView>
  </ActionSheet>
}

export default StylistInfo;