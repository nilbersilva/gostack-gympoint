export function createPlanRequest(plan, fnErrorCallback) {
  return {
    type: '@plan/CREATE_PLAN_REQUEST',
    payload: { plan, fnErrorCallback },
  };
}

export function createPlanSuccess(plan) {
  return {
    type: '@plan/CREATE_PLAN_SUCCESS',
    payload: { plan },
  };
}

export function createPlanFailure() {
  return {
    type: '@plan/CREATE_PLAN_FAILURE',
  };
}

export function updatePlanRequest(plan, fnErrorCallback) {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: { plan, fnErrorCallback },
  };
}

export function updatePlanSuccess(plan) {
  return {
    type: '@plan/UPDATE_PLAN_SUCCESS',
    payload: { plan },
  };
}

export function updatePlanFailure() {
  return {
    type: '@plan/UPDATE_PLAN_FAILURE',
  };
}

export function loadPlansRequest(id) {
  return {
    type: '@plan/LOAD_PLANS_REQUEST',
    payload: { id },
  };
}

export function loadPlansSuccess(plans) {
  return {
    type: '@plan/LOAD_PLANS_SUCCESS',
    payload: plans,
  };
}

export function loadPlansFailure() {
  return {
    type: '@plan/LOAD_PLANS_FAILURE',
  };
}

export function deletePlanRequest(id) {
  return {
    type: '@plan/DELETE_PLAN_REQUEST',
    payload: { id },
  };
}

export function deletePlanSuccess(id) {
  return {
    type: '@plan/DELETE_PLAN_SUCCESS',
    payload: { id },
  };
}

export function deletePlanFailure() {
  return {
    type: '@plan/DELETE_PLAN_FAILURE',
  };
}
