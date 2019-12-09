import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, Input } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';
import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Api from '~/services/api';
import DataForm from '~/components/DataForm';
import { DivBetween } from '../_layouts/lists/styles';
import { Box } from '../_layouts/edit/styles';
import { formatPrice } from '~/util/format';
import { creatingReg, updatingReg } from '~/util/funcs';
import {
  updateEnrollmentRequest,
  createEnrollmentRequest,
} from '~/store/modules/enrollments/actions';

const schema = Yup.object().shape({
  student_id: Yup.string().required('Aluno não informado'),
  plan_id: Yup.string().required('Plano não selecionado'),
});
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function EnrollmentsEditCreate({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const [showModalContent, setShowModalContent] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [enrollment, setEnrollment] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [currentPlan, setCurrentPlan] = useState();
  const [total, setTotal] = useState(0);
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(0);
  const [students, setStudents] = useState();
  const [studentId, setStudentId] = useState('');
  const [defaultStudents, setDefaultStudents] = useState();
  const [selectedStudent, setSelectedStudent] = useState(0);
  const totalFormatted = useMemo(() => formatPrice(total), [total]);
  let typingTimeout = null;

  async function getInitialData() {
    await Api.get('students').then(response => {
      const dados = response.data.students.map(stu => ({
        value: stu.id,
        label: stu.name,
      }));
      setStudents(dados);
      setDefaultStudents(dados);
    });
    await Api.get('plans').then(response => {
      setPlans(response.data);
    });
    if (id > 0) {
      const response = await Api.get(`enrollments/${id}`);
      const actualEnrollment = {
        ...response.data,
        student_id: response.data.student.id,
        plan_id: response.data.plan.id,
      };
      setEnrollment(actualEnrollment);
      setStudentId(response.data.student.id);
      setSelectedStudent({
        id: response.data.student.id,
        label: response.data.student.name,
      });
      return actualEnrollment;
    }
    return { student_id: 0, plan_id: 0, start_date: new Date() };
  }

  useEffect(() => {
    if (!currentPlan) return;
    setTotal(currentPlan.duration * currentPlan.price);
  }, [currentPlan]); // eslint-disable-line

  useEffect(() => {
    if (plans) {
      if (selectedPlanId) {
        setCurrentPlan(plans.find(item => item.id === selectedPlanId));
      } else {
        setCurrentPlan(plans.find(item => item.id === enrollment.plan_id));
      }
    }
  }, [selectedPlanId]); // eslint-disable-line

  useEffect(() => {
    if (currentPlan) {
      setEndDate(addMonths(startDate, currentPlan.duration));
    }
  }, [currentPlan, startDate]); // eslint-disable-line

  useEffect(() => {
    if (enrollment && id > 0) {
      setStartDate(utcToZonedTime(parseISO(enrollment.start_date), timezone));
      setEndDate(utcToZonedTime(parseISO(enrollment.end_date), timezone));
      setSelectedPlanId(enrollment.plan_id);
    }
  }, [enrollment]); // eslint-disable-line

  function hideModal() {
    setShowModalContent(false);
    setModalContent(null);
  }

  async function handleSubmit(data) {
    if (id > 0) {
      setShowModalContent(true);
      setModalContent(updatingReg);
      dispatch(
        updateEnrollmentRequest(
          { ...data, id, start_date: startDate },
          hideModal
        )
      );
    } else {
      setShowModalContent(true);
      setModalContent(creatingReg);
      dispatch(
        createEnrollmentRequest({ ...data, start_date: startDate }, hideModal)
      );
    }
  }

  const handleInputChange = newValue => {
    const inputValue = newValue.replace(/\W/g, '');
    if (inputValue === '') {
      setDefaultStudents(students);
    }
    return inputValue;
  };

  const loadOptionsStudent = (inputValue, callback) => {
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(async () => {
      await Api.get(`students?q=${inputValue}`).then(response => {
        const dados = response.data.students.map(stu => ({
          value: stu.id,
          label: stu.name,
        }));
        callback(dados);
      });
    }, 800);
  };

  return (
    <DataForm
      match={match}
      getInitialData={getInitialData}
      newTitle="Cadastro de matrículas"
      editTitle="Edição de matrículas"
      goBackPath="enrollments"
      schema={schema}
      showModal={showModalContent}
      modalContent={modalContent}
      submitUpdate={handleSubmit}
      submitCreate={handleSubmit}
    >
      <Box>
        <p>ALUNO</p>
        <AsyncSelect
          name="student_id"
          value={selectedStudent}
          onChange={newValue => {
            setSelectedStudent(newValue);
            setStudentId(newValue.value);
          }}
          cacheOptions
          isDisabled={id > 0}
          loadOptions={loadOptionsStudent}
          options={students}
          defaultOptions={defaultStudents}
          onInputChange={handleInputChange}
          placeholder="Pesquise e selecione um aluno..."
          styles={{
            control: styles => ({
              ...styles,
              height: '45px',
              alignContent: 'center',
            }),
          }}
        />
        <Input name="student_id" value={studentId} hidden />

        <DivBetween>
          <div>
            <p>PLANO</p>
            <Select
              selected={selectedPlanId}
              onChange={p => setSelectedPlanId(Number(p.target.value))}
              name="plan_id"
              options={plans}
              placeholder="Selecione o Plano"
            />
          </div>
          <div>
            <p>DATA DE INÍCIO</p>
            <DatePicker
              name="start_date"
              selected={startDate}
              onChange={date => setStartDate(date)}
              locale={pt}
              dateFormat="P"
              autoComplete="off"
            />
          </div>
          <div>
            <p>DATA DE TÉRMINO</p>
            <DatePicker
              selected={endDate}
              locale={pt}
              dateFormat="P"
              disabled
            />
          </div>
          <div>
            <p>VALOR FINAL</p>
            <input name="price" value={totalFormatted} disabled />
          </div>
        </DivBetween>
      </Box>
    </DataForm>
  );
}

EnrollmentsEditCreate.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
