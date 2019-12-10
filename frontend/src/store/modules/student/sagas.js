import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { TrataErr } from '~/util/funcs';

import {
  createStudentSuccess,
  createStudentFailure,
  updateStudentSuccess,
  updateStudentFailure,
  loadStudentsSuccess,
  loadStudentsFailure,
  deleteStudentSuccess,
  deleteStudentFailure,
} from './actions';

export function* loadStudents({ payload }) {
  const { search, page = 1, id, loadEndCallBack } = payload;
  try {
    let response = null;
    if (search) {
      response = yield api.get(`students`, {
        params: {
          q: search,
          page,
        },
      });
    } else if (id) {
      response = yield api.get(`students`, {
        params: {
          id,
        },
      });
    } else {
      response = yield api.get(`students?page=${page}`);
    }

    yield delay(300);
    if (response) {
      yield put(loadStudentsSuccess(response.data));
    }
  } catch (error) {
    yield put(loadStudentsFailure());
    TrataErr(error, 'Erro ao Carregar alunos');

  } finally {
    if (loadEndCallBack) loadEndCallBack();
  }
}

export function* createStudent({ payload }) {
  const { student, fnErrorCallback } = payload;
  try {
    const response = yield call(api.post, '/students', student);

    toast.success('Estudante criado com sucesso.');

    yield put(createStudentSuccess(response.data));
    yield delay(300);
    history.push('/students');
  } catch (error) {
    yield put(createStudentFailure());
    TrataErr(error, 'Erro ao criar aluno');
    if (fnErrorCallback) fnErrorCallback();
  }
}

export function* updateStudent({ payload }) {
  const { student, fnErrorCallback } = payload;
  try {
    const data = {
      ...student,
      student_id: student.id,
    };

    const response = yield call(api.put, `/students`, data);
    toast.success('Aluno atualizado com sucesso.');

    yield put(updateStudentSuccess(response.data));
    yield delay(300);
    history.push('/students');
  } catch (error) {
    yield put(updateStudentFailure());
    TrataErr(error, 'Erro ao atualizar aluno');
    if (fnErrorCallback) fnErrorCallback();
  }
}

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `/students`, {
      headers: { id },
    });

    yield put(deleteStudentSuccess(id));
    toast.warn('Estudante deletado.');
  } catch (error) {
    yield put(deleteStudentFailure());
    TrataErr(error, 'Erro ao deletar aluno');
  }
}

export default all([
  takeLatest('@student/CREATE_STUDENT_REQUEST', createStudent),
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
  takeLatest('@student/LOAD_STUDENTS_REQUEST', loadStudents),
  takeLatest('@student/DELETE_STUDENT_REQUEST', deleteStudent),
]);
