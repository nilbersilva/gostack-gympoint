import produce from 'immer';
import { formatPrice } from '~/util/format';

const INITIAL_STATE = {
  plan: null,
  plans: null,
  loading: false,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/LOAD_PLANS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@plan/CREATE_PLAN_SUCCESS': {
        draft.plan = action.payload.plan;
        draft.loading = false;
        break;
      }

      case '@plan/UPDATE_PLAN_SUCCESS': {
        draft.plan = action.payload.plan;
        draft.loading = false;
        break;
      }

      case '@plan/LOAD_PLANS_SUCCESS': {
        draft.plans = action.payload.map(loopPlans => ({
          ...loopPlans,
          formattedDuration:
            loopPlans.duration + (loopPlans.duration > 1 ? ' meses' : ' mês'),
          formattedPrice: formatPrice(loopPlans.price),
        }));
        draft.loading = false;
        break;
      }

      case '@plan/DELETE_PLAN_SUCCESS': {
        draft.plans = draft.plans.filter(item => {
          return item.id !== action.payload.id;
        });
        draft.totalStudents -= 1;
        draft.loading = false;
        break;
      }

      default: {
        draft.loading = false;
        break;
      }
    }
  });
}
