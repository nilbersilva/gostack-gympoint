import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import File from '../models/File';

class StudentController {
  async index(req, res) {
    const { page = 1, q, id } = req.query;
    let whereStatement = {};
    let students = [];
    let count = 0;
    if (q) {
      whereStatement = { name: { [Op.iLike]: `%${q}%` } };
    }

    if (id) {
      students = await Student.findByPk(id, {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });
      if (students) count = 1;
    } else {
      // Paginação, limite de 10 por página
      const retApi = await Student.findAndCountAll({
        offset: 10 * (page - 1),
        limit: 10,
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
        where: whereStatement,
        order: ['id'],
      });
      students = retApi.rows;
      count = Math.ceil(retApi.count / 10);
    }

    return res.json({ students, count });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      name: Yup.string().required(),
      age: Yup.number()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    req.body.email = req.body.email.toLowerCase();

    // User that created student
    req.body.creator_id = req.userId;
    req.body.email = req.body.email.toLowerCase().trim();

    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(401).json({
        error: 'Já existe um Aluno cadastrado com o Email informado.',
      });
    }

    const newStudent = await Student.create(req.body);

    return res.json(newStudent);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      email: Yup.string()
        .email()
        .required(),
      name: Yup.string().required(),
      age: Yup.number()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    req.body.email = req.body.email.toLowerCase().trim();

    const { student_id } = req.body;

    const studentExists = await Student.findByPk(student_id);

    if (!studentExists) {
      return res.status(401).json({ error: 'Student does not exist.' });
    }

    await studentExists.update(req.body);

    return res.json(studentExists);
  }

  async delete(req, res) {
    const { id } = req.headers;
    const response = await Student.destroy({ where: { id } });

    return res.json(response);
  }
}

export default new StudentController();
