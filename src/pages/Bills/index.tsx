/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  View,
  Dimensions,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Back,
  BackText,
  BillsList,
  BillsContainer,
  BillsContent,
  NoBillsText,
  MonthText,
  ExpirationText,
  HeaderBills,
  TitleBills,
} from './styles';
import TopProfile from '../../components/TopProfile';

import { useAuth } from '../../hooks/authContext';

export interface BillsDataProps {
  id: string;
  month: string;
  expiration: string;
  status: string;
  sameMonth: boolean;
}

const Bills: React.FC = () => {
  const { navigate } = useNavigation();

  const { userBills } = useAuth();
  const [loading, setLoading] = useState(false);

  const [bills, setBills] = useState<BillsDataProps[]>(() => {
    if (userBills) {
      return userBills.map(invoice => {
        const invoiceDate = parseISO(invoice.datavenc);
        const textMonthDate = format(invoiceDate, "MMMM'/'yyyy", {
          locale: ptBR,
        }).replace(/^\w/, letter => letter.toUpperCase());
        const textExpirationDate = format(
          invoiceDate,
          "'Vencimento:' dd'/'MM'/'yyyy",
          {
            locale: ptBR,
          },
        );
        return {
          id: invoice.titulo,
          month: textMonthDate,
          expiration: textExpirationDate,
          status: invoice.status,
          sameMonth: invoiceDate.getMonth() <= new Date().getMonth(),
        };
      });
    }
    return {} as BillsDataProps[];
  });
  const paidBills = useMemo(() => {
    return bills.filter(bill => bill.status === 'pago').reverse();
  }, [bills]);
  const billsToPay = useMemo(() => {
    return bills.filter(bill => bill.status !== 'pago' && bill.sameMonth);
  }, [bills]);

  const navigateToinvoice = useCallback(
    (id: string) => {
      if (userBills) {
        const invoice = userBills.find(
          userinvoice => userinvoice.titulo === id,
        );

        navigate('Bond', { invoice });
      }
    },
    [navigate, userBills],
  );
  useEffect(() => {
    if (userBills) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [userBills]);
  const screenWidth = Dimensions.get('window').width;
  const screenHeigth = Dimensions.get('window').height;
  return (
    <SafeAreaView style={{ backgroundColor: '#ededed', flex: 1 }}>
      <TopProfile>
        <Back onPress={() => navigate('Dashboard')}>
          <FeatherIcon
            name="arrow-left"
            size={Number((screenWidth * 0.07).toFixed(0))}
            color="#fefefe"
          />
          <BackText>Faturas</BackText>
        </Back>
      </TopProfile>
      {loading === false ? (
        <>
          <HeaderBills>
            <TitleBills>Faturas em aberto</TitleBills>
          </HeaderBills>
          {billsToPay.length > 0 ? (
            <BillsList
              data={billsToPay}
              keyExtractor={data => data.id}
              renderItem={({ item: bill }) => {
                return (
                  <BillsContainer onPress={() => navigateToinvoice(bill.id)}>
                    <BillsContent>
                      <MonthText>{bill.month}</MonthText>
                      <ExpirationText>{bill.expiration}</ExpirationText>
                    </BillsContent>
                    <FeatherIcon
                      name="chevron-right"
                      size={Number((screenWidth * 0.07).toFixed(0))}
                      color="#5a5c60"
                    />
                  </BillsContainer>
                );
              }}
            />
          ) : (
            <NoBillsText>Sem faturas em aberto</NoBillsText>
          )}
          <HeaderBills>
            <TitleBills>Faturas pagas</TitleBills>
          </HeaderBills>
          <BillsList
            data={paidBills}
            keyExtractor={data => data.id}
            renderItem={({ item: bill }) => {
              return (
                <BillsContainer onPress={() => navigateToinvoice(bill.id)}>
                  <BillsContent>
                    <MonthText>{bill.month}</MonthText>
                    <ExpirationText>{bill.expiration}</ExpirationText>
                  </BillsContent>
                  <FeatherIcon
                    name="chevron-right"
                    size={Number((screenWidth * 0.07).toFixed(0))}
                    color="#5a5c60"
                  />
                </BillsContainer>
              );
            }}
          />
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#215ad0" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Bills;
