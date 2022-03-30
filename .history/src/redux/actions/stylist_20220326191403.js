
/**
 * Stylist
 */
export const setStylistProfile = (stylist) => {
   return ({
      type: 'SET_STYLIST_PROFILE',
      stylist,
   });
};

export const updateStylistProfile  = (data) => {
   return ({
      type: 'UPDATE_STYLIST_PROFILE',
      data,
   });
};

