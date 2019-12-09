import {Alert} from 'react-native';

export function TrataErr(error, preMsg) {
  let msg = '';
  if (error.response && error.response.data && error.response.data.error) {
    msg += error.response.data.error;
  } else msg += error.message;

  if (msg === 'Network Error') msg = 'Erro de conexão';

  Alert.alert('Resposta da Operação', preMsg ? `${preMsg}\n${msg}` : msg);
}
