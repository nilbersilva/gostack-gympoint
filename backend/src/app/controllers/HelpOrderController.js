import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import User from '../models/User';
import Student from '../models/Student';
import HelpOrderAnswered from '../jobs/HelpOrderAnswered';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;
    if (id) {
      const helpOrder = await HelpOrder.findByPk(id);
      return res.json({ helporders: helpOrder, count: 1 });
    }
    const helpOrders = await HelpOrder.findAndCountAll({
      order: ['created_at'],
      attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'answer_user',
          attributes: ['id', 'name', 'email'],
        },
      ],
      offset: 10 * (page - 1),
      limit: 10,
      where: { answer: null },
    });

    return res.json({
      helporders: helpOrders.rows,
      count: Math.ceil(helpOrders.count / 10),
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: 'Aluno não informado.' });
    }

    const { question } = req.body;

    const plan = await HelpOrder.create({ student_id: studentId, question });

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { helpOrderId } = req.params;

    if (!helpOrderId) {
      return res
        .status(400)
        .json({ error: 'Pedido de Auxílio não informado.' });
    }

    let helpOrder = await HelpOrder.findByPk(helpOrderId, {
      attributes: ['id', 'answer'],
    });

    if (!helpOrder) {
      return res
        .status(400)
        .json({ error: 'Pedido de Auxílio informado não existe.' });
    }
    if (helpOrder.answer) {
      return res
        .status(400)
        .json({ error: 'Pedido de Auxílio informado já foi respondido.' });
    }

    const { answer } = req.body;

    await helpOrder.update({
      answer_user_id: req.userId,
      answer,
      answer_at: new Date(),
    });

    helpOrder = await HelpOrder.findByPk(helpOrderId, {
      attributes: ['id', 'question', 'answer'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'answer_user',
          attributes: ['name'],
        },
      ],
    });

    await Queue.add(HelpOrderAnswered.key, { helpOrder });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
