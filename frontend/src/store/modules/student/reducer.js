import produce from 'immer';

const INITIAL_STATE = {
  student: null,
  students: null,
  totalStudents: 0,
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/LOAD_STUDENTS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@student/CREATE_STUDENT_SUCCESS': {
        draft.student = action.payload.student;
        draft.loading = false;
        break;
      }

      case '@student/UPDATE_STUDENT_SUCCESS': {
        draft.student = action.payload.student;
        draft.loading = false;
        break;
      }

      case '@student/LOAD_STUDENTS_SUCCESS': {
        draft.students = action.payload.students;
        draft.totalPages = action.payload.count;
        draft.loading = false;
        break;
      }

      case '@student/DELETE_STUDENT_SUCCESS': {
        draft.students = draft.students.filter(item => {
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
