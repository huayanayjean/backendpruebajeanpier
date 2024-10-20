const express = require('express');
const User = require('../entities/user');
const validateSchema = require('../../frameworks/http/ajv');

// Router (endpoints) para la sección de usuarios.
// Esta capa solo maneja las peticiones HTTP y delega la lógica de negocio.

function createUsersRouter(manageUsersUsecase) {
  const router = express.Router();

  router.get('/users', async (req, res) => {
    const users = await manageUsersUsecase.getUsers();
    res.status(200).send(users);
  });

  router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await manageUsersUsecase.getUser(id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });

  router.post('/users', async (req, res) => {
    try {
      const validation = validateSchema(User.schema, req);
      
      if (validation === true) {
        const user = await manageUsersUsecase.createUser(req.body);
        res.status(201).send(user);
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      console.error('error createUser: ', error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.put('/users/:id', async (req, res) => {
    const validation = validateSchema(User.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const user = await manageUsersUsecase.updateUser(id, req.body);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await manageUsersUsecase.deleteUser(id);
    console.log('deleted: ', deleted);
    if (deleted) {
      res.status(200).send({ message: `Deleted user ${id}` });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });

  return router;
}

module.exports = createUsersRouter;