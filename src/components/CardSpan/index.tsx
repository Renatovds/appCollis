import React, {
  useCallback,
  useState,
  ReactNode,
  useReducer,
  useEffect,
} from 'react';
import {
  Text,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from './styles';

interface CardSpanStatusProps {
  icon: 'chevron-down' | 'chevron-up';
  status: boolean;
}

interface CardSpanProps {
  name: string;
  icon: string;
  iconSize: number;
  initialHeight?: number;
  initialStatus?: 'opened' | 'closed';
  children?: ReactNode;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const viewReducer = (
  state: CardSpanStatusProps,
  action: boolean,
): CardSpanStatusProps => {
  if (action) {
    return {
      icon: 'chevron-up',
      status: action,
    };
  }
  return {
    icon: 'chevron-down',
    status: action,
  };
};
const CardSpan: React.FC<CardSpanProps> = ({
  icon,
  name,
  iconSize,
  initialHeight,
  initialStatus,
  children,
}: CardSpanProps) => {
  const [state, dispatch] = useReducer(viewReducer, {
    icon: 'chevron-down',
    status: false,
  });

  const resizeButton = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(!state.status);
  };
  useEffect(() => {
    if (initialStatus === 'opened') {
      dispatch(true);
    }
  }, [initialStatus]);

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return (
    <>
      <Card
        style={{
          height: state.status ? 'auto' : initialHeight,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 6,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={icon} size={iconSize} color="#215AD0" />
            <Text
              style={{
                fontSize: Number((screenWidth * 0.05).toFixed(0)),
                marginLeft: Number((screenWidth * 0.02).toFixed(0)),
                color: '#215AD0',
                fontFamily: 'Roboto-Medium',
              }}
            >
              {name}
            </Text>
          </View>
          <TouchableWithoutFeedback
            hitSlop={{
              left: Number((screenWidth * 0.14).toFixed(0)),
              bottom: Number((screenHeight * 0.03).toFixed(0)),
              right: Number((screenWidth * 0.07).toFixed(0)),
              top: Number((screenHeight * 0.06).toFixed(0)),
            }}
            onPress={resizeButton}
            style={{
              width: Number((screenWidth * 0.14).toFixed(0)),
              alignItems: 'flex-end',
            }}
          >
            <Icon
              name={state.icon}
              size={Number((screenWidth * 0.09).toFixed(0))}
              color="#215AD0"
            />
          </TouchableWithoutFeedback>
        </View>
        {children}
      </Card>
    </>
  );
};

export default CardSpan;
