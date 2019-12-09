import React from 'react';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';
import Colors from '~/styles/colors';

export const delay = ms => new Promise(res => setTimeout(res, ms));

export function TrataErr(error, preMsg) {
  let msg = '';
  if (error.response && error.response.data && error.response.data.error) {
    msg += error.response.data.error;
  } else msg += error.message;

  if (msg === 'Network Error') msg = 'Erro de conexão';

  toast.error(
    <>
      {preMsg ? (
        <>
          {preMsg}
          <br />
        </>
      ) : null}
      {msg}
    </>,
    { autoClose: 8000 }
  );
}

export const updatingReg = (
  <>
    <PulseLoader size={15} color={Colors.Red} margin="16px" />
    <b>Atualizando registro</b>
  </>
);

export const creatingReg = (
  <>
    <PulseLoader size={15} color={Colors.Red} margin="16px" />
    <b>Criando registro</b>
  </>
);
