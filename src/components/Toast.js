import React from 'react';
import { Image } from 'react-native';
import { WToast } from 'react-native-smart-tip';
import Icon from 'react-native-vector-icons/Feather';

const Toast = ({text , position , type }) => {
   const ToastOpts = {
          data: text ?? '' ,
          position: position ?? WToast.position.BOTTOM, 
          duration: WToast.duration.LONG, 
          textColor: '#FFF',
          backgroundColor: type && type  == 'success' ? '#0A627C' : '#891623',
       //    icon: type && type  == 'success' ? 
       //         <Image style={{height:27, width:27}} resizeMode={'contain'} 
       //                source={require('../assets/icons/toast-success.png')}/> : 
       //         <Icon name="alert-octagon" size={19} color={"#FFF"}/> ,
          actionClick: () => {},
         //  actionText: 'حسنا',
         //  actionTextColor: '#FFF',
   }

   return WToast.show(ToastOpts);
};

export default Toast;