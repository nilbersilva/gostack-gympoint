import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import { TrataErr } from '~/util/funcs';
import {
  createEnrollmentSuccess,
  createEnrollmentFailure,
  updateEnrollmentSuccess,
  updateEnrollmentFailure,
  loadEnrollmentsSuccess,
  loadEnrollmentsFailure,
  deleteEnrollmentSuccess,
  deleteEnrollmentFailure,
} from './actions';

export function* createEnrollment({ payload }) {
  const { enrollment, fnErrorCallback } = payload;
  try {
    const dados = {
      student_id: Number(enrollment.student_id),
      plan_id: Number(enrollment.plan_id),
      start_date: enrollment.start_date,
    };
    const response = yield call(api.post, '/enrollments', dados);

    toast.success('Matrícula efetuada com sucesso.');

    yield put(createEnrollmentSuccess(response.data));

    history.push('/enrollments');
  } catch (error) {
    if (fnErrorCallback) fnErrorCallback();
    yield put(createEnrollmentFailure());
    TrataErr(error, 'Erro ao criar uma matrícula');
  }
}

export function* updateEnrollment({ payload }) {
  const { enrollment, fnErrorCallback } = payload;
  try {
    const { id } = enrollment;
    const dados = {
      student_id: Number(enrollment.student_id),
      plan_id: Number(enrollment.plan_id),
      start_date: enrollment.start_date,
    };
    const response = yield call(api.put, `/enrollments/${id}`, dados);
    toast.success('Matrícula atualizada com sucesso.');

    yield put(updateEnrollmentSuccess(response.data));

    history.push('/enrollments');
  } catch (error) {
    if (fnErrorCallback) fnErrorCallback();
    yield put(updateEnrollmentFailure());
    TrataErr(error, 'Erro ao atualizar uma matrícula');
  }
}

export function* deleteEnrollment({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/enrollments/${id}`);

    yield put(deleteEnrollmentSuccess(id));
    toast.warn('Matrícula deletada.');
    history.push('/enrollments');
  } catch (error) {
    yield put(deleteEnrollmentFailure());
    TrataErr(error, 'Erro ao deletar matrícula');
  }
}

export function* loadEnrollments({ payload }) {
  try {
    const { page, id } = payload;
    let response = [];
    if (id) {
      response = yield api.get(`enrollments/${id}`);
    } else if (page) {
      response = yield api.get('enrollments', {
        params: {
          page,
        },
      });
    } else {
      response = yield api.get('enrollments');
    }
    yield delay(300);
    if (response) {
      yield put(loadEnrollmentsSuccess(response.data));
    }
  } catch (error) {
    yield put(loadEnrollmentsFailure());
    TrataErr(error, 'Erro ao carregar matrículas');
  }
}

export default all([
  takeLatest('@registration/CREATE_ENROLLMENT_REQUEST', createEnrollment),
  takeLatest('@registration/UPDATE_ENROLLMENT_REQUEST', updateEnrollment),
  takeLatest('@registration/LOAD_ENROLLMENTS_REQUEST', loadEnrollments),
  takeLatest('@registration/DELETE_ENROLLMENT_REQUEST', deleteEnrollment),
]);
