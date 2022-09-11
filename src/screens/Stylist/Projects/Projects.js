import React , {useState , useRef, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, ImageBackground , FlatList, SafeAreaView} from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import GeneralStyle from '../../../assets/styles/GeneralStyle';

import TallahButton from '../../../components/Button';
import AddProject from './AddProject';

//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';
import Snackbar from '../../../components/Snackbar';
import AsyncStorage from '@react-native-community/async-storage';

const Projects = props => {
   const stylist = useSelector(state => state.stylist);
   const user = useSelector(state => state.user);
   const [projects , setProjects] = useState([]);
   const [showAddModal , setShowAddModal ] = useState(false);
   const navigation = useNavigation();
   const projectRef = useRef(null);


   /**
   * Get current stylist data
   */
   const getStylistProjects = () => {
      const stylistId = props.route.params.stylistId ?? stylist.id;

      api.get(`${endpoints.stylistProject}?stylist_id=${stylistId}`)
        .then(res => setProjects(res.data.data));
   };

   /*
    * Submit new Project
    */
   const submitNewProject = async (newProject) => {
    let data = new FormData();
    data.append('stylist_id', stylist.id);
    data.append('name', newProject.name);
    data.append('description', newProject.description);
    if (newProject.images.length) {
      newProject.images.forEach((image, key) => data.append(`images[${key}]`, image));
    }
    
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
        setProjects([...projects , newProject]);
        new Snackbar({text : 'Project added successfully' , type : 'success'});
      })
      .catch(err => {
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
                width:'29%', height: 120, margin: 10, borderRadius: 5, overflow: 'hidden'}}
        onPress={() => navigation.navigate('projectDetails',{ projectId : item.id})}
      >
      {
        item?.images?.map((item2 , key) => {
          return <FastImage 
            key={key}
            resizeMode={'contain'}
            source={{uri: item2.image}}
            style={{flex:1,height : '100%' , width : '50%' , borderRadius : 5}}
          />
        })
      }
    </BorderlessButton>
   };

   useEffect(() => {
      getStylistProjects();
      // Subscribe for the focus Listener
      const unsubscribe = props.navigation.addListener('focus', () => {
        getStylistProjects();
      });

      return unsubscribe;
   }, []);

   return <View style={[GeneralStyle.container]}>
          <SafeAreaView style={[ GeneralStyle.header]}
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
              <Text style={[style.headerText, { flex: 2, textAlign: 'center' }]}>
                  My Protfolio
              </Text>
              <View style={{flex: 1 }} />
            </View>
          </SafeAreaView>
         {
          projects.length == 0 ?
            <View style={{flex:1 , justifyContent:'center' , alignItems:'center'}}>
                <FastImage
                  source={require('../../../assets/images/wardrobe.png')}
                  style={{width : 120 , height : 120 , marginBottom : 20}}
                  resizeMode={'contain'}
                />
                <Text
                  style={{fontSize : 20 , color : '#ABAAAB'}}
                >
                  No projects added yet
                </Text>
            </View>
            :
            <FlatList 
              //  contentContainerStyle={[style.favoruitesListContainer]}
              showsVerticalScrollIndicator={false}
              horizontal = {false}
              keyExtractor={(item,index) => index.toString()}
              numColumns={3}
              data={projects}
              renderItem={renderItem}
            />
         }
         <SafeAreaView>
          {
            user.isLoggedIn && stylist.account && (props.route.params.stylistId === stylist.account.id)  &&
            <TallahButton 
              onPress={() => setShowAddModal(true)}
              labelColor = "#FFF"
              label = {'Add Project'}
              bgColor = "#D4AF37"
              style={{ padding: 15 , width: '91%' }}
            />
          }
         </SafeAreaView>
   
         <AddProject 
            showModal={showAddModal}
            onCloseModal={() => setShowAddModal(false)}
            onSubmitModal={(newProject) => {
              submitNewProject(newProject);
              setShowAddModal(false);
            }}
         />  
   </View>
};

export default Projects;
