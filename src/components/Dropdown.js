import React, { useState, useEffect } from 'react';
import { Text, View  ,  StyleSheet , Dimensions, I18nManager ,TouchableOpacity ,ScrollView , Pressable} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { RectButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';

import ModalStyle from '../assets/styles/SelectModalStyle';

import I18n from '../lang/I18n';

import Button from './Button';
import Checkbox from './Checkbox';

const {width , height} = Dimensions.get('screen');

const Dropdown = ({...props}) => {
  const [showModal , setShowModal] = useState(false);
  const [selectedValue , setSelectedValue] = useState(0);
  const [activeItem , setActiveItem] = useState(0);

  const submitModal = (item,index) => {
    props.onChangeValue(item.id);
    setSelectedValue(item.id);
    setActiveItem(index);
    setShowModal(false);
  };

  const Style = StyleSheet.create({
      container : {
        width : width - 40,
        borderRadius:7,
        alignSelf:'center',
        padding : 5,
      },
      itemContainer :{
        flexDirection : 'row',
        alignItems:'center',
        padding : 15,
        backgroundColor:  '#F8F8F8',
        marginVertical : 10,
        borderRadius : 15
      },
      itemText : {
        alignSelf: 'flex-start' ,
        color: '#000',
        fontFamily : "Roboto",
        fontSize: 16,
      },
      placeholderText : {
        color: props.placeholderText ?? '#000',
        fontFamily : "Roboto",
        fontSize: 14,
      },
      dropdown: {
        backgroundColor:'#FFF',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width: '100%',
        padding:15,
        borderWidth : 1.25 ,
        borderColor:'#E0E0E0',
        maxHeight: height /2,
        borderRadius : 8
      }
  });

  useEffect(() => {
    if (props.selectedValue) {
      const selectedValueIndex = props.items.findIndex((item) => Number(item.id) == Number(props.selectedValue));
      setSelectedValue(props.selectedValue);
      setActiveItem(selectedValueIndex);
    }
  }, [props, activeItem]);

  const DropDownModal = () => {
    const [activeSelectedItem, setActiveSelectedItem] = useState('');
    const selectItem = (item , index) => setActiveSelectedItem(index);

    return <Modal 
            isVisible={showModal} 
            backdropOpacity={.2}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
          >
      <View style={[ModalStyle.container, { flex: 1, maxHeight: height - 200}]}>
        <View style={ModalStyle.header}>
          { props.isConfirmable && <View /> }
          <Text style={ModalStyle.title}>
            {I18n.t('select')} {props.name}
          </Text>
          <TouchableOpacity activeOpacity={.5}
                            onPress={()=>{setShowModal(false)}}>
            <FastImage source={require('../assets/icons/close-colored.png')}  
                      style={{width: 20 , height : 20}}/>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            props?.items.map((item,index)=> {
              return <TouchableOpacity 
                  key={index}
                  style={[Style.itemContainer, {
                            backgroundColor: props.isConfirmable && activeSelectedItem == index  
                              ? '#012647' : '#F8F8F8'
                          }
                        ]} 
                  onPress={() => { 
                    props.isConfirmable 
                      ? selectItem(item,index) 
                      : submitModal(item,index)
                  }} 
                >
                <Checkbox 
                  isModal
                  isChecked={activeItem == index}
                  onChange={() => submitModal(item,index)}
                />
                <Text 
                  style={[Style.itemText, { color: (
                    props.isConfirmable ?
                      ( activeSelectedItem == index  ? '#FFF' : '#000') :
                      activeItem == index ? '#012647' : '#000' )
                  }]}
                 >
                  {I18nManager.isRTL ? item.name : item.name_en}
                </Text>
              </TouchableOpacity>
            })
          }
          {
            props.isConfirmable && 
            <Button 
              isModal
              label={'save'}
              labelColor={'#FFF'}
              onPress={()=> {}}
              style={{width : '100%' , padding : 15}} 
            />
          }
        </ScrollView>
      </View>  
    </Modal>
  };

  return <Animatable.View style={[Style.container,props.style]}>
      <View style={{flexDirection:'row',alignItems:'center',marginBottom  :10}}>
        {
          props.name &&
          <Text style={[Style.placeholderText,{fontWeight : '700'}]}>
              {props.name}
          </Text>                     
        }
      </View>
      {
      props.isModal ?
      <Pressable 
        onPress={()=> setShowModal(true)}
        android_ripple={{color:  ('#D4AF37')}}
        style={Style.dropdown}
      >
        <Text style={Style.placeholderText}>
            { I18nManager.isRTL ? props?.items[activeItem]?.name : props?.items[activeItem]?.name_en }
        </Text>
        <FastImage 
          source={require('../assets/icons/down-arrow.png')}
          resizeMode="contain"
          style={{width: 20 , height : 20}}
        />
      </Pressable>
      :
      <RectButton onPress={()=> setShowModal(true)}
                  style={{borderRadius : 8,justifyContent:'center'}}>
        <View style={Style.dropdown}> 
          <Text style={Style.placeholderText}>
              { I18nManager.isRTL ? props?.items[activeItem]?.name : props?.items[activeItem]?.name_en }
          </Text>
          <FastImage 
            source={require('../assets/icons/down-arrow.png')}
            resizeMode="contain"
            style={{width: 20 , height : 20}}
          />
        </View>
      </RectButton>
      }
      <DropDownModal />
  </Animatable.View>
};

export default Dropdown;