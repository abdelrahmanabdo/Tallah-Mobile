import React, { useRef, useState, useEffect} from 'react';
import { Dimensions, Pressable, SafeAreaView, ScrollView, Text , View} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-share';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

//Styles
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import style from '../../../../assets/styles/StylistRequestStyle';
import Input from '../../../../components/Input';
import TallahButton from '../../../../components/Button';

import Add from './Add';
import ModalStyle from '../../../../assets/styles/ModalStyle';
import Snackbar from '../../../../components/Snackbar';

import I18n from '../../../../lang/I18n';

//Apis
import api from '../../../../config/api';
import endpoints from '../../../../config/endpoints';

import { updateStylistProfile } from '../../../../redux/actions/stylist';

const {width , height} = Dimensions.get('window');


const StepFive = props => {
   const dispatch = useDispatch();
   const stylist = useSelector(state => state.stylist);
   const [showAddModal , setShowAddModal ] = useState(false);
   const [specializations , setSpecializations] = useState([]);
   const specializationRef = useRef(null);
   const [isEdit , setIsEdit ] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [editedItemIndex , setEditedItemIndex ] = useState(null);
   /**
    * Remove Certificate from the list 
    */
   const removeSpecialization = (index) => {
      specializations.splice(index,1);
      setSpecializations([...specializations]);
   };

   /**
    * Submit current step
    */
   const submitStep = () => {
      setIsLoading(true);
      // Submit project specializations to api
      api  
         .post(endpoints.stylistSpecialization, specializations)
         .then(res => {
            setIsLoading(false);
            // Update redux stored stylist profile
            dispatch(updateStylistProfile({
              ...stylist.profile,
              specializations: res.data.data
            }))
            props.goToNext();
         })
         .catch(err => {
            setIsLoading(false);
            console.log(err.response.data);
            new Snackbar({text : err.response.data.message , type : 'danger'});
         });
   };

   /**
    * Add new Specialization item
    */
   const AddModal = () => {
      const [selectedItem , setSelectedItem] = useState(null);
      const [specializationTypes , setSpecializationTypes ] = useState([]);

      /**
         * Get Countries
         */
      const getSpecialization = () => {
         api  
            .get(endpoints.specializations)
            .then(res => setSpecializationTypes(res.data.data));
      };

      const onSubmitModal = () => {
         if(selectedItem == null) return
         let selectedSpecializationData = specializationTypes[selectedItem];
         selectedSpecializationData.specialization_id = selectedSpecializationData.id;
         setSpecializations([...specializations, selectedSpecializationData]);
         setIsEdit(true);
         setEditedItemIndex(specializations.length);
         setShowAddModal(false);
         specializationRef.current?.slideInRight();
      };

      useEffect(() => {
        getSpecialization();
      }, []);

      return <Modal
               isVisible={showAddModal}
               style={{margin: 0,justifyContent:'flex-end' }}
            >
            <View style={[ModalStyle.actionModalContainer , 
                         {borderTopRightRadius : 0 , borderTopLeftRadius : 0 , 
                          height : height, maxHeight : '100%' }]}
                  showsVerticalScrollIndicator={false}>
            <View style={[ModalStyle.actionModalHeader , {marginTop : 15}]}>
               <View style={{flex:1}}></View>
               <Text style={[ModalStyle.headerText , {flex:2 , textAlign:'center'}]}>
                Select specialization
               </Text>
               <Button 
                  transparent  
                  onPress={() => setShowAddModal(false)}>
                  <FastImage source={require('../../../../assets/icons/close-colored.png')}
                             style={{width:20,height:20 , flex:1}} 
                             resizeMode={'contain'}
                  />
               </Button>
            </View>
            <Text
               style={[GeneralStyle.blackText , 
                      {alignSelf:'center' , marginBottom : 10}]}
            >
              Which specialty suits your experience
            </Text>
            <ScrollView>
               {
                  specializationTypes.map((item , key) => {
                     return <Pressable
                        style={{
                           backgroundColor:  selectedItem == key ?  '#012647' : '#F8F8F8',
                           padding : 15,
                           borderRadius : 8 ,
                           marginVertical : 10
                        }}
                        onPress={() => setSelectedItem(key)}
                     >
                        <Animatable.View
                           animation={'fadeIn'}
                        >
                           <Text
                              style={[GeneralStyle.blackText , 
                                     {fontSize : 16 , fontWeight : '600' ,
                                      marginBottom:5 , color : selectedItem == key ? '#fff' : '#000'
                                     }]}
                           >
                              {item.title}
                           </Text>
                           <Text
                              style={[GeneralStyle.blackText , 
                                     {fontSize : 12 , marginBottom:5,
                                       color : selectedItem == key ? '#fff' : '#000'
                                     }]}
                           >
                             {item.description}
                           </Text>
                        </Animatable.View>
                     </Pressable>
                  })
               }
            </ScrollView>
            <TallahButton  
              onPress={onSubmitModal}
              label={'Add'}
              labelColor={'#FFF'}
              isModal
              style={[ModalStyle.SecondaryButton]}
            />
         </View>
      </Modal>
   }

   useEffect(() => {
     //restore previous registered data
     if (stylist.profile.specializations) setSpecializations(stylist.profile.specializations)
   }, [])

   return <SafeAreaView style={{height: '90%'}}>
      <Text
         style={[GeneralStyle.blackBoldText , 
               {marginStart : 15 , marginVertical : 8 , fontSize : 16}]}
      >
       Specializations
      </Text>
      <Add  
         type={'specialization'}
         onPress={() => setShowAddModal(true)}
      />
      <ScrollView
         contentContainerStyle={{ flexGrow: 1 }}
      >
         {
            specializations.map((item ,key ) => {
               return <>
               {
                  isEdit && (editedItemIndex == key) ?
                  <Animatable.View
                           style={style.grayBoxContainer}
                           ref={specializationRef}
                  >

                     <Text
                        style={[GeneralStyle.blackText, 
                              {textAlign :'center' , alignSelf:'center',fontSize : 16 ,
                               width:'75%', marginBottom : 8}]}
                     >
                        {item.title}
                     </Text>
                  <Input 
                      name={'Service description'} 
                      color={'#000'}
                      placeholderText={'What the client should expect from you (will appear on your profile)'}  
                      placeholderColor={'#CCC'}
                      isTextarea={true}
                      rowsCount={3}
                      defaultValue={item.description}
                      onChangeText={(value) => specializations[key].description = value}
                  />
                  <Input 
                     name={'Price starts from'}
                     color={'#000'}
                     placeholderColor={'#CCC'}
                     placeholderText={'Price starts from:'}
                     defaultValue={item.start_price}
                     onChangeText={(value) => specializations[key].start_price = value}
                  />
                  <View
                     style={[GeneralStyle.rowSpaceBetween]}
                  >
                     <TallahButton
                           onPress={() => setIsEdit(false)}
                           labelColor = "#707070"
                           label = {'Cancel'}
                           bgColor={'#F8F8F8'}
                           style={{ padding: 15 , width : '48%' ,borderWidth : .6, borderColor : '#707070'  }}
                     />
                     <TallahButton
                           onPress={() => { 
                              specializations[key].stylist_id = stylist.profile.id;
                              setIsEdit(false);
                           }}
                           labelColor = "#FFF"
                           label = {'Save'}
                           bgColor = "#D4AF37"
                           style={{ padding: 15, width: '48%' }}
                     />
                  </View>
               </Animatable.View>
               :
               <Animatable.View
                           style={style.grayBoxContainer}
                           ref={specializationRef}
                      >
                  <View
                     style={[GeneralStyle.row , 
                            {marginVertical: 10, justifyContent:'flex-end'}]}
                  >
                        <BorderlessButton
                           rippleColor={'#CCC'}

                           onPress={() => {setEditedItemIndex(key);setIsEdit(true)}}
                        >
                           <FastImage 
                              source={require('../../../../assets/icons/edit.png')}
                              style={{width : 17 , height : 17 , marginEnd : 20}}
                           />
                        </BorderlessButton>
                        <BorderlessButton
                           rippleColor={'#CCC'}
                           onPress={() => removeSpecialization(key)}
                        >
                           <FastImage 
                              source={require('../../../../assets/icons/close-colored.png')}
                              style={{width : 16 , height : 16}}
                           />
                        </BorderlessButton>
                  </View>
                  <View
                     style={[GeneralStyle.row ,{marginVertical :5}]}
                  >
                     <Text
                        style={[GeneralStyle.grayText, 
                              {flex:1,fontSize : 15 }]}
                     >
                        Specialization : 
                     </Text>
                     <Text
                        style={[GeneralStyle.blackText, 
                                {flex:2,fontSize : 15}]}
                     >
                        {item.title ?? item.specialization?.title}
                     </Text>
                  </View>                 
                  <View
                     style={[GeneralStyle.row ,{marginVertical :5}]}
                  >
                     <Text
                        style={[GeneralStyle.grayText, 
                              {flex:1,fontSize : 15 }]}
                     >
                        Description : 
                     </Text>
                     <Text
                        style={[GeneralStyle.blackText, 
                                 {flex:2,fontSize : 15}]}
                     >
                        {item.description}
                     </Text>
                  </View>
                  <View
                     style={[GeneralStyle.row ,{marginVertical :5}]}
                  >
                     <Text
                        style={[GeneralStyle.grayText, 
                              {flex:1,fontSize : 15 }]}
                     >
                        Starting Price : 
                     </Text>
                     <Text
                        style={[GeneralStyle.blackText, 
                                 {flex:2,fontSize : 15}]}
                     >
                        {item.start_price}
                     </Text>
                  </View>
               </Animatable.View>
               }
               </>
            })
         }
      </ScrollView>
      <TallahButton 
        onPress={submitStep}
        labelColor = "#FFF"
        label = {I18n.t('next')}
        bgColor = "#D4AF37"
        enabled={specializations.length !== 0}
        style={{ padding: 15 , width : '91%'}}
        isLoading={isLoading}
      />

      <AddModal />   
   </SafeAreaView>
}

export default StepFive ;