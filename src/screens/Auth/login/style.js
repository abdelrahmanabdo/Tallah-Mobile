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
    backgroundColor: '#F6F6F6',
    paddingTop: '16%',
    paddingHorizontal: 10
  },
  headerText: {
    marginStart: 20,
    marginBottom: 5,
    fontSize: 22,
    fontWeight: 'bold'
  },
  logo: {
    width: 110,
    height: 110,
    marginVertical: 15,
    alignSelf: 'center'
  },
  rowContainer: {
    marginStart: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2
  },
  whiteMediumText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: '700'
  },
  smallText: {
    alignSelf: 'flex-start',
    color: "#393B3C",
    marginStart: 5,
    fontSize: 13,
    fontWeight: '200'
  },
  termsText: {
    color: '#393B3C',
    textDecorationLine: 'underline'
  }
});