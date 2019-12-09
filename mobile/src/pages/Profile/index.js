import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Layout from '~/pages/_Layout';
import {Label, Text} from './styles';
import Button from '~/components/Button';
import {signOut} from '~/store/modules/auth/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const student = useSelector(state => state.auth.student);

  return (
    <Layout>
      <Label>Aluno</Label>
      <Text>{student.name}</Text>
      <Button onPress={() => dispatch(signOut())}>Sair do GymPoint</Button>
    </Layout>
  );
}

const tabBarIconLogOut = ({tintColor}) => (
  <Icon name="exit-to-app" size={20} color={tintColor} />
);

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: tabBarIconLogOut,
};

tabBarIconLogOut.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
