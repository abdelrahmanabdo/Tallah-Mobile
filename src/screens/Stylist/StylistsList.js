import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, StatusBar, FlatList , ScrollView, Dimensions, I18nManager } from 'react-native';
import { RectButton, BorderlessButton, BaseButton, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/stylistListStyle';
import FastImage from 'react-native-fast-image';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

// Components 
import Spinner from '../../components/Spinner';

const width = Dimensions.get('window').width ;

const StylistsList = props => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user);
  const stylist = useSelector(state => state.stylist);
  const [stylists , setStylists ] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [featuredStylists, setFeaturedStylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  /**
   * 
   * @param 
   * @returns blogs
   */
  const getStylists = () => {
    api
      .get(endpoints.stylist)
      .then(res => {
        console.log(res.data.data)
        setStylists(res.data.data);
        setSearchResult(res.data.data);
        setIsLoading(false);
      })
      .catch(err => setIsLoading(false));
  };

  /**
   * Render featured stylists list
   */
  const renderFeaturedStylist = ({item}) => {
     return <RectButton onPress={()=> {}}
                        style={{ width: width*.19, marginHorizontal: 5 }}>
         <FastImage source={require('../../assets/icons/default-avatar.png')} 
                  style={{width : 55 , height : 55 , borderRadius : 18}} />
         <Text style={[GeneralStyle.blackText,{marginTop : 5}]} 
               numberOfLines={2}>
            {item.name}
         </Text>
     </RectButton>
  };

  /**
   * Search in stylists list
   * 
   * @param {String} query param0 
   * @returns 
   */
  const searchStylists = (query) => {
    let result = [];
    if (query.length > 0)
      result = stylists.filter((stylist) => (
        stylist.user.name.toUpperCase().includes(query.toUpperCase())
      ));
    else result = stylists;
    return setSearchResult(result);
  };

  /**
   * Render featured stylists list
   */
  const renderStylist = ({item}) => {
     return <RectButton onPress={()=> {navigation.navigate('stylistDetails', {stylistId: item.id})}}
                        style={[style.stylistBox]}>
         <View style={{flex: .75}}>
          <FastImage 
            source={item.avatar ? {uri: item.avatar} : require('../../assets/icons/default-avatar.png')} 
            style={{ height: 75, width: 75, marginEnd: 5, borderRadius: 35}} 
            resizeMode={'cover'} 
          />
         </View>
         <View style={{ flex: 2 }}>
            <View style={[GeneralStyle.rowSpaceBetween,{marginBottom : 8}]}>
               <View style={[GeneralStyle.row , {alignItems:'center'}]}>
                  <View>
                     <Text style={[GeneralStyle.blackText, { fontSize: 14.5}]} numberOfLines={1}>
                        {item.user.name}
                     </Text>
                     {/* <Text style={[GeneralStyle.blackText,{marginTop : 5 , color : '#BBB'}]} >
                     {item.sessions} Session
                     </Text> */}
                  </View>
               </View>
               <View>
                  {/* <Text style={[GeneralStyle.blackText,{marginTop : 5 ,alignItems:'center' , color : '#D4AF37'}]}>
                    <FastImage source={require('../../assets/icons/rating-star.png')} 
                               resizeMode={'contain'}
                               style={{width : 15 , height : 15 , marginEnd : 5}}/> 
                     {item.rating}
                  </Text> */}
                  <Text style={[GeneralStyle.blackText,{fontSize : 14, fontWeight: '600'}]} 
                     numberOfLines={1}>
                    {I18nManager.isRTL ? item.country?.name : item.country?.name_en} 
                  </Text>
               </View>
            </View>
            <Text style={[GeneralStyle.blackText, { fontSize: 13 }]}>
              {item.bio.substring(0, 100)}
            </Text>
         </View>
     </RectButton>
  };

  useEffect(() => {
    getStylists();
  }, []);

  return  <View style={[GeneralStyle.container]}>
      <View style={[GeneralStyle.rowSpaceBetween,{padding:15}]}>
         <View>
          {
            (!stylist.profile) && 
            <BorderlessButton 
              style={[GeneralStyle.SecondaryButton]}
              onPress={() => navigation.navigate(user.isLoggedIn ? 'stylistRequestIntro' : 'login')}
            >
              <Text style={[GeneralStyle.SecondaryButtonText]}>
                Be a Stylist
              </Text>
          </BorderlessButton>
          }
        </View>
        <View style={[GeneralStyle.row]}>
          {
            !showSearch &&
            <BaseButton onPress={() => setShowSearch(!showSearch)} style={{marginEnd : 0}}>
              <FastImage source={require('../../assets/icons/search.png')} style={{width : 20 , height : 20}}/>
            </BaseButton>
          }
          {
            showSearch &&
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <BorderlessButton onPress={() => setShowSearch(false)}>
                <FastImage 
                  source = {
                    require('../../assets/icons/close.png')
                  }
                  resizeMode={'contain'}
                  style={{width: 25, height: 25}}
                />
              </BorderlessButton>
              <TextInput 
                style={style.searchInputContainer}
                placeholder={'Enter stylist name'}
                placeholderTextColor="#CCC"
                onChangeText={(val) => searchStylists(val)}
              />
            </View>
          }
  
        </View>
      </View>
      {
        isLoading
        ? <Spinner />
        : <FlatList 
            showsVerticalScrollIndicator={false}
            data={showSearch ? searchResult : stylists}
            style={{padding : 10}}
            keyExtractor={(item,index) => index.toString()}
            renderItem={renderStylist}
         />
      }
      {/* <View style={[style.grayContainer]}>
         <Text style={[GeneralStyle.primaryText , {textAlign :'center',fontSize:18,fontWeight : '500'}]}>
            Highest rating
         </Text>
         <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={featuredStylists}
            style={{backgroundColor: '#F8F8F8', paddingVertical : 10}}
            keyExtractor={(item,index) => index.toString()}
            renderItem={renderFeaturedStylist}
         />
      </View> */}
  </View>


}
export default StylistsList;
