import Student from '../models/Student';
import File from '../models/File';

class StudentSessionController {
  async index(req, res) {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ error: 'ID de Aluno informado não existe.' });
    }

    const students = await Student.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(students);
  }
}

export default new StudentSessionController();
