import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        creator_id: Sequelize.INTEGER, // User that created this Student
        age: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'creator_id', as: 'user' });
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Student;
