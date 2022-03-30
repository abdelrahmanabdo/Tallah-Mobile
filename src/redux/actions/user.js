
export const loginUser = (user, token) => {
   return ({
      type: 'LOGIN',
      user : user,
      token : token
   })
};

export const logoutUser = () => ({
   type: 'LOGOUT',
 });


export const getUser = () => ({
   type : 'GET_USER'
});

export const updateAccount = (account) => {
  return ({
    type: 'UPDATE_USER_Account',
    account,
  });
};

export const updateProfile = (profile) => {
   return ({
      type: 'UPDATE_USER_PROFILE',
      profile,
   });
};

export const changeCompletedProfileStatus = () => ({
  type: 'CHANGE_COMPLETED_PROFILE_STATUS'
});

export const checkFirstTime = () => ({
  type: 'CHECK_FIRST_TIME'
});

export const changeFirstTimeStatus = () => ({
  type: 'CHANGE_FIRST_TIME_STATUS'
});

export const changeActiveUserType = (userType) => ({
  type: 'CHANGE_ACTIVE_USER_TYPE',
  userType
});