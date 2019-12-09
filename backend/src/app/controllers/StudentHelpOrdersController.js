import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import User from '../models/User';

class StudentHelpOrdersController {
  async index(req, res) {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ error: 'Student ID not informed.' });
    }

    const helpOrder = await HelpOrder.findAll({
      where: { student_id: studentId },
      include: [
        {
          model: User,
          as: 'answer_user',
          attributes: ['name'],
        },
      ],
      order: [['createdAt', 'desc']],
    });
    return res.json(helpOrder);
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
      return res.status(400).json({ error: 'ID de Aluno não informado.' });
    }

    const { question } = req.body;

    const plan = await HelpOrder.create({ student_id: studentId, question });

    return res.json(plan);
  }
}

export default new StudentHelpOrdersController();
