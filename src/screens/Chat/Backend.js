import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import api from '../../config/api';
import endpoints from '../../config/endpoints';

module.exports = {
  /**
   * Get user chats list 
   * 
   */
  getUserChats() {
    const messagesRef = database().ref('chats/' + chatId1);

  },

  /**
   * Get chat messages list
   * 
   */
  getChatMessages() {

  }
}


// retrieve the messages from the Backend
const loadMessages = async (callback) =>  {
  let userId = await AsyncStorage.getItem("userId");

  let chatId1 = parseInt(userId) + parseInt(recieverId) + '-tsuoq';

  messagesRef = database().ref('chats/' + chatId1);

  const onReceive = data => {
    const message = data.val();
    callback({
      _id: data.key,
      text: message.text,
      //createdAt: new Date(message.createdAt),
      createdAt: message.createdAt,
      user: {
        _id: message.user._id,
        name: message.user.name,
        // avatar: require("../../assets/user_avatar.png"),
      }
    });
  };

  this.messagesRef
    .orderByChild("createdAt")
    .on("child_added", onReceive);
}

// send the message to the Backend
const sendMessage = (message) =>  {
  var today = new Date();
  today.setDate(today.getDate() - 30);
  for (let i = 0; i < message.length; i++) {
    this.messagesRef.push({
      text: message[i].text,
      user: message[i].user,
      createdAt: new Date().toISOString(),
    });
  }
  //Send Notification
  this.saveNotification(message);
}

const saveNotification = async (message)=> {
  var sender_name = await AsyncStorage.getItem('user_name');
  var sender_id = await AsyncStorage.getItem('userId');
  var recieverId = this.recieverId;

  const data = {
    'userId' :recieverId ,
    'message' : 'رسالة جديدة : ' + message[0].text ,
    'message_en' : 'New Message : ' + message[0].text ,
    'type' : 'message',
    'user' : {
      sender_name,
      sender_id
    }
  }

  await axios.post(api.uri + endpoints.saveNewNotification ,data)
                                .catch((error)=>{alert(JSON.stringify(error))})
}

const sendNotification = async (message) => {
  var recviever_id = message[0].user._id;
  var sender_name = await AsyncStorage.getItem('user_name');
  var sender_id = await AsyncStorage.getItem('userId');

  const userToken = await axios
    .get(api.uri + endpoints.getUserNotification ,{params:{userId : this.recieverId}})
    .catch((error)=>{alert(error)})

  if(userToken.data.success){
    var key = 'AAAAEJZxy1A:APA91bGlQcSVYYFLZxYYXBN7oTxwd3HdKh-NPMhOCZfOXlsP3RLCTkyBRSzge3HlPTAhERghlZi5PNy2HDwEC3Iy_dUA9sV1u6mxfM14DPS6voJYmDkLtyKbUB8f-J6exvDTKAEKWZQS';
    var to = userToken.data.data.token;

    var notification = {
      'title': 'New Message from ' + sender_name,
      'body': message[0].text,
      "content_available" : true,
      "priority" : "high",
      "show_in_foreground": true
    };

    var data = {
      'title': 'New Message from ' + sender_name,
      'body': message[0].text,
      'type' : 'message',
      'route' : 'Chat' ,
      'userId' : sender_id,
      'user_name' : sender_name
    }

    fetch('https://fcm.googleapis.com/fcm/send', {
      'method': 'POST',
      'headers': {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'notification': notification,
        'to': to,
        'data' : data
      })
    }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.error(error);
    })
  }
}