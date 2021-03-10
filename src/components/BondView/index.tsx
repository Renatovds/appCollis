import React, { ReactNode, useReducer } from 'react';
import {
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { widthPercentageToDP } from '../../utils/converterDimensions';
import { Card, Title } from './styles';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

interface BondViewProps {
  name: string;
  backgroundColor: string;
  children?: ReactNode;
}

interface BondStatusProps {
  icon: 'chevron-down' | 'chevron-up';
  status: boolean;
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const bondReducer = (
  state: BondStatusProps,
  action: boolean,
): BondStatusProps => {
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
const BondView: React.FC<BondViewProps> = ({
  name,
  children,
  backgroundColor,
}: BondViewProps) => {
  const [state, dispatch] = useReducer(bondReducer, {
    icon: 'chevron-down',
    status: false,
  });

  const resizeButton = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    dispatch(!state.status);
  };

  return (
    <Card
      style={{
        backgroundColor,
        height: state.status ? 'auto' : screenHeight * 0.08,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableWithoutFeedback
          onPress={resizeButton}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: screenHeight * 0.06,
            width: widthPercentageToDP('90%'),
          }}
        >
          <Title>{name}</Title>
          <FeatherIcon
            name={state.icon}
            size={Number((screenWidth * 0.09).toFixed(0))}
            color="#215AD0"
          />
        </TouchableWithoutFeedback>
      </View>
      {children}
    </Card>
  );
};

export default BondView;
