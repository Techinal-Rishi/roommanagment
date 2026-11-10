const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Inquiry = require('../models/Inquiry');
const Room = require('../models/Room');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Send an inquiry for a room using POST: "/api/inquiries/addinquiry/:roomId"
router.post('/addinquiry/:roomId', fetchuser, [
    body('contactNumber', 'Please enter a valid 10-digit phone number').isLength({ min: 10, max: 10 }),
    body('message', 'Message cannot exceed 500 characters').isLength({ max: 500 })
], async (req, res) => {
    try {
        const { contactNumber, message } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if the room exists
        const room = await Room.findById(req.params.roomId);
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Create inquiry
        const inquiry = new Inquiry({
            room: req.params.roomId,
            tenant: req.user.id,
            contactNumber,
            message
        });

        const savedInquiry = await inquiry.save();
        res.json(savedInquiry);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 2: Get all inquiries for a specific room using GET: "/api/inquiries/getroominquiries/:roomId"
// (Ideally used by the room owner to see who inquired about their room)
router.get('/getroominquiries/:roomId', fetchuser, async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        // Optional: Check if the logged-in user owns the room
        if (room.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not allowed to view these inquiries" });
        }

        const inquiries = await Inquiry.find({ room: req.params.roomId }).populate('tenant', 'name email');
        res.json(inquiries);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 3: Delete/Cancel an inquiry using DELETE: "/api/inquiries/deleteinquiry/:id"
router.delete('/deleteinquiry/:id', fetchuser, async (req, res) => {
    try {
        let inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ error: "Inquiry not found" });
        }

        // Allow deletion only if the logged-in user is the tenant who created it
        if (inquiry.tenant.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not Allowed" });
        }

        inquiry = await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ success: "Inquiry has been deleted", inquiry });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;