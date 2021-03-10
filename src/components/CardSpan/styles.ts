import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #fefefe;
`;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export const Card = styled(Animated.View)`
  width: ${(screenWidth * 0.85).toFixed(0)}px;
  background-color: #ffffff;
  border-radius: 32px;
  margin: ${(screenHeight * 0.01).toFixed(0)}px 0;
  padding: ${(screenHeight * 0.02).toFixed(0)}px
    ${(screenWidth * 0.04).toFixed(0)}px;
  overflow: hidden;
`;
