import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton , BorderlessButton  } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import { SliderBox } from "react-native-image-slider-box";


//Styles
import GeneralStyle from '../../../assets/styles/GeneralStyle';
import ModalStyle from '../../../assets/styles/ModalStyle';

//Components 
import TallaButton from '../../../components/Button';
import Snackbar from '../../../components/Snackbar';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';

import I18n from '../../../lang/I18n';

const ProjectDetails = props => {
  const stylist = useSelector(state => state.stylist);
  const user = useSelector(state => state.user);
  const [project , setProject] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /**
  * Get current project data
  */
  const getProjectData = () => {
    console.log(`${endpoints.stylistProject}/${props.route.params.projectId}`)
    api.get(`${endpoints.stylistProject}/${props.route.params.projectId}`)
        .then(res => setProject(res.data.data))
        .catch((err) => console.log(err.response));
  };

  /**
  * Delete modal
  */
  const DeleteModal = () => {

    /**
     * Get brands
    */
    const deleteItem = () => {
        api.delete(`${endpoints.stylistProject}/${props.route.params.projectId}`)
            .then(res => {
              setShowDeleteModal(false);
              props.navigation.goBack();
              return new Snackbar({'type' : 'success', 'text': 'Project deleted successfully'});
            })
            .catch((err) => {
              console.log(err)
              new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
    };

    //Info Modal
    return <Modal isVisible={showDeleteModal}
                    animationIn={'bounceIn'}
                    backdropOpacity={.7}>
      <View style={ModalStyle.container}>                
        <FastImage 
          source={require('../../../assets/icons/delete-red.png')}
          resizeMode="contain"
          style={{width :  60  , height:  60 }}
        />
        <Text style={[ModalStyle.text,{fontFamily : 'Roboto-Bold'}]}>
            Are you sure that you want to delete this project?
        </Text>
        <View style={{flexDirection:"row"}}>
          <TallaButton   
            onPress={() => setShowDeleteModal(false) }
            label={'Cancel'}
            isModal
            labelColor={'#686868'}
            style={[ModalStyle.SecondaryButton,{
              backgroundColor:'#FFF',  marginEnd: 10, flex: 1,
              borderColor: '#CCC', borderWidth: 1}]}
          />
          <TallaButton  
            onPress={deleteItem}
            label={'Delete'}
            isModal
            labelColor={'#FFF'}
            style={[ModalStyle.SecondaryButton, {backgroundColor: '#FF0000', flex: 1}]}
          />
        </View>
      </View>
    </Modal>
  }

  useEffect(() => {
    getProjectData();
  }, []);
  
  return <View style={[GeneralStyle.container]}>
    <SafeAreaView style={[ GeneralStyle.header , {
        borderBottomLeftRadius : 0 , borderBottomRightRadius : 0,
        marginBottom: 20
      }]}
    >
      <View style={[GeneralStyle.rowSpaceBetween,{ width: '90%' }]}>
        <RectButton 
          style={{flex: 1, padding: 5, borderRadius: 5}} 
          onPress={() => props.navigation.goBack() }
        >
          <FastImage 
            source={require('../../../assets/icons/back-arrow.png')} 
            style={{width : 25 , height : 25}}  
            resizeMode="contain"
          />
        </RectButton>
        <Text style={[style.headerText, { flex: 1, textAlign: 'center'}]}>
            {project.name}
        </Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          { project && project.stylist_id == stylist.profile.id &&
            <BorderlessButton onPress={() => setShowDeleteModal(true)}>
              <FastImage source={require('../../../assets/icons/delete-colored.png')} 
                          style={{width : 25 , height : 25}} 
                          resizeMode={'contain'}
              />
            </BorderlessButton>
          }             
        </View>
      </View>
    </SafeAreaView>
      <View style={{flex:1}}>
        {
         project && project.images && project.images.length > 0 
          ?  <SliderBox 
              images={project?.images?.map(item => item.image)} 
              sliderBoxHeight={260}
              // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
              dotColor="#012647"
              inactiveDotColor="#EAEAEA"
              autoplay
              circleLoop
              paginationBoxVerticalPadding={20}
              resizeMethod={'resize'}
              resizeMode={'cover'}
              paginationBoxStyle={{
                position: "absolute",
                bottom: 0,
                padding: 0,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                paddingVertical: 10
              }}
              ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
              imageLoadingColor="#5D0D57"
            />
          : <FastImage 
              source={require('../../../assets/images/closet-item-default.png')}
              style={{ width: '100%', height: '30%'}}
            />
        }
        <View style={{width : '100%' , backgroundColor: '#F8F8F8', 
                    padding : 20, marginTop : 15,borderRadius : 10}}
        >
          <Text  style={[GeneralStyle.blackText , {lineHeight : 23}]}>
            {project.description}
          </Text>
        </View>
      </View>
      <DeleteModal />
  </View>
};

export default ProjectDetails;
