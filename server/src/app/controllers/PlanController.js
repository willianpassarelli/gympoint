import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    if (req.params.id) {
      const plans = await Plan.findByPk(req.params.id, {
        attributes: ['id', 'title', 'duration', 'price'],
      });

      return res.json(plans);
    }

    const plans = await Plan.findAll({
      order: ['duration'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const { title } = req.body;

    const planExists = await Plan.findOne({ where: { title } });

    if (planExists) {
      return res.status(401).json({ error: 'Plan title already exists' });
    }

    const { duration, price } = await Plan.create(req.body);

    return res.json({ title, duration, price });
  }

  async update(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    const { title } = req.body;

    if (title !== plan.title) {
      const titleExist = await Plan.findOne({ where: { title } });

      if (titleExist) {
        return res.status(400).json({ error: 'Plan title already exists' });
      }
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    await plan.destroy();

    return res.json({ msg: `${plan.title} plan removed` });
  }
}

export default new PlanController();
