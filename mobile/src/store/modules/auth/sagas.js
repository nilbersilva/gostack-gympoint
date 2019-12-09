import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import api from '~/services/api';

import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
  try {
    const id = Number(payload.id);

    if (!id || id < 0) {
      Alert.alert('Erro no Login', 'ID não informado.');
      yield put(signFailure());
      return;
    }

    const response = yield call(api.get, 'students/session', {
      params: {id},
    });

    const student = response.data;

    if (!student) {
      yield put(signFailure());
      Alert.alert('Erro no Login', 'ID informado não encontrado.');
      return;
    }

    yield put(signInSuccess(student));
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      `Houver um erro no login, verifique seus dados.`
    );
    yield put(signFailure());
  }
}
export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
