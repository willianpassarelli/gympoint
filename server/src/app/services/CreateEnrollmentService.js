import { isBefore, parseISO } from 'date-fns';

import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import WelcomeMail from '../jobs/WelcomeMail';

import Cache from '../../lib/Cache';

class CreateEnrollmentService {
  async run({ student_id, start_date, plan_id, end_date, price }) {
    if (isBefore(parseISO(start_date), new Date())) {
      throw new Error('Past dates are not permitted');
    }

    const plan = await Plan.findOne({
      where: { id: plan_id },
      attributes: ['title', 'duration', 'price'],
    });

    const { name, email } = await Student.findOne({
      where: { id: student_id },
    });

    const data = { student_id, plan_id, start_date, end_date, price };

    const enrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });

    if (enrollmentExists) {
      throw new Error('Student already enrolled in a plan.');
    }

    const enrollment = await Enrollment.create(data);

    if (enrollment) {
      await Cache.invalidate('enrollments');
    }

    await Queue.add(WelcomeMail.key, {
      student_id,
      name,
      email,
      start_date,
      end_date,
      price,
      plan,
    });

    return enrollment;
  }
}

export default new CreateEnrollmentService();
