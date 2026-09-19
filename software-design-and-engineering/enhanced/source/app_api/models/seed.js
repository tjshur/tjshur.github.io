const fs = require('fs');
const mongoose = require('./db');
const Trip = require('./travlr');

const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
    console.log('Database seeded successfully');
};

mongoose.connection.once('connected', async () => {
    try {
        await seedDB();
    } catch (err) {
        console.log('Seed error:', err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
});