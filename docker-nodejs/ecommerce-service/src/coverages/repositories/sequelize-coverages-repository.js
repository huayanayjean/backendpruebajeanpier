const { DataTypes } = require('sequelize');

// Implementación del repositorio de lugares con Sequelize.
class SequelizeCoveragesRepository {

  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient;
    this.test = test;

    // Definición de la tabla Categories
    let tableName = "COVERAGE";
    if (test) {
      tableName += "_test";
    }

    const columns = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      origin_place_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'places', // Nombre de la tabla de referencia
          key: 'id'
        }
      },
      destination_place_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'places',
          key: 'id'
        }
      },
      provider_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'providers',
          key: 'id'
        }
      },
      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'vehicles',
          key: 'id'
        }
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration_hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.coverageModel = this.sequelizeClient.sequelize.define('COVERAGE', columns, options);
  }

  async getCoverages() {
    return await this.coverageModel.findAll({ raw: true });
  }

  async getCoverage(id) {
    return await this.coverageModel.findByPk(id);
  }

  async createCoverage(coverage) {
    const data = await this.coverageModel.create(coverage);
    return data.id;
  }

  async updateCoverage(coverage) {
    const options = { where: { id: coverage.id } };
    await this.coverageModel.update(coverage, options);
  }

  async deleteCoverage(id) {
    const options = { where: { id: id } };
    const deletedCount = await this.coverageModel.destroy(options);
    return deletedCount > 0;
  }

  async deleteAllCoverages() {
    if (this.test) {
      await this.coverageModel.destroy({ truncate: true });
    }
  }

  async dropCoveragesTable() {
    if (this.test) {
      await this.coverageModel.drop();
    }
  }
}

module.exports = SequelizeCoveragesRepository;
