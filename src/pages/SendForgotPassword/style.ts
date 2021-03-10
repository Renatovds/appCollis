import styled, { css } from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../utils/converterDimensions';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 ${widthPercentageToDP('4.5%').toFixed(0)}px
    ${Platform.OS === 'android' ? heightPercentageToDP('10%').toFixed(0) : 40}px;
  background-color: #ffffff;
`;

export const LabelInput = styled.Text`
  font-size: ${widthPercentageToDP('4.5%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #215ad0;
  margin: 8px;
  text-align: center;
`;
export const LabelEmail = styled.Text`
  font-size: ${widthPercentageToDP('4.5%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #232129;
  margin: ${heightPercentageToDP('4%').toFixed(0)}px 0
    ${heightPercentageToDP('3%').toFixed(0)}px;
`;
export const LabelInputSend = styled.Text`
  font-size: ${widthPercentageToDP('5%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #215ad0;
  margin: 8px;
`;
export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  padding: ${heightPercentageToDP('2%').toFixed(0)}px 0
    ${16 + getBottomSpace()}px;
  background-color: #215ad0;
  border-top-width: 1px;
  border-top-color: #232129;
  border-bottom-color: #232129;
`;

export const BackToSignInText = styled.Text`
  font-size: ${widthPercentageToDP('4.5%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #fff;
  margin-left: ${widthPercentageToDP('3.5%').toFixed(0)}px;
`;
