import styled from 'styled-components/native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerView,
} from '@react-navigation/drawer';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
export const DrawerContainer = styled(DrawerContentScrollView)``;
export const Drawer = styled(DrawerView)`
  background-color: #ddd;
  flex: 1;
`;
export const List = styled(DrawerItemList)``;
export const Item = styled(DrawerItem)`
  border-bottom-color: #adadad;
  border-bottom-width: 2px;
  margin-top: 10%;
  font-family: 'Roboto-Medium';
`;
export const ContainerImage = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: ${(screenHeight * 0.02).toFixed(0)}px;
  padding-bottom: ${(screenHeight * 0.04).toFixed(0)}px;
  border-bottom-color: #adadad;
  border-bottom-width: 2px;
`;
