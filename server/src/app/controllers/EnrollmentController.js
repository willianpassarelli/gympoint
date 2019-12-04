import * as Yup from 'yup';
import { addMonths, isBefore, parseISO } from 'date-fns';

import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import WelcomeMail from '../jobs/WelcomeMail';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'price'],
        },
      ],
    });

    res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const { student_id, plan_id, start_date } = req.body;

    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const plan = await Plan.findOne({
      where: { id: plan_id },
      attributes: ['title', 'duration', 'price'],
    });

    const { name, email } = await Student.findOne({
      where: { id: student_id },
    });

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const price = plan.duration * plan.price;

    const enrollment = Object.assign(req.body, { end_date, price });

    const enrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });

    if (enrollmentExists) {
      return res
        .status(401)
        .json({ error: 'Student already enrolled in a plan.' });
    }

    const { id } = await Enrollment.create(enrollment);

    await Queue.add(WelcomeMail.key, {
      name,
      email,
      start_date,
      end_date,
      price,
      plan,
    });

    return res.json({ id, name, email, start_date, end_date, price, plan });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      student_id: Yup.number(),
      plan_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const enrollment = await Enrollment.findByPk(req.params.id);

    const { start_date, plan_id } = req.body;

    if (isBefore(parseISO(start_date), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const plan = await Plan.findOne({ where: { id: plan_id } });

    const end_date = addMonths(parseISO(start_date), plan.duration);

    const price = plan.duration * plan.price;

    await enrollment.update({ start_date, end_date, plan_id, price });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    await enrollment.destroy();

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
