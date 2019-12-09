import Mail from '../../lib/Mail';

class HelpOrderAnswered {
  get key() {
    return 'HelpOrderAnswered';
  }

  async handle({ data }) {
    const { helpOrder } = data;
    await Mail.sendMail({
      to: helpOrder.student.email,
      subject: 'Pergunta respondida',
      template: 'helpOrderAnswered',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        user: helpOrder.answer_user.name,
      },
    });
  }
}

export default new HelpOrderAnswered();
