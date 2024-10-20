const Price = require('../entities/price');

// Casos de uso para el manejo de lugares.
// Contiene la lógica de negocio agnóstica a los frameworks.

class ManagePricesUsecase {

  constructor(pricesRepository) {
    this.pricesRepository = pricesRepository;
  }

  async getPrices() {
    return await this.pricesRepository.getPrices();
  }

  async getPrice(id) {
    return await this.pricesRepository.getPrice(id);
  }

  async createPrice(data) {
    console.log('data createPrice: ', data);
    const price = new Price(
      undefined,
      data.coverage_id,
      data.valid_from,
      data.valid_to,
      data.amount
  );

    const id = await this.pricesRepository.createPrice(price);
    price.id = id;

    return price;
  }

  async updatePrice(id, data) {
    console.log('data updatePrice: ', data);
    const price = new Price(
      id,
      data.coverage_id,
      data.valid_from,
      data.valid_to,
      data.amount
    );

    await this.pricesRepository.updatePrice(price);

    return price;
  }

  async deletePrice(id) {
    return await this.pricesRepository.deletePrice(id);
  }
}

module.exports = ManagePricesUsecase;
