import styled from 'styled-components/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../utils/converterDimensions';

export const Back = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${heightPercentageToDP('2%').toFixed(0)}px 0
    ${heightPercentageToDP('2%').toFixed(0)}px;
`;

export const BackText = styled.Text`
  font-size: ${widthPercentageToDP('5%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #fff;
  margin-left: ${heightPercentageToDP('2%').toFixed(0)}px;
`;
export const TitleChannels = styled.Text`
  font-size: ${widthPercentageToDP('5%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #215ad0;
  margin: ${heightPercentageToDP('2%').toFixed(0)}px
    ${widthPercentageToDP('4%').toFixed(0)}px;
  text-align: center;
`;
export const ButtonChannel = styled.TouchableOpacity`
  height: ${heightPercentageToDP('8%').toFixed(0)}px;
  flex-direction: row;
  background-color: #fefefe;
  border-radius: 10px;
  justify-content: flex-start;
  align-items: center;
  margin: ${heightPercentageToDP('2%').toFixed(0)}px
    ${widthPercentageToDP('4%').toFixed(0)}px;
  border: solid #215ad0 1px;
  padding: ${heightPercentageToDP('0.5%').toFixed(0)}px
    ${widthPercentageToDP('4%').toFixed(0)}px;
`;
export const TextButton = styled.Text`
  font-size: ${widthPercentageToDP('4%').toFixed(0)}px;
  font-family: 'Roboto-Medium';
  color: #5a5c60;
  margin-left: ${widthPercentageToDP('4%').toFixed(0)}px;
`;
