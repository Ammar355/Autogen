import express from 'express';
import Car from '../models/Car.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/cars
// @desc    Get all cars with filters
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
      year,
      make,
      model,
      type,
      status = 'active',
      page = 1,
      limit = 20,
    } = req.query;

    const query = { status };

    // Search query
    if (search) {
      query.$or = [
        { make: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Mileage filter
    if (minMileage || maxMileage) {
      query.mileage = {};
      if (minMileage) query.mileage.$gte = Number(minMileage);
      if (maxMileage) query.mileage.$lte = Number(maxMileage);
    }

    // Year filter
    if (year) {
      query.year = Number(year);
    }

    // Make filter
    if (make) {
      query.make = { $regex: make, $options: 'i' };
    }

    // Model filter
    if (model) {
      query.model = { $regex: model, $options: 'i' };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const cars = await Car.find(query)
      .populate('seller', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Car.countDocuments(query);

    res.json({
      cars,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/cars/:id
// @desc    Get single car
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('seller', 'name email phone');
    
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Increment views
    car.views += 1;
    await car.save();

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/cars
// @desc    Create a new car listing
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const carData = {
      ...req.body,
      seller: req.user._id,
    };

    const car = await Car.create(carData);
    await car.populate('seller', 'name email');

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/cars/:id
// @desc    Update car listing
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user is the seller
    if (car.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('seller', 'name email');

    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/cars/:id
// @desc    Delete car listing
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if user is the seller
    if (car.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Car.findByIdAndDelete(req.params.id);

    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

