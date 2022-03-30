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
    marginTop: 15,
    marginBottom: 20,
    fontSize: 14,
    paddingHorizontal: 20,
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 25,
    color: '#393B3C',
    fontWeight: '500',
  },
  otpInput: {
    width: '80%',
    alignSelf: 'center',
    height: 200,
  },
  otpInputField: {
    height: 70,
    borderWidth: 0,
    borderColor: '#FFF',
    borderBottomWidth: 4,
    borderBottomColor: '#CCC',
    borderColor: '#F6F6F6',
    color: '#000000',
    fontSize: 45,
    fontWeight: '500',
    fontFamily: 'Roboto-medium',
  },
  underlineStyleHighLighted: {
    borderBottomColor: '#D4AF37',
  },
});