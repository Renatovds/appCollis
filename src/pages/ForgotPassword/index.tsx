/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Text,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logImg from '../../assets/logo.png';
import api from '../../services/api';
import getValidationErrors from '../../utils/validationErrors';
import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  LabelInput,
} from './style';

interface ISubmitSignUpData {
  cpf_cnpj: string;
}

const screenWidth = Dimensions.get('window').width;
const screenHeigth = Dimensions.get('window').height;
const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const formRef = useRef<FormHandles>(null);
  const textInputPasswordRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);

  const handleSubmit = useCallback(
    async (data: ISubmitSignUpData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          cpf_cnpj: Yup.string().required('Digite um CPF ou CNPJ.'),
        });
        await schema.validate(data, { abortEarly: false });
        const dismaskedData = data.cpf_cnpj.replace(/\D/g, '');
        const response = await api.get(`/users/email?cpfCnpj=${dismaskedData}`);
        setLoading(false);

        navigation.navigate('SendForgotPassword', { email: response.data });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validateErrors = getValidationErrors(err);
          formRef.current?.setErrors(validateErrors);
          setLoading(false);
          Alert.alert(err.errors[0]);

          return;
        }

        Alert.alert(
          'CPF ou CNPJ não encontrado.',
          'Você ainda não possui cadastro no Aplicativo.',
        );
        setLoading(false);
      }
    },
    [navigation],
  );
  const displayButton = useCallback((state: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToggleInput(state);
  }, []);
  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ position: 'relative' }}
          >
            <Container>
              <Image
                source={logImg}
                style={{
                  resizeMode: 'contain',
                  width: screenWidth * 0.5,
                  height: screenHeigth * 0.15,
                }}
              />
              <View>
                <Title>Esqueceu sua senha?</Title>
              </View>
              <Form
                ref={formRef}
                onSubmit={data => {
                  handleSubmit(data);
                  setLoading(true);
                }}
              >
                <LabelInput>Digite seu CPF ou CNPJ:</LabelInput>
                <Input
                  name="cpf_cnpj"
                  icon="account-outline"
                  placeholder="CPF/CNPJ"
                  keyboardType="decimal-pad"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    textInputPasswordRef.current?.focus();
                  }}
                  mask="CPF/CNPJ"
                  maxLength={18}
                  onFocus={() => {
                    displayButton(true);
                  }}
                  onBlur={() => {
                    displayButton(false);
                  }}
                />

                <Button
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                  ) : (
                    'Enviar'
                  )}
                </Button>
              </Form>
            </Container>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <BackToSignIn
        disabled={toggleInput}
        visible={toggleInput}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={screenWidth * 0.06} color="#fefefe" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
