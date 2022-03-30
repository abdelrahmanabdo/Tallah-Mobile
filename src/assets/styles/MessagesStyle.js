import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default  style = StyleSheet.create({
   container : {
    flex:1 , 
    width : width ,
    alignSelf: 'center',
    backgroundColor: '#FFF',
   },
   header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderBottomColor: '#ECEFF2',
    borderBottomWidth: 1
  },
  headerButton: {
    width: '40%',
    backgroundColor: '#D4AF37',
    borderRadius: 10,
    padding: 8,
    margin: 10,
    borderBottomWidth: .5,
    borderBottomColor: '#F8F8F8'
  },
  headerButtonText: {
    color: '#FFF',
    textAlign: 'center'
  },
  chatContainer : {
    width : width ,
    flexDirection : 'row' ,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13 ,
    borderBottomWidth : 1,
    borderBottomColor : '#CCC'
  },
  chatDetailsContainer :{
    flex:4,
    flexDirection : 'column',
    justifyContent: 'space-between',
  }, 
  searchContainer : {
    width : width ,
    borderBottomWidth :.5,
    flexDirection : 'row',
    alignItems: 'center',
    borderBottomColor : '#Ccc',
    padding: 20,
  },
  messageContainer : {
    paddingHorizontal: 10,
    marginTop : 8,
    flexDirection : 'row',
    justifyContent: 'center',
  },
  messageDetailsContainer :{
    padding: 10,
    borderRadius : 8 ,
    justifyContent: 'center',
    alignItems: 'center',
    margin : 6,
  },
  actionsContainer :{
    backgroundColor: '#012647',
    height : height * .09,
    flexDirection : 'row',
    justifyContent:'flex-start',
    alignItems:'center'
  }
});