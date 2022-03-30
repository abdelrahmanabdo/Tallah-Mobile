import React, { useState } from 'react';
import { SafeAreaView, Text, View} from 'react-native';
import { RectButton, BorderlessButton, BaseButton } from 'react-native-gesture-handler';

//Styles
import GeneralStyle from '../../../assets/styles/GeneralStyle';
import style from '../../../assets/styles/StylistRequestStyle';
import TAndC from '../../../modals/TAndC';

const WelcomeIntro = props => {
   const [activeScreen , setActiveScreen ] = useState(1);
   const [showTAndCModal , setShowTAndCModal] = useState(false);

   
   /**
    * First Intro Screen
    */
   const FirstWelcomeScreen = () => {
      return <View style={[GeneralStyle.columnSpaceBetween, {flex:1, padding :30 }]} >
         <View></View>
         <View>
            <Text style={[GeneralStyle.blackBoldText , {alignSelf:'center' , fontSize:19}]}>
               Why Tallah??
            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 20 , fontSize:17}]}>
               We will help our freelance stylists to:
            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 20 , fontSize:17}]}>
               1 - Widen the scope of clients. 

            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 20 , fontSize:16}]}>
              2 - Flexible working hours based on agreement
              with your client.
            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 20 , fontSize:16}]}>
           3 - Marketing our "Top performer  Stylists" on 
            the social media platforms and other marketing
            related platforms.
            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 20 , fontSize:16}]}>
            4- Guaranteed payments. 
            </Text>
            <Text style={[GeneralStyle.blackText , {marginTop: 20 , fontSize:16}]}>
               You can always reach us on lve2hearu@tallah.co for any questions or inquiries.
            </Text>
         </View>
         <RectButton
            onPress={() => setShowTAndCModal(true)}
            style={[style.createProfileButton]}
         >
            <Text 
              style={[GeneralStyle.grayBoldText , {fontSize : 15, textAlign:'center' , lineHeight : 26}]}
            >
              Read and agree on our T&C 
              And Confidentiality agreement 
            </Text>
         </RectButton>
      </View>
   }

   return (
      <SafeAreaView style={[style.container]}>
      <FirstWelcomeScreen />
      <TAndC 
         showModal={showTAndCModal}
         onAgree = { () => {
           setShowTAndCModal(false)
           props.navigation.navigate('phoneConfirmation');
         }}
         onCloseModal= {() => setShowTAndCModal(false)}
      />
      </SafeAreaView>
   )

}


export default WelcomeIntro ;