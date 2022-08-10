
import 'react-native-gesture-handler';
import React, { useEffect ,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {I18nextProvider} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import { AppNavigator } from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux';
import { WRootToastApp } from 'react-native-smart-tip';
import I18n from './src/lang/I18n';

//Notifications 
import { fcmService } from './src/config/FCMService';
import { localNotificationService } from './src/config/LocalNotificationService';


//Apis
import api from './src/config/api';
import endpoints from './src/config/endpoints';

const App = () => {
  const isStoredDeviceToken = async () => {
    return await AsyncStorage.getItem('deviceToken');
  };

  // Add Anonymous token to database
  const postDeviceToken = async (token) => {
    const data = { token };
    await AsyncStorage.setItem('deviceToken' , token);
    await api.post(endpoints.addAnonymgousToken, data)
      .catch((err) => console.error(JSON.stringify(err.response)));
  };

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    async function onRegister(token) {
      let hasToken = await isStoredDeviceToken();
      if (!hasToken) postDeviceToken(token);
    };

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      );
    };

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify);
    };

    SplashScreen.hide();

    return () => {
      console.log("[App] unRegister");
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  return (
    <WRootToastApp>
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={I18n}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </WRootToastApp>
  );
};

export default React.memo(App);
