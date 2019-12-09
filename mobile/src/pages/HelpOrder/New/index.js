import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {TouchableOpacity, Alert} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Layout from '~/pages/_Layout';
import Button from '~/components/Button';
import {Question} from './styles';
import {TrataErr} from '~/util/funcs';

export default function New({navigation}) {
  const student = useSelector(state => state.auth.student);
  const [question, setQuestion] = useState('');

  async function handleSendQuestion() {
    await api
      .post(
        `students/${student.id}/help-orders`,
        {question},
        {
          'axios-retry': {
            retries: 0,
          },
        }
      )
      .catch(error => {
        TrataErr(error, 'Erro ao enviar Pedido de Ajuda');
      });
    Alert.alert('Pedido de ajuda enviado com sucesso!');
    navigation.goBack();
  }

  return (
    <Layout>
      <Question
        value={question}
        onChangeText={setQuestion}
        placeholder="Inclua seu pedido de auxílio"
      />
      <Button onPress={() => handleSendQuestion()}>Enviar pedido</Button>
    </Layout>
  );
}

New.navigationOptions = ({navigation}) => ({
  title: '',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrder');
      }}>
      <Icon name="chevron-left" size={32} color="#000" />
    </TouchableOpacity>
  ),
});

New.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
