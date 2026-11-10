const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Room = require('../models/Room');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all Rooms (Public or Login required depending on your preference)
router.get('/fetchallrooms', async (req, res) => {
    try {
        const rooms = await Room.find(); // Fetches all rooms so everyone can see them
        res.json(rooms);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

// ROUTE 2: Add a new Room
router.post('/addroom', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
    body('contact', 'Enter a valid contact number').isLength({ min: 10, max: 10 }),
    body('place', 'Enter a valid place').isLength({ min: 3 }),
], async (req, res) => {
    try {
        const { title, description, contact, place } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Use lowercase 'room' for the instance to avoid shadowing the 'Room' model
        const room = new Room({
            title, description, contact, place, user: req.user.id
        });

        const savedRoom = await room.save();
        res.json(savedRoom);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: error.message });
    }
});

// ROUTE 3: Update an existing Room
router.put('/updateroom/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, contact, place } = req.body;

        // Use correct capitalization: newRoom
        const newRoom = {};
        if (title) { newRoom.title = title; }
        if (description) { newRoom.description = description; }
        if (contact) { newRoom.contact = contact; }
        if (place) { newRoom.place = place; }

        // Find the room to be updated using the model, keeping instance in a different variable name
        let roomDoc = await Room.findById(req.params.id);
        if (!roomDoc) {
            return res.status(404).send("Not Found");
        }

        if (roomDoc.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: newRoom }, { new: true });
        res.json({ updatedRoom });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 4: Delete an existing Room
router.delete('/deleteRoom/:id', fetchuser, async (req, res) => {
    try {
        let roomDoc = await Room.findById(req.params.id);
        if (!roomDoc) {
            return res.status(404).send("Not Found");
        }

        if (roomDoc.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        const deletedRoom = await Room.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Room has been deleted!!", room: deletedRoom });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;