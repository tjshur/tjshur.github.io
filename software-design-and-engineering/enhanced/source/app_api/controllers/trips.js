const Trip = require('../models/travlr');

// GET: /api/trips - lists all trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();

        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }

        return res.status(200).json(trips);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// GET: /api/trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const tripCode = req.params.tripCode;

        if (!tripCode) {
            return res.status(400).json({ message: 'Trip code is required' });
        }

        const trip = await Trip.find({ code: tripCode }).exec();

        if (!trip || trip.length === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(trip);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// POST: /api/trips - adds a new trip
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = await Trip.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        return res.status(201).json(newTrip);
    } catch (err) {
        return res.status(400).json(err);
    }
};

// PUT: /api/trips/:tripCode - updates an existing trip
const tripsUpdateTrip = async (req, res) => {
    try {
        const tripCode = req.params.tripCode;

        if (!tripCode) {
            return res.status(400).json({ message: 'Trip code is required' });
        }

        const updatedTrip = await Trip.findOneAndUpdate(
            { code: tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true, runValidators: true }
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(updatedTrip);
    } catch (err) {
        return res.status(400).json(err);
    }
};

// DELETE: /api/trips/:tripCode - deletes an existing trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const tripCode = req.params.tripCode;

        if (!tripCode) {
            return res.status(400).json({ message: 'Trip code is required' });
        }

        const deletedTrip = await Trip.findOneAndDelete({ code: tripCode }).exec();

        if (!deletedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json({
            message: 'Trip deleted successfully',
            deletedTrip
        });
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};