import mongoose from 'mongoose';

const garageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    savedCars: [
      {
        car: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Car',
        },
        savedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    watchlist: [
      {
        car: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Car',
        },
        originalPrice: Number,
        priceAlert: {
          type: Boolean,
          default: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    myCars: [
      {
        car: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Car',
        },
        purchasePrice: Number,
        purchaseDate: Date,
        currentValue: Number,
        mileage: Number,
        maintenance: {
          nextService: String,
          lastService: Date,
          serviceHistory: [
            {
              date: Date,
              type: String,
              cost: Number,
              notes: String,
            },
          ],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Garage', garageSchema);

