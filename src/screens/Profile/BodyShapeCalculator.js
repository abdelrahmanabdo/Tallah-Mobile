import React, { useState } from 'react';
import { Text, View, ImageBackground, StatusBar , TextInput, SafeAreaView, Pressable } from 'react-native';
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
   const [isConfirmationModal, setIsConfirmationModal] = useState(false);
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
            {
              isConfirmationModal
              ? <Pressable 
                  onPress={() => {
                    setShowModal(false);
                    setIsConfirmationModal(false);
                    props.navigation.goBack();
                  }}
                  style={ModalStyle.SecondaryButton}
                >
                  <Text style={ModalStyle.SecondaryButtonText}>
                      Next
                  </Text>
                </Pressable>
              : <Pressable 
                  onPress={() => {
                    setModalSubText('');
                    setModalImage('');
                    setShowModal(false);
                  }}
                  style={ModalStyle.SecondaryButton}
                >
                  <Text style={ModalStyle.SecondaryButtonText}>
                      ok
                  </Text>
                </Pressable>
            }
         </View>
      </Modal>
   }

   //Calculation Handler
   const calculate = () => {
     if (!waist || !bust || !hips) {
       return;
     }
      let bodyShape = 'Round';
      if ((waist - bust > 3) && (hips - bust <= 3) && ((waist - hips > 3))) {
        bodyShape = 'Round';
      } else if ((bust - hips <= 3) && (hips - bust < 9) && ((bust - waist >= 23) || ((hips - waist >= 25)))) {
        bodyShape = 'Hourglass';
      } else if ((hips - bust >= 9) && (hips - waist < 23)) {
        bodyShape = 'Triangle';
      } else if ((bust - hips >= 9) && (bust - waist < 23)) {
        bodyShape = 'Inverted Triangle';
      } else if ((hips - bust < 9) && (bust - hips < 9) && (bust - waist < 23) && (hips - waist < 25)) {
        bodyShape = 'Rectangle';
      }

      setModalText('Your body Shap is');
      if(bodyShape == 'Round'){
         setModalSubText('Captivating');
         setModalImage(require('../../assets/images/captivating.png'));
      }if(bodyShape == 'Triangle'){
         setModalSubText('Hottie');
         setModalImage(require('../../assets/images/hottie.png'));
      }if(bodyShape == 'Inverted Triangle'){
         setModalSubText('Charming');
         setModalImage(require('../../assets/images/charming.png'));
      }if(bodyShape == 'Round'){
         setModalSubText('Attractive');
         setModalImage(require('../../assets/images/attractive.png'));
      }if(bodyShape == 'Rectangle'){
         setModalSubText('Glamourous');
         setModalImage(require('../../assets/images/glamorous.png'));
      }
      setIsConfirmationModal(true);
      setShowModal(true);
   }

   return <View style={BodyShapeCalculatorStyle.container}>
      <StatusBar hidden />
      <ImageBackground  style={{ flex:1, justifyContent:'space-between', paddingTop: 20 }} 
                        resizeMode="stretch"
                        source={require('../../assets/images/shapesCalculator.png')}>
         <SafeAreaView style={[GeneralStyle.rowSpaceBetween, { marginStart: 20 }]}>
            <RectButton style={{ flex: 1 }} onPress={()=>{props.navigation.goBack()}}>
               <FastImage  source={require('../../assets/icons/close-primary.png')}
                        style={{ width:20, height:20 }}
                        resizeMode={'contain'}/>
            </RectButton>
            <Text style={[GeneralStyle.primaryBoldText,{ fontSize:18, flex: 2 }]}>
               {I18n.t('bodyShapeCalculator')}
            </Text>
            <View style={{ flex: 1 }} />
         </SafeAreaView>
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
                  returnKeyType={'done'}
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
                  returnKeyType={'done'}
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
                  returnKeyType={'done'}
                  onChangeText={(value)=>{setHips(value)}}
               />
            </View>
            <RectButton 
              style={[GeneralStyle.SecondaryButton , {width : '99%',padding : 15}]}
              onPress={calculate}
            >
               <Text style={GeneralStyle.SecondaryButtonText}>
                  {I18n.t('calculate')}
               </Text>
            </RectButton>
         </View>
      </ImageBackground>
      <InfoModal />
   </View>
};


export default BodyShapeCalculator;
