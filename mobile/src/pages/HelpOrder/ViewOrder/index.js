import React from 'react';
import {TouchableOpacity} from 'react-native';
import {formatRelative, parseISO} from 'date-fns';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '~/components/Header';
import {
  Container,
  HeaderOrder,
  Content,
  AnswerUserOrder,
  TypeOrder,
  TimeOrder,
  HelpOrder,
} from './styles';

export default function ViewOrder({navigation}) {
  const ordem = navigation.getParam('item');

  const createdAtFormatted = formatRelative(
    parseISO(ordem.createdAt),
    new Date(),
    {
      locale: pt,
    }
  );

  const updatedAtFormatted = formatRelative(
    parseISO(ordem.updatedAt),
    new Date(),
    {
      locale: pt,
    }
  );

  return (
    <>
      <Header />
      <Container>
        <HelpOrder>
          <HeaderOrder>
            <TypeOrder>PERGUNTA</TypeOrder>
            <TimeOrder>{createdAtFormatted}</TimeOrder>
          </HeaderOrder>
          <Content>{ordem.question}</Content>

          <HeaderOrder>
            <TypeOrder>RESPOSTA</TypeOrder>

            <TimeOrder>{ordem.answer ? updatedAtFormatted : ''}</TimeOrder>
          </HeaderOrder>
          {ordem.answer_user ? (
            <AnswerUserOrder>
              Respondido por: {ordem.answer_user.name}
            </AnswerUserOrder>
          ) : null}
          <Content>
            {ordem.answer ? ordem.answer : 'Sem resposta ainda!'}
          </Content>
        </HelpOrder>
      </Container>
    </>
  );
}

ViewOrder.navigationOptions = ({navigation}) => ({
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

ViewOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
