import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

interface AlterButtonProps {
  statusOpacity: boolean;
}
const screenHeight = Dimensions.get('window').height;
const screenWitdh = Dimensions.get('window').width;
export const Back = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${(screenHeight * 0.02).toFixed(0)}px 0
    ${(screenWitdh * 0.05).toFixed(0)}px;
`;

export const BackText = styled.Text`
  font-size: ${(screenWitdh * 0.05).toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #fff;
  margin-left: ${(screenWitdh * 0.04).toFixed(0)}px;
`;
export const TextLabel = styled.Text`
  font-size: ${(screenWitdh * 0.05).toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #215ad0;
  margin-top: ${(screenHeight * 0.01).toFixed(0)}px;
  margin-left: ${(screenWitdh * 0.01).toFixed(0)}px;
`;
export const AlterButton = styled.TouchableOpacity<AlterButtonProps>`
  height: ${(screenHeight * 0.08).toFixed(0)}px;
  background-color: #05a531;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: ${(screenHeight * 0.04).toFixed(0)}px;

  ${props =>
    props.statusOpacity
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0.5;
        `}
`;
export const TextButton = styled.Text`
  font-size: ${(screenWitdh * 0.05).toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #ededed;
`;
