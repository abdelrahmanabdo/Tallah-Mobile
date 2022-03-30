import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Animated,
  PanResponder,
  Pressable,
  I18nManager
} from 'react-native';
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
import OutfitItem from '../../components/OutfitItem';
import ModalStyle from '../../assets/styles/ModalStyle';
import AddToFavourites from '../../components/AddToFavourites';
import Checkbox from '../../components/Checkbox';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import Snackbar from '../../components/Snackbar';
import Spinner from '../../components/Spinner';
import { SafeAreaView } from 'react-native-safe-area-context';

const OutfitItemView = ({...props}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal , setShowDeleteModal ] = useState(false);
  const [showEditModal , setShowEditModal ] = useState(false);
  const pan = data?.items?.map(() => new Animated.ValueXY());

   const getOutfitItemData = () => {
      if (!props.route?.params?.itemId) return;

      setIsLoading(true);
      api.get(endpoints.outfit + '/' + props.route.params.itemId)
          .then(res => {
            setData(res.data.data);
            setIsLoading(false);
          })
          .catch((err) => console.log(err.response));
   };

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
          onPanResponderMove  : Animated.event([null,{
              dx  : pan[index].x,
              dy  :  pan[index].y
          }]),
          onPanResponderRelease: () => {
            pan[index].flattenOffset();
          }
      });    
    };

   /**
    * Render related outfits 
    */
   const renderReleatedItem = ({item , index}) => {
      return <OutfitItem key={index} item={item} />
   };

   const seasonValue = data && data.items.length > 0
     ? data.items.map((item) => item.closet_item).reduce((acc, current, index, outfits) => {
        const currentSeason = ['1', '3'].includes(current.season) ? 'Summer' : 'Winter';
        if (!acc.includes(currentSeason)) {
          acc += currentSeason + ( index != outfits.length - 1 ? ', ' : '');
        }
        return acc;
      }, ' ')
    : '';


   const EditModal = () => {
      const [season , setSeason ] = useState(0);
      const [categories , setCategories ] = useState([]);
      const [brands , setBrands ] = useState([]);
      const [colors, setColors ] = useState([]);

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
         getCategories();
         getBrands();
         getColors();
      }, [season]);


      return <Modal  isVisible={showEditModal}
                        style={{margin: 0, justifyContent:'flex-end'}}
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
                  <View>
                    <Text style={ModalStyle.sectionHeaderText}>
                      Season
                    </Text>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',marginVertical : 8}}>
                      <View style={{flex:1}}>
                        <Checkbox onChange={()=>{setSeason(0)}}
                                isRounded
                                isChecked={season == 0 }
                                label={'Summer'}
                        />
                      </View>
                      <View style={{flex:1}}>
                        <Checkbox onChange={()=>{setSeason(1)}}
                                isRounded
                                isChecked={season == 1}
                                label={'Winter'}
                        />
                      </View>
                     </View>
                  </View>
                  <View style={{flexDirection:'row',marginBottom : 10}}>
                    <TallaButton   
                      onPress={()=>{setShowEditModal(false) }}
                      label ={'cancel'}
                      labelColor={'#D4AF37'}
                      style={[ModalStyle.SecondaryButton,{
                        backgroundColor:'#FFF',
                        marginEnd : 10,
                        flex:1,
                        borderColor  : '#D4AF37' , 
                        borderWidth : 1}]}
                    />
                    <TallaButton   
                      onPress={()=>{ setShowDeleteModal(false)}}
                      label={'Save'}
                      labelColor={'#FFF'}
                      style={[ModalStyle.SecondaryButton,{flex:1}]}
                    />
                </View>
              </View>
          </ScrollView>
        </Modal>
   }

   const DeleteModal = () => {

    const deleteItem = () => {
      api.delete(`${endpoints.outfit}/${data.id}`)
        .then(res => {
            setShowDeleteModal(false);
            props.navigation.goBack();
            return new Snackbar({'type' : 'success', 'text': 'Outfit deleted successfully'});
        })
        .catch(() => new Snackbar({text : I18n.t('unknowError') , type : 'danger'}) );
    };

    return <Modal isVisible={showDeleteModal}
                    animationIn={'bounceIn'}
                    backdropOpacity={.7}>
          <View style={ModalStyle.container}>
            <FastImage 
              source={require('../../assets/icons/delete-red.png')}
              resizeMode="contain"
              style={{width :  60  , height:  60 }}
            />
            <Text style={[ModalStyle.text,{fontFamily : 'Roboto-Bold'}]}>
                Are you sure that you want to delete this outfit?
            </Text>
            <View style={{flexDirection:"row"}}>
              <TallaButton   
                onPress={() => setShowDeleteModal(false) }
                label ={'Cancel'}
                isModal
                labelColor={'#686868'}
                style={[ModalStyle.SecondaryButton,{
                    backgroundColor:'#FFF',
                    marginEnd : 10,
                    flex:1,
                    borderColor  : '#CCC' , 
                    borderWidth : 1
                  }
                ]}
              />
              <TallaButton  
                onPress={deleteItem}
                label={'Delete'}
                isModal
                labelColor={'#FFF'}
                style={[ModalStyle.SecondaryButton, {
                  backgroundColor:'#FF0000',flex:1
                }]}
              />
            </View>
          </View>
      </Modal>
  };

  /**
  * Share Item
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

    Share.open(options)
        .then(res => console.log(res))
        .catch(err => console.log(err));
  };


  useEffect(() => getOutfitItemData(), []);
 
   return <SafeAreaView eaView style={GeneralStyle.container}>
      <View style={GeneralStyle.header}>
        <View style={[GeneralStyle.rowSpaceBetween, { width : '90%' }]}>
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
          <View style={[ style.geastureContainer, { 
              flex: 2 , backgroundColor: '#F8F8F8', paddingStart: '15%', paddingTop: 10
            }]}
          >
            {data && data.items && data.items.map((item, index) => {
              return <Animated.View 
                    key={index}
                    style = {
                      {
                        transform: [{
                          translateX: pan[index].x
                        }, {
                          translateY: pan[index].y
                        }],
                        width: '40%'
                      }
                    }
                    // {...getPanResponder(index).panHandlers}
                >
                  <ImageBackground    
                    style={[style.selectedItemContainer,{ borderRadius: 9 }]}
                    resizeMode={'stretch'}
                    source={ item.closet_item && item.closet_item.image
                      ? {uri: item.closet_item.image} 
                      :  require('../../assets/images/closet-item-default.png')}
                  />
              </Animated.View> 
            })}
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={style.grayContainer}>
              <View style={GeneralStyle.rowSpaceBetween}>
                <Text style={[style.rowInfo , {color: '#979797', fontSize: 17, fontWeight: '500'}]}>
                  season: <Text style={{ color: '#000000'}}>{seasonValue}</Text>
                </Text>
                {/* <BorderlessButton 
                  rippleColor={'#CCC'}
                  onPress={()=>{setShowEditModal(true)}}>
                  <FastImage source={require('../../assets/icons/edit.png')}
                            style={{width:23,height:23}}
                  />
                </BorderlessButton> */}
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding : 15}}>
              <TallaButton 
                onPress={() => props.navigation.navigate('addCalendar', { 
                  outfitId: props.route.params.itemId,
                  type: 'outfit',
                })}
                label={'Add To Calendar'}
                labelColor ={'#FFF'}
                style={{ flex: 1, backgroundColor: '#D4AF37', borderColor: '#D4AF37', borderWidth: 1 }}
              />
            </View>
            {/* {
              data?.related_items && data?.related_items.length > 0 &&
              <View>
                  <Text style={style.relatedItemsText}>
                    More outfits
                  </Text>
                  <FlatList 
                    horizontal
                    data={data?.related_items}
                    renderItem={renderReleatedItem}
                  />
              </View>
            } */}
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

export default OutfitItemView;
