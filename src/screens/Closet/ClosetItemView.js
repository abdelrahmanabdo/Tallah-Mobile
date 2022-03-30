import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground , SafeAreaView,FlatList , Statusbar, Pressable, I18nManager } from 'react-native';
import {Button} from 'native-base';
import { RectButton, ScrollView, BorderlessButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Share from "react-native-share";
import Modal from 'react-native-modal';

//
import I18n from '../../lang/I18n';

//styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/ClosetItemViewStyle';

//Components
import TallaButton from '../../components/Button';
import ClosetItem from '../../components/ClosetItem';
import ModalStyle from '../../assets/styles/ModalStyle';
import AddToFavourites from '../../components/AddToFavourites';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import Snackbar from '../../components/Snackbar';
import Spinner from '../../components/Spinner';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector } from 'react-redux';

const ClosetItemView = ({...props}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal , setShowDeleteModal ] = useState(false);
  const [showEditModal , setShowEditModal ] = useState(false);

   /**
    * Get current closet item data
    * @param {*} param0 
    */
   const getClosetItemData = () => {
      if (!props.route?.params?.itemId) return;
      
      setIsLoading(true);
      api.get(endpoints.closet + '/' + props.route.params.itemId)
         .then(res => {
          setData(res.data.data);
          setIsLoading(false);
        });
   };

   /**
    * Remder related closetes 
    */
   const renderReleatedItem = ({item , index}) => {
      return <ClosetItem key={index} item={item}/>
   };

   /**
    * Edit Modal
    */
   const EditModal = () => {
      const user = useSelector(state => state.user);
      const [ updateData, setUpdateData ] = useState({ ...data });
      const [ categories , setCategories ] = useState([]);
      const [ brands , setBrands ] = useState([]);
      const [ colors, setColors ] = useState([]);
      const [ isLoading, setIsLoading ] = useState(false);
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

      const onClickSave = async () => {
        setIsLoading(true);

        let data = new FormData();
        data.append('user_id', user.account.id);
        data.append('category_id', updateData.category_id);
        data.append('season', updateData.season);
        data.append('color_id', updateData.color_id);
        data.append('brand_id', updateData.brand_id);
        data.append('price', updateData.price);
        data.append('comment', updateData.comment);
        data.append('_method', 'PUT');
        
        const token = await AsyncStorage.getItem('token');
        fetch(endpoints.baseUrl + endpoints.closet + '/' + updateData.id, {
            method: 'post',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: data,
          })
          .then((res) => res.json())
          .then((res) => {
            setIsLoading(false);
            if (res.success) {
              setData({...res.data});
              setShowEditModal(false);
            }
          })
          .catch(err => {
            setIsLoading(false);
            console.log(JSON.stringify(err))
            new Snackbar({text : I18n.t('unknownError') , type : 'danger'});
          });
      };

      useEffect(() => {
        getCategories();
        getBrands();
        getColors();
      }, []);

      return <Modal  isVisible={showEditModal}
                        style={{ margin: 0, justifyContent:'flex-end'}}
                        backdropOpacity={.7}>
            <ScrollView style={ModalStyle.actionModalContainer}
                        showsVerticalScrollIndicator={false}>
               <View style={ModalStyle.actionModalHeader}>
                  <View></View>
                  <Text style={ModalStyle.headerText}>
                     Edit item data
                  </Text>
                  <Pressable 
                     transparent  
                     onPress={()=>{setShowEditModal(false)}}>
                     <FastImage source={require('../../assets/icons/close-colored.png')}
                                 style={{width:20,height:20}} />
                  </Pressable>
               </View>
               <View style={{flexDirection:"column"}}>
                  <Dropdown 
                    items={categories}
                    isModal
                    name={I18n.t('category')}
                    selectedValue = {
                      updateData.category_id
                    }
                    onChangeValue={(value) => setUpdateData({
                      ...updateData,
                      category_id: value,
                    })}
                  />
                  <View>
                     <Text style={ModalStyle.sectionHeaderText}>
                        Season
                     </Text>
                     <View style={{flexDirection:'row',justifyContent:'flex-start',marginVertical : 8}}>
                        <View style={{flex:1}}>
                           <Checkbox 
                            onChange={() => setUpdateData({
                              ...updateData,
                              season: 1,
                            })}
                            isRounded
                            isChecked={updateData.season == 1 || updateData.season == 3}
                            label={'Summer'}
                           />
                        </View>
                        <View style={{flex:1}}>
                           <Checkbox 
                            onChange={() => setUpdateData({
                              ...updateData,
                              season: 2,
                            })}
                            isRounded
                            isChecked = {
                              updateData.season == 2 || updateData.season == 3
                            }
                            label={'Winter'}
                           />
                        </View>
                     </View>
                  </View>
                  <Dropdown 
                    items={colors}
                    isModal
                    name={I18n.t('color')}
                    selectedValue={updateData.color_id}
                    onChangeValue={(value) => setUpdateData({
                      ...updateData,
                      color_id: value,
                    })}
                  />
                  <Dropdown 
                    items={brands}
                    isModal
                    name={I18n.t('brand')} 
                    selectedValue={updateData.brand_id}
                    onChangeValue={(value) => setUpdateData({
                      ...updateData,
                      brand_id: value,
                    })}
                  />
                  <Input  
                     name={I18n.t('price')}
                     placeholderText={'Price'}
                     placeholderColor={'#CCC'}
                     defaultValue={updateData.price}
                     onChangeText={(value) => setUpdateData({
                      ...updateData,
                      price: value,
                    })}
                  />
                  <Input  
                     isTextarea 
                     name={I18n.t('comment')} 
                     placeholderText={'Comment'}
                     placeholderColor={'#CCC'}
                     defaultValue={updateData.comment}
                     rowsCount={3} 
                     onChangeText={(value) => setUpdateData({
                      ...updateData,
                      comment: value,
                    })}
                  />
                  <View style={{flexDirection:'row',marginBottom : 10}}>
                    <TallaButton   
                      onPress={()=>{setShowEditModal(false) }}
                      label ={'cancel'}
                      labelColor={'#D4AF37'}
                      isModal
                      style={[ ModalStyle.SecondaryButton, {
                          backgroundColor: '#FFF',
                          marginEnd: 10,
                          flex: 1,
                          borderColor: '#D4AF37',
                          borderWidth: 1
                        } 
                      ]}
                    />
                    <TallaButton
                      onPress = {onClickSave}
                      label={'Save'}
                      isModal
                      labelColor={'#FFF'}
                      style={[ModalStyle.SecondaryButton, { flex: 1 }]}
                      isLoading={isLoading}
                    />
                  </View>
               </View>
            </ScrollView>
         </Modal>
   };

   /**
    * Delete modal
    */
   const DeleteModal = () => {

      /**
       * Get brands
      */
      const deleteItem = () => {
         api  
            .delete(`${endpoints.closet}/${data.id}`)
            .then(res => {
               setShowDeleteModal(false);
               props.navigation.goBack();
               return new Snackbar({'type' : 'success', 'text': 'Item deleted successfully'});
            })
            .catch(() => new Snackbar({text : I18n.t('unknowError') , type : 'danger'}) );
      }

      //Info Modal
      return <Modal isVisible={showDeleteModal}
                     animationIn={'bounceIn'}
                     backdropOpacity={.7}>
         <View style={ModalStyle.container}>
            <FastImage source={require('../../assets/icons/delete-red.png')}
                        resizeMode="contain"
                        style={{width :  60  , height:  60 }}
            />
            <Text style={[ModalStyle.text,{fontFamily : 'Roboto-Bold'}]}>
               Are you sure that you want to delete this item?
            </Text>
            <View style={{flexDirection:"row"}}>
               <TallaButton   
                        onPress={()=>{setShowDeleteModal(false) }}
                        label ={'Cancel'}
                        isModal
                        labelColor={'#686868'}
                        style={[ModalStyle.SecondaryButton,{backgroundColor:'#FFF',
                                                            marginEnd : 10,
                                                            flex:1,
                                                            borderColor  : '#CCC' , 
                                                            borderWidth : 1}]}>
               </TallaButton>
               <TallaButton  
                  onPress={deleteItem}
                  label={'Delete'}
                  isModal
                  labelColor={'#FFF'}
                  style={[ModalStyle.SecondaryButton,{backgroundColor:'#FF0000',flex:1}]}>
               </TallaButton>
            </View>
         </View>
      </Modal>
   };

   /**
    * Share Item
    */
   const share = () => {
      const url = "https://tallah.co";
      const title = data.comment;
      const message = data.comment;
      const icon = data.image;

      const options = Platform.select({
          ios: {
            activityItemSources: [
              { // For using custom icon instead of default text icon at share preview when sharing with message.
                placeholderItem: {
                  type: 'url',
                  content: icon
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
            message: `${message}}`,
          },
        });

      Share
          .open(options)
          .then((res) => { console.log(res) })
          .catch((err) => { err && console.log(err); });
   };

   const navigateToAddCalendar = () => {
     props.navigation.navigate('addCalendar', { 
       event: {
        type: 'item',
       },
       selectedItem: data.id,
     });
   };

   const navigateToAddOutfit = () => {
     props.navigation.navigate('add', {
       activeTab: 2,
       selectedItem: data,
     });
   };

   useEffect(() => {
    getClosetItemData();
   }, []);
 
   return <SafeAreaView eaView style={GeneralStyle.container}>
        {/* <Statusbar hidden={false}  barStyle={'light-content'} /> */}
        <View style={GeneralStyle.header}>
            <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
               <RectButton onPress={()=>{props.navigation.goBack()}}>
                  <FastImage source={require('../../assets/icons/back-arrow.png')}
                           style={{width : 25 , height:25}}
                           resizeMode={'contain'}
                  />
               </RectButton>
               <View style={{flexDirection:'row' , justifyContent:'space-between' }}>
                  <RectButton onPress={()=>{share()}} >
                     <FastImage source={require('../../assets/icons/share-colored.png')}
                              style={{width : 25 , height:25}}
                              resizeMode={'contain'}
                     />
                  </RectButton>
                  <RectButton onPress={()=>{setShowDeleteModal(true)}} 
                              style={{marginStart : 20}}>
                     <FastImage source={require('../../assets/icons/delete-colored.png')}
                              style={{width : 25 , height:25}}
                              resizeMode={'contain'}
                     />
                  </RectButton>
               </View>
            </View>
        </View>
        {
          isLoading 
          ? <Spinner />
          : <>
            <ImageBackground source={data?.image ? {uri: data.image} : require('../../assets/images/closet-item-default.png')}
                              resizeMode={'stretch'}
                              style={style.bgImage}>
                <View style={style.uploadImageButton}>
                  <AddToFavourites 
                      isGold 
                      iconSize="big" 
                      itemId={data?.id}
                      type={'item'}
                  />
                </View>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.grayContainer}>
                  <View style={GeneralStyle.rowSpaceBetween}>
                      <View />
                      <BorderlessButton 
                        rippleColor={'#CCC'}
                        onPress={()=>{setShowEditModal(true)}}>
                        <FastImage source={require('../../assets/icons/edit.png')}
                                  style={{width:23,height:23}}
                        />
                      </BorderlessButton>
                  </View>
                  <View style={GeneralStyle.rowSpaceBetween}>
                      <View style={{flexDirection:'row',flex:1}}>
                      <Text style={[style.rowInfo , {color : '#979797',fontSize : 16 , flex:1}]}>
                              {I18n.t('category')} :
                        </Text>
                        <Text style={[style.rowInfo, GeneralStyle.blackBoldText,{flex:1}]}>
                              {I18nManager.isRTL ? data?.category?.name : data?.category?.name_en}
                        </Text>
                      </View>
                      <View style={{flexDirection:'row',flex:1}}>
                        <Text style={[style.rowInfo , {color : '#979797',fontSize : 16 , flex:1}]}>
                              {I18n.t('color')} :
                        </Text>
                        <Text style={[style.rowInfo, GeneralStyle.blackBoldText,{flex:1}]}>
                              {I18nManager.isRTL ? data?.color.name : data?.color.name_en}
                        </Text>
                      </View>
                  </View>
                  <View style={GeneralStyle.rowSpaceBetween}>
                      <View style={{flexDirection:'row',flex:1}}>
                      <Text style={[style.rowInfo , {color : '#979797',fontSize : 16 , flex:1}]}>
                              {I18n.t('brand')} :
                        </Text>
                        <Text style={[style.rowInfo, GeneralStyle.blackBoldText,{flex:1}]}>
                              {I18nManager.isRTL ? data?.brand.name : data?.brand.name_en}
                        </Text>
                      </View>
                      <View style={{flexDirection:'row',flex:1}}>
                      <Text style={[style.rowInfo , GeneralStyle.blackBoldText, {color : '#979797',fontSize : 16 , flex:1}]}>
                              {I18n.t('price')} :
                        </Text>
                        <Text style={[style.rowInfo, GeneralStyle.blackBoldText,{flex:1}]}>
                              { (data?.price ?? 0) + ' ' + I18n.t('EGP') }
                        </Text>
                      </View>
                  </View>
                  {
                    data?.comment &&
                      <View style={GeneralStyle.rowSpaceBetween}>
                        <View style={{flexDirection:'row',flex:1}}>
                          <Text style={[style.rowInfo , {color : '#979797',fontSize : 16 , flex:1}]}>
                            {I18n.t('comment')} :
                          </Text>
                          <Text style={[style.rowInfo , GeneralStyle.blackBoldText,{flex:3,lineHeight : 23}]}>
                                  {data?.comment}
                          </Text>
                        </View>
                      </View>
                  }
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',padding :15}}>
                  <TallaButton   
                    label={'Add To Calendar'}
                    onPress={navigateToAddCalendar}
                    isModal
                    labelColor ={'#D4AF37'}
                    style={{
                      flex:1, backgroundColor: '#FFF', 
                      borderColor : '#D4AF37',borderWidth : 1,marginStart : 15,
                    }}
                  />
                  <TallaButton   
                    label={'Add To Outfit'}
                    onPress={navigateToAddOutfit}
                    labelColor ={'#D4AF37'}
                    isModal
                    style={{
                      flex:1, backgroundColor: '#FFF', 
                      borderColor : '#D4AF37',borderWidth : 1,marginStart : 15,
                    }}
                  />
                </View>
                <View style={style.line}></View>
                {
                  data?.related_items.length > 0 &&
                  <View>
                      <Text style={style.relatedItemsText}>
                        Releated items
                      </Text>
                      <FlatList 
                        horizontal
                        data={data?.related_items}
                        renderItem={renderReleatedItem}
                      />
                  </View>
                }
            </ScrollView>
          </>
        }
         {
            showEditModal && 
            <EditModal />
         }
         <DeleteModal />
    </SafeAreaView>
};

export default ClosetItemView;
