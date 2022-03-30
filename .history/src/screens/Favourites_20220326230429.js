import React, { useEffect , useState } from 'react';
import { Text, View, ImageBackground , FlatList , Pressable, I18nManager, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView,  } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';

//Styles
import style from '../assets/styles/FavouritesStyle';
import GeneralStyle from '../assets/styles/GeneralStyle';
import ModalStyle from '../assets/styles/ModalStyle';

//Componente
import ClosetItem from '../components/ClosetItem';
import TallaButton from '../components/Button';
import Dropdown from '../components/Dropdown';
import Checkbox from '../components/Checkbox';
import Color from '../components/Color';

import I18n from '../lang/I18n';

//Apis
import api from '../config/api';
import endpoints from '../config/endpoints';
import NotFound from '../components/NotFound';
import OutfitItem from '../components/OutfitItem';

const Favourites = props  => {
  const user = useSelector(state => state.user);
  const [showFilterModal , setShowFilterModal ] = useState(false);
  const [data , setData] = useState([]);


  /**
    * Render Category list item
    * @param {} param0 
    */
  const renderItem = ({item , index}) => {
    console.log({item})
    if (item.type == 'item') {
      return <ClosetItem key={index} item={item.item} isFavourite={true} />
    } else {
      return <OutfitItem key={index} item={item.outfit} isFavourite={true}/>
    }
  };

   /**
   * Get favourites
   */
   const getFavorites = () => {
      api.get(endpoints.favourites + '?user_id=' + user.account.id)
         .then(res => setData(res.data.data))
         .catch((err) => console.log(err.response));
   };

  useEffect(() => getFavorites(), []);


  /**
    * Filter Modal
    */
  const FilterModal = () => {
      const [season , setSeason ] = useState(0);
      const [clothes , setClothes ] = useState(0);
      const [category , setCategory ] = useState(0);
      const [color , setColor] = useState(0);
      const [brand , setBrand ] = useState(0);
      const [selectedColor , setSelectedColor ] = useState();
      const [colors , setColors ] =useState([]);
      const [brands , setBrands ] =useState([]);
      const [categories , setCategories ] = useState([]);

      /**
       * Get gifts
       */
      const getCategories = () => {
          api  
              .get(endpoints.categories)
              .then(res => setCategories(res.data.data));
      }

      /**
       * Get Colors
       */
      const getColors = () => {
          api  
              .get(endpoints.colors)
              .then(res => setColors(res.data.data));
      }

      /**
       * Get Brands
       */
      const getBrands = () => {
          api.get(endpoints.brands)
              .then(res => setBrands(res.data.data));
      };

      useEffect(() =>{
          getCategories();
          getColors();
          getBrands();
      }, [season]);

      return <Modal  
                    isVisible={showFilterModal}
                    style={{margin: 0,justifyContent:'flex-end'}}
                    backdropOpacity={.7}>
        <View style={ModalStyle.actionModalContainer}>
          <View style={ModalStyle.actionModalHeader}>
              <View></View>
              <Text style={ModalStyle.headerText}>
                Filter
              </Text>
              <Pressable android_ripple={{color:  ('#D4AF37')}} 
                        onPress={()=>{setShowFilterModal(false)}}>
                <FastImage source={require('../assets/icons/close-colored.png')}
                            style={{width: 22, height: 22}} />
              </Pressable>
          </View>
          <ScrollView style={{flexDirection:"column"}}>
              <View>
                <Text style={ModalStyle.sectionHeaderText}>
                    Season
                </Text>
                <View style={{flexDirection:'row',justifyContent:'flex-start',marginVertical : 8}}>
                    <View style={{flex:1}}>
                      <Checkbox onChange={()=>{setSeason(0)}}
                                isRounded
                                isModal
                                isChecked={season == 0 }
                                label={'Summer'}/>
                    </View>
                    <View style={{flex:1}}>
                      <Checkbox onChange={()=>{setSeason(1)}}
                                isRounded
                                isModal
                                isChecked={season == 1}
                                label={'Winter'}/>
                    </View>
                </View>
              </View>
              <View>
                  <Text style={ModalStyle.sectionHeaderText}>
                      Clothes
                  </Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between',padding :15}}>
                      <TallaButton    label={'Outfit'}
                                      isModal
                                      onPress={()=>setClothes(0)}
                                      bgColor={clothes == 0 ? '#D4AF37' : '#FFF'}
                                      labelColor ={clothes == 0 ?  '#FFF' : '#D4AF37'}
                                      style={{flex:1, 
                                              borderColor : '#D4AF37',borderWidth : 1}}/>
                      <TallaButton   label={'item'}
                                      isModal
                                      onPress={()=>setClothes(1)}
                                      bgColor={clothes == 1 ? '#D4AF37' : '#FFF'}
                                      labelColor ={clothes == 1 ?  '#FFF' : '#D4AF37'}
                                      style={{flex:1, borderColor : '#D4AF37',borderWidth : 1,marginStart : 15}}/>
                  </View>
              </View>
              <Dropdown items={categories}
                        isModal
                        onChangeValue={(index)=>{setCategory(index)}}
                        name={I18n.t('category')} />
              <Color colors={colors}
                      onChange={colorId => setColor(colorId)}/>
              <Dropdown items={brands}
                        isModal
                        onChangeValue={(index)=>{setBrand(index)}}
                        name={I18n.t('brand')} />
              <View style={{flexDirection:'row',marginBottom : 10}}>
                  <TallaButton onPress={()=>{ setShowFilterModal(false)}}
                              label={'Done'}
                              isModal
                              labelColor={'#FFF'}
                              style={[ModalStyle.SecondaryButton,{flex:1}]} />
              </View>
          </ScrollView>
        </View>
    </Modal>
  }
    
  return  <SafeAreaView style={[GeneralStyle.container]}>
    <View style={GeneralStyle.header}>
        <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
          <RectButton onPress={()=>{props.navigation.goBack()}}>
              <FastImage 
                source={require('../assets/icons/back-arrow.png')} 
                style = {
                  {
                    width: 23,
                    height: 23,
                    transform: [{
                      rotate: I18nManager.isRTL ? '180deg' : '0deg'
                    }]
                  }
                }
                resizeMode="contain"
              />
          </RectButton>
          <Text style={style.headerText}>
              Favourites
          </Text>
          <View style={{flexDirection : 'row'}}>
              <BorderlessButton onPress={() => {setShowFilterModal(true)}}>
                  <FastImage source={require('../assets/icons/filter.png')}
                          style={{width : 25,height : 25}} />
              </BorderlessButton>
          </View>
        </View>
    </View>
    {
      data.length === 0 ?
      <NotFound
        text={'No items found in favorites'}
        isFavourites
      />
      :
      <FlatList 
          contentContainerStyle={[style.favoruitesListContainer]}
          showsVerticalScrollIndicator={false}
          horizontal = {false}
          keyExtractor={(item,index) => index.toString()}
          numColumns={3}
          data={data}
          renderItem={renderItem}
      />
    }
    {  
      showFilterModal &&
      <FilterModal /> 
    }
  </SafeAreaView>
}
 
export default Favourites;
