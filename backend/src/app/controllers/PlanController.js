import * as Yup from 'yup';
import { Op } from 'sequelize';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { id } = req.query;
    let plans = {};

    if (id) {
      plans = await Plan.findByPk(id, {
        attributes: ['id', 'title', 'duration', 'price'],
      });
    } else {
      plans = await Plan.findAll({
        attributes: ['id', 'title', 'duration', 'price'],
        order: ['duration'],
      });
    }

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { title } = req.body;

    const exists = await Plan.findOne({
      where: {
        title: {
          [Op.iLike]: title.trim(),
        },
      },
    });

    if (exists) {
      return res
        .status(400)
        .json({ error: `Informed Plan '${title}' already exists.` });
    }

    // User that created Plan
    req.body.creator_id = req.userId;

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().positive(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { planId } = req.params;

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(404).json({ error: 'Plano informado não existe.' });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const { id } = req.headers;

    await Plan.destroy({ where: { id } });

    return res.json({
      message: `Plano excluido com sucesso.`,
    });
  }
}

export default new PlanController();
