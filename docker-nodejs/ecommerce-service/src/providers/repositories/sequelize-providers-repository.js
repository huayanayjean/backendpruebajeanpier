const { DataTypes } = require('sequelize');

// Implementación del repositorio de lugares con Sequelize.
class SequelizeProvidersRepository {

  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient;
    this.test = test;

    // Definición de la tabla Providers
    let tableName = "PROVIDER";
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
      }
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.providerModel = this.sequelizeClient.sequelize.define('PROVIDER', columns, options);
  }

  async getProviders() {
    return await this.providerModel.findAll({ raw: true });
  }

  async getProvider(id) {
    return await this.providerModel.findByPk(id);
  }

  async createProvider(provider) {
    const data = await this.providerModel.create(provider);
    return data.id;
  }

  async updateProvider(provider) {
    const options = { where: { id: provider.id } };
    await this.providerModel.update(provider, options);
  }

  async deleteProvider(id) {
    const options = { where: { id: id } };
    const deletedCount = await this.providerModel.destroy(options);
    return deletedCount > 0;
  }

  async deleteAllProviders() {
    if (this.test) {
      await this.providerModel.destroy({ truncate: true });
    }
  }

  async dropProvidersTable() {
    if (this.test) {
      await this.providerModel.drop();
    }
  }
}

module.exports = SequelizeProvidersRepository;
