import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
export const Container = styled(LinearGradient)`
  width: 100%;

  flex-direction: row;
  justify-content: flex-start;
  padding-left: ${(screenWidth * 0.04).toFixed(0)}px;
`;
