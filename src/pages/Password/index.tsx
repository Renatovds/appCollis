/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-expressions */
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';

import { FormHandles } from '@unform/core';
import { AlterButton, Back, BackText, TextButton, TextLabel } from './styles';
import TopProfile from '../../components/TopProfile';

import { useAuth } from '../../hooks/authContext';
import ProfileInput from '../../components/ProfileInputPassword';

import api from '../../services/api';
import getValidationErrors from '../../utils/validationErrors';

export interface BillsDataProps {
  id: string;
  month: string;
  expiration: string;
  status: string;
}
interface ISubmitUpdateProfile {
  old_password: string;
  password: string;
  password_confirmation: string;
}
const screenHeigth = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Password: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();
  const { user, updateUser, signOut } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const textInputOldPasswordRef = useRef<TextInput>(null);
  const textInputPasswordRef = useRef<TextInput>(null);
  const textInputConfirmPasswordRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: ISubmitUpdateProfile, { reset }) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          old_password: Yup.string().required('Digite a senha atual.'),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string()
              .required()
              .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                'Senha minima de 8 caracteres, com ao menos uma letra ou número.',
              ),
            otherwise: Yup.string(),
          }),

          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required(),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'Senha de confirmação não confere.'),
        });
        await schema.validate(data, { abortEarly: false });

        const { old_password, password, password_confirmation } = data;

        const formData = {
          name: user.name,
          email: user.email,
          old_password,
          password,
          password_confirmation,
        };

        const responde = await api.put('/users/update', formData);
        updateUser(responde.data);
        setLoading(false);
        reset();
        Alert.alert(
          'Senha alterada com sucesso.',
          'Por favor faça login novamente.',
        );
        signOut();
      } catch (err) {
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          const validateErrors = getValidationErrors(err);
          formRef.current?.setErrors(validateErrors);

          return;
        }

        Alert.alert('Erro ao atualizar senha.', err.response.data);
      }
    },
    [updateUser, user.name, user.email, signOut],
  );
  const handleBackButton = useCallback(() => {
    formRef.current?.clearField('old_password');
    formRef.current?.clearField('password');
    formRef.current?.clearField('password_confirmation');
    navigate('Dashboard');
  }, [navigate]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <SafeAreaView style={{ backgroundColor: '#ededed', flex: 1 }}>
        <TopProfile>
          <Back onPress={() => handleBackButton()}>
            <FeatherIcon
              name="arrow-left"
              size={Number((screenWidth * 0.07).toFixed(0))}
              color="#fefefe"
            />
            <BackText>Alterar senha</BackText>
          </Back>
        </TopProfile>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Form
            ref={formRef}
            style={{
              marginVertical: Number((screenHeigth * 0.02).toFixed(0)),
              marginHorizontal: Number((screenWidth * 0.03).toFixed(0)),
            }}
            onSubmit={handleSubmit}
          >
            <TextLabel>Senha Atual</TextLabel>
            <View style={{ position: 'relative' }}>
              <ProfileInput
                ref={textInputOldPasswordRef}
                name="old_password"
                autoCorrect={false}
                autoCapitalize="none"
                placeholder="Digite a senha atual"
                returnKeyType="send"
                editable
                onSubmitEditing={() => {
                  textInputPasswordRef.current?.focus();
                }}
                style={{
                  fontSize: Number((screenWidth * 0.04).toFixed(0)),
                }}
              />
            </View>

            <TextLabel>Nova senha</TextLabel>
            <ProfileInput
              ref={textInputPasswordRef}
              name="password"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite a nova senha"
              editable
              returnKeyType="send"
              onSubmitEditing={() => {
                textInputConfirmPasswordRef.current?.focus();
              }}
              style={{
                fontSize: Number((screenWidth * 0.04).toFixed(0)),
              }}
            />
            <TextLabel>Confirmar nova senha</TextLabel>
            <ProfileInput
              ref={textInputConfirmPasswordRef}
              name="password_confirmation"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite novamente a nova senha"
              editable
              style={{
                fontSize: Number((screenWidth * 0.04).toFixed(0)),
              }}
            />

            <AlterButton onPress={() => formRef.current?.submitForm()}>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <TextButton>Alterar Senha</TextButton>
              )}
            </AlterButton>
          </Form>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Password;
