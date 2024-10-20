const User = require('../entities/user');

// Casos de uso para el manejo de usuarios.
// Contiene la lógica de negocio agnóstica a los frameworks.

class ManageUsersUsecase {
  
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async getUsers() {
    console.log("Fetching users from repository...");
    return await this.usersRepository.getUsers();
  }

  async getUser(id) {
    return await this.usersRepository.getUser(id);
  }

  async createUser(data) {
    const user = new User(undefined, data.name, data.email);
    const id = await this.usersRepository.createUser(user);
    user.id = id;

    return user;
  }

  async updateUser(id, data) {
    const user = new User(id, data.name, data.email);
    await this.usersRepository.updateUser(user);

    return user;
  }

  async deleteUser(id) {
    return await this.usersRepository.deleteUser(id);
  }
}

module.exports = ManageUsersUsecase;
