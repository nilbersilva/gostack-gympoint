import produce from 'immer';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';

const INITIAL_STATE = {
  enrollment: null,
  enrollments: null,
  loading: null,
};

export default function enrollment(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@registration/CREATE_ENROLLMENT_SUCCESS': {
        draft.enrollment = action.payload.enrollment;
        break;
      }

      case '@registration/UPDATE_ENROLLMENT_SUCCESS': {
        draft.enrollment = action.payload.enrollment;
        break;
      }
      case '@registration/LOAD_ENROLLMENTS_REQUEST':
        draft.loading = true;
        break;
      case '@registration/LOAD_ENROLLMENTS_SUCCESS': {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        draft.enrollments = action.payload.enrollments.enrollments.map(
          data => ({
            ...data,
            plan_id: data.plan.id,
            student_id: data.student.id,
            formattedStartDate: format(
              utcToZonedTime(parseISO(data.start_date), timezone),
              "dd 'de' MMM 'de' yyyy",
              {
                locale: pt,
              }
            ),
            formattedEndDate: format(
              utcToZonedTime(parseISO(data.end_date), timezone),
              "dd 'de' MMM 'de' yyyy",
              {
                locale: pt,
              }
            ),
          })
        );
        draft.totalPages = action.payload.enrollments.count;
        draft.loading = false;
        break;
      }

      case '@registration/DELETE_ENROLLMENT_SUCCESS': {
        draft.enrollments = draft.enrollments.filter(item => {
          return item.id !== action.payload.id;
        });
        break;
      }

      case '@registration/LOAD_ENROLLMENTS_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
