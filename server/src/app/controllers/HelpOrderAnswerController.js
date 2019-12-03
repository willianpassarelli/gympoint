import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderAnswerController {
  async index(req, res) {
    return res.json({ resp: 'ok' });
  }

  async store(req, res) {
    return res.json({ resp: 'ok' });
  }
}

export default new HelpOrderAnswerController();
