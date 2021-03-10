import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const Card = styled(Animated.View)`
  background-color: #ffffff;
  padding: ${(screenHeight * 0.02).toFixed(0)}px
    ${(screenWidth * 0.05).toFixed(0)}px;
  overflow: hidden;
`;

export const Title = styled.Text`
  font-size: ${(screenWidth * 0.05).toFixed(0)}px;
  color: #215ad0;
  font-family: 'Roboto-Medium';
`;
