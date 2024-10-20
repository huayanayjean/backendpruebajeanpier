const { DataTypes } = require('sequelize');

// Implementación del repositorio de lugares con Sequelize.
class SequelizeCategoriesRepository {

  constructor(sequelizeClient, test = false) {
    this.sequelizeClient = sequelizeClient;
    this.test = test;

    // Definición de la tabla Categories
    let tableName = "CATEGORY";
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

    this.categoryModel = this.sequelizeClient.sequelize.define('CATEGORY', columns, options);
  }

  async getCategories() {
    return await this.categoryModel.findAll({ raw: true });
  }

  async getCategory(id) {
    return await this.categoryModel.findByPk(id);
  }

  async createCategory(category) {
    const data = await this.categoryModel.create(category);
    return data.id;
  }

  async updateCategory(category) {
    const options = { where: { id: category.id } };
    await this.categoryModel.update(category, options);
  }

  async deleteCategory(id) {
    const options = { where: { id: id } };
    const deletedCount = await this.categoryModel.destroy(options);
    return deletedCount > 0;
  }

  async deleteAllCategories() {
    if (this.test) {
      await this.categoryModel.destroy({ truncate: true });
    }
  }

  async dropCategoriesTable() {
    if (this.test) {
      await this.categoryModel.drop();
    }
  }
}

module.exports = SequelizeCategoriesRepository;
