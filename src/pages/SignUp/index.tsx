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
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  PSInput,
} from './style';
import InputPassword from '../../components/InputPassword';

interface ISubmitSignUpData {
  cpf_cnpj: string;
  password: string;
  password_confirmation: string;
}
const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const textInputPasswordRef = useRef<TextInput>(null);
  const textInputPasswordConfirmationRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);

  const handleSubmit = useCallback(
    async (data: ISubmitSignUpData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          cpf_cnpj: Yup.string().required(' Digite um CPF ou CNPJ.'),
          password: Yup.string()
            .required('Senha obrigatória.')
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              'Senha minima de 8 caracteres, com ao menos uma letra ou número.',
            ),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'As senhas não conferem.',
          ),
        });
        await schema.validate(data, { abortEarly: false });
        const dismaskData = data.cpf_cnpj.replace(/\D/g, '');
        const { password } = data;
        await api
          .post('/users', {
            cpf_cnpj: dismaskData,
            password,
          })
          .then(resp => {
            setLoading(false);
            Alert.alert(
              'Cadastro realizado com sucesso',
              'Você já pode fazer login.',
            );
            navigation.navigate('SignIn');
          })
          .catch(err => {
            Alert.alert('Erro ao efetuar o cadastro.', `${err.response.data}`);

            setLoading(false);
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validateErrors = getValidationErrors(err);
          formRef.current?.setErrors(validateErrors);
          setLoading(false);
          Alert.alert(err.errors[0]);
        }
      }
    },
    [navigation],
  );
  useEffect(() => {
    return () => setLoading(false);
  }, []);
  const displayButton = (state: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToggleInput(state);
  };
  const smallPhone = Dimensions.get('window').height <= 550;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ position: 'relative' }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >
          <Container smallPhone={smallPhone}>
            {!smallPhone ? (
              <Image
                source={logImg}
                style={{
                  resizeMode: 'contain',
                  width: screenWidth * 0.5,
                  height: screenHeight * 0.12,
                }}
              />
            ) : (
              <View />
            )}

            <View>
              <Title>Crie sua conta</Title>
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
              <LabelInput>Digite uma senha:</LabelInput>

              <InputPassword
                ref={textInputPasswordRef}
                name="password"
                icon="lock-outline"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  textInputPasswordConfirmationRef.current?.focus();
                }}
                onFocus={() => {
                  displayButton(true);
                }}
                onBlur={() => {
                  displayButton(false);
                }}
              />
              <PSInput>
                * Senha minima de 8 caracteres, com letras e números.
              </PSInput>
              <LabelInput>Repita a senha:</LabelInput>
              <InputPassword
                ref={textInputPasswordConfirmationRef}
                name="password_confirmation"
                icon="lock-outline"
                placeholder="Confirmar senha"
                returnKeyType="send"
                textContentType="password"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
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
                  'Cadastrar'
                )}
              </Button>
            </Form>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
      <BackToSignIn
        disabled={toggleInput}
        visible={toggleInput}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="arrow-left"
          size={Number((screenWidth * 0.06).toFixed(0))}
          color="#fefefe"
        />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
