// Farmer: get all their crops
router.get('/farmer/crops', requireAuth(['farmer']), async (req, res) => {
  const crops = await Crop.find({ farmer: req.user.id }).sort({ createdAt: -1 });
  res.json({ crops });
});
import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

import Crop from '../models/Crop.js';
import { uploadToIPFS } from '../services/ipfs.js';
import { logSupplyChainEvent } from '../services/blockchain.js';

const router = express.Router();

// Farmer logs crop event (with image, geolocation, harvest details)
router.post('/farmer/crop', requireAuth(['farmer']), upload.single('image'), async (req, res) => {
  try {
    const { lat, lng, harvestDate, harvestMethod } = req.body;
    let imageUrl = '';
    if (req.file) {
      // Upload image buffer to IPFS
      imageUrl = await uploadToIPFS(req.file.buffer);
    }
    const crop = await Crop.create({
      farmer: req.user.id,
      imageUrl,
      location: { lat, lng },
      harvestDate,
      harvestMethod
    });
    // Log event on blockchain (use crop._id as batchId)
    try {
      await logSupplyChainEvent(
        'crop',
        crop._id.toString(),
        imageUrl,
        process.env.DEPLOYER_ADDRESS,
        process.env.DEPLOYER_PRIVATE_KEY
      );
    } catch (err) {
      // Blockchain log failed, but crop is saved
      console.error('Blockchain log failed:', err);
    }
    res.json({ message: 'Crop registered', crop });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

import ProcessEvent from '../models/ProcessEvent.js';

// Processor logs process step
router.post('/processor/process', requireAuth(['processor']), upload.single('image'), async (req, res) => {
  try {
    const { crop, step, notes } = req.body;
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadToIPFS(req.file.buffer);
    }
    const event = await ProcessEvent.create({
      processor: req.user.id,
      crop,
      step,
      notes,
      imageUrl
    });
    // Log event on blockchain (use event._id as batchId)
    try {
      await logSupplyChainEvent(
        'process',
        event._id.toString(),
        imageUrl,
        process.env.DEPLOYER_ADDRESS,
        process.env.DEPLOYER_PRIVATE_KEY
      );
    } catch (err) {
      console.error('Blockchain log failed:', err);
    }
    res.json({ message: 'Process event logged', event });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Processor: get all their process events
router.get('/processor/events', requireAuth(['processor']), async (req, res) => {
  const events = await ProcessEvent.find({ processor: req.user.id }).sort({ timestamp: -1 });
  res.json({ events });
});


import LabEvent from '../models/LabEvent.js';

// Lab logs test result
router.post('/lab/test', requireAuth(['lab']), upload.single('report'), async (req, res) => {
  try {
    const { crop, result, certified } = req.body;
    let reportUrl = '';
    if (req.file) {
      reportUrl = await uploadToIPFS(req.file.buffer);
    }
    const event = await LabEvent.create({
      lab: req.user.id,
      crop,
      result,
      certified,
      reportUrl
    });
    // Log event on blockchain (use event._id as batchId)
    try {
      await logSupplyChainEvent(
        'lab',
        event._id.toString(),
        reportUrl,
        process.env.DEPLOYER_ADDRESS,
        process.env.DEPLOYER_PRIVATE_KEY
      );
    } catch (err) {
      console.error('Blockchain log failed:', err);
    }
    res.json({ message: 'Lab event logged', event });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Lab: get all their lab events
router.get('/lab/events', requireAuth(['lab']), async (req, res) => {
  const events = await LabEvent.find({ lab: req.user.id }).sort({ timestamp: -1 });
  res.json({ events });
});

import User from '../models/User.js';
import ProcessEvent from '../models/ProcessEvent.js';
import LabEvent from '../models/LabEvent.js';

// Consumer fetches traceability
router.get('/consumer/trace/:batchId', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.batchId);
    if (!crop) return res.json({ error: 'Batch not found' });
    const farmer = await User.findById(crop.farmer);
    const processes = await ProcessEvent.find({ crop: crop._id }).sort({ timestamp: 1 });
    const labs = await LabEvent.find({ crop: crop._id }).sort({ timestamp: 1 });
    // Simple trust score: +1 for each certified lab, -1 for missing lab, +1 for each process step
    let trustScore = 0;
    trustScore += labs.filter(l => l.certified).length;
    trustScore -= labs.length === 0 ? 1 : 0;
    trustScore += processes.length;
    res.json({ crop, farmer, processes, labs, trustScore });
  } catch (e) {
    res.json({ error: e.message });
  }
});

export default router;
