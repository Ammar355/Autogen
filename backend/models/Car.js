import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    vin: {
      type: String,
      unique: true,
      sparse: true,
    },
    licensePlate: String,
    year: {
      type: Number,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    trim: String,
    color: String,
    mileage: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: ['Excellent', 'Good', 'Fair', 'Poor'],
      default: 'Good',
    },
    description: String,
    highlights: [String],
    pros: [String],
    cons: [String],
    images: [String],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'sold', 'removed'],
      default: 'draft',
    },
    trustReport: {
      accidents: {
        type: Number,
        default: 0,
      },
      owners: {
        type: Number,
        default: 1,
      },
      conditionRating: Number,
      history: {
        type: String,
        enum: ['Clean', 'Salvage', 'Rebuilt'],
        default: 'Clean',
      },
    },
    detectedIssues: [String],
    aiGenerated: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for search
carSchema.index({ make: 1, model: 1 });
carSchema.index({ price: 1 });
carSchema.index({ mileage: 1 });
carSchema.index({ year: 1 });
carSchema.index({ status: 1 });

export default mongoose.model('Car', carSchema);

