import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import DrawerRoutes from './drawer.routes';

import Bills from '../pages/Bills';
import Bond from '../pages/Bond';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator>
    <App.Screen
      name="Home"
      component={DrawerRoutes}
      options={{ headerShown: false }}
    />

    <App.Screen
      name="Bills"
      component={Bills}
      options={{ headerShown: false }}
    />
    <App.Screen name="Bond" component={Bond} options={{ headerShown: false }} />
  </App.Navigator>
);
export default AppRoutes;
