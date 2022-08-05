import React, {
  useRef,
  useEffect,
  useState
} from 'react';
import { SafeAreaView, ScrollView, Text , View} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-share';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { BorderlessButton } from 'react-native-gesture-handler';

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

const StepThree = props => {
  const stylist = useSelector(state => state.stylist);
  const dispatch = useDispatch();
  const [certificates , setCertificates] = useState([]);
  const [editedItemIndex , setEditedItemIndex ] = useState(null);
  const [isEdit , setIsEdit ] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddModal , setShowAddModal ] = useState(false);
  const certificateRef = useRef(null);

  /**
  * Remove Certificate from the list 
  */
  const removeCertificate = (index) => {
    certificates.splice(index ,1) ;
    setCertificates([...certificates]);
    certificateRef.current?.slideOutDown();
  };

  /**
  * Remove Certificate from the list 
  */
  const editCertificate = (index) => {
    setIsEdit(true);
    setEditedItemIndex(index);
    setShowAddModal(true);
  };


  /**
  * Submit current step
  */
  const submitStep = () => {
    setIsLoading(true);
    //Submit certificates to api
    api.post(endpoints.stylistCertificate, certificates)
      .then(res => {
        setIsLoading(false);
        dispatch(updateStylistProfile({
          ...stylist.profile,
          certificates: res.data.data
        }));
        props.goToNext();
      })
      .catch(err => {
        setIsLoading(false);
        new Snackbar({text : err.response.data.message , type : 'danger'});
      });
  };

  useEffect(() => {
    //restore previous registered data
    if (stylist.profile.certificates) setCertificates(stylist.profile.certificates);
  }, []);

  const AddModal = () => {
    const stylist_id = stylist.profile.id;
    const [name , setName ] = useState();
    const [issuingOrganization , setIssuingOrganization ] = useState();
    const [yearsOfIssuance , setYearsOfIssuance] = useState();

    const onSubmitModal = () => {
        const newCertificate = {
          stylist_id, 
          certificate_name: name, 
          organization_name: issuingOrganization, 
          issurance_year:  yearsOfIssuance
        }

        if(isEdit){
          certificates[editedItemIndex] = newCertificate ;
          setCertificates([...certificates]);
          setIsEdit(false);
          setEditedItemIndex(null);
        }else{
          setCertificates([...certificates , newCertificate]);
          certificateRef.current?.slideInRight();
        }
        setShowAddModal(false);
    }

    return <Modal
            avoidKeyboard
            isVisible={showAddModal}
            style={{margin: 0,justifyContent:'flex-end' ,}}
          >
          <View style={[ModalStyle.actionModalContainer]}
                showsVerticalScrollIndicator={false}>
          <View style={ModalStyle.actionModalHeader}>
              <View style={{flex:1}}></View>
              <Text style={[ModalStyle.headerText , {flex:1}]}>
                    Add Certificate
              </Text>
              <Button 
                transparent  
                onPress={() => {
                    setIsEdit(false);
                    setEditedItemIndex(null);
                    setShowAddModal(false);
                }}
              >
                <FastImage source={require('../../../../assets/icons/close-colored.png')}
                            style={{width:20,height:20 , flex:1}} 
                            resizeMode={'contain'}
                />
              </Button>
          </View>
          <ScrollView>
              <Input name={'Name'} 
                    placeholderText={'Name'}  
                    onChangeText={(value) => setName(value)}
                    placeholderColor={'#ccc'} 
                    color={'#000'}
                    defaultValue={isEdit ? certificates[editedItemIndex].certificate_name : null}
              />
              <Input name={'Issuing organization'} 
                    placeholderText={'Issuing organization'}  
                    onChangeText={(value) => setIssuingOrganization(value)}
                    placeholderColor={'#ccc'} 
                    color={'#000'}
                    defaultValue={isEdit ? certificates[editedItemIndex].organization_name : null}
              />
              <Input name={'Year of issuance'} 
                    placeholderText={'Year of issuance'}  
                    onChangeText={(value) => setYearsOfIssuance(value)}
                    placeholderColor={'#ccc'} 
                    color={'#000'}
                    isNumeric
                    defaultValue={isEdit ? certificates[editedItemIndex].issurance_year : null}
              />
              <TallahButton  
                onPress={onSubmitModal}
                label={isEdit ? 'Edit' : 'Add'}
                labelColor={'#FFF'}
                isModal
                style={[ModalStyle.SecondaryButton,{flex:1}]}
                isLoading={isLoading}
              />
          </ScrollView>
        </View>
    </Modal>
  }


  return <SafeAreaView style={{height : '90%'}}>
    <Text
        style={[GeneralStyle.blackBoldText , 
              {marginStart : 15 , marginVertical : 8 , fontSize : 16}]}
    >
      Certificates
    </Text>
    <Add  
        type={'certificate'}
        onPress={() => setShowAddModal(true)}
    />
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
    >
    {
      certificates.map((item ,key ) => {
        return <Animatable.View
                    style={style.grayBoxContainer}
                    ref={certificateRef}
              >
          <View style={[GeneralStyle.rowSpaceBetween , {marginVertical: 5 , alignItems:'center'}]}>
            <Text
              style={[GeneralStyle.blackText, { flex:6 ,fontSize : 17 , fontWeight : '600'}]}
            >
              {item.certificate_name}
            </Text>
            <View
              style={[GeneralStyle.rowSpaceBetween , {flex:1 }]}
            >
              <BorderlessButton
                  rippleColor={'#CCC'}
                  onPress={() => editCertificate(key)}
              >
                  <FastImage 
                    source={require('../../../../assets/icons/edit.png')}
                    style={{width : 17 , height : 17}}
                  />
              </BorderlessButton>
              <BorderlessButton
                  rippleColor={'#CCC'}
                  onPress={() => removeCertificate(key)}
              >
                  <FastImage 
                    source={require('../../../../assets/icons/close-colored.png')}
                    style={{width : 16 , height : 16}}
                  />
              </BorderlessButton>
            </View>
          </View>
          <Text
              style={[GeneralStyle.grayText, {fontSize : 15 , marginTop : 8}]}
          >
            Organization :  {item.organization_name}
          </Text>
          <Text
              style={[GeneralStyle.grayText, {fontSize : 15 , marginTop : 8}]}
          >
            Year of Issuing :  {item.issurance_year}
          </Text>
        </Animatable.View>
      })
    }
    </ScrollView>
    <TallahButton 
      onPress={submitStep}
      labelColor = "#FFF"
      label = {I18n.t('next')}
      bgColor = "#D4AF37"
      style={{ padding: 15, width: '91%' }}
      isLoading={isLoading}
    />
    <AddModal />   
  </SafeAreaView>
}

export default StepThree ;