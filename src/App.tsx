import 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  OneSignal.setAppId('22377387-779d-4bca-b8ee-ef306d268afe');
  // OneSignal.setNotificationOpenedHandler(e => {
  //   console.log(`notificação:${e.notification.body}`);
  // });

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#08881a" />
      <AuthProvider>
        <View style={{ flex: 1, backgroundColor: '#05a531' }}>
          <Routes />
        </View>
      </AuthProvider>
    </NavigationContainer>
  );
};
export default App;
