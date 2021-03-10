import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
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
  font-size: ${heightPercentageToDP('2.6%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #fff;
  margin-left: ${widthPercentageToDP('4%').toFixed(0)}px;
`;
export const CardBill = styled(LinearGradient)`
  height: ${heightPercentageToDP('33%').toFixed(0)}px;
  margin: ${heightPercentageToDP('2%').toFixed(0)}px
    ${widthPercentageToDP('4%').toFixed(0)}px
    ${heightPercentageToDP('1%').toFixed(0)}px;
  padding: ${heightPercentageToDP('2%').toFixed(0)}px
    ${widthPercentageToDP('4%').toFixed(0)}px;
  border-radius: ${widthPercentageToDP('4%').toFixed(0)}px;
`;
export const MonthBill = styled.Text`
  font-size: ${heightPercentageToDP('3%').toFixed(0)}px;
  padding: ${heightPercentageToDP('1%').toFixed(0)}px 0;
  color: #fefefe;
  font-family: 'Roboto-Medium';
`;
export const StatusBill = styled.Text`
  display: flex;
  font-size: ${heightPercentageToDP('3%').toFixed(0)}px;
  font-weight: 600;
  padding: ${heightPercentageToDP('2%').toFixed(0)}px 0;
  color: #fefefe;
  font-family: 'Roboto-Medium';
  flex-direction: row;
`;
export const ExpirationBill = styled.Text`
  font-size: ${heightPercentageToDP('2.5%').toFixed(0)}px;
  padding: ${heightPercentageToDP('1%').toFixed(0)}px 0;
  color: #fefefe;
  font-family: 'Roboto-Medium';
`;
export const ValueBill = styled.Text`
  font-size: ${heightPercentageToDP('4%').toFixed(0)}px;
  padding: ${heightPercentageToDP('2%').toFixed(0)}px 0
    ${heightPercentageToDP('1%').toFixed(0)}px;
  margin-top: auto;
  font-weight: 500;
  color: #fefefe;
  font-family: 'Roboto-Medium';
`;
export const DetailsText = styled.Text`
  font-size: ${heightPercentageToDP('2%').toFixed(0)}px;
  margin-top: ${heightPercentageToDP('0.5%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
`;
export const PayCodeCard = styled.View`
  border-color: #9e9e9e;
  border-top-width: 2px;
  border-bottom-width: 2px;
`;
export const PayCode = styled.Text`
  font-size: ${heightPercentageToDP('2%').toFixed(0)}px;
  margin: 0 ${widthPercentageToDP('2%').toFixed(0)}px;
  padding: ${heightPercentageToDP('1%').toFixed(0)}px
    ${widthPercentageToDP('4%').toFixed(0)}px;
  text-align: center;
  font-family: 'Roboto-Medium';
`;

export const PayCodeButton = styled.TouchableOpacity`
  height: ${heightPercentageToDP('8%').toFixed(0)}px;
  background-color: #215ad0;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: ${heightPercentageToDP('1%').toFixed(0)}px
    ${widthPercentageToDP('5%').toFixed(0)}px;
`;
export const PayCodeButtonText = styled.Text`
  font-size: ${heightPercentageToDP('2%').toFixed(0)}px;
  color: #fefefe;
  font-family: 'Roboto-Medium';
`;
