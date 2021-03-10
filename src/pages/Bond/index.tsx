/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-tiny-toast';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LootieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../utils/converterDimensions';

import { useAuth } from '../../hooks/authContext';
import {
  Back,
  BackText,
  CardBill,
  MonthBill,
  StatusBill,
  ValueBill,
  ExpirationBill,
  DetailsText,
  PayCodeCard,
  PayCode,
  PayCodeButton,
  PayCodeButtonText,
} from './styles';
import TopProfile from '../../components/TopProfile';
import BondView from '../../components/BondView';
import { BondsProps } from '../Dashboard/index';
import api from '../../services/api';
import lootie from '../../../assets/loader.json';

interface RouteParams {
  invoice: BondsProps;
}
interface BondProps {
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
  desconto: string;
  acrescimo: string;
}
interface BillProps {
  id: string;
  name: string;
  month: string;
  expiration: string;
  status: string;
  payCode: string;
  value: string;
  paidValue: string;
  discount: string;
  added_value: string;
  total_value: number;
}
const Bond: React.FC = () => {
  const { loading } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { invoice } = route.params as RouteParams;
  const [bill, setBill] = useState<BillProps>();

  useEffect(() => {
    api.post(`/bonds/${invoice.titulo}`).then(resp => {
      const userBill = resp.data as BondProps;
      const bondDate = parseISO(userBill.datavenc);
      const textMonthDate = format(bondDate, "'Fatura de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
      const textExpirationDate = format(
        bondDate,
        "'Vencimento' dd'/'MMM'/'yy",
        {
          locale: ptBR,
        },
      );
      const detailedBill = {
        id: userBill.titulo,
        name: userBill.nome,
        month: textMonthDate,
        expiration: textExpirationDate,
        status: userBill.status
          .replace(/^\w/, letter => letter.toUpperCase())
          .replace(/o$/, 'a'),
        value: userBill.valor.replace('.', ','),
        paidValue: userBill.valorpag
          ? Number(userBill.valorpag).toFixed(2).replace('.', ',')
          : '--,--',
        payCode: userBill.linhadig,
        discount: userBill.desconto.replace('.', ','),
        added_value: userBill.acrescimo.replace('.', ','),
        total_value:
          Number(userBill.valor) -
          Number(userBill.desconto) +
          Number(userBill.acrescimo),
      } as BillProps;

      setBill(detailedBill);
    });
  }, [invoice.titulo]);

  const handleCopyText = () => {
    if (bill) {
      Clipboard.setString(bill.payCode);
      Toast.show('Copiado para aréa de transferência', {
        position: Toast.position.CENTER,
        containerStyle: {
          borderWidth: 3,
          borderColor: '#215ad0',
          backgroundColor: '#fefefe',
          borderRadius: 15,
          height: 80,
          width: 300,
        },
        textStyle: {
          color: '#215ad0',
          fontWeight: 'bold',
        },
        imgStyle: {},
        mask: false,
        maskStyle: {},
        duration: 2500,
        animation: true,
      });
    }
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#ededed', flex: 1 }}>
        <TopProfile>
          <Back onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              size={Number(widthPercentageToDP('7%').toFixed(0))}
              color="#fefefe"
            />
            <BackText>Fatura</BackText>
          </Back>
        </TopProfile>
        {bill ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ position: 'relative' }}
          >
            <View style={{ flex: 1 }}>
              <CardBill colors={['#1e9e45', '#08881a']}>
                <MonthBill>{bill.month}</MonthBill>

                <ExpirationBill>{bill.expiration}</ExpirationBill>

                <StatusBill>{`Situação - ${bill.status}`}</StatusBill>

                <ValueBill>
                  {`R$ ${bill.total_value.toFixed(2).replace('.', ',')}`}
                </ValueBill>
              </CardBill>
              <BondView backgroundColor="#ededed" name="Detalhes">
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <DetailsText>Valor da Fatura:</DetailsText>
                    <DetailsText>Desconto:</DetailsText>
                    <DetailsText>Acréscimo:</DetailsText>
                    <DetailsText>Valor total:</DetailsText>
                    <DetailsText>Valor pago:</DetailsText>
                  </View>
                  <View style={{ marginLeft: 'auto' }}>
                    <DetailsText>{`R$ ${bill.value}`}</DetailsText>
                    <DetailsText>{`- R$ ${bill.discount}`}</DetailsText>
                    <DetailsText>{`R$ ${bill.added_value}`}</DetailsText>
                    <DetailsText>
                      {`R$ ${bill.total_value.toFixed(2).replace('.', ',')}`}
                    </DetailsText>
                    <DetailsText>{`R$ ${bill.paidValue}`}</DetailsText>
                  </View>
                </View>
              </BondView>
              <PayCodeCard>
                <PayCode>{bill.payCode}</PayCode>
                {bill.status !== 'Paga' ? (
                  <PayCodeButton onPress={handleCopyText}>
                    <PayCodeButtonText>Copiar código</PayCodeButtonText>
                  </PayCodeButton>
                ) : (
                  <View />
                )}
              </PayCodeCard>
            </View>
          </ScrollView>
        ) : (
          <LootieView source={lootie} loop autoPlay />
        )}
      </SafeAreaView>
    </>
  );
};

export default Bond;
