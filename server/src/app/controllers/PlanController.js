import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    return res.json({ msg: 'listou' });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { title } = req.body;

    const planExists = await Plan.findOne({ where: { title } });

    if (planExists) {
      return res.status(401).json({ error: 'Plan title already exists' });
    }

    const { duration, price } = await Plan.create(req.body);

    return res.json({ title, duration, price });
  }

  async update(req, res) {
    return res.json({ msg: 'atualizou' });
  }

  async delete(req, res) {
    return res.json({ msg: 'deletou' });
  }
}

export default new PlanController();
