import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, ActivityIndicator} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';
import {TrataErr} from '~/util/funcs';
import Layout from '../_Layout/index';
import Button from '~/components/Button';

import {
  HelpOrderList,
  HelpOrderItem,
  HelpOrderItemHeader,
  HelpOrderLabel,
  HelpOrderText,
  HelpOrderTime,
} from './styles';

function HelpOrder({isFocused, navigation}) {
  const student = useSelector(state => state.auth.student);
  const [loading, setLoading] = useState(true);
  const [helpOrders, setHelpOrders] = useState([]);

  async function loadHelpOrders() {
    setLoading(true);
    await api
      .get(`students/${student.id}/help-orders`, {
        'axios-retry': {
          retries: 0,
        },
      })
      .then(response => {
        setHelpOrders(
          response.data.map(data => {
            return {
              ...data,
              dateFormatted: formatRelative(
                parseISO(data.createdAt),
                new Date(),
                {
                  locale: pt,
                }
              ),
            };
          })
        );
      })
      .catch(error => {
        TrataErr(error, 'Erro ao recuperar os Pedidos de Ajuda');
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 200);
      });
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders();
    } else {
      setHelpOrders([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Layout>
      <Button
        onPress={() => {
          navigation.navigate('HelpOrderNew');
        }}>
        Novo pedido de auxílio
      </Button>
      {loading ? (
        <ActivityIndicator color="#ee4e62" size={48} style={{marginTop: 48}} />
      ) : (
        <HelpOrderList
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <HelpOrderItem
              onPress={() => {
                navigation.navigate('HelpOrderView', {item});
              }}>
              <HelpOrderItemHeader>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    name="check-circle"
                    size={12}
                    color={item.answer ? '#42cb59' : '#999'}
                  />
                  <HelpOrderLabel disabled={!item.answer}>
                    {item.answer ? 'Respondido' : 'Sem resposta'}
                  </HelpOrderLabel>
                </View>

                <HelpOrderTime>{item.dateFormatted}</HelpOrderTime>
              </HelpOrderItemHeader>

              <HelpOrderText>{item.question}</HelpOrderText>
            </HelpOrderItem>
          )}
        />
      )}
    </Layout>
  );
}

const tabBarIcon = ({tintColor}) => (
  <Icon name="live-help" size={20} color={tintColor} />
);

HelpOrder.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

HelpOrder.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigationFocus(HelpOrder);
