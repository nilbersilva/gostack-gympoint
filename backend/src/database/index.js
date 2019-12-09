import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Plan from '../app/models/Plan';
import Student from '../app/models/Student';
import Enrollment from '../app/models/Enrollment';
import HelpOrder from '../app/models/HelpOrder';
import CheckIn from '../app/models/Checkin';
import File from '../app/models/File';

const models = [User, Plan, Student, Enrollment, HelpOrder, CheckIn, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexão compartilhada
    this.connection = new Sequelize(databaseConfig);
    // Inicializa conexão e associações(foreignKeys) em todas as models
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
