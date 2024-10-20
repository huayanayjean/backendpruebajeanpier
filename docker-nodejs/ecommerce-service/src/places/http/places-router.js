const express = require('express');
const Place = require('../entities/place');
const validateSchema = require('../../frameworks/http/ajv');

// Router (endpoints) para la sección de lugares.
// Esta capa solo maneja las peticiones HTTP y delega la lógica de negocio.

function createPlacesRouter(managePlacesUsecase) {
  const router = express.Router();

  router.get('/places', async (req, res) => {
    console.log("GET /places endpoint hit");
    const places = await managePlacesUsecase.getPlaces();
    console.log("places: ", places);
    res.status(200).send(places);
  });

  router.get('/places/:id', async (req, res) => {
    const id = req.params.id;
    const place = await managePlacesUsecase.getPlace(id);
    if (place) {
      res.status(200).send(place);
    } else {
      res.status(404).send({ message: 'Place not found' });
    }
  });

  router.post('/places', async (req, res) => {
    try {
      const validation = validateSchema(Place.schema, req);
      
      if (validation === true) {
        const place = await managePlacesUsecase.createPlace(req.body);
        res.status(201).send(place);
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      console.error('error createPlace: ', error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.put('/places/:id', async (req, res) => {
    const validation = validateSchema(Place.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const place = await managePlacesUsecase.updatePlace(id, req.body);
      if (place) {
        res.status(200).send(place);
      } else {
        res.status(404).send({ message: 'Place not found' });
      }
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete('/places/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await managePlacesUsecase.deletePlace(id);
    if (deleted) {
      res.status(200).send({ message: `Deleted place ${id}` });
    } else {
      res.status(404).send({ message: 'Place not found' });
    }
  });

  return router;
}

module.exports = createPlacesRouter;