import React, { useState, useEffect, memo } from 'react';
import { Text, View, ImageBackground, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { RectButton, BorderlessButton, BaseButton } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

//Styles
import GeneralStyle from '../../assets/styles/GeneralStyle';
import style from '../../assets/styles/ChicChatTabStyle';
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button';
import BlogBox from '../../components/BlogBox';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

//Components
import Spinner from '../../components/Spinner';

const ChicChatTab = props => {
  const user = useSelector(state => state.user);
  const [blogs , setBlogs ] = useState([]);
  const [newBlogs, setNewBlogs ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const limit = 8;
  const [offset, setOffset] = useState(0);

  // blogs
  const getBlogs = (dataLimit = limit, dataOffset = offset, isRefresh = false) => {
    api.get(`${endpoints.blog}?limit=${dataLimit}&offset=${dataOffset}`)
      .then((res) => {
        if (isRefresh) {
          setBlogs(res.data.data);
        } else {
          setBlogs([...blogs, ...res.data.data]);
        }
      })
      .catch(err => {
        console.log(`Erro while getting blogs ${JSON.stringify(err.response)}`);
        // getBlogs();
      })
      .finally(() => {
        setIsLoading(false);
        setIsRefreshing(false);
      });
  };

  // Latest blogs
  const getLatestBlogs = () => {
    api.get(`${endpoints.blog}?latest=true`)
        .then(res => setNewBlogs(res.data.data));
  };

  /**
   * Render Horizontal new blogs
   */
  const renderNewBlogs = ({item}) => {
    return <BaseButton 
      style={[style.newBlogBox]} 
      onPress={ () => props.navigation.push('BlogPage', {blogId: item.id})}>
        <ImageBackground 
          source={item.image ? {uri: item.image.image} : require('../../assets/images/blog-default.png')}
          style={{width: '100%', height: 120, justifyContent: 'flex-end', borderRadius : 15 , overflow :'hidden'}}>
            <Text style={[style.newBlogText]} numberOfLines={2}>
              {item.title}
            </Text>
        </ImageBackground>
    </BaseButton>
  };

  //Render vertical blogs
  const renderBlogBox = ({ item }) => {
    return <BlogBox 
      data={item} 
      onPress={() => props.navigation.push('BlogPage', { blogId: item.id })} 
    />
  };

  const renderFooter = () => {
    return (
      <View style={style.footer}>
        <ActivityIndicator
          color="#D4AF37"
          style={{marginLeft: 8}}
        />
      </View>
    );
  };

  const loadMoreBlogs = () => {
    const newOffset = offset + limit;
    setOffset(offset + limit);
    getBlogs(limit, newOffset);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    setOffset(0);
    getBlogs(limit, 0, true);
  };

  useEffect(() => {
    getBlogs();
    getLatestBlogs();
  }, []);

  return (<SafeAreaView style={[GeneralStyle.container]}>
      <View style={GeneralStyle.header}>
        <View style={[GeneralStyle.rowSpaceBetween,{width : '90%'}]}>
          <RectButton style={{ flex: 1}}>
              <FastImage 
                source={require('../../assets/icons/logo.png')}
                resizeMode={'contain'}
                style={{width : 35 , height : 35}} 
              />
          </RectButton>
          <Text style={[GeneralStyle.headerText, { flex: 1}]}>
              Chic Chat
          </Text>
          <View style={{flexDirection : 'row', flex: 1, justifyContent: 'flex-end'}}>
            {
              user.isLoggedIn &&
                <> 
                  <BorderlessButton onPress={() => props.navigation.navigate('notifications')}>
                    <FastImage source={require('../../assets/icons/notification.png')}  
                              resizeMode={'contain'}
                              style={{width : 25,height : 25}} />
                  </BorderlessButton>
                  <BorderlessButton onPress={() => props.navigation.navigate('profile')}>
                    <FastImage 
                      source={
                        user.account?.profile?.avatar 
                          ? {uri : user.account?.profile?.avatar} 
                          : require('../../assets/images/girl.png')
                      }
                      resizeMode={'stretch'}
                        style={{width : 30,height :  30 , marginStart : 14,borderRadius: 15}} />
                  </BorderlessButton>
                </>
            }
          </View>
        </View>
      </View>
      {
        isLoading
        ? <Spinner />
        : <>
          <View style={{ flex: 1 }}>
            <Text style={[GeneralStyle.blackBoldText, {fontSize: 16, margin:12, marginVertical: 5}]}>
              What's New ?
            </Text>

            <FlatList 
              horizontal
              showsHorizontalScrollIndicator={false}
              data={newBlogs}
              style={{paddingVertical: 15, marginHorizontal: 4}}
              keyExtractor={(item, index) => `${index}-${item.title}`}
              renderItem={renderNewBlogs}
            />

            <FlatList
              horizontal={false}
              showsVerticalScrollIndicator={false}
              data={blogs}
              contentContainerStyle={{paddingVertical: 5, marginHorizontal: 6}}
              keyExtractor={(item, index) => `${index}-${item.created_at}`}
              renderItem={renderBlogBox}
              onEndReachedThreshold={0.1}
              onEndReached={loadMoreBlogs}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              ListFooterComponent={renderFooter}
            />
        </View>

        <Button 
          label={'Write with us'}
          labelColor={'#FFF'}
          style={{width : '93%', position: 'absolute', bottom: 0, paddingVertical: 15}}
          onPress={() => {
            if (!user.isLoggedIn) return props.navigation.navigate('Auth');
            props.navigation.navigate('chicChatIntro');
          }}
        />
      </>
    }
  </SafeAreaView> 
  );
};

export default memo(ChicChatTab);
