import React from 'react';
import { AuthProvider } from './authContext';

const Providers: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
