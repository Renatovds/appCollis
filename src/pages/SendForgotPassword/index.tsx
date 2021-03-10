/* eslint-disable no-unused-expressions */
import React, { useCallback, useState, useEffect } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';
import logImg from '../../assets/logo.png';
import api from '../../services/api';

import {
  Container,
  BackToSignIn,
  BackToSignInText,
  LabelInput,
  LabelInputSend,
  LabelEmail,
} from './style';

interface IRouteParams {
  email: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);
  const [send, setSend] = useState(false);
  const [emailState, setEmailState] = useState('');

  const handleSubmit = useCallback(async () => {
    try {
      await api.post('/passwords/forgot', {
        email: emailState,
      });
      setLoading(false);
      setSend(true);
    } catch (err) {
      Alert.alert(
        'Não foi possivel enviar o email.',
        'Tente novamente mais tarde.',
      );
      setLoading(false);
    }
  }, [emailState]);
  useEffect(() => {
    const { email } = route.params as IRouteParams;
    if (email) {
      setEmailState(email);
    }
    return () => setLoading(false);
  }, [route.params]);

  const screenHeigth = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
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
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: screenHeigth * 0.2,
              }}
            >
              {send ? (
                <LabelInputSend>Email enviado com sucesso!</LabelInputSend>
              ) : (
                <>
                  <LabelInput>Enviar email para o endereço abaixo?</LabelInput>
                  <LabelEmail>{emailState}</LabelEmail>
                  <View
                    style={{
                      width: screenWidth * 0.5,
                    }}
                  >
                    <Button
                      onPress={() => {
                        handleSubmit();
                      }}
                    >
                      {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                      ) : (
                        'Enviar email'
                      )}
                    </Button>
                  </View>
                </>
              )}
            </View>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={screenWidth * 0.06} color="#fefefe" />
        <BackToSignInText>Voltar</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
