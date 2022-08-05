import React , {useState, useEffect} from 'react';
import { Text, View, ImageBackground  , StatusBar , FlatList , ScrollView, Dimensions, SafeAreaView} from 'react-native';
import {  RectButton, BorderlessButton, BaseButton  } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Share from "react-native-share";

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/StylistTabStyle';

//Components
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button';

import StylistsList from '../Stylist/StylistsList';

const width = Dimensions.get('window').width ;

const StylistTab = props => {
  const user = useSelector(state => state.user);
  const [isFirstTime , setIsFirstTime ] = useState(true);

  /**
    * Share app
    */
   const share = ( ) => {
      const url = "https://apps.apple.com/us/app/tallah/id1615396170";
      const title = 'Tallah App';
      const message = 'Download Tallah';
      const icon = '../../assets/icons/white-logo.png';

      const options = Platform.select({
        ios: {
          activityItemSources: [
            { // For using custom icon instead of default text icon at share preview when sharing with message.
              placeholderItem: {
                type: 'url',
                content: url
              },
              item: {
                default: {
                  type: 'text',
                  content: `${message}`
                },
              },
              linkMetadata: {
                title: message,
                icon: icon
              }
            },
          ],
        },
        default: {
          title,
          subject: title,
          message: `${message}`,
          image: icon
        },
      });

      Share.open(options);
   };


   /**
     * First Time 
     * @param {*} props 
     */
   const FirstTime = () => {
      return  <View style={[GeneralStyle.container]}>
          <View style={[style.container]}>
              <RectButton onPress={share} style={style.shareButton} >
                <FastImage 
                  source={require('../../assets/icons/share-colored.png')}
                  resizeMode={'contain'}
                  style={{width : 26 , height : 27}}
                />
              </RectButton>
              <FastImage 
                source={require('../../assets/images/stylist-image.png')} 
                resizeMode={'stretch'}
                style={style.image} 
              />
              <Text style={[GeneralStyle.blackBoldText, {marginBottom : 8,fontSize : 17}]}>
              Book your Stylist now.
              </Text>
              <Text style={[GeneralStyle.blackText, {
                  marginVertical: 5, fontSize: 15,
                  lineHeight: 22, fontWeight: '400',
                  fontFamily: 'Roboto', 
                }]}
              >
                Get your tailored online advice from one of our
                experienced image consultants and enjoy confident
                possibilities that looks perfect on your body and define
                your character.
              </Text>
          </View>
          <Button   
            label ={'Next'}
            labelColor = {'#FFF'}
            onPress={()=> setIsFirstTime(false) }
            style={{width : '90%',padding :15,marginBottom : 30}}
          />
      </View>
  }

  return <SafeAreaView style={[GeneralStyle.container]}>
      <View style={GeneralStyle.header}>
        <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
          <RectButton style={{ flex: 1 }}>
            <FastImage  source={require('../../assets/icons/logo.png')}
                        resizeMode={'contain'}
                        style={{width : 35 , height : 35}} />
          </RectButton>
          <Text style={[GeneralStyle.headerText, { flex:1 }]}>
                  Stylists
          </Text>
          <View style={{flexDirection : 'row', flex: 1, justifyContent: 'flex-end'}}>
          {
            user.isLoggedIn && <>
              <BorderlessButton onPress={() => props.navigation.navigate('notifications')}>
                <FastImage source={require('../../assets/icons/notification.png')}  
                          resizeMode={'contain'}
                          style={{width : 25,height : 25}} />
                </BorderlessButton>
                <BorderlessButton onPress={() => props.navigation.navigate('profile')}>
                  <FastImage 
                    source={
                      user.account?.profile?.avatar 
                        ? {uri : user.account?.profile?.avatar} 
                        : require('../../assets/images/girl.png')
                    }
                    resizeMode={'cover'}
                    style={{width: 30, height:  30 , marginStart: 14, borderRadius: 15}} 
                  />
              </BorderlessButton>
            </>
          }
          </View>
        </View>
      </View>
      {
        isFirstTime ? 
        <FirstTime />
        :
        <StylistsList />
      }
    </SafeAreaView>
};

export default StylistTab;
