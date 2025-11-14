import express from 'express';
import Garage from '../models/Garage.js';
import Car from '../models/Car.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/garage
// @desc    Get user's garage
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let garage = await Garage.findOne({ user: req.user._id });

    if (!garage) {
      garage = await Garage.create({ user: req.user._id });
    }

    await garage.populate([
      { path: 'savedCars.car' },
      { path: 'watchlist.car' },
      { path: 'myCars.car' },
    ]);

    res.json(garage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/garage/saved
// @desc    Add car to saved
// @access  Private
router.post('/saved', protect, async (req, res) => {
  try {
    let garage = await Garage.findOne({ user: req.user._id });

    if (!garage) {
      garage = await Garage.create({ user: req.user._id });
    }

    const { carId } = req.body;

    // Check if already saved
    const exists = garage.savedCars.some(
      (item) => item.car.toString() === carId
    );

    if (exists) {
      return res.status(400).json({ message: 'Car already saved' });
    }

    garage.savedCars.push({ car: carId });
    await garage.save();

    // Also update car's savedBy array
    await Car.findByIdAndUpdate(carId, {
      $addToSet: { savedBy: req.user._id },
    });

    await garage.populate('savedCars.car');
    res.json(garage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/garage/saved/:carId
// @desc    Remove car from saved
// @access  Private
router.delete('/saved/:carId', protect, async (req, res) => {
  try {
    const garage = await Garage.findOne({ user: req.user._id });

    if (!garage) {
      return res.status(404).json({ message: 'Garage not found' });
    }

    garage.savedCars = garage.savedCars.filter(
      (item) => item.car.toString() !== req.params.carId
    );
    await garage.save();

    // Also update car's savedBy array
    await Car.findByIdAndUpdate(req.params.carId, {
      $pull: { savedBy: req.user._id },
    });

    res.json({ message: 'Car removed from saved' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/garage/watchlist
// @desc    Add car to watchlist
// @access  Private
router.post('/watchlist', protect, async (req, res) => {
  try {
    let garage = await Garage.findOne({ user: req.user._id });

    if (!garage) {
      garage = await Garage.create({ user: req.user._id });
    }

    const { carId, originalPrice } = req.body;

    // Check if already in watchlist
    const exists = garage.watchlist.some(
      (item) => item.car.toString() === carId
    );

    if (exists) {
      return res.status(400).json({ message: 'Car already in watchlist' });
    }

    const car = await Car.findById(carId);
    garage.watchlist.push({
      car: carId,
      originalPrice: originalPrice || car.price,
    });
    await garage.save();

    await garage.populate('watchlist.car');
    res.json(garage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/garage/watchlist/:carId
// @desc    Remove car from watchlist
// @access  Private
router.delete('/watchlist/:carId', protect, async (req, res) => {
  try {
    const garage = await Garage.findOne({ user: req.user._id });

    if (!garage) {
      return res.status(404).json({ message: 'Garage not found' });
    }

    garage.watchlist = garage.watchlist.filter(
      (item) => item.car.toString() !== req.params.carId
    );
    await garage.save();

    res.json({ message: 'Car removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

