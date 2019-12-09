import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';
import { formatPrice } from '../../util/format';

class EnrollStudent {
  get key() {
    return 'WelcomeStudent';
  }

  async handle({ data }) {
    const { student, title, start_date, end_date, price, email } = data;
    await Mail.sendMail({
      to: email,
      subject: 'Nova Matrícula',
      template: 'enrollStudent',
      context: {
        student,
        title,
        start_date: format(
          parseISO(start_date),
          "'Dia' dd 'de' MMMM' de 'yyyy",
          {
            locale: pt,
          }
        ),
        end_date: format(parseISO(end_date), "'Dia' dd 'de' MMMM' de 'yyyy", {
          locale: pt,
        }),
        price: formatPrice(price),
      },
    });
  }
}

export default new EnrollStudent();
