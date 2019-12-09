import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import { MdSearch, MdAdd } from 'react-icons/md';
import { PulseLoader } from 'react-spinners';
import { Modal } from '~/components/Modal';
import {
  Container,
  Content,
  Nav,
  BoxIcon,
  Items,
} from '../_layouts/lists/styles';
import { ModalContent } from '~/components/DataForm/styles';
import {
  loadStudentsRequest,
  deleteStudentRequest,
} from '~/store/modules/student/actions';
import PaginationControl from '~/components/PaginationControl';
import Colors from '~/styles/colors';

export default function Students() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [registroDelete, setRegistroDelete] = useState({});
  const students = useSelector(state => state.student.students) || [];
  const totalPages = useSelector(state => state.student.totalPages) || 0;
  const loading = useSelector(state => state.student.loading) || 0;
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [ignoreChange, setIgnoreChange] = useState(false);
  let typingTimeout = null;

  // Run Once
  useEffect(() => {
    dispatch(loadStudentsRequest());
  }, []); // eslint-disable-line

  useEffect(() => {
    if (ignoreChange) {
      return;
    }
    if (search !== null) {
      dispatch(loadStudentsRequest(search, page));
    } else {
      dispatch(loadStudentsRequest(null, page));
    }
  }, [search, page]); // eslint-disable-line

  function handleDelete(id) {
    dispatch(deleteStudentRequest(id));
    setShowModal(false);
  }

  function handleChangePage(newPage) {
    if (newPage > 0 && students.length !== 0) {
      setPage(newPage);
    }

    if (students.length === 0 && newPage < page) {
      setPage(newPage);
    }
  }

  function handleOnChangeSearch(value) {
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setIgnoreChange(true);
      setPage(1);
      setIgnoreChange(false);
      setSearch(value);
    }, 500);
  }

  async function handleOpenModal(dataToDel) {
    if (loading) return;
    setRegistroDelete(dataToDel);
    setShowModal(true);
  }

  function handleHideModal() {
    setShowModal(!showModal);
  }

  return (
    <Container>
      <Content>
        <Nav>
          <strong>Gerenciando alunos</strong>
          <div>
            <Link to="/students/create">
              <MdAdd size={20} /> <span>Cadastrar</span>
            </Link>
            <BoxIcon>
              <MdSearch color="#999" size={16} />
            </BoxIcon>
            <Input
              checked={search}
              onChange={e => handleOnChangeSearch(e.target.value)}
              name="search"
              type="text"
              placeholder="Buscar aluno"
            />
          </div>
        </Nav>

        <Items>
          <table>
            <thead>
              <tr>
                <th className="align-left">NOME</th>
                <th className="align-left">E-MAIL</th>
                <th>IDADE</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map(student => (
                  <tr key={student.id}>
                    <td className="align-left">{student.name}</td>
                    <td className="align-left">{student.email}</td>
                    <td>{student.age}</td>
                    <td>
                      <Link to={`students/${student.id}/edit`}>editar</Link>
                      <button
                        type="button"
                        onClick={() => handleOpenModal(student)}
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
        <h1>Exclusão de Aluno</h1>
        <p>
          Confirma a exclusão do Aluno <b>{registroDelete.name}</b>?
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
