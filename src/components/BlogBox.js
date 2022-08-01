import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Share from "react-native-share";


// Styles 
import style from '../assets/styles/BlogBoxStyle';

import AddToFavourites from './AddToFavourites';

const BlogBox = props => {
   const [blog , setBlog ] = useState(props.data)


  /**
    * Share Item
    */
   const share = ( ) => {
      const url = "https://tallah.co/" + blog.title;
      const title = blog.title;
      const message = blog.body.substr(0, 50);
      const icon = blog.image.image;

      const options = Platform.select({
         ios: {
           activityItemSources: [
             { // For using custom icon instead of default text icon at share preview when sharing with message.
               placeholderItem: {
                 type: 'url',
                 content: url
               },
               item: {
                 default: {
                   type: 'text',
                   content: `${message}`
                 },
               },
               linkMetadata: {
                  title: message,
                  icon: icon
               }
             },
           ],
         },
         default: {
           title,
           subject: title,
           message: `${message}`,
           image: icon
         },
       });

      Share
         .open(options)
         .then(res => console.log(res))
         .catch(err => console.log(err));
   };

   return <View style={[style.container]}>
        <View style={[style.actionsSection]}>
          <FastImage  
            source={
              blog.user?.profile?.avatar 
                ? {uri: blog.user.profile.avatar}
                : require('../assets/logo.png')
            }
            style={{height : 40 , width : 40 ,borderRadius : 20}}
            resizeMode="cover" 
          />
          <View style={{alignItems:'center'}}>
              {/* <AddToFavourites item={blog} /> 
              <Text style={[style.likesNumber]}>
              {blog.likes}
              </Text> */}
          </View>
          <BorderlessButton onPress={share} >
              <FastImage  
                source={require('../assets/icons/share-colored.png')}
                style={{width : 25 , height:25}}
                resizeMode={'contain'}
              />
          </BorderlessButton>
        </View>
        <RectButton 
          rippleColor={'#F2F2F2'} 
          style={[style.blogSection]}
          onPress={props.onPress}
        >
          <FastImage  
            source={blog.image ? {uri: blog.image.image} : require('../assets/images/blog-default.png')}
            style={[style.blogImage]}
            resizeMode={'stretch'}
          />
          <Text style={[style.blogText]} numberOfLines={3}>
            {
              blog.body
                .replace(/(&nbsp;|&quot;|(<([^>]+)>))/ig, "")
                .replace(/&rsquo;/ig, "'")
            }
          </Text>
        </RectButton>
    </View>
};

export default BlogBox;
