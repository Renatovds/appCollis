import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const Container = styled(RectButton)`
  height: ${(screenHeight * 0.1).toFixed(0)}px;

  max-height: 60px;
  background-color: #08881a;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-top: ${screenHeight * 0.01}px;
`;
export const ButtonText = styled.Text`
  font-size: ${(screenWidth * 0.05).toFixed(0)}px;
  color: #fefefe;
  font-family: 'Roboto-Medium';
`;
