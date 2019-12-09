import * as Yup from 'yup';
import {
  parseISO,
  isBefore,
  addMonths,
  isAfter,
  startOfDay,
  endOfDay,
} from 'date-fns';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import EnrollStudent from '../jobs/EnrollStudent';

class EnrollmentController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;
    if (id) {
      const enrollments = await Enrollment.findByPk(id, {
        attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'title'],
          },
        ],
      });
      return res.json(enrollments);
    }
    const enrollments = await Enrollment.findAndCountAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
      offset: 10 * (page - 1),
      limit: 10,
    });
    return res.json({
      enrollments: enrollments.rows,
      count: Math.ceil(enrollments.count / 10),
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      student_id: Yup.number()
        .positive()
        .required(),
      plan_id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { start_date, student_id } = req.body;

    // Check if student Exists
    const student = await Student.findByPk(student_id, {
      attributes: ['name', 'email'],
    });

    if (!student) {
      return res.status(404).json({ error: 'Aluno informado não existe.' });
    }

    const parsedDate = startOfDay(parseISO(start_date));

    // Cannot enroll in past dates
    if (isBefore(parsedDate, startOfDay(new Date()))) {
      return res.status(400).json({
        error: 'Não é possível efetuar uma matrícula em Datas passadas.',
      });
    }

    // Recupera Última Matricula
    const alreadyRegistered = await Enrollment.findOne({
      where: {
        student_id,
      },
      order: [['end_date', 'DESC']],
    });

    if (alreadyRegistered) {
      // Verificar se já tem uma Matrícula Ativa
      if (isAfter(alreadyRegistered.end_date, new Date())) {
        return res
          .status(400)
          .json({ error: 'Este aluno já possui uma Matrícula Ativa.' });
      }
    }

    const plan = await Plan.findByPk(req.body.plan_id);
    if (!plan) {
      return res.status(404).json({ error: 'Informed Plan not found.' });
    }

    const { price, duration } = plan;
    const total_price = parseFloat(duration * price).toFixed(2);
    const end_date = endOfDay(addMonths(parsedDate, duration));

    const { registration } = await Enrollment.create({
      ...req.body,
      start_date: parsedDate,
      price: total_price,
      end_date,
      creator_id: req.userId,
    });

    const { name, email } = student;

    await Queue.add(EnrollStudent.key, {
      student: name,
      email,
      start_date: parsedDate,
      end_date,
      title: plan.title,
      price,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .required(),
      plan_id: Yup.number().positive(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { enrollmentId } = req.params;

    if (!enrollmentId) {
      return res.status(400).json({ error: 'ID da Matrícula não informada.' });
    }

    const enrollment = await Enrollment.findByPk(enrollmentId);

    if (!enrollment) {
      return res.status(400).json({ error: 'Matrícula informada não existe.' });
    }

    const { student_id, plan_id, start_date } = req.body;
    // Valida se a Matrícula a ser Atualizada pertence ao Aluno informado no Body
    if (enrollment.student_id !== student_id) {
      return res.status(400).json({
        error: 'Matrícula informada não pertence ao Aluno informado.',
      });
    }

    if (start_date && start_date !== enrollment.start_date) {
      const parsedDate = startOfDay(parseISO(start_date));
      if (isBefore(parsedDate, startOfDay(new Date()))) {
        return res.status(400).json({
          error: 'Não é possível efetuar uma matrícula em Datas passadas.',
        });
      }
    }

    // Verifica se o Plano quando informado no Body Existe
    if (plan_id && plan_id !== enrollment.plan_id) {
      const planExists = await Plan.findByPk(plan_id);
      if (!planExists) {
        return res.status(400).json({ error: 'Plano informado não existe.' });
      }
    }

    let planId = enrollment.plan_id;
    let startDate = enrollment.start_date;
    // Se Plano existe atualiza
    if (plan_id) {
      planId = plan_id;
    }
    // Se informada data de Início ela será utilizada
    if (start_date) {
      startDate = start_date;
    }

    startDate = startOfDay(parseISO(startDate));
    const plan = await Plan.findByPk(planId);
    const { price, duration } = plan;
    // Arredonda 2 casas decimais
    const total_price = parseFloat(duration * price).toFixed(2);
    const end_date = addMonths(startDate, duration);

    const { id } = await enrollment.update({
      start_date: startDate,
      price: total_price,
      plan_id: planId,
      end_date,
    });

    return res.json({
      id,
      student_id,
      plan_id: planId,
      start_date,
      end_date,
    });
  }

  async delete(req, res) {
    const { enrollmentId } = req.params;

    const enrollment = await Enrollment.findByPk(enrollmentId);

    if (!enrollment) {
      return res.status(404).json({ error: 'Matrícula informada não existe.' });
    }

    await enrollment.destroy();

    return res.json({
      message: `Matrícula excluida com sucesso.`,
    });
  }
}

export default new EnrollmentController();
