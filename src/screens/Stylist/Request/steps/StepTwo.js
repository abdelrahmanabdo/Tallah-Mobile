import React, {
  useState,
  useEffect
} from 'react';
import {  ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

//Styles
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Snackbar from '../../../../components/Snackbar';

import I18n from '../../../../lang/I18n';

//Apis
import api from '../../../../config/api';
import endpoints from '../../../../config/endpoints';

import { updateStylistProfile } from '../../../../redux/actions/stylist';

const StepTwo = props => {
  const dispatch = useDispatch();
  const stylist = useSelector(state => state.stylist.profile );
  const [isLoading, setIsLoading] = useState(false);
  const [ stepTwoData, setStepTwoData ] = useState({});  //experience_years, bio

  /**
  * Submit current step
  */
  const submitStep = () => {
    setIsLoading(true);
    //Submit data to api
    api.put(endpoints.stylist +'/'+ stylist.id, stepTwoData)
        .then(res => {
          setIsLoading(false);
          //Update redux stored stylist profile
          dispatch(updateStylistProfile({...res.data.data}));
          props.goToNext();
        })
        .catch(err => {
          setIsLoading(false);
          console.log(err.response)
          new Snackbar({text : I18n.t('unknowError') , type : 'danger'});
        });
  };

   useEffect(() => {
     console.log(stylist)
    //restore previous registered data
    if (stylist)
      setStepTwoData({
        bio: stylist.bio,
        experience_years: JSON.stringify(stylist.experience_years)
      })
   }, []);

   return <ScrollView 
         showsVerticalScrollIndicator={false}>
         <Input name={'Years of experience'} 
                placeholderText={'Years of experience'}  
                isNumeric={true}                
                onChangeText={value =>  setStepTwoData({...stepTwoData, experience_years: value}) }
                placeholderColor={'#ccc'} 
                color={'#000'}
                defaultValue={stepTwoData.experience_years?.replace(/"/g, '')}
         />
         <Input name={'Short Bio'} 
                placeholderText={'Will appear on your profile'}  
                isTextarea={true}                
                onChangeText={value =>  setStepTwoData({...stepTwoData, bio: value}) }
                placeholderColor={'#ccc'} 
                color={'#000'}
                defaultValue={stepTwoData.bio}
         />
         <Button 
            onPress={submitStep}
            labelColor = "#FFF"
            label = {stylist?.profile ? I18n.t('update') : I18n.t('next')}
            bgColor = "#D4AF37"
            style={{ padding: 15 , width: '91%' }}
            isLoading={isLoading}
         />
   </ScrollView>
}

export default StepTwo ;