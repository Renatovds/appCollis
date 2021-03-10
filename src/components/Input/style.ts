import styled, { css } from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

const screenHeight = Dimensions.get('window').height;
const screenWitdh = Dimensions.get('window').width;

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: ${(screenHeight * 0.09).toFixed(0)}px;
  padding: 0 ${(screenWitdh * 0.04).toFixed(0)}px;
  max-height: 64px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: ${(screenHeight * 0.02).toFixed(0)}px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: #3e3a3a;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `};

  ${props =>
    props.isFocused &&
    css`
      border-color: #215ad0;
    `};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #666360;
  font-family: 'Roboto-Medium';
  font-size: ${(screenWitdh * 0.06).toFixed(0)}px;
  line-height: ${(screenHeight * 0.04).toFixed(0)}px;
`;

export const Icon = styled(MaterialIcon)`
  margin-right: ${(screenWitdh * 0.02).toFixed(0)}px;
`;
