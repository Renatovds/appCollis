import styled, { css } from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}
export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${(screenHeight * 0.07).toFixed(0)}px;
  padding: 0 ${(screenWidth * 0.01).toFixed(0)}px;

  margin-bottom: ${(screenHeight * 0.01).toFixed(0)}px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: #215ad0;
  ${props =>
    props.isErrored &&
    css`
      border-bottom-color: #c53030;
    `};

  ${props =>
    props.isFocused &&
    css`
      background-color: #dedede;
    `};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #666360;
  font-family: 'Roboto-Medium';
  font-size: ${(screenWidth * 0.06).toFixed(0)}px;
`;
