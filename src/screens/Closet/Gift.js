import React , {useEffect, useState} from 'react';
import { Text, View,FlatList , SafeAreaView ,StatusBar } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton, BorderlessButton,  } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';


//styles
import style from '../../assets/styles/GiftScreenStyle';
import GeneralStyle from '../../assets/styles/GeneralStyle';


//
import I18n from '../../lang/I18n';
import Selector from '../../components/Selector';
import Button from '../../components/Button';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

const Gift = ({ ...props }) => {
   const [selected , setSelected] = useState(0);      
   const [gifts, setGifts] = useState([]);

   /**
   * Get gifts
   */
   const getGifts = () => {
      api.get(endpoints.gifts)
         .then(res => setGifts(res.data.data));
   };

   //Render brands 
   const renderItem = (item) => {
      return <Selector 
        isRadio={false}
        hideText={true}
        item={item}
        isCurrentSelected={selected == item.item.id}
        onSelect={(value)=>{setSelected(value)}}
      />
   };

   useEffect(() => {
      getGifts();
   },[]);

   return <SafeAreaView style={style.container}>
         <StatusBar hidden={false}  barStyle={'dark-content'}  backgroundColor={'#FFF'}/>
          <View style={[GeneralStyle.rowSpaceBetween,{padding:20}]}>
            <BorderlessButton onPress={()=>{props.navigation.goBack()}}>
               <FastImage  
                source={require('../../assets/icons/close-primary.png')}
                style={{width:20,height:20}}
                resizeMode={'contain'}
            />
            </BorderlessButton>
            <Text style={[GeneralStyle.blackBoldText,{fontSize:18 , color : '#000'}]}>
               {I18n.t('yourGift')}
            </Text>
            <View />
         </View>
         <Animatable.View 
            animation={'bounceIn'} 
            duration={900}
            style={style.giftContainer}
            useNativeDriver={true}
        >
          <FastImage  
            source={require('../../assets/images/gift.png')}
            style={style.giftImage}
            resizeMode={'contain'}
          />
          <Text style={style.text}>
             {I18n.t('yourGiftText')}
          </Text>
         </Animatable.View>
         <View style={{flex:1}}>
          <FlatList   
            contentContainerStyle={{alignSelf:'center',marginVertical: 5}}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={gifts}
            numColumns={2}
            key={( 'h' )}
            renderItem = {(item)=> renderItem(item)}
            keyExtractor={(item, index) => index}
          />
         </View>
         <Button 
          label={'done'}
          labelColor ={'#FFF'}
          style={{width:'90%'}}
         />
    </SafeAreaView>
};

export default Gift;
