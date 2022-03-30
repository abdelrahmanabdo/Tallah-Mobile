import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BaseButton, BorderlessButton } from 'react-native-gesture-handler';
import {Octagon , Circle,Hexagon, Triangle } from 'react-native-shape';

const Color = ({...props}) => {
   const [isClicked , setIsClicked] = useState(props.isClicked  ?? false);
   const [selectedColorIndex , setSelectedColorIndex] = useState('');

   const style = StyleSheet.create({
     container: {

     },
     itemContainer: {
        marginStart : 15,
        marginEnd : 15,
        marginBottom: 5,
    },
    label :{
      fontSize : 16,
      fontFamily : 'Roboto-medium',
      color :'#000',
      marginTop: 5
    }
   });

   useEffect(()=>{
   },[])

   return   <View>
    <Text style={style.label}>
      Color
    </Text>
    <View style={{
        flexDirection:'row', justifyContent: 'flex-start',    
        marginVertical: 15, alignItems: 'center', flexWrap: 'wrap'
      }}
    >
      { 
        props.colors.map((item , index) => {
          return <Pressable  
              key={index} 
              onPress ={()=>{
                setSelectedColorIndex(index);
                props.onChange(item.id);
              }}
            >
              <View  style={[style.container,
                         {borderColor : index == selectedColorIndex ? item.hexa : 'transparent' ,
                              borderWidth : 1,
                              borderRadius : 20}
                        ]}
              >
                <Circle color={item.hexa}   scale={.75}/>
              </View>
            </Pressable>
        })
      }
    </View>
  </View>
};

export default Color;
