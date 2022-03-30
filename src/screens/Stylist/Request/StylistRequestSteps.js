import React, { useState } from 'react';
import { I18nManager, ImageBackground, SafeAreaView, ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BorderlessButton, RectButton } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../../../assets/styles/GeneralStyle';
import style from '../../../assets/styles/StylistRequestStyle';
import stepsStyle from '../../../assets/styles/CreateProfileStyle';
import ModalStyle from '../../../assets/styles/ModalStyle';


//Steps
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import StepFive from './steps/StepFive';
import StepSix from './steps/StepSix';

const StylistRequestSteps = props => {
   const [activeStep , setActiveStep ] = useState(1);
   const [showThanksModal , setShowThanksModal ] = useState(false);


   //Go to Next Step 
   const goToNext = () => {
      activeStep < 6 ? setActiveStep(activeStep + 1 ) : null;
      if(activeStep == 6){
         setModalText('finishCreateAccountText');
         setShowThanksModal(true);
      }
   }

   
   return <SafeAreaView style={[GeneralStyle.container]}>
      <SafeAreaView style={{ 
          display: 'flex', flexDirection: 'row', 
          justifyContent: 'space-between', marginHorizontal: 15,
          marginTop: 10
        }}
      >
      <View style={{ flexDirection: 'row'}}>
        <RectButton 
          style={{ padding: 5, borderRadius: 5}} 
          rippleColor={'#CCC'}
          onPress={()=>{props.navigation.goBack()}}
        >
          <FastImage 
            source={require('../../../assets/icons/back-arrow.png')} 
            style = {{
              width: 23,
              height: 23,
              transform: [{
                rotate: I18nManager.isRTL ? '180deg' : '0deg',
              }]
            }}
            resizeMode={'contain'}
          />
        </RectButton>
        <Text style={[GeneralStyle.headerText, { marginStart : 15}]}>
          Stylist Registration
        </Text>
      </View>
      <RectButton 
        onPress={() => props.navigation.navigate('Home')}
        style={[GeneralStyle.SecondaryButton]}
      >
        <Text style={[GeneralStyle.SecondaryButtonText, {paddingHorizontal : 15}]}>
          Save
        </Text>
      </RectButton>
   </SafeAreaView>
   <View style={[stepsStyle.stepsNumberContainer , { backgroundColor: '#FFF',}]}>
          <View style={{width : '90%' , alignSelf:'center' , flexDirection:'row',
                        justifyContent:'space-between',alignItems:'center'}}>
            <FastImage source={require('../../../assets/icons/one-blue-active.png')}
                          resizeMode="contain"
                          style={stepsStyle.stepIcon} />
            <View style={stepsStyle.activeLine}></View>
            <BorderlessButton
              //  onPress={() => setActiveStep(2)}
            >
               <FastImage  source={ activeStep >= 2 ? require('../../../assets/icons/two-blue-active.png') :
                                                   require('../../../assets/icons/two-inactive.png')}
                           resizeMode="contain"
                           style={stepsStyle.stepIcon} />
            </BorderlessButton>
            <View style={activeStep > 2 ? stepsStyle.activeLine : stepsStyle.inActiveLine}></View>
            <BorderlessButton
              //  onPress={() => setActiveStep(3)}
            >
               <FastImage  source={ activeStep >= 3 ? require('../../../assets/icons/three-blue-active.png') :
                                                   require('../../../assets/icons/three-inactive.png')}
                           resizeMode="contain"
                           style={stepsStyle.stepIcon} />
            </BorderlessButton>
            <View style={activeStep > 3 ? stepsStyle.activeLine : stepsStyle.inActiveLine}></View>
            <BorderlessButton
              //  onPress={() => setActiveStep(4)}
            >
               <FastImage source={ activeStep >= 4 ? require('../../../assets/icons/four-blue-active.png') :
                                                   require('../../../assets/icons/four-inactive.png')}
                           resizeMode="contain"
                           style={stepsStyle.stepIcon} />
            </BorderlessButton>
            <View style={activeStep > 4 ? stepsStyle.activeLine : stepsStyle.inActiveLine}></View>
            <BorderlessButton
              //  onPress={() => setActiveStep(5)}
            >
               <FastImage source={ activeStep >= 5 ? require('../../../assets/icons/five-blue-active.png') :
                                                   require('../../../assets/icons/five-inactive.png')}
                           resizeMode="contain"
                           style={stepsStyle.stepIcon} />
            </BorderlessButton>
            <View style={activeStep > 5 ? stepsStyle.activeLine : stepsStyle.inActiveLine}></View>
            <BorderlessButton
              //  onPress={() => setActiveStep(6)}
            >
               <FastImage source={ activeStep == 6 ? require('../../../assets/icons/six-blue-active.png') :
                                                   require('../../../assets/icons/six-inactive.png')}
                           resizeMode="contain"
                           style={stepsStyle.stepIcon} />
            </BorderlessButton>
                        
          </View>
       </View> 
       <View>
          {
            activeStep == 1 ?
               <StepOne 
                  goToNext = {() => goToNext()}
               />
               :
               (
                  activeStep == 2 ?
                  <StepTwo 
                     goToNext = {() => goToNext()}
                  />
                  :
                  (
                     activeStep == 3 ? 
                     <StepThree 
                        goToNext = {() => goToNext()}
                     />
                     :
                     (
                        activeStep == 4 ?
                        <StepFour 
                           goToNext = {() => goToNext()}
                        />
                        :
                        (
                           activeStep == 5 ?
                           <StepFive 
                              goToNext = {() => goToNext()}
                           /> 
                           :
                           <StepSix 
                              goToNext = {() => goToNext()}
                              navigation={props.navigation}
                           />
                        )
                     )
                  )
               ) 
          }

      </View>
   </SafeAreaView>
}

export default StylistRequestSteps ;