import React  , {useState, useEffect}from 'react';
import { Text, View, Image,ImageBackground, I18nManager, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton, BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { logoutUser, changeActiveUserType } from '../../redux/actions/user';
import { resetStylistData } from '../../redux/actions/stylist';
import { useDispatch } from 'react-redux';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/MoreStyle';

import { unassignUserToken } from '../../helpers/Auth';

const MoreTab = props => {
  const user = useSelector(state => state.user);
  const stylist = useSelector(state => state.stylist);
  const dispatch = useDispatch();
  
  //Logged User Info component
  const UserInfo = () => {
    // Avatar
    const Avatar = () => (
      <FastImage 
        source={
          user?.activeUserType === 'user'
            ? (user.account?.profile?.avatar
                  ? {uri : user.account?.profile?.avatar} 
                  : require('../../assets/images/girl.png'))
            : (require('../../assets/images/girl.png'))
        }
        style={style.avatar}
        resizeMode={'cover'}
      />
    );

    return <View style={style.topSection}>
      <Avatar />
      <Text style={[style.infoText,{fontSize : 19,marginTop:10}]}>
            {user.account?.name}
      </Text>
      <Text style={style.infoText}>
          {user.account?.email}
      </Text>
      { user.profile?.country && <Text style={style.infoText}>
          {user.account.profile?.country?.name_en}
      </Text>}
      <Text style={style.infoText}>
        {user.account.profile?.phone}
      </Text>
    </View>
  };

  //List Of More list items
  const ListItems = () => {
    const navigation = useNavigation();

    const ListItem = ({icon , label ,onPress}) => {
      return <RectButton 
            rippleColor={'#CCC'}
            style={style.itemContainer}
            onPress={onPress}
          >
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FastImage  
            source={icon}
            style={{width: 22, height: 22, marginEnd: 15}}
            resizeMode={'contain'} 
          />
          <Text style={style.itemText}>
              {label}
          </Text>
        </View>
        <FastImage 
          source={require('../../assets/icons/more-list-arrow.png')}
          style={{
            width : 25, 
            height : 25, 
            transform: [ {rotate: I18nManager.isRTL ? '180deg' : '0deg'} ] 
          }}
          resizeMode={'contain'} 
        />
      </RectButton>
    };

    const logout = async () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      unassignUserToken(user?.account?.id);
      let keys = await AsyncStorage.getAllKeys();
      keys = keys.filter((key) => !['deviceToken', 'isFirstTime'].includes(key));
      await AsyncStorage.multiRemove(keys);
      dispatch(logoutUser());
      dispatch(resetStylistData());
    };

    return <View style={style.listSection}>
      <ScrollView>
        {
          user.isLoggedIn && 
          <ListItem   
            icon={require('../../assets/icons/profile.png')} 
            label={'Profile'} 
            onPress = {
              () => {
                navigation.navigate(user.account.profile ? 'profile' : 'createProfile', 
                { stylistId: stylist.profile 
                    ? stylist.profile.id 
                    : null })
              }
            }
          />
        }
        {/* <ListItem   icon={require('../../assets/icons/closet-value.png')} 
                    label={'Closet value'} 
                    onPress={()=>{navigation.navigate('')}}/> */}
        {
          (user.isLoggedIn && user.activeUserType !== 'stylist') &&
            <ListItem   
                icon={require('../../assets/icons/outfits.png')}
                label={'Outfits'} 
                onPress={()=>{navigation.navigate('outfits')}}/>
        }

        {
          user.isLoggedIn && 
          <ListItem   icon={require('../../assets/icons/more-calendar.png')} 
                      label={'Calendar'} 
                      onPress={()=>{navigation.navigate('calendar')}} />
        }

        {
          (user.isLoggedIn && user.activeUserType !== 'stylist') &&
            <ListItem   icon={require('../../assets/icons/favourites.png')} 
                        label={'Favourites'} 
                        onPress={()=>{navigation.navigate('favourites')}} />
        }
        {
          user.isLoggedIn &&
            <ListItem   icon={require('../../assets/icons/messages.png')}
                        label={'Messages'} 
                        onPress={()=>{navigation.navigate('messages')}} />
        }
        {
          (user.isLoggedIn && user.activeUserType === 'stylist') &&
            <ListItem   icon={require('../../assets/icons/stlyist-dashboard-icon.png')}
                        label={'Manage my data'} 
                        onPress={()=>{navigation.navigate('stylistRequestSteps')}} />
        }

        <ListItem   icon={require('../../assets/icons/about-app.png')} 
                    label={'About the app'} 
                    onPress={()=>{navigation.navigate('about')}} />
        {
          user.isLoggedIn &&
          <ListItem   icon={require('../../assets/icons/settings.png')} 
            label={'Settings'} 
            onPress={()=>{navigation.navigate('settings')}}/>
        }
        <ListItem   icon={require('../../assets/icons/help-support.png')} 
                    label={'Help & Support'} 
                    onPress={()=>{navigation.navigate('support')}}/>
        <ListItem   icon={require('../../assets/icons/T-&-C.png')} 
                    label={'T&C'} 
                    onPress={()=>{navigation.navigate('TAndC')}}/>
        {
          !user.isLoggedIn && 
          <ListItem   icon={require('../../assets/icons/profile.png')} 
                      label={'Login'} 
                      onPress={()=>{navigation.navigate('login')}} />                   
        }
        {
          user.isLoggedIn &&
          <ListItem   
            icon={require('../../assets/icons/profile.png')} 
            label={'Logout'}
            onPress={logout}
          />
        }
        {
          (!stylist.profile && user.isLoggedIn) &&
            <BorderlessButton 
                rippleColor={'#CCC'}
                style={style.beStylistButton}
                onPress={() => props.navigation.navigate('stylistRequestIntro')}
            >
                <Text style={style.beStylistButtonText}>
                    Be a Stylist
                </Text>
            </BorderlessButton>
        }
        {
          (stylist.profile && user.isLoggedIn) &&
            <BorderlessButton 
                rippleColor={'#CCC'}
                style={style.beStylistButton}
                onPress = {
                  () => dispatch(changeActiveUserType(user.activeUserType === 'user' ? 'stylist' : 'user'))
                }
            >
              <Text style={style.beStylistButtonText}>
                Switch To {user.activeUserType === 'user' ? 'Stylist' : 'User'} account
              </Text>
            </BorderlessButton>
        }
      </ScrollView>
    </View>
  }

  const Line = () => (<View style={style.line} />);

  useEffect(() => {
    console.log({ stylist})
  }, []);

  return  <SafeAreaView style={[GeneralStyle.container]}>
    <View style={GeneralStyle.header}>
      <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
        <RectButton style={{ flex: 1 }}>
          <FastImage 
          source={require('../../assets/icons/logo.png')}
                      resizeMode={'contain'}
                      style={{width : 35 , height : 35}} />
        </RectButton>
        <Text style={[GeneralStyle.headerText, { flex: 1 }]}>
          More
        </Text>
        <View style={{flexDirection : 'row', flex: 1, justifyContent: 'flex-end'}}>
          {
            user.isLoggedIn && 
            <BorderlessButton onPress={() => {props.navigation.navigate('notifications')}}>
                <FastImage source={require('../../assets/icons/notification.png')}
                        resizeMode={'contain'}
                        style={{width : 25,height : 25}} />
            </BorderlessButton>
          }
        </View>
      </View>
    </View>
    <View style={style.moreContainer}>
      {
        user.isLoggedIn && 
        <>
          <UserInfo />
          <Line />
        </>
      }
      <ListItems />
    </View>
  </SafeAreaView>
};

export default MoreTab;
