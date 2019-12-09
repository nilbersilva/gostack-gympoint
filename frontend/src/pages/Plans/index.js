import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { PulseLoader } from 'react-spinners';
import { Modal } from '~/components/Modal';
import { Container, Content, Nav, Items } from '../_layouts/lists/styles';
import { ModalContent } from '~/components/DataForm/styles';
import {
  loadPlansRequest,
  deletePlanRequest,
} from '~/store/modules/plans/actions';
import Colors from '~/styles/colors';

export default function Plans() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const plans = useSelector(state => state.plan.plans) || [];
  const loading = useSelector(state => state.plan.loading);
  const [registroDelete, setRegistroDelete] = useState({});

  // Run Once
  useEffect(() => {
    dispatch(loadPlansRequest());
  }, []); // eslint-disable-line

  function handleDelete(id) {
    dispatch(deletePlanRequest(id));
    setShowModal(false);
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
          <strong>Gerenciando planos</strong>
          <div>
            <Link to="/plans/create">
              <MdAdd size={20} /> <span>Cadastrar</span>
            </Link>
          </div>
        </Nav>

        <Items>
          <table>
            <thead>
              <tr>
                <th className="align-left">TÍTULO</th>
                <th>DURAÇÃO</th>
                <th>VALOR p/ MÊS</th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
              </tr>
            </thead>
            <tbody>
              {plans &&
                plans.map(plan => (
                  <tr key={plan.id}>
                    <td className="align-left">{plan.title}</td>
                    <td>{plan.formattedDuration}</td>
                    <td>{plan.formattedPrice}</td>
                    <td>
                      <Link to={`plans/${plan.id}/edit`}>editar</Link>
                      <button
                        type="button"
                        onClick={() => handleOpenModal(plan)}
                      >
                        apagar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Items>
      </Content>
      <Modal show={showModal} handleClose={handleHideModal}>
        <h1>Exclusão de Plano</h1>
        <p>
          Confirma a exclusão do Plano <b>{registroDelete.title}</b>?
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
