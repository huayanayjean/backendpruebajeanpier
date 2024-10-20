const { DataTypes } = require('sequelize');

// Implementación del repositorio de usuarios con Sequelize.
class SequelizeUsersRepository {

  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient;
    this.test = test;

    // Definición de la tabla Users
    let tableName = "USER";
    if (test) {
      tableName += "_test";
    }

    const columns = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      }
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.userModel = this.sequelizeClient.sequelize.define('USER', columns, options);
  }

  async getUsers() {
    return await this.userModel.findAll({ raw: true });
  }

  async getUser(id) {
    return await this.userModel.findByPk(id);
  }

  async createUser(user) {
    const data = await this.userModel.create(user);
    return data.id;
  }

  async updateUser(user) {
    const options = { where: { id: user.id } };
    await this.userModel.update(user, options);
  }

  async deleteUser(id) {
    const options = { where: { id: id } };
    const deletedCount = await this.userModel.destroy(options);
    return deletedCount > 0;
  }

  async deleteAllUsers() {
    if (this.test) {
      await this.userModel.destroy({ truncate: true });
    }
  }

  async dropUsersTable() {
    if (this.test) {
      await this.userModel.drop();
    }
  }
}

module.exports = SequelizeUsersRepository;
