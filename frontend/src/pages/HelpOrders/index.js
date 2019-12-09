import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { format, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { PulseLoader } from 'react-spinners';
import api from '~/services/api';
import { Container, Content, Nav, Items } from '../_layouts/lists/styles';
import { ModalContent } from '~/components/DataForm/styles';
import PaginationControl from '~/components/PaginationControl';
import { Modal } from '~/components/Modal';
import Colors from '~/styles/colors';
import { delay, TrataErr } from '~/util/funcs';

const schema = Yup.object().shape({
  answer: Yup.string().required('Resposta não informada'),
});

export default function HelpOrders() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [currentOrderId, setCurrentOrderId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [modalAnswer, setModalAnswer] = useState('');
  const [loadingPergunta, setLoadingPergunta] = useState(true);
  let loadingTimeout = null;
  let bDelay = false;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  async function loadOrders() {
    bDelay = false;
    loadingTimeout = setTimeout(async () => {
      setLoading(true);
      bDelay = true;
    }, 200);
    try {
      await api.get(`help-orders?page=${page}`).then(async response => {
        setOrders(
          response.data.helporders.map(order => {
            return {
              ...order,
              formattedDate: format(
                utcToZonedTime(parseISO(order.created_at), timezone),
                'yyyy-MM-dd HH:mm:ss'
              ),
            };
          })
        );
        setTotalPages(response.data.count);
      });
    } catch (error) {
      TrataErr(error, 'Erro ao carregar Pedidos de Auxílio');
    } finally {
      if (bDelay) await delay(200);
      clearTimeout(loadingTimeout);
      setLoading(false);
    }
  }

  // Run Once
  useEffect(() => {
    loadOrders();
  }, [page]); // eslint-disable-line

  function handleChangePage(newPage) {
    if (newPage > 0 && orders.length !== 0) {
      setPage(newPage);
    }

    if (orders.length === 0 && newPage < page) {
      setPage(newPage);
    }
  }

  async function handleOpenModal(id) {
    if (loading) return;
    setLoadingPergunta(true);
    try {
      setShowModal(true);
      await api.get(`help-orders/${id}`).then(response => {
        setQuestion(response.data.helporders.question);
        setCurrentOrderId(id);
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingPergunta(false);
    }
  }

  function handleHideModal() {
    setShowModal(!showModal);
  }

  async function handleAnswerSubmit({ answer }) {
    if (loadingPergunta) {
      toast.warn('Pertunta ainda está sendo carregada.');
    }
    try {
      await api
        .put(`help-orders/${currentOrderId}/answer`, { answer })
        .then(() => {
          const newOrders = orders.filter(order => order.id !== currentOrderId);
          if (newOrders.length === 0) {
            if (page > 1) setPage(page - 1);
          }
          setOrders(newOrders);
          toast.success('Pergunta respondida com sucesso!');
        });
      setModalAnswer('');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowModal(false);
    }
  }

  return (
    <Container>
      <Content style={{ maxWidth: '800px' }}>
        <Nav>
          <strong>Pedidos de auxílio</strong>
        </Nav>

        {orders.length > 0 ? (
          <Items>
            <table>
              <thead>
                <tr>
                  <th className="align-left">ALUNO</th>
                  <th>Data Pedido</th>
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <th />
                </tr>
              </thead>
              <tbody>
                {orders.map(helporder => (
                  <tr key={helporder.id}>
                    <td className="align-left">{helporder.student.name}</td>
                    <td>{helporder.formattedDate}</td>
                    <td className="answer">
                      <button
                        className="help"
                        type="button"
                        onClick={() => handleOpenModal(helporder.id)}
                      >
                        Responder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Items>
        ) : null}

        <PaginationControl
          objectLength={totalPages}
          page={page}
          handleChangePage={handleChangePage}
        />
      </Content>
      <Modal show={showModal} handleClose={handleHideModal}>
        <Form schema={schema} onSubmit={handleAnswerSubmit}>
          <b>Pergunta do Aluno</b>
          {loadingPergunta ? (
            <PulseLoader size={15} color={Colors.Red} />
          ) : null}
          <p className="question">{question}</p>
          <b>Sua resposta</b>
          <Input
            name="answer"
            type="text"
            placeholder="Digite uma resposta"
            autoComplete="off"
            value={modalAnswer}
            onChange={e => setModalAnswer(e.target.value)}
          />
          <button type="submit" disabled={loadingPergunta}>
            Responder Aluno
          </button>
        </Form>
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
