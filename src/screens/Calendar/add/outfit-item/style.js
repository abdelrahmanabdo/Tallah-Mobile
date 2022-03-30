import {StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width ;
const height = Dimensions.get('window').height ;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    paddingStart: 15,
    paddingHorizontal: 10
  },
  headerText: {
    marginStart: 20,
    fontSize: 17,
    fontWeight: '600',
    color: '#012647',
  },
  tabsContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#D4AF37',
    borderWidth: .5
  },
  categoriesRow: {
    marginVertical: 15,
  },
  itemsListContainer: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 20,
  },
  selectedItemIndicator: {
    position: 'absolute',
    top: 5,
    left: 10,
    zIndex: 100,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#D4AF37'
  }
});