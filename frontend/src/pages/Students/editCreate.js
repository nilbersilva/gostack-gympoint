import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Api from '~/services/api';
import DataForm from '~/components/DataForm';
import { DivBetween } from '../_layouts/lists/styles';
import { Box } from '../_layouts/edit/styles';
import InputCurrency from '~/components/InputCurrency';
import { creatingReg, updatingReg } from '~/util/funcs';
import {
  createStudentRequest,
  updateStudentRequest,
} from '~/store/modules/student/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email não informado'),
  age: Yup.number()
    .positive('É necessário informar uma idade')
    .required('É necessário informar uma idade'),
  weight: Yup.number()
    .positive('É necessário informar um peso')
    .required('É necessário informar um peso'),
  height: Yup.number()
    .positive('É necessário informar uma altura')
    .required('É necessário informar uma altura'),
});

export default function StudentsEditCreate({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const [showModalContent, setShowModalContent] = useState(false);
  const [modalContent, setModalContent] = useState();

  async function getInitialData() {
    if (id > 0) {
      const res = await Api.get('students', { params: { id } });
      return res.data.students;
    }
    return { name: '', email: '', age: 0, weight: 0, height: 0 };
  }

  async function hideModal() {
    setShowModalContent(false);
    setModalContent(null);
  }

  function handleSubmit(data) {
    if (id > 0) {
      setShowModalContent(true);
      setModalContent(updatingReg);
      dispatch(updateStudentRequest({ ...data, id }, hideModal));
    } else {
      setShowModalContent(true);
      setModalContent(creatingReg);
      dispatch(createStudentRequest(data, hideModal));
    }
  }

  return (
    <DataForm
      match={match}
      getInitialData={getInitialData}
      newTitle="Cadastro de Alunos"
      editTitle="Edição de Alunos"
      goBackPath="students"
      schema={schema}
      showModal={showModalContent}
      modalContent={modalContent}
      submitUpdate={handleSubmit}
      submitCreate={handleSubmit}
    >
      <Box>
        <p>NOME COMPLETO</p>
        <Input name="name" />
        <p>ENDEREÇO DE E-MAIL</p>
        <Input name="email" />
        <DivBetween>
          <div>
            <p>IDADE</p>
            <InputCurrency
              name="age"
              placeholder="Digite a idade"
              precision={0}
              textAlign="center"
            />
          </div>
          <div>
            <p>PESO (em Kg)</p>
            <InputCurrency name="weight" placeholder="Digite o peso" />
          </div>
          <div>
            <p>ALTURA (em metros)</p>
            <InputCurrency name="height" placeholder="Digite a altura" />
          </div>
        </DivBetween>
      </Box>
    </DataForm>
  );
}

StudentsEditCreate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
