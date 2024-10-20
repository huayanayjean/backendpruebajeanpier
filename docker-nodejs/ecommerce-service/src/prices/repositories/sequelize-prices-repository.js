const { DataTypes } = require('sequelize');

// Implementación del repositorio de lugares con Sequelize.
class SequelizePricesRepository {

  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient;
    this.test = test;

    // Definición de la tabla Vehicles
    let tableName = "PRICE";
    if (test) {
      tableName += "_test";
    }

    const columns = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      coverage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'COVERAGE',
          key: 'id',
        },
      },
      valid_from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      valid_to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.priceModel = this.sequelizeClient.sequelize.define('PRICE', columns, options);
  }

  async getPrices() {
    return await this.priceModel.findAll({ raw: true });
  }

  async getPrice(id) {
    return await this.priceModel.findByPk(id);
  }

  async createPrice(price) {
    const data = await this.priceModel.create(price);
    return data.id;
  }

  async updatePrice(price) {
    const options = { where: { id: price.id } };
    await this.priceModel.update(price, options);
  }

  async deletePrice(id) {
    const options = { where: { id: id } };
    const deletedCount = await this.priceModel.destroy(options);
    return deletedCount > 0;
  }

  async deleteAllPrices() {
    if (this.test) {
      await this.priceModel.destroy({ truncate: true });
    }
  }

  async dropPricesTable() {
    if (this.test) {
      await this.priceModel.drop();
    }
  }
}

module.exports = SequelizePricesRepository;
