import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, SafeAreaView, Pressable, ImageBackground, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

//Styles
import style from './style';
import GeneralStyle from '../../../../assets/styles/GeneralStyle';

// Components
import TallaButton from '../../../../components/Button';
import ClosetItem from '../../../../components/ClosetItem';
import NotFound from '../../../../components/NotFound';

//Apis
import api from '../../../../config/api';
import endpoints from '../../../../config/endpoints';
import AddToFavourites from '../../../../components/AddToFavourites';

const {width} = Dimensions.get('screen');


const OutfitItemSelector = ({ route, navigation })  => {
   const user = useSelector(state => state.user);
   const [categories , setCategories ] = useState([]);
   const [activeCategoryIndex , setActiveCategoryIndex ] = useState(null);
   const [activeTab , setActiveTab ] = useState(1);
   const [ isLoading, setIsLoading ] = useState(true);
   const [closetItems , setClosetItems ] = useState([]);
   const [selectedItem, setSelectedItem] = useState(null);
   const type = route.params.type;
   
  /**
   * 
   * @param 
   * @returns blogs
   */
  const getUserClosetOutfit = (season = 1, categoryId = null, colorId = null, brandId = null) => {
    const url = type === 'item' ? endpoints.closet : endpoints.outfit;
    api.get(`${url}?user_id=${user.account?.id}&category_id=${categoryId}&season=${season}&color=${colorId}&brand=${brandId}`)
          .then(res => {
            setClosetItems(res.data.data);
            setIsLoading(false);
          })
          .catch(err => setIsLoading(false));
  };

  /**
  * Get categories
  */
  const getCategories = () => {
      api.get(endpoints.categories)
          .then(res => setCategories(res.data.data));
  };

  /**
   * Render Category list item
   * @param {} param0 
   */
  const renderCategoryBox = ({item , index}) => {
      return <View key={index} style={GeneralStyle.categoryContainer} >
        <Pressable style={[GeneralStyle.categoryBox, {
                backgroundColor: activeCategoryIndex == index ? '#D4AF37' : '#FFF',
                borderColor : activeCategoryIndex == index ? '#D4AF37' : '#000' }]}
          android_ripple={{color:  ('#D4AF37')}}
          onPress={() => {
            setActiveCategoryIndex(index);
            getUserClosetOutfit(null, item.id);
          }}
        >
          <FastImage 
            source={{uri: activeCategoryIndex == index ? item.icon_colored : item.icon }}
            resizeMode={'contain'}
            style={{ width:30, height:30 }}
          />
        </Pressable>
        {
          index == activeCategoryIndex &&  
          <Text style={[GeneralStyle.categoryName]}>
            {item.name}
          </Text>
        }
      </View>
  };
  
  /**
   * Render Category list item
   * @param {} param0 
   */
  const renderClosetItem = ({item , index}) => {
      return  (<View style={{ position: 'relative' }}>
      { item.id === selectedItem && 
        <View style={style.selectedItemIndicator}></View>
      }
      <RectButton style={{
              width : width / 3.7, height : 100, marginStart : 8, 
              marginBottom : 15, overflow: 'hidden', borderRadius: 6}}
        onPress={()=> setSelectedItem(item.id) }
      >
        {
          type === 'item'
          ?  <ImageBackground 
              source={ 
                item.image 
                  ? {uri: item.image}
                  : require('../../../../assets/icons/closet-item-default.png')
              }
              style={{width : '100%' , height : '100%' }}
              resizeMode={'stretch'}
            /> 
          :
          
          item.items?.map((closetItem, key) => (
            <FastImage 
              key={key}
              source={ closetItem.closet_item.image 
                ? {uri: closetItem.closet_item.image } 
                : require('../../../../assets/icons/closet-item-default.png')}
              style = {{
                  flex: 1,
                  height: '100%',
                  width: '50%',
              }}
              resizeMode={'stretch'}
            />))
        }
      </RectButton>
      <View style={{position: 'absolute', top:10, right : 8}} >
        <AddToFavourites
          itemId={item.id}
          type={'item'}
        />
      </View>
    </View>);
  };


  const addToCalendarAction = () => {
    navigation.navigate('addCalendar', { selectedItem });
  };

  useEffect(() => {
    if (route.params && route.params.type === 'item') {
      getCategories();
    }
    getUserClosetOutfit();
  }, []);

  return  <View style={[style.container]}>
      <SafeAreaView style={[ style.header ]}>
        <RectButton onPress={()=>{navigation.goBack()}} style={{ padding: 5, borderRadius: 3 }}>
          <FastImage 
            source={require('../../../../assets/icons/back-arrow.png')} 
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
        </RectButton>
        <Text style={[ style.headerText ]}>
          Add to calendar
        </Text>
      </SafeAreaView>
      <View style={{ flex: 1, padding: 20, paddingTop: 30 }}>
        <View style={style.tabsContainer}>
          <RectButton 
            onPress={() => {
              setActiveTab(1);
              getUserClosetOutfit(1);
            }}
            style = {
              [GeneralStyle.tabButton, {
                backgroundColor: activeTab == 1 ? '#D4AF37' : '#FFF'
              }]
            }
          >
            <Text style={[GeneralStyle.tabButtonText, { color: activeTab == 1 ? '#FFF': '#D4AF37'}]}>
              Summer
            </Text>
          </RectButton>
          <RectButton 
            onPress={() => { 
              setActiveTab(2);
              getUserClosetOutfit(2);
            }}
            style = {
              [GeneralStyle.tabButton, {
                backgroundColor: activeTab == 2 ? '#D4AF37' : '#FFF'
              }]
            }
          >
            <Text style = {
              [GeneralStyle.tabButtonText, {
                color: activeTab == 2 ? '#FFF' : '#D4AF37'
              }]
            } >
              Winter
            </Text>
          </RectButton>
        </View>
        { type === 'item' &&
          <View style={[style.categoriesRow]}> 
            <FlatList 
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCategoryBox}
            />
          </View>
        }
        <View style={style.itemsListContainer}> 
          <FlatList
            style={{ height: '100%', width: '100%'}}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <NotFound text="OOH! You’re Missing A lot Start add items Now"/>
            )}
            alwaysBounceHorizontal={false}
            horizontal={false}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            data={closetItems}
            renderItem={renderClosetItem}
          />
        </View>
        <SafeAreaView style={{ flexDirection:'row', alignSelf: 'center', position: 'absolute', bottom: 0 }}>
          <TallaButton   
            onPress={() => navigation.goBack()}
            label ={'cancel'}
            labelColor={'#707070'}
            style={[ style.SecondaryButton, {
              backgroundColor: '#FFF',
              marginEnd: 10,
              flex: 1,
              borderColor: '#707070',
              borderWidth: 1
            } ]}
          />
          <TallaButton
            onPress={addToCalendarAction}
            label={'Add'}
            labelColor={'#FFF'}
            enabled={selectedItem}
            style={[style.SecondaryButton, { flex: 1 }]}
          />
        </SafeAreaView>
    </View>
  </View>
}
 
export default OutfitItemSelector;
