// controllers/productController.js
const Record = require('../models/record');
const redisModule = require('../customModule/redis');

// Create a new records
const createRecord = async (req, res) => {
  console.log("here 2");
  try {
    const { name, index, address } = req.body;
    console.log("here5");
    const record = new Record({
      name,
      index,
      address
    });
    console.log("here3");
    const savedRecord = await record.save();
    console.log("here4");
    res.json(savedRecord);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new record' });
  }
};

// Read all records
const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: 'Failed to retrieve records' });
  }
};

// Read all records
const getRecord = async (req, res) => {
  try {
    await redisModule.get(req.params.index).then(async record => {
      if (record) {
        res.json(record);
      } else {
        const records = await Record.find({ index: req.params.index });
        if (records) {
          redisModule.set(req.params.index, records);
        }

        res.json(records);
      }
    }).catch(error => {
      console.log("something went wrong");
      res.json(error);
      return;
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve records' });
  }
};

// Update a record
const updateRecord = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.productId,
      { name, price, description, category },
      { new: true }
    );
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the record' });
  }
};

// Delete a record
const deleteRecord = async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.productId);
    res.json(deletedRecord);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the record' });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  getRecord,
  updateRecord,
  deleteRecord,
};
