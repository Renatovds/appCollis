import styled, { css } from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Dimensions, Platform } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../utils/converterDimensions';

interface CreateAccountButtonProps {
  visible: boolean;
}
interface SignInProps {
  smallPhone: boolean;
}
const screenHeight = Dimensions.get('window').height;
export const Container = styled.View<SignInProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  ${props =>
    props.smallPhone
      ? css`
          padding: ${heightPercentageToDP('2%').toFixed(0)}px
            ${widthPercentageToDP('4%').toFixed(0)}px
            ${Platform.OS === 'android'
              ? heightPercentageToDP('10%').toFixed(0)
              : 40}px;
        `
      : css`
          padding: ${heightPercentageToDP('6%').toFixed(0)}px
            ${widthPercentageToDP('4%').toFixed(0)}px
            ${Platform.OS === 'android'
              ? heightPercentageToDP('10%').toFixed(0)
              : 40}px;
        `}
  background-color: #ffffff;
`;
export const Title = styled.Text<SignInProps>`
  color: #215ad0;
  font-family: 'Roboto-Medium';
  ${props =>
    props.smallPhone
      ? css`
          font-size: ${widthPercentageToDP('6%').toFixed(0)}px;
          margin: ${heightPercentageToDP('3%').toFixed(0)}px 0
            ${heightPercentageToDP('2%').toFixed(0)}px 0;
        `
      : css`
          font-size: ${widthPercentageToDP('6%').toFixed(0)}px;
          margin: ${heightPercentageToDP('10%').toFixed(0)}px 0
            ${heightPercentageToDP('4%').toFixed(0)}px 0;
        `}
`;
export const ForgotPassword = styled.TouchableOpacity`
  margin-top: ${heightPercentageToDP('3%').toFixed(0)}px;
`;
export const CheckboxView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 0;
  margin-bottom: ${heightPercentageToDP('2%').toFixed(0)}px;
`;
export const CheckboxText = styled.Text`
  font-size: ${widthPercentageToDP('4%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #215ad0;
`;
export const ForgotPasswordText = styled.Text`
  font-size: ${widthPercentageToDP('4%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #215ad0;
`;
export const CreateAccountButton = styled.TouchableOpacity<
  CreateAccountButtonProps
>`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: ${(screenHeight * 0.1).toFixed(0)}px;
  max-height: 64px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${(screenHeight * 0.02).toFixed(0)}px 0
    ${screenHeight * 0.02 + getBottomSpace()}px;
  background-color: #215ad0;
  border-top-width: 1px;
  border-top-color: #232129;
  border-bottom-color: #232129;

  ${props =>
    props.visible
      ? css`
          opacity: 0;
        `
      : css`
          opacity: 1;
        `}
`;

export const CreateAccountButtonText = styled.Text`
  font-size: ${widthPercentageToDP('4%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #fefefe;
  margin-left: ${widthPercentageToDP('3%').toFixed(0)}px;
`;
