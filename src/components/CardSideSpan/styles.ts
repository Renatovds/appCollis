import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
export const Container = styled.View`
  flex: 1;
  background-color: #fefefe;
`;
export const Card = styled(Animated.View)`
  background-color: #ffffff;
  border-radius: ${(screenWidth * 0.1).toFixed(0)}px;
  margin: ${(screenHeight * 0.02).toFixed(0)}px
    ${(screenWidth * 0.02).toFixed(0)}px;
  padding: ${(screenHeight * 0.015).toFixed(0)}px
    ${(screenWidth * 0.04).toFixed(0)}px;
  overflow: hidden;
`;
