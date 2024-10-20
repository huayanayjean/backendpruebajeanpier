const express = require('express');
const appRoot = require('app-root-path');
const Provider = require('../entities/provider');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");


// Router (endpoints) para la sección de lugares.
// Esta capa solo maneja las peticiones HTTP y delega la lógica de negocio.

function createProvidersRouter(manageProvidersUsecase) {
  const router = express.Router();

  router.get('/providers', async (req, res) => {
    const providers = await manageProvidersUsecase.getProviders();
    res.status(200).send(providers);
  });

  router.get('/providers/:id', async (req, res) => {
    const id = req.params.id;
    const provider = await manageProvidersUsecase.getProvider(id);
    if (provider) {
      res.status(200).send(provider);
    } else {
      res.status(404).send({ message: 'Provider not found' });
    }
  });

  router.post('/providers', async (req, res) => {
    try {
      const validation = validateSchema(Provider.schema, req);
      
      if (validation === true) {
        const provider = await manageProvidersUsecase.createProvider(req.body);
        res.status(201).send(provider);
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      console.error('error createprovider: ', error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.put('/providers/:id', async (req, res) => {
    const validation = validateSchema(Provider.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const provider = await manageProvidersUsecase.updateProvider(id, req.body);
      if (provider) {
        res.status(200).send(provider);
      } else {
        res.status(404).send({ message: 'Provider not found' });
      }
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete('/providers/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await manageProvidersUsecase.deleteProvider(id);
    if (deleted) {
      res.status(200).send({ message: `Deleted provider ${id}` });
    } else {
      res.status(404).send({ message: 'Provider not found' });
    }
  });

  return router;
}

module.exports = createProvidersRouter;