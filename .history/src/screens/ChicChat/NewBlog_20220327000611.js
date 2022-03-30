import React, {
  useState,
  useEffect
} from 'react';
import { Text, View, ImageBackground , FlatList , ScrollView, SafeAreaView, Keyboard, KeyboardAvoidingView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { createReadStream } from 'react-native-fs';
import { BorderlessButton , BaseButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import * as ImagePicker from "react-native-image-picker";
//Styles
import style from '../../assets/styles/NewBlogStyle';
import GeneralStyle from '../../assets/styles/GeneralStyle';
import NewBlogStyle from '../../assets/styles/NewBlogStyle';
import ModalStyle from '../../assets/styles/ModalStyle';

import I18n from '../../lang/I18n';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Snackbar from '../../components/Snackbar';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import AsyncStorage from '@react-native-community/async-storage';

const NewBlog = props  => {
   const user = useSelector(state => state.user);
   const [showModal, setShowModal ] = useState(false);
   const [title, setTitle ] = useState('');
   const [body, setBody ] = useState('');
   const [images , setImages ] = useState([]);
   const [hashtags, setHashtags ] = useState([]);
   const [currentHashtag, setCurrentHashtag ] = useState('');
   const [isLoading, setIsLoading] = useState(false);

  /**
    * Remove image from list of images
    */
  const removeImage = index => {
    images.splice(index,1);
    setImages([...images]);
  };
   /**
    * Push new hashtag on hashtags
    */
  const pushNewHashtag = () => {
    if(currentHashtag != '') {
      setHashtags(
        [...hashtags, currentHashtag]
      );
      setCurrentHashtag('');
    }
  };

  const launchCamera = async () => {
    let options = {
      storageOptions: {
        saveToPhotos: true
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
          setImages([...images, response.assets[0]]);
        }
    });
  };

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        includeBase64: true,
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setImages([...images, response.assets[0]]);
      }
    });
  };

   /**
     * Validator
     */
   const validator = () => {
      if (!title) 
        return new Snackbar({text : I18n.t('titleIsRequired') , type : 'danger'}), false;
      if (!body) 
        return new Snackbar({text : I18n.t('bodyIsRequired') , type : 'danger'}), false;
      return true;
   };
   
   /**
    * Create New Blog handler
    */
   const createNewBlog = async () => {
      if (!validator() || !user) return;
      setIsLoading(true);

      let data = new FormData();
      data.append('user_id', user.account.id);
      data.append('title', title);
      data.append('title_ar', title);
      data.append('body', body);
      data.append('body_ar', body);
      if (hashtags.length) {
        let newHashtags = [];
        hashtags.forEach((hashtag, key) => {
          hashtag = {
            ar: hashtag,
            en: hashtag
          };
          newHashtags.push(hashtag);
        });
        data.append(`hashtags`, JSON.stringify(newHashtags));
      }
      if (images.length) {
        images.forEach((image, key) => data.append(`images[${key}]`, image));
      }

      const token = await AsyncStorage.getItem('token');
      fetch(`${endpoints.baseUrl}${endpoints.blog}`, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      })
      .then(() => {
        setTitle('');
        setBody('');
        setImages([]);
        setHashtags([]);
        setShowModal(true);
        setIsLoading(false);    
      })
      .catch(err => {
        setIsLoading(false);
        new Snackbar({text : I18n.t('unknownError') , type : 'danger'});    
      });
   };

   //Submit Modal
   const SubmitModal = () => {
      return <Modal isVisible={showModal}
                     animationIn={'bounceIn'}
                     backdropOpacity={.7}>
         <View style={ModalStyle.container}>
            <FastImage source={require('../../assets/icons/done-modal-icon.png')}
                        resizeMode="contain"
                        style={{width : 60  , height:  60 }}
            />
            <Text style={ModalStyle.text}>
               Your post has been sent for review
            </Text>
            <Button 
              isModal={true}
              label={'Ok'}
              labelColor={'#FFF'}
              onPress={()=>{setShowModal(false)}}
              style={ModalStyle.SecondaryButton}
            />
         </View>
      </Modal>
   };


   /**
     * Render vertical new blogs
     */
   const renderBlogImage = ({item , index}) => {
      return <View style={[style.blogImage]} >
          <ImageBackground source={item}
                           style={{width : '100%', height : 120, justifyContent:'flex-start',
                                   borderRadius : 15, overflow :'hidden'}}>
            <BorderlessButton onPress={() => removeImage(index)}>
               <FastImage source={require('../../assets/icons/close-bg.png')} 
                        style={{width : 22, height : 22, alignSelf:'flex-end', margin:5}} />
            </BorderlessButton>
          </ImageBackground>
      </View>
   };

   return <SafeAreaView style={[GeneralStyle.container]}>
        <View style={[GeneralStyle.header , {borderBottomLeftRadius : 0 , borderBottomRightRadius : 0}]}>
            <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
                <BorderlessButton style={{flexDirection : 'row'}} onPress={()=>{props.navigation.goBack()}}>
                    <FastImage 
                      source={require('../../assets/icons/back-arrow.png')} 
                      style={{width : 25 , height : 25}}
                      resizeMode="contain"
                    />
                    <Text style={[GeneralStyle.headerText, { marginStart : 15}]}>
                        Create
                    </Text>
                </BorderlessButton>
                <View style={{flexDirection : 'row'}}>
                    <BaseButton style={[NewBlogStyle.postButton]}
                                enabled={!isLoading}
                                onPress={() => {createNewBlog()}}>
                        <Text style={[NewBlogStyle.postButtonText]}>
                            { isLoading ? 'Posting' : 'Post'}
                        </Text>
                    </BaseButton>
                </View>
            </View>
        </View>
        <ScrollView style={[style.container]}>
            <View style={[style.userInfoContainer]}>
              <FastImage 
                source={user.account?.profile?.avatar
                  ? {uri: user.account?.profile?.avatar } 
                  : require('../../assets/icons/default-avatar.png')
                }
                resizeMode={'cover'}
                style={{width: 50, height: 50, borderRadius: 25}} 
              />
              <Text style={[GeneralStyle.blackBoldText, {fontSize: 15,marginStart : 15}]}>
                {user?.account?.name}
              </Text>
            </View>
            <View>
            {
              images.length > 0 && 
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={images}
                    style={{backgroundColor: '#F8F8F8', paddingVertical : 15, marginHorizontal : 4}}
                    keyExtractor={(item,index) => index.toString()}
                    renderItem={renderBlogImage}
              />
            }        
            </View>
            <KeyboardAvoidingView>
              <Input name={'Title'}
                    placeholderText={I18n.t('title')}  
                    onChangeText={value => setTitle(value)}
                    defaultValue={title}
                    placeholderColor={'#C3C3C3'}  
                    title={title}
                    color={'#000000'}  
              />
              <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 27,
                }}
              >
                  <Input name={I18n.t('addHashtag')}
                        placeholderText={I18n.t('addHashtag')}  
                        defaultValue={currentHashtag}
                        style={{width : '95%'}}
                        onChangeText={(value) => setCurrentHashtag(value)}
                        placeholderColor={'#C3C3C3'}  
                        color={'#000000'}  
                  />
                  <BorderlessButton style={[style.addCurrentHashtag]}
                                    onPress={pushNewHashtag}> 
                    <FastImage  source={require('../../assets/icons/plus-colored.png')}
                                resizeMode={'contain'}
                                style={{width : 30 , height : 30 , borderRadius : 25}} />
                  </BorderlessButton>
              </View>
              <View style={[style.hashtagsCcntainer]}>
                {
                  hashtags.map((hashtag , index) => {
                    return <Text key={index} style={[style.hashtag]}> #{hashtag} </Text>
                  })
                }
              </View>
              <Input name={'Body'}
                    placeholderText={I18n.t('blogBody')}  
                    onChangeText={value => setBody(value)}
                    isTextarea={true}
                    defaultValue={body}
                    placeholderColor={'#C3C3C3'} 
                    color={'#000000'}  
              />
            </KeyboardAvoidingView>
        </ScrollView>
        <SafeAreaView style={[style.actionsContainer]}>
            <View style={{flexDirection : 'row'}}>
              <BorderlessButton onPress={launchCamera}>
                  <FastImage  source={require('../../assets/icons/camera.png')}
                              resizeMode={'contain'}
                              style={{width : 30 , height : 30 , marginStart : 15}} />
              </BorderlessButton>
              {/* <BorderlessButton>
                  <FastImage  source={require('../../assets/icons/video.png')}
                              resizeMode={'contain'}
                              style={{width : 30 , height : 30 , marginStart : 20 }} />
              </BorderlessButton> */}
            </View>
            <BorderlessButton onPress={launchImageLibrary}>
              <FastImage  source={require('../../assets/icons/gallary.png')}
                          resizeMode={'contain'}
                          style={{width : 30 , height : 30 , marginEnd : 15}} />
            </BorderlessButton>
        </SafeAreaView>
        <SubmitModal />
    </SafeAreaView>
}
 
export default NewBlog;
