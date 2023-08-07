const mongoose = require('mongoose');

// Define the schema for your records
const Record = require('../models/record');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/nodejsredis', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const totalRecords = 15000000;
const batchSize = 1000;

// Function to generate an array of records
function generateRecords(start, end) {
    const records = [];
    for (let i = start; i < end; i++) {
        records.push({
            name: `Name_${i}`,
            index: i,
            address: `Address_${i}`
        });
    }
    return records;
}

async function insertBatch(start, end) {
    const records = generateRecords(start, end);
    await Record.insertMany(records);
    console.log(`Inserted records from ${start} to ${end}`);
}

async function insertAllRecords() {
    for (let start = 0; start < totalRecords; start += batchSize) {
        const end = Math.min(start + batchSize, totalRecords);
        await insertBatch(start, end);
    }
}

insertAllRecords()
    .then(() => {
        console.log('All records inserted successfully.');
        mongoose.connection.close();
    })
    .catch(err => console.error('Error:', err));
