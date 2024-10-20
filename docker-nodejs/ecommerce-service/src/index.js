const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

const createBooksRouter = require('./books/http/books-router');
const createUsersRouter = require('./users/http/users-router');
const createPlacesRouter = require('./places/http/places-router');
const createVehiclesRouter = require('./vehicles/http/vehicles-router');
const createCategoriesRouter = require('./categories/http/categories-router');
const createProvidersRouter = require('./providers/http/providers-router');
const createCoveragesRouter = require('./coverages/http/coverages-router');
const createPricesRouter = require('./prices/http/prices-router');
const createQuotesRouter = require('./quotes/http/coverages-router');

const ManageBooksUsecase = require('./books/usecases/manage-books-usecase');
const ManageUsersUsecase = require('./users/usecases/manage-users-usecase');
const ManagePlacesUsecase = require('./places/usecases/manage-places-usecase');
const ManageVehiclesUsecase = require('./vehicles/usecases/manage-vehicles-usecase');
const ManageCategoriesUsecase = require('./categories/usecases/manage-categories-usecase');
const ManageProvidersUseCase = require('./providers/usecases/manage-providers-usecase');
const ManageCoveragesUseCase = require('./coverages/usecases/manage-coverages-usecase');
const ManagePricesUseCase = require('./prices/usecases/manage-prices-usecase')
const ManageQuotesUseCase = require('./quotes/usecases/manage-coverages-usecase');

const SequelizeBooksRepository = require('./books/repositories/sequelize-books-repository');
const SequelizeUsersRepository = require('./users/repositories/sequelize-users-repository');
const SequelizePlacesRepository = require('./places/repositories/sequelize-places-repository');
const SequelizeVehiclesRepository = require('./vehicles/repositories/sequelize-vehicles-repository');
const SequelizeCategoriesRepository = require('./categories/repositories/sequelize-categories-repository');
const SequelizeProvidersRepository = require('./providers/repositories/sequelize-providers-repository');
const SequelizeCoveragesRepository = require('./coverages/repositories/sequelize-coverages-repository');
const SequelizePricesRepository = require('./prices/repositories/sequelize-prices-repository');
const SequelizeQuotesRepository = require('./quotes/repositories/sequelize-coverages-repository');

const sequelizeClient = new SequelizeClient();
sequelizeClient.connect();
const sequelizeBooksRepository = new SequelizeBooksRepository(sequelizeClient);
const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const sequelizePlacesRepository = new SequelizePlacesRepository(sequelizeClient);
const sequelizeVehiclesRepository = new SequelizeVehiclesRepository(sequelizeClient);
const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
const sequelizeProvidersRepository = new SequelizeProvidersRepository(sequelizeClient);
const sequelizeCoveragesRepository = new SequelizeCoveragesRepository(sequelizeClient);
const sequelizePricesRepository = new SequelizePricesRepository(sequelizeClient);
const sequelizeQuotesRepository = new SequelizeQuotesRepository(sequelizeClient);
sequelizeClient.syncDatabase();

const manageBooksUsecase = new ManageBooksUsecase(sequelizeBooksRepository);
const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository);
const managePlacesUsecase = new ManagePlacesUsecase(sequelizePlacesRepository);
const manageVehiclesUsecase = new ManageVehiclesUsecase(sequelizeVehiclesRepository);
const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);
const manageProvidersUsecase = new ManageProvidersUseCase(sequelizeProvidersRepository);
const manageCoveragesUseCase = new ManageCoveragesUseCase(sequelizeCoveragesRepository);
const managePricesUseCase = new ManagePricesUseCase(sequelizePricesRepository);
const manageQuotesUseCase = new ManageQuotesUseCase(sequelizeQuotesRepository);

let routers = [
  createBooksRouter(manageBooksUsecase, '/api'),
  createUsersRouter(manageUsersUsecase, '/api'),
  createPlacesRouter(managePlacesUsecase, '/api'),
  createVehiclesRouter(manageVehiclesUsecase, '/api'),
  createCategoriesRouter(manageCategoriesUsecase, '/api'),
  createProvidersRouter(manageProvidersUsecase, '/api'),
  createCoveragesRouter(manageCoveragesUseCase, '/api'),
  createPricesRouter(managePricesUseCase, '/api'),
  createQuotesRouter(manageQuotesUseCase, '/api'),
];
  
// Crear aplicación Express con dependencias inyectadas.

const app = createExpressApp(routers);