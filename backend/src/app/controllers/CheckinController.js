import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { studentId } = req.params;
    const { page = 1 } = req.query;

    const student = await Student.findOne({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(400).json({ error: 'Aluno informado não existe.' });
    }

    // Paginação, limite de 15 por página page
    const checkins = await Checkin.findAll({
      where: { student_id: studentId },
      offset: 15 * (page - 1),
      limit: 15,
      order: [['createdAt', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { studentId } = req.params;

    const student = await Student.findOne({
      where: { id: studentId },
    });

    if (!student) {
      return res.status(400).json({ error: 'Aluno informado não existe.' });
    }

    // O usuário só pode fazer 5 checkins dentro de um período de 7 dias corridos.
    const checkins = await Checkin.findAll({
      where: {
        student_id: studentId,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });

    if (checkins.length >= 5) {
      return res.status(400).json({ error: 'Limite de Checkins atingido.' });
    }

    const checkin = await Checkin.create({ student_id: studentId });
    return res.json(checkin);
  }
}

export default new CheckinController();
