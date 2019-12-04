import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  async handle({ data }) {
    const { student, question, answer } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Gympoint - Resposta do pedido de auxílio',
      template: 'helpOrderAnswer',
      context: {
        student: student.name,
        question,
        answer,
      },
    });
  }
}

export default new HelpOrderAnswerMail();
