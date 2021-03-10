import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { BillsDataProps } from './index';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../utils/converterDimensions';

export const Back = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${heightPercentageToDP('2%').toFixed(0)}px 0
    ${heightPercentageToDP('2%').toFixed(0)}px;
`;

export const BackText = styled.Text`
  font-size: ${widthPercentageToDP('5%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #fff;
  margin-left: ${widthPercentageToDP('2%').toFixed(0)}px;
`;

export const BillsList = styled(FlatList as new () => FlatList<BillsDataProps>)`
  flex-grow: 0;
  max-height: ${heightPercentageToDP('60%').toFixed(0)}px;
`;

export const HeaderBills = styled.View`
  margin: ${heightPercentageToDP('2%').toFixed(0)}px
    ${widthPercentageToDP('6%').toFixed(0)}px;
`;
export const TitleBills = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: ${widthPercentageToDP('5%').toFixed(0)}px;
  color: #215ad0;
`;
export const NoBillsText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: ${widthPercentageToDP('5%').toFixed(0)}px;
  margin-left: ${widthPercentageToDP('2%').toFixed(0)}px;
`;

export const BillsContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${heightPercentageToDP('2%').toFixed(0)}px
    ${widthPercentageToDP('4%').toFixed(0)}px;
  background-color: #fefefe;
  margin-bottom: ${heightPercentageToDP('1.5%').toFixed(0)}px;
  margin-left: ${widthPercentageToDP('4%').toFixed(0)}px;
  margin-right: ${widthPercentageToDP('4%').toFixed(0)}px;
  border-radius: 12px;
`;
export const BillsContent = styled.View`
  justify-content: center;
  margin-right: auto;
  padding: ${heightPercentageToDP('0.4%').toFixed(0)}px
    ${widthPercentageToDP('1%').toFixed(0)}px;
`;
export const MonthText = styled.Text`
  font-size: ${widthPercentageToDP('6%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #5a5c60;
`;
export const ExpirationText = styled.Text`
  font-size: ${widthPercentageToDP('4%').toFixed(0)}px;
  color: #5a5c60;
  font-family: 'Roboto-Medium';
`;
