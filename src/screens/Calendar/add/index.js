import React, {
  useEffect,
  useState,
} from 'react';
import { Text, View, ImageBackground, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import {Calendar} from 'react-native-calendars';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';

//Styles
import style from './style';
import GeneralStyle from '../../../assets/styles/GeneralStyle';
import Input from '../../../components/Input';


import I18n from '../../../lang/I18n';
import TallaButton from '../../../components/Button';
import Snackbar from '../../../components/Snackbar';


//Apis
import api from '../../../config/api';
import endpoints from '../../../config/endpoints';
import ModalStyle from '../../../assets/styles/ModalStyle';

const AddCalendar = ({ route, navigation, ...props})  => {
  const user = useSelector(state => state.user);
  const [ data, setData ] = useState({});
  const [ type, setType ] = useState(route?.params?.type || '');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ markedDates, setMarkedDates ] = useState({});
  const [ showAddedModal, setShowAddedModal ] = useState(false);
  const minDate = '2022-01-01';

  /**
   * Validator
   */
  const validator = () => {
    if (!data.eventName) return new Snackbar({text : I18n.t('eventNameIsRequired') , type : 'danger'}), false;
    if (!data.date) return new Snackbar({text : I18n.t('dateIsRequired') , type : 'danger'}), false;
    if (!type) return new Snackbar({text : I18n.t('typeIsRequired') , type : 'danger'}), false;
    return true;
  };

  // Submit new event
  const submitEvent = () => {
    if (!validator()) return;
    setIsLoading(true);
    const newCalendar = {
      user_id: user.account.id,
      event_name: data.eventName,
      type,
      date: data.date,
      event_id: route.params.selectedItem || route.params.outfitId,
    };
    console.log({newCalendar});
    api.post(endpoints.calendar, newCalendar)
      .then((res) => {
        setData({});
        setType('');
        setShowAddedModal(true);
        setTimeout(() => setShowAddedModal(false), 2000);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        new Snackbar({text : I18n.t('unknownError') , type : 'danger'});
      });
  };


   //Added successfully Modal
   const AddedModal = () => {
      return <Modal 
                isVisible={showAddedModal}
                animationIn={'bounceIn'}
                backdropOpacity={.7}
              >
         <View style={ModalStyle.container}>
            <FastImage 
              source={require('../../../assets/icons/added-blue.png')}
              resizeMode="contain"
              style={{ width: 60, height: 60 }}
          />
          <Text style={[ModalStyle.text, { lineHeight: 30 }]}>
            {I18n.t('outfitAddedSuccessfully')}
          </Text>
        </View>
    </Modal>
   };


  useEffect(() => {
    if (route && route?.params?.event) {
      const event = route.params.event;
      setMarkedDates({ [event.date]: {
        selected: true,
        selectedColor: event.type === 'outfit'
          ? '#D4AF37'
          : '#DE4C69',
      }});
      setData({
        ...event,
        eventName: event.event_name,
      });
      setType(event.type);
    }
  }, [route]);

  return  <View style={[GeneralStyle.container, { backgroundColor: '#EAEAEA' }]}>
    <SafeAreaView style={[GeneralStyle.header, {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#EAEAEA',
        alignItems: 'flex-end',
        paddingEnd: 30,
        marginBottom: 10
      }]}
    >
      <BorderlessButton onPress={() => {navigation.goBack()}}>
        <FastImage
          source={require('../../../assets/icons/close-colored.png')}
          style={{ width : 20,height : 20 }} 
          resizeMode={'contain'}
        />
      </BorderlessButton>
    </SafeAreaView>
    <ScrollView>
      <Input
        defaultValue={data.eventName}
        name={I18n.t('eventName')}
        onChangeText={(value) => setData({...data, eventName: value})}
        placeholderText={I18n.t('eventName')}
        color={'#393B3C'}
        placeholderColor={'#C3C3C3'} 
      />
      <Text style={style.boxTitle}>
        { I18n.t('selectDate')}
      </Text>
      <Calendar
          markedDates={markedDates}
          style={{
            flex: 1,
            width: '90%',
            borderRadius: 10,
            alignSelf: 'center',
            marginVertical: 10,
          }}
          theme={{
            backgroundColor: '#012647',
            calendarBackground: '#012647',
            textSectionTitleColor: '#D4AF37',
            textSectionTitleDisabledColor: '#D4AF37',
            selectedDayBackgroundColor: '#D4AF37',
            selectedDayTextColor: '#ffffff',
            todayTextColor: 'red',
            dayTextColor: '#FFF',
            textDisabledColor: '#CCC',
            dotColor: '#fff',
            selectedDotColor: '#ffffff',
            arrowColor: '#FFF',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: '#FFF',
            indicatorColor: '#FFF',
            textDayFontFamily: 'Roboto',
            textMonthFontFamily: 'Roboto',
            textDayHeaderFontFamily: 'Roboto',
            textDayFontWeight: '300',
            textMonthFontWeight: '500',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 15,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 15
          }}
          // dayComponent={({date, state}) => {
          //  return (
          //     <View>
          //       <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>{date.day}</Text>
          //     </View>
          //   );
          // }}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={minDate}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            setData({...data, date: day.dateString});
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {console.log('selected day', day)}}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {}}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={subtractMonth => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
        />
        <Text style={[style.boxTitle, { fontSize: 17 }]}>
          Type
        </Text>
        <View style={[ style.buttonSpaceRow, { width: '90%'} ]}>
          <TallaButton
            onPress={()=> { setType('outfit'); navigation.navigate('outfitItemSelector', { type: 'outfit' })}}
            label={'outfit'}
            labelColor={'#FFF'}
            style={{ flex: 1, marginEnd: 10, borderWidth: 1, borderColor: '#D4AF37'}}
            bgColor={ type == 'outfit' ? '#D4AF37' : '#FFF' }
            labelColor ={ type == 'outfit' ?  '#FFF' : '#D4AF37' }
          />
          <TallaButton
            onPress={()=> { setType('item'); navigation.navigate('outfitItemSelector', { type: 'item' }) }}
            label={'item'}
            labelColor={'#FFF'}
            style={{ flex: 1, borderWidth: 1, borderColor: '#D4AF37'}}
            bgColor={type == 'item' ? '#D4AF37' : '#FFF'}
            labelColor ={type == 'item' ?  '#FFF' : '#D4AF37'}
          />
        </View>
        {
           <TallaButton
            onPress={submitEvent}
            label={'Save'}
            labelColor={'#FFF'}
            style={{ flex: 1, width: '90%'}}
            enabled={!isLoading}
          />
        }
    </ScrollView>
    <AddedModal />
  </View>
}
 
export default AddCalendar;
