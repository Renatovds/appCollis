import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container, CardText } from './style';

interface CardProps extends RectButtonProperties {
  icon: string;
  sizeIcon: number;
  colorIcon?: string;
  children: string;
}

const Card: React.FC<CardProps> = ({
  icon,
  sizeIcon,
  colorIcon,
  children,
  ...rest
}: CardProps) => (
  <Container {...rest}>
    <Icon name={icon} size={sizeIcon} color={colorIcon} />
    <CardText>{children}</CardText>
  </Container>
);

export default Card;
