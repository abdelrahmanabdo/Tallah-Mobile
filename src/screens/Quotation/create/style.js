import { StyleSheet, Dimensions, Platform } from 'react-native';

export default StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#FFF',
    marginBottom: '21%',
  },
  stylistName: {
    margin: 20,
    fontSize: 16,
    color: '#353535',
    fontWeight: '500',
  },
  graySectionContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputText: {
    marginStart: 20,
    fontSize: 14,
    color: '#353535',
    fontWeight: '600',
    marginTop: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    padding: 15,
    position: 'absolute',
    bottom: 0,
  },
});
