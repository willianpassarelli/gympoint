import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;

    const checkStudent = await Student.findByPk(id);

    if (!checkStudent) {
      return res.status(401).json({ error: 'Unidentified student' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id: id },
      limit: 10,
      offset: (page - 1) * 10,
      order: [['id', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    const checkStudent = await Student.findByPk(id);

    if (!checkStudent) {
      return res.status(401).json({ error: 'Unidentified student' });
    }

    const period = subDays(new Date(), 7);

    const checkin = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [period, new Date()],
        },
      },
    });

    if (checkin.length === 5) {
      return res
        .status(401)
        .json({ error: 'You ve already done 5 check ins this week.' });
    }

    const response = await Checkin.create({ student_id: id });

    return res.json(response);
  }
}

export default new CheckinController();
