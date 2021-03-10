import React, { ReactNode, useReducer, useEffect } from 'react';
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
  icon: 'chevron-right' | 'chevron-left';
  status: boolean;
}

interface CardSpanProps {
  icon: string;
  iconSize: number;
  initialWidth?: number;
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
      icon: 'chevron-left',
      status: action,
    };
  }
  return {
    icon: 'chevron-right',
    status: action,
  };
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const CardSideSpan: React.FC<CardSpanProps> = ({
  icon,
  iconSize,
  initialWidth,
  initialStatus,
  children,
}: CardSpanProps) => {
  const [state, dispatch] = useReducer(viewReducer, {
    icon: 'chevron-right',
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
  return (
    <>
      <Card
        style={{
          width: state.status ? 'auto' : initialWidth,
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableWithoutFeedback
            hitSlop={{
              left: Number((screenWidth * 0.1).toFixed(0)),
              bottom: Number((screenHeight * 0.07).toFixed(0)),
              right: Number((screenWidth * 0.05).toFixed(0)),
              top: Number((screenHeight * 0.07).toFixed(0)),
            }}
            onPress={resizeButton}
            style={{
              width: Number((screenWidth * 0.09).toFixed(0)),
              marginRight: Number((screenWidth * 0.04).toFixed(0)),
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Icon name={icon} size={iconSize} color="#215AD0" />

              <Icon
                name={state.icon}
                size={Number((screenWidth * 0.04).toFixed(0))}
                color="#215AD0"
              />
            </View>
          </TouchableWithoutFeedback>
          {children}
        </View>
      </Card>
    </>
  );
};

export default CardSideSpan;
