import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'creator_id', as: 'user' });
  }
}

export default Plan;
