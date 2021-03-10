import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../utils/converterDimensions';

interface BondStatusProp {
  status: string;
}
export const Container = styled.View`
  flex: 1;
  background-color: #ededed;
`;

export const Header = styled(LinearGradient)`
  padding: 0 ${widthPercentageToDP('8%').toFixed(0)}px
    ${heightPercentageToDP('6%').toFixed(0)}px
    ${widthPercentageToDP('8%').toFixed(0)}px;
  padding-top: ${Platform.OS === 'ios'
    ? getStatusBarHeight() + heightPercentageToDP('3%').toFixed(0)
    : heightPercentageToDP('3%').toFixed(0)}px;
  flex-direction: row;
  justify-content: center;

  z-index: -1;
  height: ${heightPercentageToDP('18%').toFixed(0)}px;
  position: relative;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: ${widthPercentageToDP('6%').toFixed(0)}px;

  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #fefefe;
  font-size: ${widthPercentageToDP('6%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const BondView = styled.View`
  border-top-width: 1px;
  border-bottom-width: 1px;
  padding: ${heightPercentageToDP('1%').toFixed(0)}px
    ${widthPercentageToDP('2%').toFixed(0)}px;
  margin: ${heightPercentageToDP('0.5%').toFixed(0)}px
    ${widthPercentageToDP('2%').toFixed(0)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const BondText = styled.Text`
  font-size: ${widthPercentageToDP('5%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
`;
export const PlanView = styled.View`
  border-top-width: 1px;
  border-bottom-width: 1px;
  padding: ${heightPercentageToDP('0.5%').toFixed(0)}px
    ${widthPercentageToDP('2%').toFixed(0)}px;
  margin: ${heightPercentageToDP('0.5%').toFixed(0)}px
    ${widthPercentageToDP('2%').toFixed(0)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const PlanText = styled.Text`
  font-size: ${widthPercentageToDP('4%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  text-align: auto;
`;
export const BondStatusText = styled.Text<BondStatusProp>`
  font-size: ${widthPercentageToDP('5%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #000;
  ${props =>
    props.status === 'pago'
      ? css({ color: '#05a531' })
      : css({ color: '#215ad0' })}
`;
export const ButtonToBills = styled.TouchableOpacity`
  margin-top: ${heightPercentageToDP('2.6%').toFixed(0)}px;
  margin-left: auto;
`;
export const ButtonToBillsText = styled.Text`
  font-size: ${widthPercentageToDP('4%').toFixed(0)}px;
  font-weight: 700;
  color: #215ad0;
  padding: ${heightPercentageToDP('2%').toFixed(0)}px
    ${widthPercentageToDP('5%').toFixed(0)}px;
  border-width: 2px;
  border-color: #215ad0;
  border-radius: ${widthPercentageToDP('5%').toFixed(0)}px;
  margin-top: ${heightPercentageToDP('2%').toFixed(0)}px;
`;
