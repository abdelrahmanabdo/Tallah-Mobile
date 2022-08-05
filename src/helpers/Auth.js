
import AsyncStorage from '@react-native-community/async-storage';
import api from '../config/api';
import endpoints from '../config/endpoints';

const assignNotificationToken = async (userId) => {
  const token = await AsyncStorage.getItem('deviceToken');
  const data = {
    user_id: userId,
    token: token
  };

  await api.post(endpoints.assignUserToken, data)
    .then(async (res) => {
      await AsyncStorage.setItem('userNotificationToken', token);
    })
    .catch((err) => {
      console.error(`Error while assigning token to user ${JSON.stringify(err.response)}`);
    });
};

const unassignUserToken = async (userId) => {
  const token = await AsyncStorage.getItem('deviceToken');
  const data = {
    user_id: userId,
    token: token
  };

  await api.post(endpoints.unassignUserToken, data)
    .catch((err) => {
      console.error(`Error while un-assigning token ${JSON.stringify(err.response)}`);
    });
};

module.exports = {
  assignNotificationToken,
  unassignUserToken,
};