import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';

class HelpOrderAnswerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const answers = await HelpOrder.findAll({
      where: { answer: null },
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(answers);
  }

  async store(req, res) {
    const { id } = req.params;

    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Answer is required!' });
    }

    const { answer } = req.body;

    const answer_at = new Date();

    const helpOrder = await HelpOrder.findOne({
      where: { id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(401).json({ error: 'Help order does not exists' });
    }

    await helpOrder.update({ answer, answer_at });

    await Queue.add(HelpOrderAnswerMail.key, helpOrder);

    return res.json(helpOrder);
  }
}

export default new HelpOrderAnswerController();
