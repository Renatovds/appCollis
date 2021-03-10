import styled, { css } from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../utils/converterDimensions';

interface BackToSignInProps {
  visible: boolean;
}
interface ContainerSignUpProps {
  smallPhone: boolean;
}
export const Container = styled.View<ContainerSignUpProps>`
  flex: 1;
  font-size: ${widthPercentageToDP('2%').toFixed(0)}px;
  justify-content: center;
  align-items: center;

  ${props =>
    props.smallPhone
      ? css`
          padding: ${`${heightPercentageToDP('0%').toFixed(0)}px`}
            ${widthPercentageToDP('4%').toFixed(0)}px
            ${Platform.OS === 'android'
              ? heightPercentageToDP('5%').toFixed(0)
              : 40}px;
        `
      : css`
          padding: ${`${heightPercentageToDP('3%').toFixed(0)}px`}
            ${`${widthPercentageToDP('4%').toFixed(0)}px`}
            ${Platform.OS === 'android'
              ? heightPercentageToDP('5%').toFixed(0)
              : 40}px;
        `}

  background-color: #ffffff;
`;
export const Title = styled.Text`
  font-size: ${widthPercentageToDP('6%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #215ad0;
  margin: ${heightPercentageToDP('6%').toFixed(0)}px 0
    ${heightPercentageToDP('2%').toFixed(0)}px 0;
`;
export const LabelInput = styled.Text`
  font-family: 'Roboto-Medium';
  color: #215ad0;
  padding: ${heightPercentageToDP('1%').toFixed(0)}px
    ${widthPercentageToDP('2%').toFixed(0)}px;
  font-size: ${widthPercentageToDP('4%').toFixed(0)}px;
`;
export const PSInput = styled.Text`
  font-family: 'Roboto-Medium';
  padding: 0 ${widthPercentageToDP('2%').toFixed(0)}px;
  margin-bottom: 12px;
  font-size: ${widthPercentageToDP('3.2%').toFixed(0)}px;
`;
export const BackToSignIn = styled.TouchableOpacity<BackToSignInProps>`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: ${heightPercentageToDP('10%').toFixed(0)}px;
  max-height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${heightPercentageToDP('2%').toFixed(0)}px 0
    ${heightPercentageToDP('2%') + getBottomSpace()}px;
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

export const BackToSignInText = styled.Text`
  font-size: ${widthPercentageToDP('4%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #fff;
  margin-left: ${widthPercentageToDP('3%').toFixed(0)}px;
`;
