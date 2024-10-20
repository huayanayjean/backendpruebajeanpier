const express = require('express');
const Category = require('../entities/category');
const validateSchema = require('../../frameworks/http/ajv');

// Router (endpoints) para la sección de lugares.
// Esta capa solo maneja las peticiones HTTP y delega la lógica de negocio.

function createCategoriesRouter(manageCategoriesUsecase) {
  const router = express.Router();

  router.get('/categories', async (req, res) => {
    const categories = await manageCategoriesUsecase.getCategories();
    res.status(200).send(categories);
  });

  router.get('/categories/:id', async (req, res) => {
    const id = req.params.id;
    const category = await manageCategoriesUsecase.getCategory(id);
    if (category) {
      res.status(200).send(category);
    } else {
      res.status(404).send({ message: 'Category not found' });
    }
  });

  router.post('/categories', async (req, res) => {
    try {
      const validation = validateSchema(Category.schema, req);
      
      if (validation === true) {
        const category = await manageCategoriesUsecase.createCategory(req.body);
        res.status(201).send(category);
      } else {
        res.status(422).send(validation);
      }
    } catch (error) {
      console.error('error createCategories: ', error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

  router.put('/categories/:id', async (req, res) => {
    const validation = validateSchema(Category.schema, req);

    if (validation === true) {
      const id = req.params.id;
      const category = await manageCategoriesUsecase.updateCategory(id, req.body);
      if (category) {
        res.status(200).send(category);
      } else {
        res.status(404).send({ message: 'Category not found' });
      }
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete('/categories/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await manageCategoriesUsecase.deleteCategory(id);

    if (deleted) {
      res.status(200).send({ message: `Deleted category ${id}` });
    } else {
      res.status(404).send({ message: 'Category not found' });
    }
  });

  return router;
}

module.exports = createCategoriesRouter;