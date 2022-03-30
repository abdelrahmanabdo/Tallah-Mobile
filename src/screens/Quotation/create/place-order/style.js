import { StyleSheet, Dimensions, Platform } from 'react-native';

export default StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#FFF',
    marginBottom: '21%',
    padding: 20
  },
  stylistName: {
    margin: 20,
    fontSize: 16,
    color: '#353535',
    fontWeight: '500',
  },
  quotationRow: {
    marginBottom: 20,
  },
  rowTitle: {
    fontSize: 16,
    color: '#353535',
    fontWeight: '600',
  },
  rowValue: {
    fontSize: 13,
    color: '#707070',
    fontWeight: '400',
    marginTop: 8
  },
  quotationInfo: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#707070',
    borderBottomColor: '#707070',
    marginBottom: 10
  },  
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  priceTitle: {
    color: '#535353',
    fontSize: 15,
    fontWeight: '500',
  },
  priceValue: {
    color: '#252525',
    fontSize: 16,
    fontWeight: '600',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  totalTitle: {
    color: '#252525',
    fontSize: 17,
    fontWeight:'500',
  },
  totalValue: {
    color: '#D4AF37',
    fontSize: 22,
    fontWeight: '600',
  },
  buttonsContainer: {
    flexDirection: 'row',
    padding: 15,
    position: 'absolute',
    bottom: 0,
  },
});
