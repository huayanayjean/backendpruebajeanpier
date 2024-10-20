const { DataTypes } = require('sequelize');

// Implementación del repositorio de lugares con Sequelize.
class SequelizeVehiclesRepository {

  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient;
    this.test = test;

    // Definición de la tabla Vehicles
    let tableName = "VEHICLE";
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
      identificador: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity_standard: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      capacity_premium: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Cambia a false si la categoría es obligatoria
        references: {
          model: 'categories', // Nombre de la tabla referenciada
          key: 'id',
        },
      },
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.vehicleModel = this.sequelizeClient.sequelize.define('VEHICLE', columns, options);
  }

  async getVehicles() {
    return await this.vehicleModel.findAll({ raw: true });
  }

  async getVehicle(id) {
    return await this.vehicleModel.findByPk(id);
  }

  async createVehicle(vehicle) {
    const data = await this.vehicleModel.create(vehicle);
    return data.id;
  }

  async updateVehicle(vehicle) {
    const options = { where: { id: vehicle.id } };
    await this.vehicleModel.update(vehicle, options);
  }

  async deleteVehicle(id) {
    const options = { where: { id: id } };
    const deletedCount = await this.vehicleModel.destroy(options);
    return deletedCount > 0;
  }

  async deleteAllVehicles() {
    if (this.test) {
      await this.vehicleModel.destroy({ truncate: true });
    }
  }

  async dropVehiclesTable() {
    if (this.test) {
      await this.vehicleModel.drop();
    }
  }
}

module.exports = SequelizeVehiclesRepository;
