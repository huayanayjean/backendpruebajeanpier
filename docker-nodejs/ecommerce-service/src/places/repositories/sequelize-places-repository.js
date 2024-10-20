const { DataTypes } = require('sequelize');

// Implementación del repositorio de lugares con Sequelize.
class SequelizePlacesRepository {

  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient;
    this.test = test;

    // Definición de la tabla Places
    let tableName = "PLACES";
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

    this.placeModel = this.sequelizeClient.sequelize.define('PLACES', columns, options);
  }

  async getPlaces() {
    return await this.placeModel.findAll({ raw: true });
  }

  async getPlace(id) {
    return await this.placeModel.findByPk(id);
  }

  async createPlace(place) {
    const data = await this.placeModel.create(place);
    return data.id;
  }

  async updatePlace(place) {
    const options = { where: { id: place.id } };
    await this.placeModel.update(place, options);
  }

  async deletePlace(id) {
    const options = { where: { id: id } };
    const deletedCount = await this.placeModel.destroy(options);
    return deletedCount > 0;
  }

  async deleteAllPlaces() {
    if (this.test) {
      await this.placeModel.destroy({ truncate: true });
    }
  }

  async dropPlacesTable() {
    if (this.test) {
      await this.placeModel.drop();
    }
  }
}

module.exports = SequelizePlacesRepository;
