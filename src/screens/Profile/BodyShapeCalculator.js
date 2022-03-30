import React, { useState } from 'react';
import { Text, View, ImageBackground, StatusBar , TextInput, SafeAreaView } from 'react-native';
import { RectButton, BorderlessButton, BaseButton} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';

//
import BodyShapeCalculatorStyle from '../../assets/styles/BodyShapeCalculatorStyle';
import GeneralStyle from '../../assets/styles/GeneralStyle';
import ModalStyle from '../../assets/styles/ModalStyle';

//
import I18n from '../../lang/I18n';

const BodyShapeCalculator = ({...props}) => {
   const [showModal , setShowModal ] = useState(false);
   const [modalImage , setModalImage ] = useState('');
   const [modalText , setModalText ] = useState('');
   const [modalSubText , setModalSubText ] = useState('');
   const [bust , setBust ] = useState('');
   const [waist , setWaist ] = useState('');
   const [hips , setHips ] = useState('');

   //Info Modal
   const InfoModal = () => {
      return <Modal isVisible={showModal}
                     animationIn={'bounceIn'}
                     backdropOpacity={.7}>
         <View style={ModalStyle.container}>
            <FastImage source={modalImage != ''? modalImage : require('../../assets/icons/info-modal.png')}
                        resizeMode="contain"
                        style={{width : modalSubText == '' ? 60 : 100 , height: modalSubText == '' ? 60 : 100}}
            />
            <Text style={ModalStyle.text}>
               {modalText}
            </Text>
            {
               modalSubText != '' &&
               <Text style={ModalStyle.subText}>
                  {modalSubText}
                </Text>
            }
            <BorderlessButton onPress={() => {  setModalSubText('');
                                    setModalImage('');
                                    setShowModal(false);
                                    props.navigation.goBack()
                                 }}
                        style={ModalStyle.SecondaryButton}>
               <Text style={ModalStyle.SecondaryButtonText}>
                  ok
               </Text>
            </BorderlessButton>
         </View>
      </Modal>
   }

   //Calculation Handler
   const calculate = () => {
      const bodyShape = 'Hottie';
      setModalText('Your body Shap is');
      if(bodyShape == 'Captivating'){
         setModalSubText('Captivating');
         setModalImage(require('../../assets/images/captivating.png'));
      }if(bodyShape == 'Hottie'){
         setModalSubText('Hottie');
         setModalImage(require('../../assets/images/hottie.png'));
      }if(bodyShape == 'Charming'){
         setModalSubText('Charming');
         setModalImage(require('../../assets/images/charming.png'));
      }if(bodyShape == 'Attractive'){
         setModalSubText('Attractive');
         setModalImage(require('../../assets/images/attractive.png'));
      }if(bodyShape == 'Glamourous'){
         setModalSubText('Glamourous');
         setModalImage(require('../../assets/images/glamorous.png'));
      }
      setShowModal(true);
   }

   return <SafeAreaView style={BodyShapeCalculatorStyle.container}>
      <StatusBar hidden  />
      <ImageBackground  style={{flex:1,justifyContent:'space-between'}} 
                        resizeMode="stretch"
                        source={require('../../assets/images/shapesCalculator.png')}>
         <View style={[GeneralStyle.rowSpaceBetween,{padding:20}]}>
            <RectButton onPress={()=>{props.navigation.goBack()}}>
               <FastImage  source={require('../../assets/icons/close-primary.png')}
                        style={{width:20,height:20}}
                        resizeMode={'contain'}/>
            </RectButton>
            <Text style={[GeneralStyle.primaryBoldText,{fontSize:18}]}>
               {I18n.t('bodyShapeCalculator')}
            </Text>
            <View></View>
         </View>
         <View style={BodyShapeCalculatorStyle.calculationContainer}>
            <View style={[GeneralStyle.rowSpaceBetween,{marginBottom : 30}]}>
               <Text style={[GeneralStyle.primaryText,{fontSize:15 ,flex:.5}]}>
                  {I18n.t('bust')}
               </Text>
               <BaseButton style={{flex:.5}}
                           rippleColor={'transparent'}
                           onPress={()=>{
                              setModalText(I18n.t('bustInfo'))
                              setShowModal(true)
                           }}>
                  <FastImage  source={require('../../assets/icons/info-icon.png')}
                              style={{width:24,height:24}}/>
               </BaseButton>
               <TextInput 
                  style={{flex:1,padding:7,backgroundColor: "#FFF" , color :'#000',borderRadius:10}}
                  keyboardType={'number-pad'}
                  onChangeText={(value)=>{setBust(value)}}
               />
            </View>
            <View style={[GeneralStyle.rowSpaceBetween,{marginBottom : 30}]}>
               <Text style={[GeneralStyle.primaryText,{fontSize:15 ,flex:.5}]}>
                  {I18n.t('waist')}
               </Text>
               <RectButton style={{flex:.5}}
                           rippleColor={'transparent'}
                           onPress={()=>{
                              setModalText(I18n.t('waistInfo'))
                              setShowModal(true)
                           }}>
                  <FastImage  source={require('../../assets/icons/info-icon.png')}
                              style={{width:24,height:24}}/>
               </RectButton>
               <TextInput 
                  style={{flex:1,padding:7,backgroundColor: "#FFF" , color :'#000',borderRadius:10}}
                  keyboardType={'number-pad'}
                  onChangeText={(value)=>{setWaist(value)}}
               />
            </View>
            <View style={[GeneralStyle.rowSpaceBetween,{marginBottom : 30}]}>
               <Text style={[GeneralStyle.primaryText,{fontSize:15 ,flex:.5}]}>
                  {I18n.t('hips')}
               </Text>
               <RectButton style={{flex:.5}}
                           rippleColor={'transparent'}
                           onPress={()=>{
                              setModalText(I18n.t('hipsInfo'))
                              setShowModal(true)
                           }}>
                  <FastImage  source={require('../../assets/icons/info-icon.png')}
                              style={{width:24,height:24}}/>
               </RectButton>
               <TextInput 
                  style={{flex:1,padding:7,backgroundColor: "#FFF" , color :'#000',borderRadius:10}}
                  keyboardType={'number-pad'}
                  onChangeText={(value)=>{setHips(value)}}
               />
            </View>
            <RectButton style={[GeneralStyle.SecondaryButton , {width : '99%',padding : 15}]}
                        onPress={()=>{
                           calculate()
                        }}>
               <Text style={GeneralStyle.SecondaryButtonText}>
                  {I18n.t('calculate')}
               </Text>
            </RectButton>
         </View>
      </ImageBackground>
      <InfoModal />
   </SafeAreaView>
};


export default BodyShapeCalculator;
