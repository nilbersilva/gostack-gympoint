import React, {useState, useEffect} from 'react';
import {Alert, ActivityIndicator} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import {useSelector} from 'react-redux';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Layout from '../_Layout/index';
import Button from '~/components/Button';
import {TrataErr} from '~/util/funcs';
import {CheckInList, CheckInItem, CheckInLabel, CheckInTime} from './styles';

function CheckIn({isFocused}) {
  const student = useSelector(state => state.auth.student);
  const [loading, setLoading] = useState(true);
  const [checkins, setCheckins] = useState([]);

  async function loadCheckIns() {
    setLoading(true);

    await api
      .get(`students/${student.id}/checkins`, {
        'axios-retry': {
          retries: 0,
        },
      })
      .then(response => {
        setCheckins(
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
        TrataErr(error, 'Erro ao recuperar os Check-ins');
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 200);
      });
  }

  useEffect(() => {
    console.tron.log(isFocused);
    if (isFocused) {
      loadCheckIns();
    } else {
      setCheckins([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  async function handleNewCheckIn() {
    await api
      .post(`students/${student.id}/checkins`)
      .then(async () => {
        Alert.alert('Check-in realizado com sucesso.');
        await loadCheckIns();
      })
      .catch(error => {
        TrataErr(error, 'Erro ao efetuar Checkin');
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 200);
      });
  }

  return (
    <Layout>
      <Button onPress={handleNewCheckIn}>Novo Check-in</Button>
      {loading ? (
        <ActivityIndicator color="#ee4e62" size={48} style={{marginTop: 48}} />
      ) : (
        <CheckInList
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <CheckInItem>
              <CheckInLabel>Check-in #{item.id ? item.id : 0}</CheckInLabel>
              <CheckInTime>{item.dateFormatted}</CheckInTime>
            </CheckInItem>
          )}
        />
      )}
    </Layout>
  );
}

const tabBarIcon = ({tintColor}) => (
  <Icon name="edit-location" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon,
};

CheckIn.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigationFocus(CheckIn);
