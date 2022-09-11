import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import {Calendar} from 'react-native-calendars';
import { useSelector } from 'react-redux';
import moment from 'moment';

//Styles
import style from './style';
import GeneralStyle from '../../assets/styles/GeneralStyle';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

const Calendars = props  => {
   const user = useSelector(state => state.user);
   const [ data, setData ] = useState({});
   const [ markedDates, setMarkedDates] = useState({});
   const [ currentMonth, setCurrentMonth] = useState(moment().format('M'));

   const [ isLoading, setIsLoading ] = useState(true);
   
  /**
   * Get user calendar
   * 
   * @param {*} param0 
   * @returns 
   */
  const getUserCalendar = () => {
    if (!user.account.id) return;

    api.get(endpoints.calendar + '/' + user.account.id)
      .then((res) => {
        setIsLoading(false);
        setMarkedDatesValues(res.data);
        setData(res.data);
      })
      .catch((err) => {
      });
  };

  const setMarkedDatesValues = (calendars) => {
    let userCalendar = {};
    calendars.forEach((calendar) => {
      userCalendar[calendar.date] = {
        selected: true,
        selectedColor: ['outfit', 'item'].includes(calendar.type) 
          ? '#D4AF37'
          : '#DE4C69',
      };
    });
    setMarkedDates(userCalendar);
  };

  useEffect(() => {
    getUserCalendar();
  }, []);

  return  <SafeAreaView style={[GeneralStyle.container]}>
    <View style={[GeneralStyle.header , {borderBottomLeftRadius : 0 , borderBottomRightRadius : 0}]}>
      <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
        <RectButton onPress={()=>{props.navigation.goBack()}}>
          <FastImage 
            source={require('../../assets/icons/back-arrow.png')} 
            style={{width : 25 , height : 25}}
            resizeMode="contain"
          />
        </RectButton>
        <Text style={GeneralStyle.headerText}>
          Calendar
        </Text>
        <View style={{flexDirection : 'row'}}>
          <BorderlessButton onPress={() => {props.navigation.navigate('addCalendar')}}>
            <FastImage source={require('../../assets/icons/add-circle.png')}
                      style={{width : 35,height : 35}} />
          </BorderlessButton>
        </View>
      </View>
    </View>
      <Calendar
        markedDates={markedDates}
        theme={{
            backgroundColor: '#012647',
            calendarBackground: '#012647',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            'stylesheet.calendar.header': {
                week: {
                  marginTop: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }
            },
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
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
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2022-01-1'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={(day) => {console.log('selected day', day)}}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MMMM yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => setCurrentMonth(month.month)}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
      <View style={style.grayRow}>
          <View style={{flex:1,alignItems:'center'  , justifyContent:'center', flexDirection : 'row'}}>
              <View style={[style.circle , {backgroundColor: '#DE4C69'}]}></View>
              <Text style={[style.text , {color : '#012647'}]}>
                Stylist sessions
              </Text>
          </View>
          <View style={{flex:1,alignItems:'center' , flexDirection : 'row' }}>
              <View style={[style.circle , {backgroundColor: '#D4AF37'}]}></View>
              <Text style={[style.text , {color : '#D4AF37'}]}>
                Outfit
              </Text>
          </View>
      </View>
      <ScrollView>
        <View style={style.upcomingContainer}>
          <FastImage 
            source={require('../../assets/icons/calendar-lines.png')}
            resizeMode={'stretch'}
            style={{ width: 20, height: '100%' }}
          />
          <View style={{ flex: 1, flexDirection: 'column', marginStart: 5,marginEnd: 5 }}>
            <Text style={{color : '#BFBFBF',fontSize : 15 , flex:.2, marginBottom: 15 }}> 
                upcoming
            </Text>
            { data.length
              ? data.map((calendar) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                  <FastImage source={require('../../assets/icons/small-dot.png')}
                            style={{ width: 19, height: 19 }} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginStart: 10 }}>
                    <View style={{flex:1}}>
                      <Text style={style.mettingText}>
                         {calendar.event_name}
                      </Text>
                      <Text style={style.mettingDate}>
                        {moment(calendar.date).format('DD MMMM YYYY')}
                      </Text>
                    </View>
                    <BorderlessButton 
                      onPress = {
                        () => props.navigation.navigate('addCalendar', {
                          event: calendar
                        })
                      }
                      style={{ marginEnd: 25 }}
                    >
                      <FastImage
                        source={require('../../assets/icons/arrow-bg.png')}
                        style={{width : 55,height : 55}}
                      />
                    </BorderlessButton>
                  </View>
                </View>
              ))
              : <Text> No events yet!</Text>
            }
          </View>
        </View>
    </ScrollView>
  </SafeAreaView>
}
 
export default Calendars;
