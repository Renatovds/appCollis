import { useNavigation } from '@react-navigation/native';
import {} from '@react-navigation/drawer';
import React, { useCallback, useState, useEffect } from 'react';
import { getMonth, parseISO, getYear, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import OneSignal from 'react-native-onesignal';
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../hooks/authContext';
import api from '../../services/api';
import CardSpan from '../../components/CardSpan';
import { CompanyDataProps } from '../CommunicationChannels';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  PlanView,
  PlanText,
  BondView,
  BondText,
  BondStatusText,
  ButtonToBills,
  ButtonToBillsText,
} from './style';
import CardSideSpan from '../../components/CardSideSpan';

export interface BondsProps {
  titulo: string;
  valor: string;
  valorpag: string;
  datavenc: string;
  nossonum: number;
  linhadig: string;
  nome: string;
  login: string;
  cpf_cnpj: string;
  tipo: string;
  email: string;
  status: string;
}
interface PlanProps {
  nome: string;
  valor: string;
  velup: string;
  veldown: string;
  prioridade: string;
  descricao: string;
}
const screenWidth = Dimensions.get('window').width;
const screenHeigth = Dimensions.get('window').height;
const smallPhone = Dimensions.get('window').height <= 550;

const Dashboard: React.FC = ({ navigation }) => {
  const [bonds, setBonds] = useState<BondsProps[]>([]);
  const [plan, setPlan] = useState<PlanProps>();

  const { user, updateUserBills, signOut, LoginData, signIn } = useAuth();
  const { navigate } = useNavigation();
  const [company, setCompany] = useState<CompanyDataProps>();
  OneSignal.sendTag('User_LOGIN', user.id);

  useEffect(() => {
    api
      .get('/bonds')
      .then(response => {
        setBonds(response.data);
        updateUserBills(response.data);
      })
      .catch(err => {
        const resp = err.response.request.status;
        if (resp === 401) {
          const { cpf_cnpj, password } = LoginData;
          if (cpf_cnpj) {
            signIn({ cpf_cnpj, password }).catch(() => {
              signOut();
            });
          } else {
            signOut();
          }
        }
      });

    return () => setBonds([]);
  }, [updateUserBills, signOut, LoginData, signIn]);

  useEffect(() => {
    api.get('/plans', { params: { planName: user.plan } }).then(response => {
      setPlan(response.data);
    });
    api.get('/company').then(resp => setCompany(resp.data));
  }, [user.plan]);

  const navigateToBills = useCallback(() => {
    navigate('Bills');
  }, [navigate]);

  return (
    <Container>
      <SafeAreaView
        style={{
          backgroundColor: '#ededed',
          flex: 1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ position: 'relative' }}
        >
          <Header colors={['#08881a', '#1e9e45']}>
            <Icon
              name="menu"
              size={Number((screenWidth * 0.08).toFixed(0))}
              color="#ededed"
              onPress={() => navigation.openDrawer()}
              style={{
                position: 'absolute',
                left: Number((screenWidth * 0.06).toFixed(0)),
                top: Number((screenHeigth * 0.03).toFixed(0)),
              }}
            />
            <HeaderTitle>
              <UserName>{` Olá, ${user.name.split(' ')[0]}`}</UserName>
            </HeaderTitle>
          </Header>
          <View
            style={{
              top: -Number((screenHeigth * 0.1).toFixed(0)),
              zIndex: 1,
              position: 'relative',
              alignItems: 'center',
            }}
          >
            <CardSpan
              name="Plano"
              iconSize={Number((screenWidth * 0.08).toFixed(0))}
              icon="rocket"
              initialHeight={
                smallPhone
                  ? Number((screenHeigth * 0.18).toFixed(0))
                  : Number((screenHeigth * 0.16).toFixed(0))
              }
              initialStatus="opened"
            >
              {plan ? (
                <View>
                  <PlanView>
                    <PlanText
                      style={{
                        fontSize: Number((screenWidth * 0.06).toFixed(0)),
                        color: '#215ad0',
                      }}
                    >
                      {plan.nome.replace('_', ' ')}
                    </PlanText>
                  </PlanView>
                  <View
                    style={{
                      paddingRight: Number((screenWidth * 0.04).toFixed(0)),
                      paddingLeft: Number((screenWidth * 0.04).toFixed(0)),
                      marginTop: Number((screenHeigth * 0.035).toFixed(0)),
                    }}
                  >
                    {/* <PlanText>
                      {`- Download de ${(
                        Number(plan.veldown) / 1000
                      ).toString()} Mbps `}
                    </PlanText>
                    <PlanText>
                      {`- Upload de ${(
                        Number(plan.velup) / 1000
                      ).toString()} Mbps `}
                    </PlanText> */}

                    <PlanText>{plan.descricao}</PlanText>
                  </View>
                </View>
              ) : (
                <ActivityIndicator size="large" color="#ddd" />
              )}
            </CardSpan>

            {bonds.map(bond => {
              const date = new Date();
              const currentMonth = getMonth(date);
              const currentYear = getYear(date);
              const bondDate = parseISO(bond.datavenc);
              const bondMonth = getMonth(bondDate);
              const bondYear = getYear(bondDate);
              if (currentMonth === bondMonth && currentYear === bondYear) {
                const textDate = format(date, "MMMM'/'yyyy", {
                  locale: ptBR,
                }).replace(/^\w/, letter => letter.toUpperCase());

                return (
                  <CardSpan
                    name="Fatura"
                    key={bond.titulo}
                    icon="barcode"
                    iconSize={Number((screenWidth * 0.08).toFixed(0))}
                    initialHeight={
                      smallPhone
                        ? Number((screenHeigth * 0.18).toFixed(0))
                        : Number((screenHeigth * 0.16).toFixed(0))
                    }
                  >
                    <BondView>
                      <BondText>{textDate}</BondText>
                      <BondStatusText status={bond.status}>
                        {bond.status
                          .replace(/^\w/, letter => letter.toUpperCase())
                          .replace(/o$/, 'a')}
                      </BondStatusText>
                    </BondView>
                    <ButtonToBills onPress={() => navigateToBills()}>
                      <ButtonToBillsText>IR PARA FATURAS</ButtonToBillsText>
                    </ButtonToBills>
                  </CardSpan>
                );
              }
            })}
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: Number((screenHeigth * 0.02).toFixed(0)),
            left: Number((screenWidth * 0.04).toFixed(0)),
          }}
        >
          <CardSideSpan
            icon="phone"
            iconSize={Number((screenWidth * 0.06).toFixed(0))}
            initialWidth={Number((screenWidth * 0.16).toFixed(0))}
          >
            {company?.whatsapp ? (
              <Icon
                style={{
                  paddingRight: Number((screenWidth * 0.02).toFixed(0)),
                }}
                name="whatsapp"
                size={Number((screenWidth * 0.1).toFixed(0))}
                color="#309e39"
                onPress={() => {
                  Linking.openURL(
                    `http://api.whatsapp.com/send?phone=55${company?.whatsapp
                      .replace(/\D/g, '')
                      .toString()}`,
                  );
                }}
              />
            ) : (
              <View />
            )}
            {company?.facebook ? (
              <Icon
                style={{
                  paddingRight: Number((screenWidth * 0.02).toFixed(0)),
                }}
                name="facebook-box"
                size={Number((screenWidth * 0.1).toFixed(0))}
                color="#283994"
                onPress={() => {
                  Linking.openURL(`https://${company?.facebook}`);
                }}
              />
            ) : (
              <View />
            )}
            {company?.telefones.telefone1 ? (
              <Icon
                style={{
                  paddingRight: Number((screenWidth * 0.02).toFixed(0)),
                }}
                name="phone"
                size={Number((screenWidth * 0.1).toFixed(0))}
                color="#215ad0"
                onPress={() => {
                  Linking.openURL(
                    `tel:${company.telefones.telefone1.replace(/\D/g, '')}`,
                  );
                }}
              />
            ) : (
              <View />
            )}

            {company?.emails.email1 ? (
              <Icon
                style={{
                  paddingRight: Number((screenWidth * 0.02).toFixed(0)),
                }}
                name="email"
                size={Number((screenWidth * 0.1).toFixed(0))}
                color="#215ad0"
                onPress={() => {
                  Linking.openURL(`mailto:${company.emails.email1}`);
                }}
              />
            ) : (
              <View />
            )}
            {company?.site ? (
              <Icon
                style={{
                  paddingRight: Number((screenWidth * 0.02).toFixed(0)),
                }}
                name="web"
                size={Number((screenWidth * 0.1).toFixed(0))}
                color="#215ad0"
                onPress={() => {
                  Linking.openURL(`http://${company.site}`);
                }}
              />
            ) : (
              <View />
            )}
          </CardSideSpan>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Dashboard;
