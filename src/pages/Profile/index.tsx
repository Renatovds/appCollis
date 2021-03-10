/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import ProfileInput from '../../components/ProfileInput';

import api from '../../services/api';
import getValidationErrors from '../../utils/validationErrors';

export interface BillsDataProps {
  id: string;
  month: string;
  expiration: string;
  status: string;
}
interface ISubmitUpdateProfile {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  const [buttonEnable, setButtonEnable] = useState(false);
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const { user, updateUser } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const textInputNameRef = useRef<TextInput>(null);
  const textInputEmailRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: ISubmitUpdateProfile) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),

          email: Yup.string()
            .required('Email obrigatório.')
            .email('Formato de email inválido.'),
          plan: Yup.string(),
        });
        await schema.validate(data, { abortEarly: false });

        const responde = await api.put('/users/update', data);
        updateUser(responde.data);
        setLoading(false);
        setButtonEnable(false);
        Alert.alert('Atualização de perfil realizada com sucesso.');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);
          textInputEmailRef.current?.focus();
          const validateErrors = getValidationErrors(err);
          formRef.current?.setErrors(validateErrors);

          return;
        }

        Alert.alert('Erro ao atualizar o perfil.', err.message);
      }
    },
    [updateUser],
  );
  useEffect(() => {
    const ref = formRef.current;
    return () => {
      if (ref) {
        ref.setData(user);
      }
    };
  }, [user]);
  const handleBackButton = useCallback(() => {
    formRef.current?.setData(user);
    setButtonEnable(false);
    navigate('Dashboard');
  }, [navigate, user]);

  const screenWidth = Dimensions.get('window').width;
  const screenHeigth = Dimensions.get('window').height;
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
            <BackText>Cadastro</BackText>
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
            initialData={user}
          >
            <TextLabel>Nome</TextLabel>

            <ProfileInput
              name="name"
              ref={textInputNameRef}
              autoCorrect={false}
              editable={false}
              autoCapitalize="none"
              style={{
                fontSize: Number((screenWidth * 0.04).toFixed(0)),
                flex: 1,
                color: '#215ad0',
              }}
              onSubmitEditing={() => {
                textInputEmailRef.current?.focus();
              }}
            />

            <TextLabel>Email</TextLabel>
            <View
              style={{
                flexDirection: 'row',
                position: 'relative',
              }}
            >
              <ProfileInput
                name="email"
                ref={textInputEmailRef}
                autoCorrect={false}
                editable
                autoCapitalize="none"
                placeholder={user.email}
                placeholderTextColor="#215ad0"
                keyboardType="email-address"
                style={{
                  fontSize: Number((screenWidth * 0.04).toFixed(0)),
                  flex: 1,
                }}
                onChange={() => setButtonEnable(true)}
              />
            </View>
            <TextLabel>Plano</TextLabel>

            <ProfileInput
              name="plan"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder={user.plan.replace('_', ' ')}
              placeholderTextColor="#215ad0"
              editable={false}
              style={{
                fontSize: Number((screenWidth * 0.04).toFixed(0)),
                color: '#215ad0',
              }}
            />

            <AlterButton
              disabled={!buttonEnable}
              statusOpacity={buttonEnable}
              onPress={() => formRef.current?.submitForm()}
            >
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <TextButton>Alterar Dados</TextButton>
              )}
            </AlterButton>
          </Form>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
