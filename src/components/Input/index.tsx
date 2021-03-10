/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { Dimensions, TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './style';
import inputMask from '../../utils/maskInput';

export interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: any;
  mask?: 'CPF/CNPJ';
}

interface InputValueRefProps {
  value: string;
}
interface IRefInput {
  focus(): void;
}

const screenWidth = Dimensions.get('window').width;
const Input: React.RefForwardingComponent<IRefInput, InputProps> = (
  { name, containerStyle = {}, icon, mask, ...rest },
  ref,
) => {
  const [isFocused, setIsFocus] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
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

  const handleMask = useCallback((text: string) => {
    const valueText = inputMask(text);
    inputValueRef.current.value = valueText;
    textInputRef.current.setNativeProps({ text: valueText });
  }, []);

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={screenWidth * 0.07}
        color={isFocused || isFilled ? '#215ad0' : '#666360'}
      />
      <TextInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={textInputRef}
        defaultValue={defaultValue}
        onChangeText={value => {
          if (mask === 'CPF/CNPJ') {
            handleMask(value);
          } else {
            inputValueRef.current.value = value;
          }
        }}
        placeholderTextColor="#666360"
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
