  import AsyncStorage from "@react-native-community/async-storage"

  const initialState = {
    profile : null,
    isCompletedProfile : false
  };
  
  // AsyncStorage.getItem('stylist').then(val => initialState.profile = JSON.parse(val));
  
  export default function stylist(state = initialState, action) {
    switch (action.type) {
      case 'SET_STYLIST_PROFILE': {
        return {
          ...state,
          profile: {
           ...action.stylist
          }
        };
      }

      case 'UPDATE_STYLIST_PROFILE': {
        return {
          ...state,
          profile: {
           ...action.data
          }
        };
      }

      case 'RESET_STYLIST_DATA': {
        return {
          ...state,
          profile: null,
          isCompletedProfile: false
        };
      }

      default:
        return state;
    }
  }