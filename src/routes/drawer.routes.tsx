import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Password from '../pages/Password';
import Communication from '../pages/CommunicationChannels';
import Bills from '../pages/Bills';
import CustomDrawer from '../components/CustomDrawer';

const screenWidth = Dimensions.get('window').width;
const DrawerRoutes: React.FC = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      drawerType="front"
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({ focused, color }) => (
            <Icon
              color={color}
              size={Number((screenWidth * 0.07).toFixed(0))}
              name={focused ? 'home' : 'home-outline'}
            />
          ),
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="Cadastro"
        component={Profile}
        options={{
          drawerIcon: ({ focused, color }) => (
            <Icon
              color={color}
              size={Number((screenWidth * 0.07).toFixed(0))}
              name={focused ? 'account' : 'account-outline'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Password"
        component={Password}
        options={{
          drawerIcon: ({ focused, color }) => (
            <Icon
              color={color}
              size={Number((screenWidth * 0.07).toFixed(0))}
              name={focused ? 'lock' : 'lock-outline'}
            />
          ),
          drawerLabel: 'Alterar senha',
        }}
      />
      <Drawer.Screen
        name="Bills"
        component={Bills}
        options={{
          drawerIcon: ({ focused, color }) => (
            <Icon
              color={color}
              size={Number((screenWidth * 0.07).toFixed(0))}
              name={focused ? 'barcode' : 'barcode'}
            />
          ),
          drawerLabel: 'Faturas',
        }}
      />
      <Drawer.Screen
        name="CommunicationChannels"
        component={Communication}
        options={{
          drawerIcon: ({ focused, color }) => (
            <Icon
              color={color}
              size={Number((screenWidth * 0.07).toFixed(0))}
              name={focused ? 'phone' : 'phone-outline'}
            />
          ),
          drawerLabel: 'Atendimento',
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerRoutes;
