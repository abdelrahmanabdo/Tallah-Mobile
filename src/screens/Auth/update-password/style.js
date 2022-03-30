import {
  StyleSheet,
  Dimensions
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: '5%',
    paddingHorizontal: 20
  },
  headerContainer: {
    flexDirection: 'row',
    marginStart: 10,
  },
  largeText: {
    marginTop: 40,
    marginBottom: 10,
    fontSize: 30,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingHorizontal: '10%',
  },
  copyText: {
    marginTop: 10,
    marginBottom: 46,
    fontSize: 14,
    paddingHorizontal: 20,
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 25,
    color: '#393B3C',
    fontWeight: '500',
  },
});