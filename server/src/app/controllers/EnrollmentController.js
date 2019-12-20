import { isBefore } from 'date-fns';

import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';

import Cache from '../../lib/Cache';

import CreateEnrollmentService from '../services/CreateEnrollmentService';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const cached = await Cache.get('enrollments');

    if (cached) {
      return res.json(cached);
    }

    if (req.params.id) {
      const enrollments = await Enrollment.findByPk(req.params.id, {
        attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['id', 'title', 'price', 'duration'],
          },
        ],
      });

      return res.json(enrollments);
    }

    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'price', 'duration'],
        },
      ],
    });

    await Cache.set('enrollments', enrollments);

    return res.json(enrollments);
  }

  async store(req, res) {
    const enrollment = await CreateEnrollmentService.run(req.body);

    return res.json(enrollment);
  }

  async update(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    const { student_id, start_date, end_date, plan_id, price } = req.body;

    if (isBefore(start_date, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    await enrollment.update({
      student_id,
      start_date,
      end_date,
      plan_id,
      price,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    await enrollment.destroy();

    if (enrollment) {
      await Cache.invalidate('enrollments');
    }

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
