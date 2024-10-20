const Provider = require('../entities/provider');

// Casos de uso para el manejo de proveedores.
// Contiene la lógica de negocio agnóstica a los frameworks.

class ManageProvidersUsecase {
  
  constructor(providersRepository) {
    this.providersRepository = providersRepository;
  }

  async getProviders() {
    return await this.providersRepository.getProviders();
  }

  async getProvider(id) {
    return await this.providersRepository.getProvider(id);
  }

  async createProvider(data) {
    const provider = new Provider(
        undefined,
        data.name
    );
    const id = await this.providersRepository.createProvider(provider);
    provider.id = id;

    return provider;
  }


  async updateProvider(id, data) {
    const provider = new Provider(
        id,
        data.name
    );
    await this.providersRepository.updateProvider(provider);

    return provider;
  }

  async deleteProvider(id) {
    return await this.providersRepository.deleteProvider(id);
  }
}

module.exports = ManageProvidersUsecase;
