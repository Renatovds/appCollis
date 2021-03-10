/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
  View,
  Dimensions,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Back,
  BackText,
  TitleChannels,
  ButtonChannel,
  TextButton,
} from './styles';
import TopProfile from '../../components/TopProfile';

import api from '../../services/api';

export interface CompanyDataProps {
  nome: string;
  cnpj: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  telefones: {
    telefone1: string;
    telefone2: string;
  };
  whatsapp: string;
  facebook: string;
  emails: {
    email1: string;
    email2: string;
  };
  site: string;
}

const screenWidth = Dimensions.get('window').width;
const screenHeigth = Dimensions.get('window').height;
const CommunicationChannels: React.FC = () => {
  const { navigate, goBack } = useNavigation();

  const [company, setCompany] = useState<CompanyDataProps>();

  useEffect(() => {
    api.get('/company').then(resp => setCompany(resp.data));
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <SafeAreaView style={{ backgroundColor: '#ededed', flex: 1 }}>
        <TopProfile>
          <Back onPress={() => goBack()}>
            <FeatherIcon
              name="arrow-left"
              size={Number((screenWidth * 0.07).toFixed(0))}
              color="#fefefe"
            />
            <BackText>Canais de Atendimento</BackText>
          </Back>
        </TopProfile>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TitleChannels>
            Fale conosco através de nossos canais de Atendimento:
          </TitleChannels>
          {company?.whatsapp ? (
            <ButtonChannel
              onPress={() => {
                Linking.openURL(
                  `http://api.whatsapp.com/send?phone=55${company?.whatsapp
                    .replace(/\D/g, '')
                    .toString()}`,
                );
              }}
            >
              <Icon
                name="whatsapp"
                size={Number((screenWidth * 0.07).toFixed(0))}
                color="#309e39"
              />
              <TextButton>WhatsApp</TextButton>
            </ButtonChannel>
          ) : (
            <View />
          )}
          {company?.facebook ? (
            <ButtonChannel
              onPress={() => {
                Linking.openURL(`https://${company?.facebook}`);
              }}
            >
              <Icon
                name="facebook-box"
                size={Number((screenWidth * 0.07).toFixed(0))}
                color="#283994"
              />
              <TextButton>Facebook</TextButton>
            </ButtonChannel>
          ) : (
            <View />
          )}
          {company?.telefones.telefone1 ? (
            <ButtonChannel
              onPress={() => {
                Linking.openURL(
                  `tel:${company.telefones.telefone1.replace(/\D/g, '')}`,
                );
              }}
            >
              <Icon
                name="phone"
                size={Number((screenWidth * 0.07).toFixed(0))}
                color="#215ad0"
              />
              <TextButton>{`Telefone: ${company?.telefones.telefone1}`}</TextButton>
            </ButtonChannel>
          ) : (
            <View />
          )}
          {company?.telefones.telefone2 ? (
            <ButtonChannel
              onPress={() => {
                Linking.openURL(
                  `tel:${company.telefones.telefone1.replace(/\D/g, '')}`,
                );
              }}
            >
              <Icon
                name="phone"
                size={Number((screenWidth * 0.07).toFixed(0))}
                color="#215ad0"
              />
              <TextButton>{`Telefone: ${company?.telefones.telefone2}`}</TextButton>
            </ButtonChannel>
          ) : (
            <View />
          )}

          {company?.emails.email1 ? (
            <ButtonChannel
              onPress={() => {
                Linking.openURL(`mailto:${company.emails.email1}`);
              }}
            >
              <Icon
                name="email"
                size={Number((screenWidth * 0.07).toFixed(0))}
                color="#215ad0"
              />
              <TextButton>{`${company?.emails.email1}`}</TextButton>
            </ButtonChannel>
          ) : (
            <View />
          )}
          {company?.emails.email2 ? (
            <ButtonChannel
              onPress={() => {
                Linking.openURL(`mailto:${company.emails.email2}`);
              }}
            >
              <Icon
                name="email"
                size={Number((screenWidth * 0.07).toFixed(0))}
                color="#215ad0"
              />
              <TextButton>{`${company?.emails.email2}`}</TextButton>
            </ButtonChannel>
          ) : (
            <View />
          )}
          {company?.site ? (
            <ButtonChannel
              onPress={() => {
                Linking.openURL(`http://${company.site}`);
              }}
            >
              <Icon
                name="web"
                size={Number((screenWidth * 0.07).toFixed(0))}
                color="#215ad0"
              />
              <TextButton>{`${company?.site}`}</TextButton>
            </ButtonChannel>
          ) : (
            <View />
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CommunicationChannels;
