import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import * as Yup from 'yup';
import { PulseLoader } from 'react-spinners';

import history from '~/services/history';

import { Container } from '~/pages/_layouts/lists/styles';
import { Content, Nav } from '~/pages/_layouts/edit/styles';
import { Modal } from '~/components/Modal';
import Colors from '~/styles/colors';
import { ModalContent } from './styles';
import { delay } from '~/util/funcs';

export default function DataForm({
  match,
  schema,
  getInitialData,
  newTitle,
  editTitle,
  goBackPath,
  submitCreate,
  submitUpdate,
  children,
  showModal,
  modalContent,
}) {
  const { id } = match.params;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState();
  const [canEdit, setCanEdit] = useState(false);
  const [showRefresh, setShowRefresh] = useState(false);
  const [modalMessage, setModalMessage] = useState('Carregando registro...');

  async function load() {
    setLoading(true);
    let errMsg = '';
    try {
      setShowRefresh(false);
      setModalMessage('Carregando registro...');
      setCanEdit(false);
      await delay(250); // Aguarda animação do Modal
      const newData = await getInitialData();
      setFormData(newData);
      setCanEdit(true);
    } catch (error) {
      errMsg = error.message;
    } finally {
      if (errMsg !== '') {
        setModalMessage(
          `Aconteceu um erro durante a operação atual: ${errMsg}`
        );
        setTimeout(() => {
          setShowRefresh(true);
        }, 3000);
      } else {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    load();
  }, []); //eslint-disable-line

  async function handleSubmit(data) {
    try {
      if (canEdit) {
        if (id > 0) {
          // setShowUpdating(true);
          submitUpdate(data);
        } else {
          // setShowCreating(true);
          submitCreate(data);
        }
      } else {
        toast.error(
          'O registro atual não foi localizado, por favor atualize a página.'
        );
      }
    } catch (error) {
      // setShowUpdating(false);
      // setShowCreating(false);
      setModalMessage(error.message);
      showModal = true;
    }
  }

  // schema={schema}
  return (
    <Container>
      <Content>
        <Nav>
          <strong>{id > 0 ? editTitle : newTitle}</strong>
          <div>
            <Link to={`/${goBackPath}`}>
              <MdChevronLeft size={20} color="#fff" />
              VOLTAR
            </Link>
            <button type="submit" disabled={!canEdit} form="FORMID">
              <MdCheck size={20} color="#fff" />
              SALVAR
            </button>
          </div>
        </Nav>
        {formData ? (
          <Form
            id="FORMID"
            schema={schema}
            initialData={formData}
            onSubmit={handleSubmit}
          >
            {children}
          </Form>
        ) : null}
        {id > 0 || showModal ? (
          <Modal show={loading || showModal}>
            <ModalContent>
              {showRefresh ? (
                <>
                  <span>O registro atual não foi localizado</span>
                  <button
                    type="button"
                    className="sucess"
                    onClick={() => load()}
                  >
                    Tentar novamente
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => history.goBack()}
                  >
                    Voltar para a página anterior
                  </button>
                </>
              ) : (
                <>
                  {showModal ? (
                    modalContent
                  ) : (
                    <>
                      {' '}
                      <PulseLoader size={15} color={Colors.Red} margin="16px" />
                      <span>{modalMessage}</span>
                    </>
                  )}
                </>
              )}
            </ModalContent>
          </Modal>
        ) : null}
      </Content>
    </Container>
  );
}

DataForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  schema: PropTypes.oneOfType([Yup.ObjectSchema]),
  getInitialData: PropTypes.func,
  newTitle: PropTypes.string,
  editTitle: PropTypes.string,
  goBackPath: PropTypes.string,
  submitCreate: PropTypes.func,
  submitUpdate: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  modalContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  showModal: PropTypes.bool,
};

DataForm.defaultProps = {
  schema: undefined,
  getInitialData: () => {},
  newTitle: 'Cadastro',
  editTitle: 'Edição',
  goBackPath: '/',
  submitCreate: () => {
    toast.success('Nenhum submitCreate implementado');
  },
  submitUpdate: () => {
    toast.success('Nenhum submitUpdate implementado');
  },
  showModal: false,
  modalContent: undefined,
};
