import React from 'react';
import { Dimensions, Image } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/authContext';

import { DrawerContainer, List, Item, ContainerImage } from './styles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CustomDrawerContent: React.FC = props => {
  const { signOut } = useAuth();
  return (
    <DrawerContainer {...props}>
      <ContainerImage>
        <Image
          source={logoImg}
          style={{
            resizeMode: 'contain',
            width: screenWidth * 0.4,
            height: screenHeight * 0.12,
          }}
        />
      </ContainerImage>

      <List
        {...props}
        activeBackgroundColor="#215ad0"
        activeTintColor="#ededed"
        itemStyle={{
          borderTopRightRadius: 24,
          borderBottomEndRadius: 24,
          marginLeft: 0,
        }}
        labelStyle={{
          fontSize: Number((screenWidth * 0.04).toFixed(0)),
          fontFamily: 'Roboto-Medium',
          marginLeft: -10,
        }}
      />
      <Item
        icon={({ focused, size }) => (
          <Icon
            color="#215ad0"
            size={Number((screenWidth * 0.07).toFixed(0))}
            name="exit-to-app"
          />
        )}
        label="Sair"
        labelStyle={{
          fontSize: Number((screenWidth * 0.04).toFixed(0)),
          color: '#215ad0',
          fontFamily: 'Roboto-Medium',
        }}
        onPress={() => signOut()}
      />
    </DrawerContainer>
  );
};

export default CustomDrawerContent;
