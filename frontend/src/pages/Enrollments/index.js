import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { PulseLoader } from 'react-spinners';
import Colors from '~/styles/colors';
import { Modal } from '~/components/Modal';
import { Container, Content, Nav, Items } from '../_layouts/lists/styles';
import { ModalContent } from '~/components/DataForm/styles';
import {
  loadEnrollmentsRequest,
  deleteEnrollmentRequest,
} from '~/store/modules/enrollments/actions';
import PaginationControl from '~/components/PaginationControl';

export default function Enrollments() {
  const totalPages = useSelector(state => state.enrollment.totalPages) || 0;
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [registroDelete, setRegistroDelete] = useState({
    student: { name: '' },
  });
  const dispatch = useDispatch();
  const loading = useSelector(state => state.enrollment.loading);
  const enrollments = useSelector(state => state.enrollment.enrollments) || [];

  useEffect(() => {
    dispatch(loadEnrollmentsRequest(page));
  }, []); // eslint-disable-line

  useEffect(() => {
    dispatch(loadEnrollmentsRequest(page));
  }, [page]); // eslint-disable-line

  useEffect(() => { }, [enrollments]); // eslint-disable-line

  async function handleOpenModal(dataToDel) {
    if (loading) return;
    setRegistroDelete(dataToDel);
    setShowModal(true);
  }

  function handleHideModal() {
    setShowModal(!showModal);
  }

  function handleDelete(id) {
    dispatch(deleteEnrollmentRequest(id));
    handleHideModal();
  }

  function handleChangePage(newPage) {
    if (newPage > 0 && enrollments.length !== 0) {
      setPage(newPage);
    }

    if (enrollments.length === 0 && newPage < page) {
      setPage(newPage);
    }
  }

  return (
    <Container>
      <Content>
        <Nav>
          <strong>Gerenciando matrículas</strong>
          <div>
            <Link to="/enrollments/create">
              <MdAdd size={20} /> <span>Cadastrar</span>
            </Link>
          </div>
        </Nav>
        <Items>
          <table>
            <thead>
              <tr>
                <th className="align-left">ALUNO</th>
                <th>PLANO</th>
                <th>INÍCIO</th>
                <th>TÉRMINO</th>
                <th>ATIVA</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
              </tr>
            </thead>
            <tbody>
              {enrollments &&
                enrollments.map(enrollment => (
                  <tr key={enrollment.id}>
                    <td className="align-left">{enrollment.student.name}</td>
                    <td>{enrollment.plan.title}</td>
                    <td>{enrollment.formattedStartDate}</td>
                    <td>{enrollment.formattedEndDate}</td>
                    <td>
                      {enrollment.active ? (
                        <MdCheckCircle size={20} color="#42cb59" />
                      ) : (
                        <MdCheckCircle size={20} color="#ddd" />
                      )}
                    </td>
                    <td>
                      <Link to={`enrollments/${enrollment.id}/edit`}>
                        editar
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleOpenModal(enrollment)}
                      >
                        apagar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Items>
        <PaginationControl
          objectLength={totalPages}
          page={page}
          handleChangePage={handleChangePage}
        />
      </Content>
      <Modal show={showModal} handleClose={handleHideModal}>
        <h1>Exclusão de Matrícula</h1>
        <p>
          Confirma a exclusão da Matrócula do(a) Aluno(a){' '}
          <b>{registroDelete.student.name}</b>?
        </p>
        <button type="button" onClick={() => handleDelete(registroDelete.id)}>
          Confirmar
        </button>
        <button type="button" className="secondary" onClick={handleHideModal}>
          Cancelar
        </button>
      </Modal>

      <Modal show={loading}>
        <ModalContent>
          <PulseLoader size={15} color={Colors.Red} margin="16px" />
          <span>Carregando registros...</span>
        </ModalContent>
      </Modal>
    </Container>
  );
}
