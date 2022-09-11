import React, { useEffect , useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, ImageBackground , FlatList , Pressable, SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton,  } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

//Styles
import style from '../../assets/styles/FavouritesStyle';
import GeneralStyle from '../../assets/styles/GeneralStyle';
import ModalStyle from '../../assets/styles/ModalStyle';

//Componente
import ClosetItem from '../../components/ClosetItem';
import TallaButton from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Checkbox from '../../components/Checkbox';
import Color from '../../components/Color';

import I18n from '../../lang/I18n';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';
import NotFound from '../../components/NotFound';
import OutfitItem from '../../components/OutfitItem';
import Spinner from '../../components/Spinner';

const Outfits = props  => {
  const user = useSelector(state => state.user);
  const [data , setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Render Category list item
   * @param {} param0 
   */
  const renderItem = ({item , index}) => {
    return <OutfitItem  key={index} item={item} />;
  };

   /**
   * Get Outfits
   */
  const getOutfits = () => {
    api.get(endpoints.outfit + '?user_id=' + user.account.id)
        .then(res => {
          setData(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getOutfits();

    // Subscribe for the focus Listener
    const unsubscribe = props.navigation.addListener('focus', () => {
      getOutfits();
    });

    return unsubscribe;
  }, []);

  return  <SafeAreaView style={[GeneralStyle.container]}>
    <View style={[GeneralStyle.header]}>
      <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
        <RectButton onPress={()=>{props.navigation.goBack()}}>
          <FastImage 
            source={require('../../assets/icons/back-arrow.png')} 
            style={{width : 25 , height : 25}}  
            resizeMode="contain"
          />
        </RectButton>
        <Text style={style.headerText}>
          Outfits
        </Text>
        <View style={{flexDirection : 'row'}} />
      </View>
    </View>
    {
      isLoading ?
      <Spinner />
      :
      data.length == 0 ?
        <NotFound
          text={'No Outfits Added yet!'}
          isFavourites
        />
        :
        <FlatList 
          contentContainerStyle={[style.favoruitesListContainer]}
          showsVerticalScrollIndicator={false}
          horizontal = {false}
          keyExtractor={(item,index) => index.toString()}
          numColumns={3}
          data={data}
          renderItem={renderItem}
        />
      }
    </SafeAreaView>
}
 
export default Outfits;
