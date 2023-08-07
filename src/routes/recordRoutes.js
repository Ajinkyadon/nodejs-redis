// routes/recordRoutes.js
const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

// Create a new record
router.post('/', recordController.createRecord);

// Read all records
router.get('/', recordController.getAllRecords);

//read single record
router.get('/:index', recordController.getRecord);

// Update a record
router.put('/:recordId', recordController.updateRecord);

// Delete a record
router.delete('/:recordId', recordController.deleteRecord);

module.exports = router;
