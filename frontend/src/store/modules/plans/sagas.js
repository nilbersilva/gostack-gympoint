import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { TrataErr } from '~/util/funcs';
import {
  createPlanSuccess,
  createPlanFailure,
  updatePlanSuccess,
  updatePlanFailure,
  loadPlansSuccess,
  loadPlansFailure,
  deletePlanSuccess,
  deletePlanFailure,
} from './actions';

export function* createPlan({ payload }) {
  const { plan, fnErrorCallback } = payload;
  try {
    const response = yield call(api.post, '/plans', plan);

    toast.success('Plano criado com sucesso.');

    yield put(createPlanSuccess(response.data));
    yield delay(300);
    history.push('/plans');
  } catch (error) {
    yield put(createPlanFailure());
    TrataErr(error, 'Erro ao criar plano');
    if (fnErrorCallback) fnErrorCallback();
  }
}

export function* updatePlan({ payload }) {
  const { plan, fnErrorCallback } = payload;
  try {
    const response = yield call(api.put, `/plans/${plan.id}`, plan);
    toast.success('Plano atualizado com sucesso.');

    yield put(updatePlanSuccess(response.data));
    yield delay(300);
    history.push('/plans');
  } catch (error) {
    TrataErr(error, 'Erro ao atualizar plano');
    if (fnErrorCallback) fnErrorCallback();
    yield put(updatePlanFailure());
  }
}

export function* loadPlans({ payload }) {
  try {
    let response = [];
    const { id } = payload;

    if (id) {
      response = yield api.get('plans', {
        params: {
          id,
        },
      });
    } else {
      response = yield api.get('plans');
    }

    yield delay(300);
    if (response) {
      yield put(loadPlansSuccess(response.data));
    }
  } catch (error) {
    TrataErr(error, 'Erro ao carregar planos');
    yield put(loadPlansFailure());
  }
}

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/plans`, {
      headers: { id },
    });

    yield put(deletePlanSuccess(id));
    toast.warn('Plano deletado.');
    history.push('/plans');
  } catch (error) {
    TrataErr(error, 'Erro ao deletar plano');
    yield put(deletePlanFailure());
  }
}

export default all([
  takeLatest('@plan/CREATE_PLAN_REQUEST', createPlan),
  takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
  takeLatest('@plan/LOAD_PLANS_REQUEST', loadPlans),
  takeLatest('@plan/DELETE_PLAN_REQUEST', deletePlan),
]);
