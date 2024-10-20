const Coverage = require('../entities/coverage');

// Casos de uso para el manejo de categorias.
// Contiene la lógica de negocio agnóstica a los frameworks.

class ManageCoveragesUsecase {
  
  constructor(coveragesRepository) {
    this.coveragesRepository = coveragesRepository;
  }

  async getCoverages() {
    return await this.coveragesRepository.getCoverages();
  }

  async getCoverage(id) {
    return await this.coveragesRepository.getCoverage(id);
  }

  async createCoverage(data) {
    const coverage = new Coverage(
        undefined,
        data.origin_place_id,
        data.destination_place_id,
        data.provider_id,
        data.vehicle_id,
        data.start_time,
        data.duration_hours
    );

    const id = await this.coveragesRepository.createCoverage(coverage);
    coverage.id = id;

    return coverage;
  }

  async updateCoverage(id, data) {
    const coverage = new Coverage(
      id,
      data.origin_place_id, 
      data.destination_place_id,
      data.provider_id,
      data.vehicle_id,
      data.start_time,
      data.duration_hours
  );
    await this.coveragesRepository.updateCoverage(coverage);

    return coverage;
  }

  async deleteCoverage(id) {
    return await this.coveragesRepository.deleteCoverage(id);
  }
}

module.exports = ManageCoveragesUsecase;
