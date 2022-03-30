import React, {
  useState,
  useEffect
} from 'react';
import { SafeAreaView, Text , FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

//Styles
import GeneralStyle from '../../../../assets/styles/GeneralStyle';
import style from '../../../../assets/styles/StylistRequestStyle';
import TallahButton from '../../../../components/Button';
import Snackbar from '../../../../components/Snackbar';

import Add from './Add';

import I18n from '../../../../lang/I18n';
import AddProject from '../../Projects/AddProject';

//Apis
import api from '../../../../config/api';
import endpoints from '../../../../config/endpoints';

import { updateStylistProfile } from '../../../../redux/actions/stylist';
import AsyncStorage from '@react-native-community/async-storage';

const StepFour = props => {
   const dispatch = useDispatch();
   const navigation = useNavigation();
   const stylist = useSelector(state => state.stylist);
   const [showAddModal , setShowAddModal ] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [projects , setProjects] = useState([]);

   /**
    * Submit current step
    */
   const submitStep = async () => {
      if (!projects.length) return props.goToNext();

      setIsLoading(true);
      let data = new FormData();
      data.append('stylist_id', stylist.profile.id);
      console.log({
        projects: projects
      });

      projects.forEach((project, key) => {
        data.append(`projects[${key}]`, JSON.stringify(project));
      });
      console.log({ data: JSON.stringify(data) });
      const token = await AsyncStorage.getItem('token');
      fetch(endpoints.baseUrl + endpoints.stylistProject, {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: data,
        })
        .then((res) => res.json())
        .then((res) => {
            console.log({ res: JSON.stringify(res) });
          setIsLoading(false);
          // // Update redux stored stylist profile
          // dispatch(updateStylistProfile({
          //   ...stylist.profile,
          //   projects: res.data
          // }));
          // props.goToNext();
        })
        .catch(err => {
          console.log({ err });
          setIsLoading(false);
          new Snackbar({text : err.response.data.message , type : 'danger'});
        });
   };

   /**
    * Render project item
    */
   const renderItem = ({item , index}) => {
      return <BorderlessButton 
          key={index} 
          style={{flexDirection:'row'  , flexWrap :'wrap' ,
                  width :'29%' , height : 120  , margin: 10 , borderRadius : 5 , overflow:'hidden'}}
          onPress = {
            () => navigation.navigate('projectDetails', {
              projectId: item.id
            })
          }
        >
        {
          item?.images.map((item2 , key) => {
              return <FastImage 
                key={key}
                resizeMode={'contain'}
                source={item2}
                style={{flex:1,height : '100%' , width : '50%'}}
              />
          })
        }
      </BorderlessButton>
   };

   useEffect(() => {
     //restore previous registered data
     if (stylist.profile.projects) setProjects(stylist.profile.projects)
   }, []);

   return <SafeAreaView style={{height : '90%'}}>
      <Text
         style={[GeneralStyle.blackBoldText , 
               {marginStart : 15 , marginVertical : 8 , fontSize : 16}]}
      >
       Projects
      </Text>
      <Add  
        type={'project'}
        onPress={() => setShowAddModal(true)}
      />
      <FlatList 
          contentContainerStyle={[style.favoruitesListContainer]}
          showsVerticalScrollIndicator={false}
          horizontal = {false}
          keyExtractor={(item,index) => index.toString()}
          numColumns={3}
          data={projects}
          renderItem={renderItem}
      />
      <TallahButton 
        onPress={submitStep}
        labelColor = "#FFF"
        label = {I18n.t('next')}
        bgColor = "#D4AF37"
        style={{ padding: 15 , width : '91%' }}
        isLoading={isLoading}
      />
      <AddProject 
         showModal={showAddModal}
         onCloseModal={() => setShowAddModal(false)}
         onSubmitModal={(newProject) => { 
            setProjects([...projects , newProject]) ;
            setShowAddModal(false);
         }}
      />   
   </SafeAreaView>
}

export default StepFour;