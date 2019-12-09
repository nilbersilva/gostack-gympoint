export function createStudentRequest(student, fnErrorCallback) {
  return {
    type: '@student/CREATE_STUDENT_REQUEST',
    payload: { student, fnErrorCallback },
  };
}

export function createStudentSuccess(student) {
  return {
    type: '@student/CREATE_STUDENT_SUCCESS',
    payload: { student },
  };
}

export function createStudentFailure() {
  return {
    type: '@student/CREATE_STUDENT_FAILURE',
  };
}

export function updateStudentRequest(student, fnErrorCallback) {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    payload: { student, fnErrorCallback },
  };
}

export function updateStudentSuccess(student) {
  return {
    type: '@student/UPDATE_STUDENT_SUCCESS',
    payload: { student },
  };
}

export function updateStudentFailure() {
  return {
    type: '@student/UPDATE_STUDENT_FAILURE',
  };
}

export function loadStudentsRequest(search, page = 1, id, loadEndCallBack) {
  return {
    type: '@student/LOAD_STUDENTS_REQUEST',
    payload: { search, page, id, loadEndCallBack },
  };
}

export function loadStudentsSuccess(data) {
  return {
    type: '@student/LOAD_STUDENTS_SUCCESS',
    payload: data,
  };
}

export function loadStudentsFailure() {
  return {
    type: '@student/LOAD_STUDENTS_FAILURE',
  };
}

export function deleteStudentRequest(id) {
  return {
    type: '@student/DELETE_STUDENT_REQUEST',
    payload: { id },
  };
}

export function deleteStudentSuccess(id) {
  return {
    type: '@student/DELETE_STUDENT_SUCCESS',
    payload: { id },
  };
}

export function deleteStudentFailure() {
  return {
    type: '@student/DELETE_STUDENT_FAILURE',
  };
}
