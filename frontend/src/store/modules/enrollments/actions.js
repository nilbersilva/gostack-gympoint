export function createEnrollmentRequest(enrollment, fnErrorCallback) {
  return {
    type: '@registration/CREATE_ENROLLMENT_REQUEST',
    payload: { enrollment, fnErrorCallback },
  };
}

export function createEnrollmentSuccess(enrollment) {
  return {
    type: '@registration/CREATE_ENROLLMENT_SUCCESS',
    payload: { enrollment },
  };
}

export function createEnrollmentFailure() {
  return {
    type: '@registration/CREATE_ENROLLMENT_FAILURE',
  };
}

export function updateEnrollmentRequest(enrollment, fnErrorCallback) {
  return {
    type: '@registration/UPDATE_ENROLLMENT_REQUEST',
    payload: { enrollment, fnErrorCallback },
  };
}

export function updateEnrollmentSuccess(enrollment) {
  return {
    type: '@registration/UPDATE_ENROLLMENT_SUCCESS',
    payload: { enrollment },
  };
}

export function updateEnrollmentFailure() {
  return {
    type: '@registration/UPDATE_ENROLLMENT_FAILURE',
  };
}

export function loadEnrollmentsRequest(page, id) {
  return {
    type: '@registration/LOAD_ENROLLMENTS_REQUEST',
    payload: { page, id },
  };
}

export function loadEnrollmentsSuccess(enrollments) {
  return {
    type: '@registration/LOAD_ENROLLMENTS_SUCCESS',
    payload: { enrollments },
  };
}

export function loadEnrollmentsFailure() {
  return {
    type: '@registration/LOAD_ENROLLMENTS_FAILURE',
  };
}

export function deleteEnrollmentRequest(id) {
  return {
    type: '@registration/DELETE_ENROLLMENT_REQUEST',
    payload: { id },
  };
}

export function deleteEnrollmentSuccess(id) {
  return {
    type: '@registration/DELETE_ENROLLMENT_SUCCESS',
    payload: { id },
  };
}

export function deleteEnrollmentFailure() {
  return {
    type: '@registration/DELETE_ENROLLMENT_FAILURE',
  };
}
