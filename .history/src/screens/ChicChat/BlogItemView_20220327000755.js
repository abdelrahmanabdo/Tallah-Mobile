import React , {useState , useEffect} from 'react';
import { Text, View, ImageBackground , FlatList , TextInput, SafeAreaView ,TouchableNativeFeedback, KeyboardAvoidingView, I18nManager, Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderlessButton, RectButton, ScrollView   } from 'react-native-gesture-handler';
import EmojiPicker from 'react-native-emoji-picker-staltz';
import Modal from 'react-native-modal';
import moment from 'moment';
import { useSelector } from 'react-redux';

//Styles
import I18n from '../../lang/I18n';
import style from '../../assets/styles/BlogItemStyle';
import GeneralStyle from '../../assets/styles/GeneralStyle';
import Snackbar from '../../components/Snackbar';
import Spinner from '../../components/Spinner';

//Apis
import api from '../../config/api';
import endpoints from '../../config/endpoints';

const BlogItemView = props  => {
   const user = useSelector(state => state.user);
   const [blog, setBlog] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [showEmojis , setShowEmojis] = useState(false);
   const [comment , setComment ] = useState('');
 
   /**
   * Get current blog data
   */
   const getBlogData = () => {
      if (!props.route?.params?.blogId) return;

      api.get(endpoints.blog + '/' + props.route.params.blogId)
         .then((res) => {
           setIsLoading(false);
           setBlog(res.data.data);
         })
         .catch((err) => {});
   };

   /**
    * Render Comment
    */
   const CommentItem =({item, key}) => {
      return <View key={key} style={[style.commentContainer]} >
          <FastImage 
            source={item.commenter?.role_id == 3 
                ? require('../../assets/icons/logo.png') 
                : item.commenter?.profile && item.commenter?.profile?.avatar
                  ? {uri: item.commenter.profile.avatar}
                  : require('../../assets/icons/default-avatar.png')
            }
            resizeMode={'cover'}
            style={{ width: 40, height: 40, borderRadius: 20 }} 
          />
          <View style={{marginHorizontal:10 , flex:1.5}}>
            <Text style={[GeneralStyle.secondaryText, {fontSize: 15}]}>
              {
                item.commenter 
                  ? item.commenter.name
                  : 'No Name'
              }
            </Text>
            <Text style={[GeneralStyle.primaryBoldText , {fontSize : 13}]}>
              {item.comment}
            </Text>
          </View>
          <Text 
            style={[GeneralStyle.blackText , {fontSize : 10.5, flexWrap:'wrap', flex : .8}]}
            numberOfLines={2} 
          >
            {moment(item.created_at).fromNow()}
          </Text>
      </View>
   };



   /**
    * Create New Blog handler
    */
   const submitComment = () => {    
      if (!user.isLoggedIn) return new Snackbar({text : I18n.t('pleaseLoginFirst') }); 
      setIsSubmitting(true);

      const data = {
        comment, 
        'commenter_id': user.account.id, 
        'created_at' : Date()
      }
      api.post(`${endpoints.blog}/${blog.id}/comments`, data)
         .then(() => {
            blog.comments.push(data);
            setBlog({...blog});
            setComment('');
            new Snackbar({text : 'Comment added successfully' , type : 'success'});
            setIsSubmitting(false);
         })
         .catch(err => {
            return new Snackbar({'type' : err.response.data.message, 'type' : 'danger'});
         });
   };

   useEffect(() => {
      //Get current blog data
      getBlogData();
   }, []);

   return  <SafeAreaView style={[GeneralStyle.container]}>
        <SafeAreaView style={{
            display: 'flex', 
            flexDirection: 'row',
            marginStart: 15,
            marginBottom: 20
          }}
        >
          <RectButton 
            style={{ padding: 5, borderRadius: 5}} 
            onPress={()=>{props.navigation.goBack()}}
          >
            <FastImage 
              source={require('../../assets/icons/back-arrow.png')} 
              style = {
                {
                  width: 23,
                  height: 23,
                  transform: [{
                    rotate: I18nManager.isRTL ? '180deg' : '0deg'
                  }]
                }
              }
              resizeMode="contain"
            />
          </RectButton>
          <Text style={[GeneralStyle.headerText, { marginStart : 15}]}>
            Chic Chat
          </Text>
        </SafeAreaView>
        {
        isLoading 
        ? <Spinner />
        : <>
          <View style={[style.container]}>
            <View style={[style.userInfoContainer]}>
              <View style={[style.userInfoBox]}>
                <View style={[GeneralStyle.row]}>
                  <FastImage 
                    source={blog.user?.role_id == 3 
                        ? require('../../assets/icons/logo.png') 
                        : blog.user?.profile && blog.user?.profile?.avatar
                          ? {uri: blog.user.profile.avatar}
                          : require('../../assets/icons/default-avatar.png')
                    }
                    resizeMode={'contain'}
                    style={{width : 40 , height : 40 , borderRadius : 20}} />
                  <View style={{flex:1, marginStart:15, marginEnd: 30}}>
                      <Text style={[GeneralStyle.secondaryText, {fontSize: 15, flexWrap: 'wrap'}]}>
                        { blog.user?.role_id == 3 ? 'Tallah Admin' :  blog.user?.name}
                      </Text>
                      <Text style={[GeneralStyle.grayText, { marginTop: 4, fontSize: 12 }]}>
                        {moment(blog.created_at).fromNow()}
                      </Text>
                  </View>
                </View>
                  <View>
        
                  <BorderlessButton style={[style.followButton]}>
                    <Text style={[style.followButtonText]}>
                      + Follow
                    </Text>
                  </BorderlessButton>
                </View>
              </View>
            </View>
            <ScrollView>
            {
              blog.images && <ImageBackground 
                source={{uri: blog?.images[0]?.image}} 
                style={[style.blogContentContainer]}
              >
                  <View style={[GeneralStyle.row, {flexWrap: 'wrap'}]}>
                  {
                    blog.hashtags &&
                    JSON.parse(blog.hashtags).map(item => (
                      <Text style={[GeneralStyle.badge, {marginVertical: 3}]}>
                        {I18nManager.isRTL ? item.ar : item.en}   
                      </Text>
                    ))
                  }
                  </View>
                  <Text style={[style.blogText]}>
                  {blog?.body.replace(/<\/?[^>]+(>|$)/g, "")}
                  </Text>
              </ImageBackground>
            }
            <View style={[style.commentsContainer]}>
              <Text style={[GeneralStyle.blackText, {fontSize : 20}]}>
                Comments
              </Text>
              {
                blog.comments?.length > 0 ?
                 blog.comments.map((item, index) => (
                   <CommentItem item={item} key={index} />
                 ))
                :
                <Text>
                  No comments till now
                </Text>
              }
            </View>
          </ScrollView>
        </View>
        <KeyboardAvoidingView style={[style.newCommentContainer]}>
            <TextInput value={comment}
                      onChangeText={(value) => setComment(value)}
                      style={{padding: 10 , flex: 4 , color : '#012647'}}
                      placeholder={'Write Your comment here'}
                      placeholderTextColor={'#CCC'}
            />
            <View style={{flex:1,flexDirection:'row'}}>
              <BorderlessButton onPress={()=>setShowEmojis(true)}>
                <FastImage source={require('../../assets/icons/emoji.png')} 
                            style={{width : 25 , height : 25 ,marginEnd:10}} />
              </BorderlessButton>
              <Pressable
                onPress={submitComment}
                disabled={!comment || isSubmitting}
              >
                <FastImage 
                  source={require('../../assets/icons/submit-comment.png')} 
                  style={{width : 23 , height : 23}} 
                  resizeMode="contain"
                />
              </Pressable>
            </View>
        </KeyboardAvoidingView>
        <Modal visible={showEmojis} 
              avoidKeyboard={true}
              animationInTiming={150}
              animationOutTiming={150}>
            <EmojiPicker
              onEmojiSelected={emoji => {
                  if (!emoji) return setShowEmojis(false);
                  setComment(comment + emoji);
              }}
              rows={9}
              clearButtonText={'Close'}
              clearButtonStyle={{color : "#FFF",fontSize : 16, fontWeight : '700'}}
              emojiSize={23}
              modalStyle={{zIndex: 1000}}
              headerStyle={{ color : "#FFF" }}
              containerStyle={{backgroundColor:'#012647', borderRadius: 10, overflow:'hidden'}}
              onPressOutside={() => setShowEmojis(false)}
              localizedCategories={[ // Always in this order:
                  'Smileys and emotion',
                  'People and body',
                  'Animals and nature',
                  'Food and drink',
                  'Activities',
                  'Travel and places',
                  'Objects',
                  'Symbols',
              ]}
            />
        </Modal>
      </>
      }
    </SafeAreaView>
}
 
export default BlogItemView;
