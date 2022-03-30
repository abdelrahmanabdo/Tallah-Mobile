import { WToast } from 'react-native-smart-tip';

const Snackbar = ({ text, position, type }) => {
   const snackBarOpts = {
      data: text || '' ,
      position: position === 'top' ? WToast.position.TOP : WToast.position.BOTTOM,
      duration: WToast.duration.LONG,
      textColor: '#FFF',
      backgroundColor: type && type  == 'success' ? '#0A627C' : '#891623',
      // actionClick: ()=>{},
   };

   return WToast.show(snackBarOpts);
};

export default Snackbar;