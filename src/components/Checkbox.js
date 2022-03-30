import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions  , Pressable} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';


const {width , height} = Dimensions.get('window');

const Checkbox = ({...props}) => {
   const [isChecked , setIsChecked] = useState(props.isChecked  ?? false);


   const style = StyleSheet.create({
      container : {
         flexDirection:'column',
         width :28,
         height:28,
         alignSelf:'center',
         padding : 12,
         justifyContent:'center',
         backgroundColor: isChecked ? '#D4AF37' : '#FFF',
         borderRadius:8,
         marginHorizontal: 10
      },
      roundedContainer :{
         flexDirection:'column',
         width :28,
         height:28,
         alignSelf:'center',
         padding : 12,
         borderWidth : .5,
         borderColor: isChecked  ? '#D4AF37' : '#F8F8F8',
         padding : 10,
         justifyContent:'center',
         backgroundColor: isChecked ? '#D4AF37' : '#F8F8F8',
         borderRadius:14,
         marginHorizontal: 10
      },
      value:{
         color : isChecked ? '#D4AF37' : '#000',
         height:28,
         width:28,
         textAlign : 'center',
      },
      label : {
         color : isChecked  ? '#D4AF37' : '#000'
      }
   });

   useEffect(()=>{
   },[props.isChecked])

   return <View style={{flexDirection:'row',alignItems:'center'}}>
      {
         props.isModal ?
           <Pressable onPress ={()=>{
                                     setIsChecked(!isChecked);
                                    props.onChange(!isChecked)
                                 }}
                      android_ripple={{color:  ('#FFF')}}
                      style={props.isRounded ? style.roundedContainer : style.container} >
            </Pressable>
            :
             <RectButton onPress ={()=>{
                                    setIsChecked(!isChecked);
                                    props.onChange(!isChecked)
                                 }}
                         style={props.isRounded ? style.roundedContainer : style.container}>
             </RectButton>
      }

      {
         props.label && <Text style={style.label}>
            {props?.label}
         </Text>
      }
   </View>

};

export default Checkbox;
