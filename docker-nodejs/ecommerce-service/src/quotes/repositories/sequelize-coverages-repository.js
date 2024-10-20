const { DataTypes } = require('sequelize');

// Implementación del repositorio de lugares con Quotation.
class SequelizeQuotesRepository {

  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient;
    this.test = test;

    // Definición de la tabla Categories
    let tableName = "QUOTATION";
    if (test) {
      tableName += "_test";
    }

    const columns = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'USER',
          key: 'id'
        }
      },
      coverage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'COVERAGE',
          key: 'id'
        }
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CATEGORY',
          key: 'id'
        }
      },
      travel_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      passenger_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('creada', 'reserva', 'reserva cancelada'),
        defaultValue: 'creada',
        allowNull: false,
      }
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.quotationModel = this.sequelizeClient.sequelize.define('QUOTATION', columns, options);
  }

  async getQuotes() {
    return await this.quotationModel.findAll({ raw: true });
  }

  async getQuotation(id) {
    return await this.quotationModel.findByPk(id);
  }

  async createQuotation(coverage) {
    const data = await this.quotationModel.create(coverage);
    return data.id;
  }

  async updateQuotation(coverage) {
    const options = { where: { id: coverage.id } };
    await this.quotationModel.update(coverage, options);
  }

  async deleteQuotation(id) {
    const options = { where: { id: id } };
    const deletedCount = await this.quotationModel.destroy(options);
    return deletedCount > 0;
  }

  async deleteAllQuotes() {
    if (this.test) {
      await this.quotationModel.destroy({ truncate: true });
    }
  }

  async dropQuotesTable() {
    if (this.test) {
      await this.quotationModel.drop();
    }
  }
}

module.exports = SequelizeQuotesRepository;
