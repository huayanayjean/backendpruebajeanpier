const Vehicle = require('../entities/vehicle');

// Casos de uso para el manejo de lugares.
// Contiene la lógica de negocio agnóstica a los frameworks.

class ManageVehiclesUsecase {
  
  constructor(vehiclesRepository) {
    this.vehiclesRepository = vehiclesRepository;
  }

  async getVehicles() {
    return await this.vehiclesRepository.getVehicles();
  }

  async getVehicle(id) {
    return await this.vehiclesRepository.getVehicle(id);
  }

  async createVehicle(data) {
    const vehicle = new Vehicle(
        undefined,
        data.name,
        data.identificador,
        data.capacity_standard,
        data.capacity_premium,
        data.category_id
    );
    const id = await this.vehiclesRepository.createVehicle(vehicle);
    vehicle.id = id;

    return vehicle;
  }


  async updateVehicle(id, data) {
    const vehicle = new Vehicle(
        id,
        data.name,
        data.identificador,
        data.capacity_standard,
        data.capacity_premium,
        data.category_id
    );
    await this.vehiclesRepository.updateVehicle(vehicle);

    return vehicle;
  }

  async deleteVehicle(id) {
    return await this.vehiclesRepository.deleteVehicle(id);
  }
}

module.exports = ManageVehiclesUsecase;
