const Place = require('../entities/place');

// Casos de uso para el manejo de lugares.
// Contiene la lógica de negocio agnóstica a los frameworks.

class ManagePlacesUsecase {
  
  constructor(placesRepository) {
    this.placesRepository = placesRepository;
  }

  async getPlaces() {
    return await this.placesRepository.getPlaces();
  }

  async getPlace(id) {
    return await this.placesRepository.getPlace(id);
  }

  async createPlace(data) {
    const place = new Place(undefined, data.name);
    const id = await this.placesRepository.createPlace(place);
    place.id = id;

    return place;
  }

  async updatePlace(id, data) {
    const place = new Place(id, data.name, data.email);
    await this.placesRepository.updatePlace(place);

    return place;
  }

  async deletePlace(id) {
    return await this.placesRepository.deletePlace(id);
  }
}

module.exports = ManagePlacesUsecase;
