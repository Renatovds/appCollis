/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
  useCallback,
  useState,
  useReducer,
} from 'react';
import { Dimensions, TextInputProps, View } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './style';

export interface InputProps extends TextInputProps {
  name: string;
  containerStyle?: any;
}

interface InputValueRefProps {
  value: string;
}
interface IRefInput {
  focus(): void;
}
interface PasswordVisibilityProps {
  icon: 'eye' | 'eye-off';
  status: boolean;
}
const viewReducer = (
  state: PasswordVisibilityProps,
  action: boolean,
): PasswordVisibilityProps => {
  if (action) {
    return {
      icon: 'eye',
      status: action,
    };
  }
  return {
    icon: 'eye-off',
    status: action,
  };
};
const screenWidth = Dimensions.get('window').width;
const Input: React.RefForwardingComponent<IRefInput, InputProps> = (
  { name, containerStyle = {}, ...rest },
  ref,
) => {
  const [isFocused, setIsFocus] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [state, dispatch] = useReducer(viewReducer, {
    icon: 'eye',
    status: true,
  });

  const textInputRef = useRef<any>(null);
  const { registerField, fieldName, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueRefProps>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      textInputRef.current.focus();
    },
  }));
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        textInputRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        textInputRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocus(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <TextInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={state.status}
        ref={textInputRef}
        defaultValue={defaultValue}
        onChangeText={value => {
          setIsChanged(true);
          inputValueRef.current.value = value;
        }}
        placeholderTextColor="#666360"
        {...rest}
      />
      {isChanged ? (
        <Icon
          onPress={() => dispatch(!state.status)}
          name={state.icon}
          size={24}
        />
      ) : (
        <View />
      )}
    </Container>
  );
};

export default forwardRef(Input);
