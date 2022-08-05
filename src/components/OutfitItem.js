import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

//
import AddToFavourites from './AddToFavourites';

const {width} = Dimensions.get('screen');

const OutfitItem = ({item, ...props}) => {
  const navigation = useNavigation();

  return <View style={{ position: 'relative', alignItems:'flex-end' }}>
      <RectButton 
        style={{ flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden',
              width : width / 3.4, height : 100, marginStart : 8, 
              marginBottom : 15, overflow: 'hidden',borderRadius: 6}}
        onPress={()=> navigation.push('outfitItemView', {'itemId': item?.id}) }>
      {
        item?.items?.map((closetItem, key) => (
        <FastImage 
          key={key}
          source={
            closetItem.closet_item && closetItem.closet_item.image
               ? {uri: closetItem.closet_item.image } 
               : require('../assets/icons/closet-item-default.png')
          }
          style = {{
              flex: 1,
              height: '100%',
              width: '50%',
          }}
          resizeMode={'stretch'}
        />))
      }
      </RectButton>
      <View style={{position: 'absolute', top: 10, right: 8}} >
        <AddToFavourites itemId={item?.id} type={'outfit'}  />
      </View>
   </View>
};

export default OutfitItem;
