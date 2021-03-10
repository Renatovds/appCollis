/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback, useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  LayoutAnimation,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
  CheckboxView,
  CheckboxText,
} from './style';
import Button from '../../components/Button';
import Input from '../../components/Input';
import logImg from '../../assets/logo.png';
import getValidationErrors from '../../utils/validationErrors';
import { useAuth } from '../../hooks/authContext';

interface ISubmitData {
  cpf_cnpj: string;
  password: string;
}
const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const inputPasswordRef = useRef<TextInput>(null);
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);
  const handleSubmit = useCallback(
    async (data: ISubmitData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          cpf_cnpj: Yup.string().required('CPF/CNPJ obrigatório.'),
          password: Yup.string().required('Senha obrigatória.'),
        });
        await schema.validate(data, { abortEarly: false });

        const dismaskData = data.cpf_cnpj.replace(/\D/g, '');
        const { password } = data;
        await signIn({
          cpf_cnpj: dismaskData,
          password,
          saveLogin: toggleCheckBox,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const validateErrors = getValidationErrors(err);
          // eslint-disable-next-line no-unused-expressions
          formRef.current?.setErrors(validateErrors);
          setLoading(false);
          return;
        }

        Alert.alert('Erro ao efetuar login.', 'Verifique suas credenciais.');
        setLoading(false);
      }
    },
    [signIn, toggleCheckBox],
  );
  useEffect(() => {
    let monted = true;
    if (monted) {
      setLoading(false);
    }
    return function cleanup() {
      monted = false;
    };
  }, []);

  const displayButton = (state: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToggleInput(state);
  };
  const smallPhone = Dimensions.get('window').height <= 700;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ position: 'relative' }}
        >
          <Container smallPhone={smallPhone}>
            <Image
              source={logImg}
              style={{
                resizeMode: 'contain',
                width: screenWidth * 0.5,
                height: screenHeight * 0.15,
              }}
            />

            <View>
              <Title smallPhone={smallPhone}>Faça seu logon</Title>
            </View>
            <Form
              ref={formRef}
              onSubmit={data => {
                handleSubmit(data);
                setLoading(true);
              }}
            >
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="decimal-pad"
                name="cpf_cnpj"
                icon="account-outline"
                placeholder="CPF/CNPJ"
                returnKeyType="next"
                mask="CPF/CNPJ"
                maxLength={18}
                onFocus={() => {
                  displayButton(true);
                }}
                onBlur={() => {
                  displayButton(false);
                }}
                onSubmitEditing={() => inputPasswordRef.current?.focus()}
              />

              <Input
                ref={inputPasswordRef}
                name="password"
                icon="lock-outline"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onFocus={() => {
                  displayButton(true);
                }}
                onBlur={() => {
                  displayButton(false);
                }}
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <CheckboxView>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
                <CheckboxText>Mantenha-me conectado.</CheckboxText>
              </CheckboxView>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  'Entrar'
                )}
              </Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>

        <CreateAccountButton
          disabled={toggleInput}
          visible={toggleInput}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Icon name="log-in" size={20} color="#fefefe" />
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
