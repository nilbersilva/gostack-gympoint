import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';
// import { PulseLoader } from 'react-spinners';
import Api from '~/services/api';
import DataForm from '~/components/DataForm';
import { DivBetween } from '../_layouts/lists/styles';
import { Box } from '../_layouts/edit/styles';
import InputCurrency from '~/components/InputCurrency';
import { formatPrice } from '~/util/format';
import { creatingReg, updatingReg } from '~/util/funcs';
import {
  createPlanRequest,
  updatePlanRequest,
} from '~/store/modules/plans/actions';
// import Colors from '~/styles/colors';

const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  duration: Yup.number()
    .positive('É necessário informar uma duração')
    .required('É necessário informar uma duração'),
  price: Yup.number()
    .positive('É necessário informar um preço')
    .required('É necessário informar um preço'),
});

export default function PlansEditCreate({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const [showModalContent, setShowModalContent] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [currentPlan, setCurrentPlan] = useState();
  const [total, setTotal] = useState(0);
  const totalFormatted = useMemo(() => formatPrice(total), [total]);

  useEffect(() => {
    if (!currentPlan) return;
    console.tron.log(currentPlan);
    setTotal(currentPlan.duration * currentPlan.price);
  }, [currentPlan]); // eslint-disable-line

  async function getInitialData() {
    if (id > 0) {
      const res = await Api.get('plans', { params: { id } });
      setCurrentPlan(res.data);
      return res.data;
    }
    return { name: '', email: '', age: 0, weight: 0, height: 0 };
  }

  function hideModal() {
    setShowModalContent(false);
    setModalContent(null);
  }

  async function handleSubmit(data) {
    if (id > 0) {
      setShowModalContent(true);
      setModalContent(updatingReg);
      dispatch(updatePlanRequest({ ...data, id }, hideModal));
    } else {
      setShowModalContent(true);
      setModalContent(creatingReg);
      dispatch(createPlanRequest(data, hideModal));
    }
  }

  return (
    <DataForm
      match={match}
      getInitialData={getInitialData}
      newTitle="Cadastro de Planos"
      editTitle="Edição de Planos"
      goBackPath="plans"
      schema={schema}
      showModal={showModalContent}
      modalContent={modalContent}
      submitUpdate={handleSubmit}
      submitCreate={handleSubmit}
    >
      <Box>
        <p>TÍTULO DO PLANO</p>
        <Input name="title" autocomplete="off" placeholder="Título" />
        <DivBetween>
          <div>
            <p>DURAÇÃO (em meses)</p>
            <InputCurrency
              name="duration"
              type="number"
              onValueChange={(event, maskedValue, value) => {
                setCurrentPlan({
                  ...currentPlan,
                  duration: value,
                });
              }}
              precision={0}
              placeholder="Duração em meses"
              textAlign="center"
            />
          </div>
          <div>
            <p>PREÇO MENSAL</p>
            <InputCurrency
              name="price"
              precision={2}
              onValueChange={(event, maskedValue, value) => {
                console.tron.log(`onChanged ${value}`);
                setCurrentPlan({
                  ...currentPlan,
                  price: value,
                });
              }}
              prefix="R$ "
              placeholder="R$ 0.00"
            />
          </div>
          <div>
            <p>PREÇO TOTAL</p>
            <input name="total" value={totalFormatted} disabled />
          </div>
        </DivBetween>
      </Box>
    </DataForm>
  );
}

PlansEditCreate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
