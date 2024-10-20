const express = require('express');
const Vehicle = require('../entities/vehicle');
const validateSchema = require('../../frameworks/http/ajv');

// Router (endpoints) para la sección de lugares.
// Esta capa solo maneja las peticiones HTTP y delega la lógica de negocio.

function createVehiclesRouter(manageVehiclesUsecase) {
  const router = express.Router();

  router.get('/vehicles', async (req, res) => {
    const vehicles = await manageVehiclesUsecase.getVehicles();
    res.status(200).send(vehicles);
  });

  router.get('/vehicles/:id', async (req, res) => {
    const id = req.params.id;
    const vehicle = await manageVehiclesUsecase.getVehicle(id);
    if (vehicle) {
      res.status(200).send(vehicle);
    } else {
      res.status(404).send({ message: 'Vehicle not found' });
    }
  });

  router.post('/vehicles', async (req, res) => {
    try {
      const validation = validateSchema(Vehicle.schema, req);
      
      if (validation === true) {
        const vehicle = await manageVehiclesUsecase.createVehicle(req.body);
        res.status(201).send(vehicle);
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      console.error('error createVehicles: ', error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.put('/vehicles/:id', async (req, res) => {
    const validation = validateSchema(Vehicle.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const vehicle = await manageVehiclesUsecase.updateVehicle(id, req.body);
      if (vehicle) {
        res.status(200).send(vehicle);
      } else {
        res.status(404).send({ message: 'Vehicle not found' });
      }
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete('/vehicles/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await manageVehiclesUsecase.deleteVehicle(id);
    if (deleted) {
      res.status(200).send({ message: `Deleted vehicle ${id}` });
    } else {
      res.status(404).send({ message: 'Vehicles not found' });
    }
  });

  return router;
}

module.exports = createVehiclesRouter;