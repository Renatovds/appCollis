import React from 'react';
import { Container } from './styles';

const TopProfile: React.FC = ({ children }) => (
  <Container colors={['#08881a', '#1e9e45']}>{children}</Container>
);

export default TopProfile;
