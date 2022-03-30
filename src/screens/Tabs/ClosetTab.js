import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Pressable } from 'react-native';
import { RectButton, BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';


//Styles
import style from '../../assets/styles/ClosetTabStyle';
import GeneralStyle from '../../assets/styles/GeneralStyle';
import ModalStyle from '../../assets/styles/ModalStyle';

//components
import ClosetItem from '../../components/ClosetItem';
import TallaButton from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Checkbox from '../../components/Checkbox';
import Color from '../../components/Color';
import NotFound from '../../components/NotFound';
import Spinner from '../../components/Spinner';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

import I18n from '../../lang/I18n';
import { SafeAreaView } from 'react-native-safe-area-context';

const ClosetTab = ({ ...props }) => {
  const user = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab , setActiveTab ] = useState(1);
  const [activeCategoryIndex , setActiveCategoryIndex ] = useState(null);
  const [showFilterModal , setShowFilterModal ] = useState(false);
  const [categories , setCategories ] = useState([]);
  const [closetItems , setClosetItems ] = useState([]);
  const [showMoreModal , setShowMoreModal ] = useState(false);

    /**
    * Get categories
    */
    const getCategories = () => {
        api.get(endpoints.categories)
           .then(res => {
             console.log(res.data.data);
             setCategories(res.data.data);
            });
    };

    /**
     * Get user closet
     * @param 
     * @returns blogs
     */
    const getUserCloset = (season = 1, categoryId = null, colorId = null, brandId = null) => {
      setIsLoading(true);
      api.get(`${endpoints.closet}?user_id=${user.account?.id}&category_id=${
        categoryId}&season=${season}&color=${colorId}&brand=${brandId}`)
           .then(res => setClosetItems(res.data.data), setIsLoading(false))
           .catch(err => setIsLoading(false));
    };

    /**
    * More Modal
    */
   const MoreModal = () => {
      return <Modal  
            isVisible={showMoreModal}
            style={{ margin: 0, justifyContent: 'flex-end' }}
            backdropOpacity={.7}
          >
        <View style={ModalStyle.actionModalContainer}>
          <View style={ModalStyle.actionModalHeader}>
              <View></View>
              <Text style={ModalStyle.headerText}>
                Find More
              </Text>
              <Pressable android_ripple={{color:  ('#D4AF37')}}
                        onPress={()=>{setShowMoreModal(false)}}>
                <FastImage source={require('../../assets/icons/close-colored.png')}
                            style={{width: 22, height: 22}} />
              </Pressable>
          </View>
          <View style={{flexDirection:"column"}}>
              <Pressable  style={ModalStyle.selectRow}
                          android_ripple={{color:  ('#D4AF37')}}
                          onPress={()=>{
                                  setShowMoreModal(false);
                                  props.navigation.navigate('add') }}>
                  <FastImage source={require('../../assets/icons/mix-and-match.png')}
                              resizeMode={'contain'}
                              style={{width:35,height:35,marginEnd : 20}}/>
                  <Text style={ModalStyle.textBold}>
                      Mix & match
                  </Text>
              </Pressable>
              <Pressable style={ModalStyle.selectRow}
                          android_ripple={{color:  ('#D4AF37')}}
                          onPress={()=>{
                              setShowMoreModal(false);
                              props.navigation.navigate('calendar') }}>
                  <FastImage source={require('../../assets/icons/modal-calendar.png')}
                              resizeMode={'contain'}
                              style={{width:35,height:35,marginEnd : 20}}/>
                  <Text style={ModalStyle.textBold}>
                      Calendar
                  </Text>
              </Pressable>
              <Pressable 
                style={ModalStyle.selectRow}
                android_ripple={{color: ('#D4AF37')}}
                onPress={() => {
                          setShowMoreModal(false);
                          props.navigation.navigate('favourites');
                        }}
              >
                <FastImage source={require('../../assets/icons/modal-favourites.png')}
                            resizeMode={'contain'}
                            style={{width:35,height:35,marginEnd : 20}}/>
                <Text style={ModalStyle.textBold}>
                    Favourites
                </Text>
              </Pressable>
            </View>
         </View>
      </Modal>
   };

    /**
    * Filter Modal
    */
   const FilterModal = () => {
        const [season , setSeason ] = useState(1);
        const [colors , setColors ] =useState([]);
        const [brands , setBrands ] =useState([]);
        const [selectedColor , setSelectedColor ] = useState();
        const [selectedCategory, setSelectedCategory] = useState();
        const [selectedBrand, setSelectedBrand] = useState();


        /**
        * Get colors
        */
        const getColors = () => api.get(endpoints.colors).then(res => setColors(res.data.data));

        /**
        * Get brands
        */
        const getBrands = () => api.get(endpoints.brands).then(res => setBrands(res.data.data));

        /**
         * On Submit filter
         */
        const onSubmitModal = () => {
          getUserCloset(season, selectedCategory, selectedColor, selectedBrand);
          setShowFilterModal(false);
        }

        useEffect(()=>{
          getColors();
          getBrands();        
        }, [])

        return <Modal  isVisible={showFilterModal}
                     style={{margin: 0, justifyContent:'flex-end'}}
                     backdropOpacity={.7}>
         <View style={ModalStyle.actionModalContainer}>
            <View style={ModalStyle.actionModalHeader}>
               <View></View>
               <Text style={ModalStyle.headerText}>
                  Filter
               </Text>
               <Pressable android_ripple={{color:  ('#D4AF37')}} 
                         onPress={()=>{setShowFilterModal(false)}}>
                  <FastImage source={require('../../assets/icons/close-colored.png')}
                              style={{width:22,height:22}} />
               </Pressable>
            </View>
            <ScrollView style={{flexDirection:"column"}}>
                <View>
                  <Text style={ModalStyle.sectionHeaderText}>
                     Season
                  </Text>
                  <View style={{flexDirection:'row',justifyContent:'flex-start',marginVertical : 8}}>
                     <View style={{flex:1}}>
                        <Checkbox 
                            onChange={() => setSeason(1)}
                            isRounded
                            isModal
                            isChecked={season == 1 }
                            label={'Summer'}
                    />
                     </View>
                     <View style={{flex:1}}>
                        <Checkbox 
                            onChange={() => setSeason(2)}
                            isRounded
                            isModal
                            isChecked={season == 2}
                            label={'Winter'}
                        />
                     </View>
                  </View>
                </View>
                <Dropdown items={categories}
                          isModal
                          onChangeValue={(value)=> setSelectedCategory(value)}
                          name={I18n.t('category')} />
                <Color colors={colors}
                       onChange={colorId => setSelectedColor(colorId)}/>
                <Dropdown items={brands}
                          isModal
                          onChangeValue={(value)=> setSelectedBrand(value)}
                          name={I18n.t('brand')} />
                <View style={{flexDirection:'row',marginBottom : 10}}>
                  <TallaButton onPress={onSubmitModal}
                                label={'Done'}
                                isModal
                                labelColor={'#FFF'}
                                style={[ModalStyle.SecondaryButton,{flex:1}]} />
               </View>
            </ScrollView>
         </View>
      </Modal>
    };

    /**
     * Get active now category
     * @param {index} param0 
     */
    const getActiveCategory = (index) => {
      setActiveCategoryIndex(index)
    };

    /**
     * Render Category list item
     * @param {} param0 
     */
    const renderCategoryBox = ({item , index}) => {
        return <View key={index} style={GeneralStyle.categoryContainer} >
          <Pressable 
            style={[GeneralStyle.categoryBox, {
                    backgroundColor: activeCategoryIndex == index ? '#D4AF37' : '#FFF',
                    borderColor : activeCategoryIndex == index ? '#D4AF37' : '#000' }
                  ]}
            android_ripple={{color:  ('#D4AF37')}}
            onPress={() => {
              getActiveCategory(index);
              getUserCloset(null,item.id)
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
            <Text style={[GeneralStyle.categoryName, { textAlign: 'center' }]}>
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
      return <ClosetItem key={index} item={item} />
    };

    useEffect(() => {
      getCategories();
      getUserCloset();
    },[]);

    return <SafeAreaView style={[GeneralStyle.container]}>
      <View style={GeneralStyle.header}>
        <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
          <FastImage source={require('../../assets/icons/logo.png')}
                      resizeMode={'contain'}
                      style={{width : 35 , height : 35}} />
          <Text style={style.headerText}>
              Your Closet
          </Text>
          <View style={{flexDirection : 'row'}}>
              <BorderlessButton onPress={() => {setShowFilterModal(true)}}>
                  <FastImage source={require('../../assets/icons/filter.png')}
                              resizeMode={'contain'}
                              style={{width : 22 ,height :  22 ,flex:1}} />
              </BorderlessButton>
              <BorderlessButton onPress={() => {setShowMoreModal(true)}}>
                  <FastImage source={require('../../assets/icons/more-vertical.png')}
                              resizeMode={'contain'}
                              style={{width : 22,height :  22 , marginStart : 14}} />
              </BorderlessButton>
          </View>
        </View>
        <View style={[GeneralStyle.tabButtons]}>
          <RectButton 
            onPress={() => {
              setActiveTab(1);
              getUserCloset(1);
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
              getUserCloset(2);
            }}
            style = {
              [GeneralStyle.tabButton, {
                backgroundColor: activeTab == 2 ? '#D4AF37' : '#FFF'
              }]
            }
          >
            <Text style = {[GeneralStyle.tabButtonText, {
                color: activeTab == 2 ? '#FFF' : '#D4AF37'
              }]}
            >
              Winter
            </Text>
          </RectButton>
        </View>
      </View>
      { 
        isLoading
        ? <Spinner />
        : <> 
            <View style={style.giftContainer}>
              <FastImage 
                source={require('../../assets/icons/gift.png')}
                style={{width: 30 , height : 30,marginEnd : 10}} 
              />
              <View style={{width : '90%'}}>
                <Text style={[GeneralStyle.blackBoldText,{
                    marginBottom: 7, color: '#012647',
                    fontSize: 15, fontWeight: '500'
                  }]}
                >
                  We have a special gift for you!
                </Text>
                <Text style={[GeneralStyle.blackText,{marginBottom: 2, lineHeight: 19, fontWeight: '400', fontSize: 12}]}>
                  Add up to 20 items or more to join our lovable ritzy
                  Tallah ladies to receive your free online makeover session
                  and you might win a 250 $ gift card from your favorite
                  brand.
                </Text> 
                { closetItems.length >= 20 && 
                  <RectButton style={{alignSelf:'flex-end'}}
                              onPress={()=>{props.navigation.navigate('gift')}}>
                    <Text style={{color : "#D4AF37",textDecorationLine:'underline'}}>
                      {I18n.t('viewGift')} 
                    </Text>
                  </RectButton>
                }  
              </View>
          </View>
          <View style={[style.categoriesRow]}> 
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item,index) => index.toString()}
              renderItem={renderCategoryBox}
            />
          </View>
          <View style={[style.closetItemsListContainer]}> 
            {
              closetItems.length == 0 ?
              <NotFound text="OOH! You’re Missing A lot Start add items Now"/>
              :
              <FlatList 
                showsVerticalScrollIndicator={false}
                horizontal={false}
                keyExtractor={(item,index) => index.toString()}
                numColumns={3}
                data={closetItems}
                renderItem={renderClosetItem}
              />
            }
          </View>
        </>
      }
    <FilterModal />
    <MoreModal />
  </SafeAreaView>
};

export default ClosetTab;
