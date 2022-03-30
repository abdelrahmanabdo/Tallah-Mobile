import React, { useState } from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as ImagePicker from "react-native-image-picker";
import { useSelector } from 'react-redux';

import Modal from 'react-native-modal';
import { Button } from 'react-native-share';

import TallahButton from '../../../components/Button';
import Input from '../../../components/Input';
import Snackbar from '../../../components/Snackbar';

import ModalStyle from '../../../assets/styles/ModalStyle';
import GeneralStyle from '../../../assets/styles/GeneralStyle';

const AddProject = props => {
   const stylist = useSelector(state => state.stylist.profile);
   const [name , setName ] = useState('');
   const [description , setDescription ] = useState('');
   const [images , setImages] = useState([]);

   const onSubmitModal = () => {
      if (images.length === 0) return new Snackbar({
        text: 'You have to add at least one image',
        type: 'danger'
      });
      const newProject = {
        'stylist_id': stylist.id,
        name, 
        description, 
        images
      };
      props.onSubmitModal(newProject);
      setImages([]);
   };


   /**
    * Images 
    */
   const Images = () => {

    const launchImageLibrary = () => {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
          includeBase64: true,
        },
      };
      ImagePicker.launchImageLibrary(options, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else {
          const avatarResult = response.assets[0];
          setImages([...images, avatarResult]);
        }
      });
    };

    return <View style={{flexDirection:'row' , marginVertical : 10}}>
         {
            setImages.length > 0 &&
            <View style={{flexDirection : 'row'}}>
               {images.map((item,key) => {
                  return <FastImage 
                          key={key}
                          source={item} 
                          style={{width : 65 , height:65 , borderRadius : 10 , marginRight : 5}}
                        />
                })
               }
            </View>
         }
         {
            images.length != 5 &&
            <TouchableOpacity onPress={launchImageLibrary}> 
              <View style={{width : 'auto',justifyContent:'center',padding : 15, borderWidth: .5 ,
                            borderColor:'#ccc' , borderRadius: 10 }}>
                  <FastImage 
                    source={require('../../../assets/icons/add-dashed.png')}
                    style={{width:33 , height: 33}}
                  />
              </View>
            </TouchableOpacity>
        }
      </View>
   }

   return <Modal isVisible={props.showModal} style={{margin: 0,justifyContent:'flex-end'}}>
        <View style={[ModalStyle.actionModalContainer]} showsVerticalScrollIndicator={false}>
         <View style={ModalStyle.actionModalHeader}>
            <View style={{flex:1}}></View>
            <Text style={[ModalStyle.headerText , {flex:1}]}>
                Add Project
            </Text>
            <Button 
               transparent  
               onPress={()=> {
                  setImages([]);
                  props.onCloseModal();
               }}
            >
               <FastImage 
                  source={require('../../../assets/icons/close-colored.png')}
                  style={{width:20,height:20 , flex:1}} 
                  resizeMode={'contain'}
               />
            </Button>
         </View>
         <ScrollView>
            <Input 
              name={'Project name'} 
              placeholderText={'Project name'}  
              onChangeText={(value) => setName(value)}
              placeholderColor={'#ccc'} 
              color={'#000'}
            />
            <Input 
              name={'Project Description'} 
              placeholderText={'Project Description'}  
              onChangeText={(value) => setDescription(value)}
              placeholderColor={'#ccc'} 
              rowsCount={4}
              isTextarea = {true}
              color={'#000'}
            />
            <View>
              <Text style={[GeneralStyle.blackBoldText , {marginBottom: 5}]}>
                Photos
              </Text>
              <Images />
            </View>
            <TallahButton  
              onPress={onSubmitModal}
              label={'Add'}
              labelColor={'#FFF'}
              isModal
              style={[ModalStyle.SecondaryButton,{flex:1}]}
            />
         </ScrollView>
      </View>
   </Modal>
}

export default AddProject ;