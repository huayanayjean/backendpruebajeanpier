const { Sequelize } = require('sequelize');

// Conexión a una base de datos SQL por medio del ORM 
// Es agnóstico a la base de datos misma (MySQL, Postgres, etc).

class SequelizeClient {

  constructor() {

    // Obtener datos desde variables de entorno.

    const dialect = process.env.SEQUELIZE_DIALECT;
    const username = process.env.SEQUELIZE_USERNAME;
    const password = process.env.SEQUELIZE_PASSWORD;
    const database = process.env.SEQUELIZE_DATABASE;
    const port = process.env.SEQUELIZE_PORT;

    // Obtener el host o el socket. Sólo se usa uno de los dos para la conexión.
    // El socket es útil para conectarse con una base de datos en GCP.

    const host = process.env.SEQUELIZE_HOST;
    const socket = process.env.SEQUELIZE_SOCKET;

    let socketPath = undefined;

    if (host === undefined && socket !== undefined) {
      socketPath = "/cloudsql/" + socket;
    }

    console.log('jotape: ', database);
    console.log('jotapeusername: ', username);
    console.log('jotapepassword: ', password);
    console.log('jotapeport: ', port);
    console.log('host: ', host);
    this.sequelize = new Sequelize(database, username, password, {
      dialect: dialect,
      host: host,
      port: port,
      dialectOptions: {
        socketPath: socketPath,
      },
      logging: false,
    });

  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  }

  syncDatabase() {

    // Crea las tablas que no existan en la base de datos en base a los modelos definidos.

    var syncOptions = {
      alter: false,
    };

    this.sequelize.sync(syncOptions)
      .catch(error => {
        console.log("Couldn't sync database", error);
      });

  }

}

module.exports = SequelizeClient;