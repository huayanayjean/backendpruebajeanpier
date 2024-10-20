const express = require('express');
const appRoot = require('app-root-path');
const Price = require('../entities/price');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

// Router (endpoints) para la sección de lugares.
// Esta capa solo maneja las peticiones HTTP y delega la lógica de negocio.

function createPricesRouter(managePricesUsecase) {
  const router = express.Router();

  router.get('/prices', async (req, res) => {
    const prices = await managePricesUsecase.getPrices();
    res.status(200).send(prices);
  });

  router.get('/prices/:id', async (req, res) => {
    const id = req.params.id;
    const price = await managePricesUsecase.getPrice(id);
    if (price) {
      res.status(200).send(price);
    } else {
      res.status(404).send({ message: 'Price not found' });
    }
  });

  router.post('/prices', async (req, res) => {
    try {
      console.log('req jpe body: ', req.body);
      const validation = validateSchema(Price.schema, req);
      console.log('validation jpe: ', validation);
      if (validation === true) {
        console.log('req.body: ', req.body);
        const price = await managePricesUsecase.createPrice(req.body);
        res.status(201).send(price);
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      console.error('error createPrice: ', error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.put('/prices/:id', async (req, res) => {
    const validation = validateSchema(Price.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const price = await managePricesUsecase.updatePrice(id, req.body);
      if (price) {
        res.status(200).send(price);
      } else {
        res.status(404).send({ message: 'Price not found' });
      }
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete('/prices/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await managePricesUsecase.deletePrice(id);

    if (deleted) {
      res.status(200).send({ message: `Deleted price ${id}` });
    } else {
      res.status(404).send({ message: 'Price not found' });
    }
  });

  return router;
}

module.exports = createPricesRouter;