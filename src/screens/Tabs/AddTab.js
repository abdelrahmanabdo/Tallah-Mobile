import React, { useState, useEffect, useRef } from 'react';
import { Text, View, ImageBackground, FlatList, PanResponder,
         ScrollView, Animated, Pressable, Dimensions, Platform, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RectButton, BorderlessButton  } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/AddTabStyle';
import ModalStyle from '../../assets/styles/ModalStyle';


import Checkbox from '../../components/Checkbox';
import Color from '../../components/Color';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import Snackbar from '../../components/Snackbar';

//
import I18n from '../../lang/I18n';
import Selector from '../../components/Selector';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import NotFound from '../../components/NotFound';
import AsyncStorage from '@react-native-community/async-storage';

const {width} = Dimensions.get('screen');

const AddTab = ({ route, ...props}) => {
  const user = useSelector(state => state.user);
  const [ showCamerModal, setShowCameraModal ] = useState(false);
  const [addItemData, setAddItemData] = useState({});
  const [activeTab, setActiveTab ] = useState(1);
  const [addItemActiveTab, setAddItemActiveTab ] = useState(1);
  const [image , setImage ] = useState(null);
  const [categories , setCategories ] = useState([]);
  const [brands , setBrands ] = useState([]);
  const [colors, setColors ] = useState([]);
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0;

  /**
  * Get categories
  */
  const getCategories = () => {
      api.get(endpoints.categories)
          .then(res => setCategories(res.data.data));
  };

  /**
  * Get colors
  */
  const getColors = () => {
      api.get(endpoints.colors)
          .then(res => setColors(res.data.data));
  };


  /**
  * Get brands
  */
  const getBrands = () => {
      api.get(endpoints.brands)
          .then(res => setBrands(res.data.data));
  };

  useEffect(() => {
    if (route.params && route.params.activeTab) {
      setActiveTab(route.params.activeTab);
    }
    getCategories();
    getBrands();
    getColors();

  }, []);


  const launchImageLibrary = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        includeExtra: true,
      },
    };
    await ImagePicker
      .launchImageLibrary(options, (response) => {
        console.log({response: JSON.stringify(response)});
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else {
          setShowCameraModal(false);
          let avatarResult = response.assets[0];
          setImage(avatarResult);
          setAddItemData({...addItemData, image: avatarResult});
        }
    });
   };

  const launchCamera = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        saveToPhotos: true,
        includeExtra: true,
      },
    };
    await ImagePicker
      .launchCamera(options, (response) => {
        console.log({ response });
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorCode);
        } else {
          setShowCameraModal(false);
          const avatarData = response.assets[0];
          setImage(avatarData);
          console.log({ avatarData });
          setAddItemData({
            ...addItemData,
            image: avatarData,
          });
        }
    });
  };

  // Active tab
  const AddItemFirstTab = () => {
      const [selectedSeason , setSelectedSeason ] = useState(1);
      const [activeCategoryIndex, setActiveCategoryIndex ] = useState(null);
      const [selectedColor , setSelectedColor ] = useState(1);

      /**
       * Go to step two
       */
      const navigateToStepTwo = () => {
        if (!addItemData.image)
          return new Snackbar({type: 'danger', text: 'You have to select an image for your item'});

        if (!activeCategoryIndex)
          return new Snackbar({type: 'danger', text: 'You have to select item category'});
        setAddItemData({
            ...addItemData,
            'category_id': categories[activeCategoryIndex].id,
            'color_id': selectedColor,
            'season': selectedSeason  
        });
        setAddItemActiveTab(2);
      };

      /**
       * Render Category list item
       * @param {} param0 
       */
      const renderCategoryBox = ({item , index}) => {
          return <View key={index} style={GeneralStyle.categoryContainer} >
            <Pressable style={[GeneralStyle.categoryBox,{backgroundColor : activeCategoryIndex == index ? '#D4AF37' : '#FFF',
                              borderColor : activeCategoryIndex == index ? '#D4AF37' : '#000' }]}
                      android_ripple={{color:  ('#D4AF37')}}
                      onPress={() => setActiveCategoryIndex(index)}>
              <FastImage 
                source={{uri: activeCategoryIndex == index ? item.icon_colored : item.icon }}
                resizeMode={'contain'}
                style={{width:30,height:30}}
              />
          </Pressable>
          {
            index === activeCategoryIndex &&  
            <Text style={[GeneralStyle.categoryName, { textAlign: 'center' }]}>
                {item.name || ''}
            </Text>
          }
        </View>
      };

      return <ScrollView style={style.tabContainer}>
        {
            categories && colors ?
            <>
              <Text style={[style.sectionHeaderText , {marginStart : 15}]}>
                {I18n.t('category')}
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderCategoryBox}
              />
              <View style={style.tabContent}>
                <Text style={style.sectionHeaderText}>
                  Season
                </Text>
                <View style={{flexDirection:'row',justifyContent:'flex-start',marginVertical : 8}}>
                  <View style={{flex:1}}>
                    <Checkbox   
                      onChange={active => setSelectedSeason(active && selectedSeason === 2 ? 3 : 1) }
                      isRounded
                      isModal
                      isChecked={selectedSeason === 1 }
                      label={'Summer'}
                    />
                  </View>
                  <View style={{flex:1}}>
                    <Checkbox   
                      onChange={active => setSelectedSeason(active && selectedSeason === 1 ? 3 : 2)}
                      isRounded
                      isModal
                      isChecked={selectedSeason == 2}
                      label={'Winter'}
                    />
                  </View>
                </View>
                <Color colors={colors}
                    onChange={colorId => setSelectedColor(colorId)}/>
                <Button label ={'Next'}
                        style={{width : '98%' , padding : 15}}
                        onPress={navigateToStepTwo}
                        labelColor={'#FFF'}/>
              </View>
            </>
            :
            <FastImage 
              source={require('../../assets/gifs/loader.gif')}
              style={{width:150, height:150,alignSelf:'center'}}
              resizeMode={'contain'}
            />
        }
      </ScrollView>
    };

    // Active tab
    const AddItemSecondTab = (props) => {
      const [selectedBrand , setSelectedBrand ] = useState(1);
      const [price , setPrice ] = useState('');
      const [comment , setComment ] = useState('');
      const [isLoading, setIsLoading] = useState(false);


      /**
       * Save new item handler
       */
      const saveItemHandler = async () => {
       setIsLoading(true);

        let data = new FormData();
        data.append('user_id', user.account.id);
        data.append('image', props.firstStepData.image);
        data.append('category_id', props.firstStepData.category_id);
        data.append('color_id', props.firstStepData.color_id);
        data.append('season', props.firstStepData.season);
        data.append('brand_id', selectedBrand);
        data.append('price', price);
        data.append('comment', comment);

        const token = await AsyncStorage.getItem('token');
        fetch(endpoints.baseUrl + endpoints.closet, {
            method: 'post',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: data,
          })
          .then((res) => res.json())
          .then((res) => {
            setIsLoading(false);
            setAddItemData({});
            setImage(null);
            setAddItemActiveTab(1);
            new Snackbar({text : 'Item added successfully' , type : 'success'});
          })
          .catch(err => {
            setIsLoading(false);
            console.log(JSON.stringify(err))
            new Snackbar({text : I18n.t('unknownError') , type : 'danger'});
          });
        }

        return <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Dropdown 
            items={brands}
            onChangeValue={val => setSelectedBrand(val)}
            name={I18n.t('brand')}
          />
          <Input
            name={I18n.t('price')}
            color={'#000'}
            isNumeric
            onChangeText={value => setPrice(value) }
            placeholderText={'Price in EGP'}
          />
          <Input  
            name={I18n.t('comment')} 
            onChangeText={value => setComment(value)}
            color={'#000'}
            rowsCount={3}
            placeholderText={'Comment....'}
          />             
          <Button 
            label ={'Save'}
            style={{width : '90%',padding : 15}}
            onPress={saveItemHandler}
            labelColor={'#FFF'}
            isLoading={isLoading}
          />
        </KeyboardAwareScrollView>
    };


    // Add outfit tab
    const AddOutfitTab = () => {
        const [seasons] = useState([
          {
              id : 1 ,
              name : 'Summer',
              name_en : 'Summer',
          },
          {
              id : 2 ,
              name : 'Winter',
              name_en : 'Winter',
          },
        ]);
        const [items , setItems] = useState([]);
        const [selectedItem , setSelectedItem] = useState();
        const [selectedItems , setSelectedItems] = useState([]);
        const [isLoading, setIsLoading] = useState(false);
        const pan = selectedItems.map(() => new Animated.ValueXY() );
        
        /**
         * Get current user already added items to can add new outfit
         * @param {*} seasonId // Default the index 0 of seasons
         * @param {*} categoryId // Default the index 0 of categories
         */
        const getUserClosetItems = (seasonId = seasons[0]?.id ?? null,
                                    categoryId = categories[0]?.id ?? null) => {
          api.get(`${endpoints.closet}?user_id=${user.account?.id}&season=${
            seasonId}&category_id=${categoryId}`)
              .then(res => setItems(res.data.data));
        } 

        const getPanResponder = (index) => {
            return PanResponder.create({
                onMoveShouldSetPanResponder: () => true,
                onStartShouldSetPanResponder: () => true,
                onPanResponderGrant: () => {
                  pan[index].setOffset({
                    x: pan[index].x._value,
                    y: pan[index].y._value
                  });
                },
                onPanResponderMove : Animated.event([null,{
                    dx  : pan[index].x,
                    dy  :  pan[index].y
                }]),
                onPanResponderRelease: () => {
                  pan[index].flattenOffset();
                }
            });    
        };

        const removeItem = (itemId) => {
          setSelectedItems(selectedItems.filter((item) => item.id != itemId));
        };

        /**
         * Submit outfit 
         */
        const submitNewOutfit = () => {
          if (selectedItems.length < 2)
            return new Snackbar({'type' : 'danger' , 'text' : 'You should select at least 2 items'});
            setIsLoading(true);

          api.post(endpoints.outfit, {
              'user_id': user.account.id,
              'items'  : selectedItems.map(item => item.id),
            })
            .then(res => {
              console.log(res.data);
              setSelectedItems([]);
              setSelectedItem(null);
              setIsLoading(false);
              new Snackbar({text : 'Outfit added successfully' , type : 'success'});
            })
            .catch(err => {
              setIsLoading(false);
              console.log(JSON.stringify(err.response))
              new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
        };


        useEffect(() => {
          if (route.params && route.params.selectedItem) {
            const item = route.params.selectedItem;
            setSelectedItem(item);
            setSelectedItems([ ...selectedItems, item ]);
          }
          getUserClosetItems();
        },[]);

        return <View style={style.outfitContainer}>
            <View style={style.geastureContainer}>
              {selectedItems.map((item,index) => {
                return <Animated.View 
                    key={index}
                    style={{transform: [{ translateX: pan[index].x }, { translateY: pan[index].y }] }}
                          {...getPanResponder(index).panHandlers}
                  >
                    <ImageBackground    
                      style={[style.selectedItemContainer,{ borderRadius: 9 }]}
                      resizeMode={'contain'}
                      source={ item.image
                        ? {uri: item.image} 
                        :  require('../../assets/images/closet-item-default.png')}
                    >
                      <Pressable onPress={() => removeItem(item.id)}
                                  style={{alignSelf : 'flex-end',marginEnd : 5 , marginTop : 5}}>
                        <FastImage source={require('../../assets/icons/close-bg.png')}
                                  resizeMode={'contain'}
                                  style={{width : 20 , height : 20}} />
                      </Pressable>
                    </ImageBackground>
                </Animated.View> 
              })}
            </View>
            <View style={style.whiteBox}>
              <View style={{flexDirection : 'row'}}>
                <Dropdown   items={seasons}
                            style={{width : '49%'}}
                            onChangeValue={val => getUserClosetItems(val)}
                            name={I18n.t('Season')} />
                <Dropdown   items={categories}
                            style={{width : '49%',marginStart:5}}
                            onChangeValue={val => getUserClosetItems(seasons[0].id, val)}
                            name={I18n.t('category')} />
              </View>
              <>
              {
                (!isLoading && !items.length) ?
                <NotFound 
                  text="OOH! You’re Missing A lot Start add items Now"
                />
                :
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                 { items.map((item, index) => (
                   <Selector
                      item={{item}}
                      style={{width : width  / 3 - 20}}
                      hideText
                      resizeMode={'stretch'}
                      isCurrentSelected={selectedItem == item.id}
                      onSelect={(value)=>{
                        if (!selectedItems.find((item) => item.id == value)) {
                          setSelectedItem(value);
                          selectedItems.push(item);
                          setSelectedItems([...selectedItems]);
                        }
                      }}
                    />
                 )) }
                 </View>
              }
              {
                (!!items.length || !!selectedItems.length) 
                &&
                <Button 
                  label={'Save'} 
                  labelColor={'#FFF'}
                  style={{position: 'absolute', bottom : 5 ,width : '98%',padding :15}} 
                  onPress={submitNewOutfit}
                  isLoading={isLoading}
                />
              }
              </>
            </View>
        </View>
    };


    const ImagePickerSheet = () => {
      return <Modal 
          isVisible={showCamerModal}
          style={{ margin: 0, justifyContent: 'flex-end' }}
          backdropOpacity={.7}
        >
        <View style={ModalStyle.actionModalContainer}>
          <View style={ModalStyle.actionModalHeader}>
              <View></View>
              <Text style={ModalStyle.headerText}>
                Select Image
              </Text>
              <Pressable android_ripple={{color:  ('#D4AF37')}}
                        onPress={()=>{setShowCameraModal(false)}}>
                <FastImage source={require('../../assets/icons/close-colored.png')}
                            style={{width: 22, height: 22}} />
              </Pressable>
          </View>
          <Pressable
            android_ripple={{color:  ('#CCC')}}
            onPress={() => launchImageLibrary()}
            style={{ paddingVertical: 20, paddingHorizontal: 15 }}
          >
            <Text style={{ fontSize: 16, color: '#012647' }}>Open Gallery</Text>
          </Pressable>
          <Pressable 
            android_ripple={{color:  ('#CCC')}}
            onPress={launchCamera}
            style={{ paddingVertical: 20, paddingHorizontal: 15 }}
          >
            <Text style={{ fontSize: 16, color: '#012647' }}>Open Camera</Text>
          </Pressable>
        </View>
      </Modal>
    };

    return <View style={[GeneralStyle.container, {flex: 1}]}>
      <SafeAreaView style={GeneralStyle.header}>
        <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
          <RectButton style={{ flex: 1 }}>
            <FastImage source={require('../../assets/icons/logo.png')}
                      resizeMode={'contain'}
                      style={{width : 35 , height : 35}} />
          </RectButton>
          <Text style={[GeneralStyle.headerText, { flex: 1 }]}>
            Add
          </Text>
          <View style={{ flex: 1 }} />
        </View>
        <View style={GeneralStyle.tabButtons}>
          <RectButton onPress={() => { setActiveTab(1); setAddItemActiveTab(1) }}
                      style={[GeneralStyle.tabButton,{backgroundColor: activeTab == 1 ? '#D4AF37': '#FFF'}]}>
            <Text style={[GeneralStyle.tabButtonText, { color: activeTab == 1 ? '#FFF': '#D4AF37'}]}>
              Add item
            </Text>
          </RectButton>
          <RectButton onPress={()=>{ setActiveTab(2); setAddItemActiveTab(1) }}
                      style={[GeneralStyle.tabButton, {backgroundColor: activeTab == 2 ? '#D4AF37': '#FFF'}]}>
            <Text style={[GeneralStyle.tabButtonText, { color: activeTab == 2 ? '#FFF': '#D4AF37'}]}>
              Add lookbook
            </Text>
          </RectButton>
        </View>
      </SafeAreaView>
      <View style={style.container}>
        {
          activeTab  == 1
          ? <>
              <View style={style.imageContainer}>
                <ImageBackground 
                  source={image ? image : require('../../assets/images/add-tab-bg.png')}
                  style={style.imageBackground}
                  resizeMode={'stretch'}
                >
                  {
                    addItemActiveTab == 1 &&  
                    <BorderlessButton 
                      style={style.editIcon}
                      onPress = {() => setShowCameraModal(true)}
                    >
                      <FastImage  
                        source={require('../../assets/icons/edit.png')}
                        style={{width : 30 , height : 30}}
                        resizeMode={'contain'}
                      />
                    </BorderlessButton>
                  }
                </ImageBackground>
              </View>
              {
                addItemActiveTab == 1
                  ? <AddItemFirstTab />
                  : <AddItemSecondTab firstStepData={addItemData} />
              }
            </>
          : <AddOutfitTab />
        }
      </View>
      <ImagePickerSheet />
    </View>
};

export default AddTab;
