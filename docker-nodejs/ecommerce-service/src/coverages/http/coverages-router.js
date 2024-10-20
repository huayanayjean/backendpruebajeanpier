const express = require('express');
const appRoot = require('app-root-path');
const Coverage = require('../entities/coverage');
const validateSchema = require(appRoot + "/src/frameworks/http/ajv");

// Router (endpoints) para la sección de coberturas.
// Esta capa solo maneja las peticiones HTTP y delega la lógica de negocio.

function createCoveragesRouter(manageCoveragesUsecase) {
  const router = express.Router();

  router.get('/coverages', async (req, res) => {
    const coverages = await manageCoveragesUsecase.getCoverages();
    res.status(200).send(coverages);
  });

  router.get('/coverages/:id', async (req, res) => {
    const id = req.params.id;
    const coverage = await manageCoveragesUsecase.getCoverage(id);
    if (coverage) {
      res.status(200).send(coverage);
    } else {
      res.status(404).send({ message: 'Coverage not found' });
    }
  });

  router.post('/coverages', async (req, res) => {
    try {
      const validation = validateSchema(Coverage.schema, req);
      
      if (validation === true) {
        const coverage = await manageCoveragesUsecase.createCoverage(req.body);
        res.status(201).send(coverage);
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      console.error('error createCoverage: ', error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.put('/coverages/:id', async (req, res) => {
    const validation = validateSchema(Coverage.schema, req);

    if (validation === true) {
      const id = req.params.id;
      console.log('req: ', req.body);
      console.log('req id: ', id);
      const coverage = await manageCoveragesUsecase.updateCoverage(id, req.body);
      console.log('coverage put: ', coverage);
      if (coverage) {
        res.status(200).send(coverage);
      } else {
        res.status(404).send({ message: 'Coverage not found' });
      }
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete('/coverages/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await manageCoveragesUsecase.deleteCoverage(id);

    if (deleted) {
      res.status(200).send({ message: `Deleted coverage ${id}` });
    } else {
      res.status(404).send({ message: 'Coverage not found' });
    }
  });

  return router;
}

module.exports = createCoveragesRouter;