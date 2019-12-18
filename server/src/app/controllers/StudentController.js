import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { search, page = 1 } = req.query;

    const where = {};

    if (search) {
      where.name = {
        [Op.like]: `${search}%`,
      };
    }

    if (req.params.id) {
      const students = await Student.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      });

      return res.json(students);
    }

    const students = await Student.findAll({
      where,
      limit: 10,
      offset: (page - 1) * 10,
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    return res.json(students);
  }

  async store(req, res) {
    const { email } = req.body;

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(400).json({ error: 'email is already registered' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const student = await Student.findByPk(req.params.id);

    const { email } = req.body;

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'email is already registered' });
      }
    }

    await student.update(req.body);

    return res.json(student);
  }

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);

    await student.destroy();

    return res.json(student);
  }
}

export default new StudentController();
