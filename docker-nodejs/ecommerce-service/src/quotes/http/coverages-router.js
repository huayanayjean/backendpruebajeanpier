const express = require('express');
const appRoot = require('app-root-path');
const Quotation = require('../entities/quotation');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

// Router (endpoints) para la sección de coberturas.
// Esta capa solo maneja las peticiones HTTP y delega la lógica de negocio.

function createQuotationRouter(manageQuotesUsecase) {
  const router = express.Router();

  router.get('/quotes', async (req, res) => {
    const quotes = await manageQuotesUsecase.getQuotes();
    res.status(200).send(quotes);
  });

  router.get('/quotes/:id', async (req, res) => {
    const id = req.params.id;
    const quotation = await manageQuotesUsecase.getQuotation(id);
    if (quotation) {
      res.status(200).send(quotation);
    } else {
      res.status(404).send({ message: 'Quotation not found' });
    }
  });

  router.post('/quotes', async (req, res) => {
    try {
      const validation = validateSchema(Quotation.schema, req);
      
      if (validation === true) {
        const quotation = await manageQuotesUsecase.createQuotation(req.body);
        res.status(201).send(quotation);
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      console.error('error createQuotation: ', error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.put('/quotes/:id', async (req, res) => {
    const validation = validateSchema(Quotation.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const quotation = await manageQuotesUsecase.updateQuotation(id, req.body);
      if (quotation) {
        res.status(200).send(quotation);
      } else {
        res.status(404).send({ message: 'Quotation not found' });
      }
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete('/quotes/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await manageQuotesUsecase.deleteQuotation(id);

    if (deleted) {
      res.status(200).send({ message: `Deleted quotation ${id}` });
    } else {
      res.status(404).send({ message: 'Quotation not found' });
    }
  });

  return router;
}

module.exports = createQuotationRouter;