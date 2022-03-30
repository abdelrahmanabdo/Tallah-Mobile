import AsyncStorage from "@react-native-community/async-storage"

  var initialState =  {
    activeUserType: 'user',
    isLoggedIn: false,
    userToken: null,
    account: null,
    isCompletedProfile: false,
    isFirstTime: true
  };

  AsyncStorage.getItem('account').then(val => initialState.account = JSON.parse(val));
  AsyncStorage.getItem('isLoggedIn').then(val => initialState.isLoggedIn = val || false);
  AsyncStorage.getItem('isCompletedProfile').then(val => initialState.isCompletedProfile = val || false);
  AsyncStorage.getItem('isFirstTime').then(val => initialState.isFirstTime = val || true);
  AsyncStorage.getItem('activeUserType').then(val => initialState.activeUserType = val || 'user');

  export default function user(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN': {
        return {
          ...state,
          isLoggedIn: true,
          userToken: action.token,
          account: action.user,
          isCompletedProfile: action.user?.profile ? true : false,
        };
      }
      case 'LOGOUT': {
        return {
          isLoggedIn : false,
          userToken: null,
          account: null,
          isCompletedProfile: false,
          activeUserType: 'user',
        };
      }
 
      case 'GET_USER' : {
        return {
          ...state
        };
      }

      case 'UPDATE_USER_ACCOUNT': {
        return {
          ...state,
          account: {
            ...action.account,
          }
        };
      }

      case 'UPDATE_USER_PROFILE' : {
        return {
          ...state,
          account: {
            ...state.account,
            profile: {
              ...action.profile,
            },
          }
        };
      }

      case 'CHANGE_COMPLETED_PROFILE_STATUS': {
        return {
          ...state,
          isCompletedProfile: !state.isCompletedProfile
        };
      }

      case 'CHECK_FIRST_TIME': {
        return {
          ...state
        };
      }

      case 'CHANGE_FIRST_TIME_STATUS': {
        return {
          ...state,
          isFirstTime: !state.isFirstTime
        };
      }

      case 'CHANGE_ACTIVE_USER_TYPE': {
        return {
          ...state,
          activeUserType: action.userType
        };
      }

      default:
        return state;
    }
  }