/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput } from './style';

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

const Input: React.RefForwardingComponent<IRefInput, InputProps> = (
  { name, containerStyle = {}, ...rest },
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

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <TextInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={textInputRef}
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        placeholderTextColor="#215ad0"
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
