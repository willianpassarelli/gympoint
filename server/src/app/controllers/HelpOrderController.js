import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;

    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: id },
      limit: 5,
      offset: (page - 1) * 5,
      order: [
        ['answer', 'NULLS FIRST'],
        ['id', 'DESC'],
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { id } = req.params;

    const { question } = req.body;

    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    const helpOrder = await HelpOrder.create({ question, student_id: id });

    return res.json(helpOrder);
  }
}

export default new HelpOrderController();
