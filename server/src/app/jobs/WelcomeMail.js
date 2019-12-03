import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { name, email, start_date, end_date, price, plan } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Matricula realizada',
      template: 'welcome',
      context: {
        student: name,
        title: plan.title,
        duration: plan.duration,
        price,
        start_date: format(parseISO(start_date), 'dd/MM/yyyy', { locale: pt }),
        end_date: format(parseISO(end_date), 'dd/MM/yyyy', { locale: pt }),
      },
    });
  }
}

export default new WelcomeMail();
