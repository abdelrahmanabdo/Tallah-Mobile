export default {
  'baseUrl': 'https://dashboard.tallah.co/api/v1/',
  //Auth
  'login' : 'auth/login', //params : email , @mobile_number , password
  'register' : 'auth/register', //params : email , name
                                //password , confirm_password
  'socialLogin': 'auth/social-login',
  'forgetPassword': 'forget-password',
  'updateUserPassword': 'forget-password/update-password',

  //Public
  'countries' : 'countries',
  'categories' : 'categories',
  'brands' : 'brands',
  'colors' : 'colors',
  'support': 'supports',
  'gifts': 'gifts',
  'registrationChoices': 'registration-choices',
  'specializations' : 'specializations',
  'about': 'about',
  'tAndC': 'T&C',

  
  //Authorized  
  //Profile
  'profile': 'user-profile',

  //Blogs
  'blog': 'blogs',

  //Closet
  'closet': 'closets',
  'outfit': 'outfits',

  'calendar': 'calendar',

  //Stylist
  'stylist': 'stylists',
  'stylistProject': 'stylist-projects',
  'stylistCertificate': 'stylist-certificates',
  'stylistSpecialization': 'stylist-specializations',
  'stylistBankAccount': 'stylist-bank-accounts',
  'verifyStylistPhone': 'stylists/otp/verify',

  //Favourites
  'favourites': 'favourites',

  //Notifications
  'notifications': 'notifications',

  //Chats
  'chats': 'chats',
  'chatMessages': 'chats/messages',
  'sendMessage': 'chats/send',

  'otpVerify': 'otp/verify',
  'otpResend': 'otp/resend',

  'addAnonymgousToken': 'tokens/anonymous',
  'assignUserToken': 'tokens/assign',
  'unassignUserToken': 'tokens/unassign',
};