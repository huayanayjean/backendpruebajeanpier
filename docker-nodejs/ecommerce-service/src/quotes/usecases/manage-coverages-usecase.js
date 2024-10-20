const Quotation = require('../entities/quotation');

// Casos de uso para el manejo de categorias.
// Contiene la lógica de negocio agnóstica a los frameworks.

class ManageQuotesUsecase {

  constructor(quotesRepository) {
    this.quotesRepository = quotesRepository;
  }

  async getQuotes() {
    return await this.quotesRepository.getQuotes();
  }

  async getQuotation(id) {
    return await this.quotesRepository.getQuotation(id);
  }

  async createQuotation(data) {
    const quotation = new Quotation(
      undefined,
      data.user_id,
      data.coverage_id,
      data.category_id,
      data.travel_date,
      data.passenger_count,
      data.status
    );

    const id = await this.quotesRepository.createQuotation(quotation);
    quotation.id = id;

    return quotation;
  }

  async updateQuotation(id, data) {
    const quotation = new Quotation(
      id,
      data.user_id,
      data.coverage_id,
      data.category_id,
      data.travel_date,
      data.passenger_count,
      data.status
    );

    await this.quotesRepository.updateQuotation(quotation);

    return quotation;
  }

  async deleteQuotation(id) {
    return await this.quotesRepository.deleteQuotation(id);
  }
}

module.exports = ManageQuotesUsecase;
