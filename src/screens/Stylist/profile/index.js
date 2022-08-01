import React, {useState , useEffect}from 'react';
import { Text, View, ImageBackground , FlatList, SafeAreaView} from 'react-native';
import { useSelector } from 'react-redux';
import { SheetManager } from "react-native-actions-sheet";
import FastImage from 'react-native-fast-image';

import { RectButton, ScrollView, BorderlessButton } from 'react-native-gesture-handler';
import { AirbnbRating } from 'react-native-ratings';

import GeneralStyle from '../../../assets/styles/GeneralStyle';
import style from './style';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';

//
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';

// sheets
import StylistInfo from './info';

const StylistProfile = ({...props}) => {
  const user = useSelector(state => state.user);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

   /**
   * Get current stylist data
   */
   const getStylistData = () => {
    //  alert(JSON.stringify(props.route))
      if (!props.route?.params?.stylistId) return;
      api.get(`${endpoints.stylist}/${props.route.params.stylistId}`)
         .then(res => {
           setData(res.data.data);
           setIsLoading(false);
          });
   }

  /**
   * Render Protfolio item
   */
   const renderProtfolio = ({item}) => {
      return <RectButton onPress={() => props.navigation.navigate('projectDetails',{projectId: item.id})}>
         <FastImage
            source={{uri: item.image?.image}}
            style={[style.protfolioItem]}
         />
      </RectButton>
   };

   /**
    * Protfolio tabs 
    */
   const SpecializationTabs = () => {
      const [activeTab , setActiveTab ] = useState(0);
      const [activeSpecialzation, setActiveSpecialzation ] = useState(data.specializations ? data?.specializations[activeTab] : {})

      const changeTab = (item) => {
         setActiveTab(item.id);
         setActiveSpecialzation(item);
      }

      return <View>
          <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data?.specializations}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({item,index}) => {
              return <BorderlessButton onPress={() => changeTab(item)}>
                  <View style={[style.tabButton, activeTab == index ? style.activeTab : null]}>
                    <Text style={[GeneralStyle.blackText , {color : activeTab == index ?  '#D4AF37' : '#000'}]}>
                      {item.specialization.title}
                    </Text>
                  </View>
              </BorderlessButton>
            }}
          />
          <View style={[style.tabContent]}>
            <View style={[GeneralStyle.row , {marginVertical : 10}]}>
              <Text style={{color : '#7B7B7B' , fontSize : 14 }}>
                Specialization:
              </Text>
              <Text style={{flex:2 , color : '#000' , fontSize : 13,marginHorizontal : 10}}> 
                  {activeSpecialzation?.specialization?.title}
              </Text>
            </View>
            <View style={[GeneralStyle.row , {marginVertical : 10}]}>
              <Text style={{color : '#7B7B7B' , fontSize : 14 }}>
                Description:
              </Text>
              <Text style={{flex:2 , color : '#000' , fontSize : 13,marginHorizontal : 10}}> 
                {activeSpecialzation?.description}
              </Text>
            </View>
            <View style={[GeneralStyle.row , {marginVertical : 10}]}>
              <Text style={{color : '#7B7B7B' , fontSize : 14 }}>
                  Starting price:
              </Text>
              <Text style={{flex:2 , color : '#000' , fontSize : 13,marginHorizontal : 10}}> 
                {activeSpecialzation?.start_price} EGP
              </Text>
              </View>
            <Button 
              label={'Ask for packages'}
              labelColor={'#FFF'}
              style={{width : '100%',padding : 13 , marginVertical : 0 ,marginTop : 10}}
              onPress={() => props.navigation.navigate(!user.isLoggedIn ? 'login' : 'chat', { stylist: { ...data, name: data.user.name }}) }
            />
          </View>
      </View>
   }


   useEffect(() => {
     getStylistData();
   }, [])

   return <View style={[GeneralStyle.container, {flex:1,backgroundColor: "#FFF"}]}>
      <SafeAreaView style={[ GeneralStyle.header]}
      >
        <View style={[GeneralStyle.rowSpaceBetween,{ width: '90%' }]}>
          <RectButton 
            style={{flex: 1, padding: 5, borderRadius: 5}} 
            onPress={() => props.navigation.goBack() }
          >
            <FastImage 
              source={require('../../../assets/icons/back-arrow.png')} 
              style={{width : 25 , height : 25}}  
              resizeMode="contain"
            />
          </RectButton>
          <Text style={[style.headerText, { flex: 1 }]}>
              Stylist
          </Text>
          <View style={{flex: 1 }} />
        </View>
      </SafeAreaView>
      {
        isLoading 
        ? <Spinner />
        : <View style={{flex:1}}>
          <ImageBackground 
            source={data?.avatar ? {uri: data.avatar} : require('../../../assets/images/closet-item-default.png')}
            resizeMode={'stretch'}
            style={style.bgImage}
          >
            <Text style={[GeneralStyle.secondaryBoldText, 
                          { fontSize : 19, backgroundColor: '#ddd', padding: 10, borderRadius: 12}]}>
                {data?.user?.name}
            </Text>                           
            <View style={[GeneralStyle.rowSpaceBetween,{width :'90%' , padding : 10}]}>
              <View style={{alignItems:'center', backgroundColor: '#CCC', padding: 10, borderRadius: 12}}>
                <Text style={[GeneralStyle.blackText,{marginBottom:3}]}>
                    Followers
                </Text>
                <Text style={{color:"#000" , fontSize : 14}}>
                  {data?.follwers_count ?? 0}
                </Text>
              </View>
              <View style={{alignItems:'center', backgroundColor: '#CCC', padding: 10, borderRadius: 12}}>
                <Text style={[GeneralStyle.blackText,{marginBottom:3}]}>
                    Rating
                </Text>
                <AirbnbRating
                  count={5}
                  showRating={false}
                  defaultRating={data?.follwers_count ?? 0}
                  size={12}
                  isDisabled
                  selectedColor={'#D4AF37'}
                />
              </View>
            </View>
          </ImageBackground>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} >
            <View style={[style.bioContainer]}>
              <Text style={[GeneralStyle.secondaryText , {fontWeight : '500'}]}>
                Short Bio
              </Text>
              <Text style={[style.bioText]}>
                {data?.bio}
              </Text>
            </View>
            <View>
              <View style={[GeneralStyle.rowSpaceBetween,{margin: 15}]}>
                <Text style={[GeneralStyle.secondaryText,{fontWeight : '500'}]}>
                    Stylist Protfolio
                </Text>
                <BorderlessButton>
                    <FastImage source={require('../../../assets/icons/right-colored-arrow.png')}
                                resizeMode={'contain'}
                                style={{width : 20 , height : 20}} />
                </BorderlessButton>
              </View>
              {
                data?.projects && data?.projects.length
                  ? <FlatList 
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={data?.projects}
                      style={{ paddingVertical : 5}}
                      keyExtractor={(item,index) => index.toString()}
                      renderItem={renderProtfolio}
                    />
                  : <Text style={{ fontSize: 15, textAlign: 'center', marginVertical: 10}}>
                      No projects added!
                    </Text>
              }
            </View>
            {
              data?.specializations?.length !== 0 &&
              <View style={[style.grayContainer]}>
                <SpecializationTabs />
              </View>
            }
            <BorderlessButton
              // onPress={() => SheetManager.show("stylist-info-sheet")}
              style={[style.grayContainer, GeneralStyle.rowSpaceBetween]}
            >
              <Text style={[GeneralStyle.secondaryText,{fontWeight : '500'}]}>
                 Stylist Info
              </Text>
              <BorderlessButton>
                <FastImage source={require('../../../assets/icons/right-colored-arrow.png')}
                            resizeMode={'contain'}
                            style={{width : 20 , height : 20}} />
              </BorderlessButton>
            </BorderlessButton>
            <View style={[style.grayContainer  , GeneralStyle.rowSpaceBetween]}>
              <Text style={[GeneralStyle.secondaryText,{fontWeight : '500'}]}>
                    Certificates
              </Text>
              <BorderlessButton>
                <FastImage source={require('../../../assets/icons/right-colored-arrow.png')}
                            resizeMode={'contain'}
                            style={{width : 20 , height : 20}} />
              </BorderlessButton>
            </View>   
            <BorderlessButton 
              style={[style.grayContainer  , GeneralStyle.rowSpaceBetween]}
              onPress={() => props.navigation.navigate('projects', {stylistId: data?.id})}
            >
              <Text style={[GeneralStyle.secondaryText,{fontWeight : '500'}]}>
                  Portfolio 
              </Text>
              <FastImage  source={require('../../../assets/icons/right-colored-arrow.png')}
                          resizeMode={'contain'}
                          style={{width : 20 , height : 20}} />
            </BorderlessButton>  
          </ScrollView>
        <StylistInfo
          data={data}
        />
      </View>
    }
  </View>
}

export default StylistProfile;