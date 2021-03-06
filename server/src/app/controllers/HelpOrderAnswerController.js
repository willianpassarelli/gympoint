import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import HelpOrderAnswerMail from '../jobs/HelpOrderAnswerMail';

import Queue from '../../lib/Queue';
import Cache from '../../lib/Cache';

class HelpOrderAnswerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const answers = await HelpOrder.findAll({
      where: { answer: null },
      limit: 10,
      offset: (page - 1) * 10,
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
    const { answer } = req.body;

    const answer_at = new Date();

    const helpOrder = await HelpOrder.findOne({
      where: { id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(401).json({ error: 'Help order does not exists' });
    }

    await helpOrder.update({ answer, answer_at });

    await Queue.add(HelpOrderAnswerMail.key, helpOrder);

    /**
     * Invalidate cache
     */

    await Cache.invalidatePrefix(`user:${helpOrder.student.id}:helpOrder`);

    return res.json(helpOrder);
  }
}

export default new HelpOrderAnswerController();
