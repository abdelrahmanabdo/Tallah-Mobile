import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground, SafeAreaView ,FlatList,ScrollView, Image, Platform } from 'react-native';
import { Button } from 'native-base';
import { BaseButton, BorderlessButton, RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import * as ImagePicker from "react-native-image-picker";
import Modal from 'react-native-modal';
//Components
import Phone from '../../components/Phone';
import Dropdown from '../../components/Dropdown';
import TallaButton from '../../components/Button';
import Datepicker from '../../components/DatePicker';
import Selector from '../../components/Selector';
import Snackbar from '../../components/Snackbar';

// 
import I18n from '../../lang/I18n';
import style from '../../assets/styles/CreateProfileStyle';
import ModalStyle from '../../assets/styles/ModalStyle';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

import {
  updateProfile,
  changeCompletedProfileStatus
} from '../../redux/actions/user';
import AsyncStorage from '@react-native-community/async-storage';


const CreateProfile = ({...props}) => {
   const user = useSelector(state => state.user);
   const dispatch = useDispatch();
   const [ activeStep, setActiveStep ] = useState(props.activeStep ?? 1);
   const [ showModal, setShowModal ] = useState(false);
   const [ modalText, setModalText ] = useState('');


   //Go to Next Step 
   const goToNext = () => {
      if (activeStep < 6) {
        setActiveStep(activeStep + 1);
      } else {
        if (user.isCompletedProfile) {
          props.navigation.navigate('profile');
        } else {
          setModalText('finishCreateAccountText');
          setShowModal(true);
        }
      }
   };

   //Thanks Modal
   const ThanksModal = () => {
      return <Modal isVisible={showModal}
                     animationIn={'bounceIn'}
                     backdropOpacity={.7}>
         <View style={ModalStyle.container}>
            <Text style={[ModalStyle.text,{lineHeight: 30}]}>
               {I18n.t(modalText)}
            </Text>
            <TallaButton 
              isModal={true}
              label={'Ok'}
              bgColor={'#D4AF37'}
              labelColor ={'#FFF'}
              onPress={() => {
                setActiveStep(1);
                setShowModal(false);
                props.navigation.navigate('profile');
              }}
              style={ModalStyle.SecondaryButton}
            />
         </View>
      </Modal>
   }

   // Step One Container
   const StepOne = () => {
      const [stepOneData, setStepOneData] = useState({
        'user_id': parseInt(user.account?.id),
        ...user?.account?.profile,
      });
      const [countries , setCountries] = useState([])
      const [cities , setCities] = useState([
        {
          'id': 1,
          'name_en': 'Cairo',
          'name_ar': 'القاهرة',
        },
        {
          'id': 2,
          'name_en': 'Alexandria',
          'name_ar': 'الإسكندرية',
        },
        {
          'id': 3,
          'name_en': 'Menia',
          'name_ar': 'المنيا',
        },
      ]);
      const [isLoading, setIsLoading] = useState(false);

      /**
       * Get Countries
       */
      const getCountries = async () => {
        await api.get(endpoints.countries)
            .then(res => setCountries(res.data.data));
      };

      /**
       * Validator
       */
      const validator = () => {
         if (!stepOneData.phone) return new Snackbar({text : I18n.t('phoneIsRequired') , type : 'danger'}), false;
         if (stepOneData.phone.length < 11) return new Snackbar({text : I18n.t('phoneLengthLongerThan11') , type : 'danger'}), false;
         if (!stepOneData.country_id) return new Snackbar({text : I18n.t('countryIsRequired') , type : 'danger'}), false;
         if (!stepOneData.city_id) return new Snackbar({text : I18n.t('cityIsRequired') , type : 'danger'}), false;
         if (!stepOneData.birth_date) return new Snackbar({text : I18n.t('birthdateIsRequired') , type : 'danger'}), false;
         return true;
      };
      
      /**
       * Step one submition handler
       */
      const stepOneSubmit = async () => {
        if (!validator()) return;
        setIsLoading(true);

        const data = new FormData();
        data.append('user_id', user.account.id);
        data.append('phone', stepOneData.phone);
        data.append('country_id', stepOneData.country_id);
        data.append('city_id', stepOneData.city_id);
        data.append('birth_date', stepOneData.birth_date);
        if (stepOneData.avatar) {
          data.append('avatar', stepOneData.avatar);
        }
        const token = await AsyncStorage.getItem('token');
        fetch(endpoints.baseUrl + endpoints.profile, {
            method: 'post',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: data,
          })
          .then((res) => res.json())
          .then((res) => {
            setIsLoading(false);
            //Update redux stored user profile
            dispatch(updateProfile(res.data));
            //Navigate to next step
            goToNext();
          })
          .catch(err => {
            setIsLoading(false);
            new Snackbar({
              text: I18n.t('unknownError'),
              type: 'danger'
            });
          });
      }

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
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            console.log({response});
            setStepOneData({...stepOneData, avatar: response.assets[0]});
          }
        });
      }

      useEffect(() => {
        //Get all countries
        getCountries();
        console.log(stepOneData)
      }, []);

      return (
         <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity 
              activeOpacity={.4}
              onPress={launchImageLibrary}
              style={style.uploadPictureButton}
            >
              {
                stepOneData.avatar ?
                  <FastImage source= {
                      typeof stepOneData.avatar === 'string' 
                        ? {uri: stepOneData.avatar}
                        : stepOneData.avatar
                      }
                      style={style.uploadPictureButton}
                  />
                  :
                  <>
                    <FastImage source={require('../../assets/icons/camera.png')}
                                  resizeMode="contain"
                                  style={{width : 30 , height:30}}/>
                    <Text style={{color : '#FFF' ,textAlign : 'center',width:'60%'}}>
                      Upload Your Picture
                    </Text>
                  </>
              }
            </TouchableOpacity>
            <Phone 
              name={I18n.t('phone')} 
              placeholderText={I18n.t('phone')}  
              onChangeText={ value => setStepOneData({ ...stepOneData, phone: value}) }
              placeholderColor={'#CCC'} 
              defaultValue={stepOneData.phone}
            />
            <Dropdown 
               items={countries}
               selectedValue={stepOneData.country_id}
               name={'country'}
               placeholderText={'#012647'}
               onChangeValue={ value => setStepOneData({ ...stepOneData, country_id: value})}
            />
            <Dropdown 
               items={cities}
               selectedValue={stepOneData.city_id}
               name={'city'}
               placeholderText={'#012647'}
               onChangeValue={ value => setStepOneData({ ...stepOneData, city_id: value}) }
            />
            <Datepicker 
               isCalendar = {true}
               name={'Birth Date'}
               selectedValue={stepOneData.birth_date}
               onChangeValue={ value => setStepOneData({ ...stepOneData, birth_date: value}) }
            />
            <TallaButton 
               onPress={stepOneSubmit}
               label = {user.isCompletedProfile ? I18n.t('update') : I18n.t('next')}
               bgColor = "#D4AF37"
               style={{padding: 15 , width: '91%'}}
               labelColor = "#FFF"
               isLoading={isLoading}
            />
         </ScrollView>
      )
   }

   // Step Two Container
   const StepTwo= () => {
      const [ selected , setSelected ] = useState();
      const [ activeStep, setActiveStep ] = useState(1);
      const [ showShapeModal, setShowShapeModal ] = useState(false);
      const [ modalImage, setModalImage ] = useState('');
      const [ modalSubText, setModalSubText ] = useState('');
      const [ isLoading, setIsLoading ] = useState(false);
      const [ data, setData ] = useState([]);
      const [ firstStepChoices ] = useState([
        { 
          id: 1,
          title: 'Rectangle',
          image: require('../../assets/images/rectangle-shape.png'),
        },
        {
          id: 2,
          title: 'Triangle',
          image: require('../../assets/images/triangle-shape.png'),
        },
        {
          id: 3,
          title: 'Inverted Triangle',
          image: require('../../assets/images/inverted-triangle-shape.png'),
        },
        {
          id: 4,
          title: 'Round',
          image: require('../../assets/images/round-shape.png'),
        },
        {
          id: 5,
          title: 'Hourglass',
          image: require('../../assets/images/hourglass-shape.png'),
        },
      ]);

      /**
       * Get Body shape choices
       */
      const getBodyShapeChoices = async () => {
         await api.get(endpoints.registrationChoices + '?type=body_shape')    
                  .then(res => setData(res.data.data));
      }

      const RenderItem = (item, index) => {
         return <Selector 
            isRadio={true}
            item={item}
            isCurrentSelected={selected == item.item.id}
            onSelect={ value => {
              setSelected(value);
              if(value == 6) props.navigation.navigate('bodyShapeCalculator')
            }}
        />
      }

      const submitFirstStepChoices = () => {
        if (!selected) return new Snackbar({
           text: I18n.t('shouldSelectOneAtLeast'),
           type: 'danger'
        });
        const bodyShape = firstStepChoices[selected - 1].title;
        if (bodyShape == 'Rectangle') {
          setModalSubText('Captivating');
          setModalImage(require('../../assets/images/captivating.png'));
        }
        if (bodyShape == 'Triangle') {
          setModalSubText('Hottie');
          setModalImage(require('../../assets/images/hottie.png'));
        }
        if (bodyShape == 'Inverted Triangle') {
          setModalSubText('Charming');
          setModalImage(require('../../assets/images/charming.png'));
        }
        if (bodyShape == 'Round') {
          setModalSubText('Attractive');
          setModalImage(require('../../assets/images/attractive.png'));
        }
        if (bodyShape == 'Hourglass') {
          setModalSubText('Glamourous');
          setModalImage(require('../../assets/images/glamorous.png'));
        }
        setShowShapeModal(true);
      }

      /**
       * Submit current step handler
       */
      const submitStep = () => {
         if (!selected) return new Snackbar({text : I18n.t('shouldSelectOneAtLeast') , type : 'danger'}); 
         setIsLoading(true);
         //Submit data to api
         api.put(endpoints.profile + '/' + user.account?.profile.id, {
               'body_shape_id' : selected
            })
            .then(res => {
               setIsLoading(false);
               //Update redux stored user profile
               dispatch(updateProfile(res.data.data));
               //Navigate to next step
               goToNext();
            })
            .catch(err => {
               setIsLoading(false);
               new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
      }
 
      //Info Modal
      const InfoModal = () => {
          return <Modal isVisible={showShapeModal}
                        animationIn={'bounceIn'}
                        backdropOpacity={.7}
            >
            <View style={ModalStyle.container}>
              <FastImage 
                source={modalImage != ''? modalImage : require('../../assets/icons/info-modal.png')}
                resizeMode="contain"
                style={{width : modalSubText == '' ? 60 : 100 , height: modalSubText == '' ? 60 : 100}}
              />
              <Text style={ModalStyle.text}>
                Your body shape is
              </Text>
              {
                modalSubText != '' &&
                <Text style={ModalStyle.subText}>
                  {modalSubText}
                </Text>
              }
              <TallaButton 
                isModal={true}
                label={'Ok'}
                bgColor={'#D4AF37'}
                labelColor ={'#FFF'}
                onPress={() => {  
                  setActiveStep(2);
                  setModalSubText('');
                  setModalImage('');
                  setShowShapeModal(false);
                }}
                style={ModalStyle.SecondaryButton}
              />
            </View>
          </Modal>
      }

      useEffect(() => {
        if (activeStep === 1 ) {
          setData(firstStepChoices);
        } else {
          getBodyShapeChoices();
        }
        if (user.account?.profile.body_shape) {
          setActiveStep(2);
          setSelected(user.account.profile.body_shape.id);
        }
      }, [activeStep]);

      return (
         <>
          <Text style={style.stepHeaderText}>
             {I18n.t('howUniqueYourBody')}
          </Text>
          {/* <FlatList  
            contentContainerStyle={{ alignSelf:'center', marginStart: 20 }}
            horizontal={false}
            data={data}
            numColumns={2}
            key={'h'}
            renderItem={(item, index)=> renderItem(item, index)}
            keyExtractor={(item, index) => item.title}
            extraData={activeStep}
          /> */}
          <ScrollView>
           {data && (
              <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              {data.map((item) => (
                <RenderItem key={item.id} item={item} />
              ))}
              </View>
          )}
         </ScrollView>
         <TallaButton 
            onPress={
              activeStep == 2
                ? submitStep
                : submitFirstStepChoices
            }
            label = {user.isCompletedProfile ? I18n.t('update') : I18n.t('next')}
            bgColor = "#D4AF37"
            style={{ padding: 15 , width: '91%' }}
            labelColor = "#FFF"
            isLoading={isLoading}
          />
          <InfoModal />
      </>
      )
   }


   // Step Three Container
   const StepThree = () => {
      const [selected , setSelected] = useState(0);      
      const [data, setData] = useState([])
      const [isLoading, setIsLoading] = useState(false);

      /**
       * Get Body shape choices
       */
      const getSkinColorsChoices = () => {
         api  
            .get(endpoints.registrationChoices + '?type=skin_glow')
            .then(res => setData(res.data.data))
      }

      const renderItem = (item) => {
         return  <Selector isRadio={true}
                           item={item}
                           isCurrentSelected={selected == item.item.id}
                           onSelect={(value)=>{setSelected(value)}}/>
      }

      /**
       * Submit current step handler
       */
      const submitStep = () => {
         if (!selected) return new Snackbar({text : I18n.t('shouldSelectOneAtLeast') , type : 'danger'});  

         setIsLoading(true);
         //Submit data to api
         api  
            .put(endpoints.profile + '/' + user.account?.profile.id, {
               'skin_glow_id' : selected
            })
            .then(res => {
               setIsLoading(false);
               //Update redux stored user profile
               dispatch(updateProfile(res.data.data));
               //Navigate to next step
               goToNext();
            })
            .catch(err => {
               setIsLoading(false);
               new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
      }

      useEffect(() => {
         getSkinColorsChoices();
         //restore previous registered data
         if (user.account?.profile.skin_glow)
          setSelected(user.account.profile.skin_glow.id)
      },[]);

      return (
         <>
          <Text style={style.stepHeaderText}>
             {I18n.t('whichSkinColor')}
          </Text>
          <Text style={style.note}>
             {I18n.t('whichSkinColorNote')}
          </Text>
          <FlatList  
            contentContainerStyle={{alignSelf:'center',marginVertical: 10}}
            horizontal={false}
            data={ data}
            numColumns={2}
            key={( 'h' )}
            renderItem = {(item)=> renderItem(item)}
            keyExtractor={(item, index) => index}
         />
         <TallaButton 
            onPress={submitStep}
            label = {user.isCompletedProfile ? I18n.t('update') : I18n.t('next')}
            bgColor = "#D4AF37"
            style={{padding: 15 , width: '91%'}}
            labelColor = "#FFF"
            isLoading={isLoading}
         />
      </>
      )
   }

   // Step Four Container
   const StepFour = () => {
      const [selectedIds , setSelectedIds] = useState([]);      
      const [selectedData , setSelectedData] = useState([]);      
      const [data, setData] = useState([]);
      const [isLoading, setIsLoading] = useState(false);

      /**
       * Get Body shape choices
       */
      const getJobChoices = () => {
         api  
            .get(endpoints.registrationChoices + '?type=job')
            .then(res => setData(res.data.data))
      }

      const renderItem = (item) => {
         return  <Selector 
            item={item}
            isCurrentSelected={selectedIds.includes(item.item.id)}
            onSelect={value => {
              if (selectedIds.includes(value)) {
                  //Remove item from selected ids
                  setSelectedIds(selectedIds.filter(item => item !== value));
                  //Remove item from final selected data object
                  setSelectedData(selectedData.filter(item => item.id !== value));
              } else {
                  //If user selected 3 choices and reached his limit
                  if (selectedIds.length === 3) return new Snackbar({text : I18n.t('maximun3') , type : 'danger'}); 
                  setSelectedIds([...selectedIds, value]);
                  setSelectedData([...selectedData, {id: value, title: item.item.title}])
              }
            }}
        />
      }

      /**
       * Submit current step handler
       */
      const submitStep = () => {
         if (selectedIds.length === 0) return new Snackbar({text : I18n.t('shouldSelectOneAtLeast') , type : 'danger'});  
         
         setIsLoading(true);
         //Submit data to api
         api  
            .put(endpoints.profile +'/'+ user.account?.profile.id, {
               'job_id' : selectedData
            })
            .then(res => {
               setIsLoading(false);
               //Update redux stored user profile
               dispatch(updateProfile(res.data.data));
               //Navigate to next step
               goToNext();
            })
            .catch(err => {
               setIsLoading(false);
               new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
      }

      useEffect(()=>{
         getJobChoices();
         
         //restore previous registered data
         if (user.account.profile.jobs) {
            let selected = user.account.profile.jobs ?
                           user.account.profile.jobs.map(item => item.id)
                           : [];
            setSelectedIds([...selected]);
            setSelectedData(user.account.profile.jobs);
         }
         
         return () => {}
      },[]);

      return (
         <>
          <Text style={style.stepHeaderText}>
             {I18n.t('youArePretty')}
          </Text>
          <FlatList  
            contentContainerStyle={{alignSelf:'center',marginVertical: 5}}
            horizontal={false}
            data={ data}
            numColumns={2}
            key={( 'h' )}
            renderItem = {(item)=> renderItem(item)}
            keyExtractor={(item, index) => index}
         />
         <TallaButton 
            onPress={submitStep}
            label = {user.isCompletedProfile ? I18n.t('update') : I18n.t('next')}
            bgColor = "#D4AF37"
            style={{padding: 15 , width: '94%'}}
            labelColor = "#FFF"
            isLoading={isLoading}
          />
      </>
      )
   }

 
   // Step Five Container
   const StepFive = () => {
      const [selectedIds , setSelectedIds] = useState([]);      
      const [selectedData , setSelectedData] = useState([]);      
      const [data, setData] = useState([]);
      const [isLoading, setIsLoading] = useState(false);

      /**
       * Get Fashion goal choices
       */
      const getFashionGoalChoices = () => {
         api  
            .get(endpoints.registrationChoices + '?type=goal')
            .then(res => setData(res.data.data))
      }

      const renderItem = (item) => {
         return  <Selector 
            item={item}
            isCurrentSelected={selectedIds.includes(item.item.id)}
            onSelect={value => {
              if (selectedIds.includes(value)) {
                //Remove item from selected ids
                setSelectedIds(selectedIds.filter(item => item !== value));
                //Remove item from final selected data object
                setSelectedData(selectedData.filter(item => item.id !== value));
              } else {
                //If user selected 3 choices and reached his limit
                if (selectedIds.length === 3) return new Snackbar({text : I18n.t('maximun3') , type : 'danger'}); 

                setSelectedIds([...selectedIds, value]);
                setSelectedData([...selectedData, {id: value, title: item.item.title}])
              }
            }}
          />
      }

      /**
       * Submit current step handler
       */
      const submitStep = () => {
         if (selectedIds.length === 0) return new Snackbar({text : I18n.t('shouldSelectOneAtLeast') , type : 'danger'});  
         
         setIsLoading(true);
         //Submit data to api
         api  
            .put(endpoints.profile + '/' + user.account?.profile.id, {
               'goal_id' : selectedData
            })
            .then(res => {
               setIsLoading(false);
               //Update redux stored user profile
               dispatch(updateProfile(res.data.data));
               //Navigate to next step
               goToNext();
            })
            .catch(err => {
               setIsLoading(false);
               new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
            });
      }

      useEffect(()=>{
         getFashionGoalChoices();

         //restore previous registered data
         if (user.account?.profile.goals) {
            let selected = user.account.profile.goals ?
                           user.account.profile.goals.map(item => item.id)
                           : [];
            setSelectedIds([...selected]);
            setSelectedData(user.account.profile.goals);
         }
         return () => {}
      },[]);

      return (
         <>
          <Text style={style.stepHeaderText}>
             {I18n.t('fashionGoal')}
          </Text>
          <FlatList  
            contentContainerStyle={{alignSelf:'center',marginVertical: 5}}
            horizontal={false}
            data={ data}
            numColumns={2}
            key={( 'h' )}
            renderItem = {(item)=> renderItem(item)}
            keyExtractor={(item, index) => index}
         />
         <TallaButton 
            onPress={submitStep}
            label = {user.isCompletedProfile? I18n.t('update') : I18n.t('next')}
            bgColor = "#D4AF37"
            style={{padding: 15 , width: '94%'}}
            labelColor = "#FFF"
            isLoading={isLoading}
        />
      </>
      )
   }
 
   // Step Six Container
   const StepSix = () => {
      const [selectedIds , setSelectedIds] = useState([]);      
      const [selectedData , setSelectedData] = useState([]);      
      const [data, setData] = useState([]);
      const [isLoading, setIsLoading] = useState(false);

      /**
       * Get Fashion goal choices
       */
      const getFavouriteStyleChoices = () => {
         api  
            .get(endpoints.registrationChoices + '?type=favourite_style')
            .then(res => setData(res.data.data))
      }

      const renderItem = (item) => {
         return  <Selector isRadio={false}
                           item={item}
                           isCurrentSelected={selectedIds.includes(item.item.id)}
                           onSelect={value => {
                              if (selectedIds.includes(value)) {
                                 //Remove item from selected ids
                                 setSelectedIds(selectedIds.filter(item => item !== value));
                                 //Remove item from final selected data object
                                 setSelectedData(selectedData.filter(item => item.id !== value));
                              } else {
                                 //If user selected 3 choices and reached his limit
                                 if (selectedIds.length === 3) return new Snackbar({text : I18n.t('maximun3') , type : 'danger'});     

                                 setSelectedIds([...selectedIds, value]);
                                 setSelectedData([...selectedData, {id: value, title: item.item.title}])
                              }
                           }}
                  />
      }

      /**
       * Submit current step handler
       */
      const submitStep = () => {
        if (selectedIds.length === 0) 
          return new Snackbar({text : I18n.t('shouldSelectOneAtLeast') , type : 'danger'});  

        setIsLoading(true);
        //Submit data to api
        api  
          .put(endpoints.profile + '/' + user.account?.profile.id, {
              'favourite_style_id' : selectedData
          })
          .then(res => {
              setIsLoading(false);
              //Update redux stored user profile
              dispatch(updateProfile(res.data.data));
              dispatch(changeCompletedProfileStatus());
              //Navigate to next step
              goToNext();
          })
          .catch(err => {
            setIsLoading(false);
              new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
          });
      }

      useEffect(()=>{
        getFavouriteStyleChoices();

        //restore previous registered data
        if (user.account?.profile.favourite_styles) {
          let selected = user.account.profile.favourite_styles ?
                          user.account.profile.favourite_styles.map(item => item.id)
                          : [];
          setSelectedIds([...selected]);
          setSelectedData(user.account.profile.favourite_styles);
        }
      },[]);

      return (
      <>
        <Text style={style.stepHeaderText}>
            {I18n.t('favouriteStyle')}
        </Text>
        <FlatList  
            contentContainerStyle={{alignSelf:'center',marginVertical: 5}}
            horizontal={false}
            data={ data}
            numColumns={2}
            key={( 'h' )}
            renderItem = {(item)=> renderItem(item)}
            keyExtractor={(item, index) => index}
         />
         <TallaButton 
            onPress={submitStep}
            label = {user.isCompletedProfile ? I18n.t('update') : I18n.t('save')}
            bgColor = "#D4AF37"
            style={{padding: 15 , width: '94%'}}
            labelColor = "#FFF"
            isLoading={isLoading}
         />
      </>
      )
   }

   useEffect(() => {}, []);

   return <SafeAreaView style={style.container}>
       <SafeAreaView style={style.header}>
          <View style={{flex: .85}} />
          <Text style={style.createProfileText}>
            {
              user.isCompletedProfile
                ? I18n.t('updateYourProfile')
                : I18n.t('completeYourProfile')
            }
          </Text>
          <View style={style.skipButton} >
            <BorderlessButton  onPress={() => props.navigation.navigate('Home')}>
              <Text style={style.skipText}>
                {user.isCompletedProfile
                  ? I18n.t('finish')
                  : I18n.t('skip')
                }
              </Text>
            </BorderlessButton>
          </View>
       </SafeAreaView>
       <View style={style.stepsNumberContainer}>
          <View style={{width : '90%' , alignSelf:'center' , flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <FastImage 
              source = {
                require('../../assets/icons/one-blue-active.png')
              }
              resizeMode="contain"
              style={style.stepIcon} 
            />
            <View style={style.activeLine}></View>
            <FastImage  
              source={ activeStep >= 2 ? require('../../assets/icons/two-blue-active.png') :
                                                require('../../assets/icons/two-inactive.png')}
              resizeMode="contain"
              style={style.stepIcon} 
            />
            <View style={activeStep > 2 ? style.activeLine : style.inActiveLine}></View>
            <FastImage 
              source = {activeStep >= 3 ? require('../../assets/icons/three-blue-active.png') :
                                                require('../../assets/icons/three-inactive.png')}
              resizeMode="contain"
              style={style.stepIcon} 
            />
            <View style={activeStep > 3 ? style.activeLine : style.inActiveLine}></View>
               <FastImage 
                source={ activeStep >= 4 ? require('../../assets/icons/four-blue-active.png') :
                                                   require('../../assets/icons/four-inactive.png')}
                resizeMode="contain"
                style={style.stepIcon} 
              />
            <View style={activeStep > 4 ? style.activeLine : style.inActiveLine}></View>
            <FastImage 
              source={ activeStep >= 5 ? require('../../assets/icons/five-blue-active.png') :
                                                require('../../assets/icons/five-inactive.png')}
              resizeMode="contain"
              style={style.stepIcon} 
            />
            <View style={activeStep > 5 ? style.activeLine : style.inActiveLine}></View>
            <FastImage 
              source={ activeStep == 6 ? require('../../assets/icons/six-blue-active.png') :
                                                require('../../assets/icons/six-inactive.png')}
              resizeMode="contain"
              style={style.stepIcon} 
            />
          </View>
       </View> 
       <View style={style.stepProcessContainer}>
          {
            activeStep == 1 ?
               <StepOne />
               :
               (
                  activeStep == 2 ?
                  <StepTwo />
                  :
                  (
                     activeStep == 3 ? 
                     <StepThree />
                     :
                     (
                        activeStep == 4 ?
                        <StepFour />
                        :
                        (
                           activeStep == 5 ?
                           <StepFive /> 
                           :
                           <StepSix />
                        )
                     )
                  )
               ) 
          }

       </View>

       <ThanksModal />
    </SafeAreaView>
};

export default CreateProfile;
