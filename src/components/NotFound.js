import React, { useState, useEffect } from 'react';
import {Text, View  ,  StyleSheet , Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton, BaseButton, BorderlessButton } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';


const NotFound = ({image, text, isFavourites}) => {

    return (
    <Animatable.View 
        animation={'bounceIn'}
        style={{flex: 1, justifyContent: 'center', alignItems:'center'}}
    > 
        <FastImage 
            source={image ? {uri: image} 
                            :  
                            (isFavourites ? require( '../assets/images/not-found-favourites.png') 
                                            : 
                                            require( '../assets/images/not-found-closet.png'))
                    }
            style={{width: 100, height: 120, marginBottom: 15}}
            resizeMode={'contain'}
        />
        <Text
            style={{color:'#CCC', fontSize: 19, fontWeight: '600',width: '50%', lineHeight: 25, textAlign: 'center'}}
            numberOfLines={2}
        >
            {text ?? ''}
        </Text>
    </Animatable.View>
    )
}

export default NotFound;