const mongoose = require('mongoose')

const DocumentSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,
    },
    nom: {
      type: String,
      required: [true, 'nom is required'],
      trim: true,
      maxlength: [
        50,
        'nom can not be more than 50 characters',
      ],
    },
    prenom: {
      type: String,
      required: [true, 'prenom is required'],
      trim: true,
      maxlength: [
        50,
        'prenom can not be more than 50 characters',
      ],
    },
    cin: {
      type: String,
      required: [true, 'cin is required'],
      unique: true,
      maxlength: [
        50,
        'cin can not be more than 500 characters',
      ],
    },
    province: {
      type: String,
      required: [true, 'province is required'],
      maxlength: [
        50,
        'province can not be more than 50 characters',
      ],
    },
    ville: {
      type: String,
      required: [true, 'ville is required'],
      maxlength: [
        50,
        'ville can not be more than 50 characters',
      ],
    },
    numDossier: {
      type: Number,
      required: [true, 'numDossier is required'],
    },
    date: {
      type: Date,
      default: Date.now(),
      required: [true, 'date is required'],
    },
    fonction: {
      type: String,
      required: [true, 'fonction is required'],
      maxlength: [
        50,
        'fonction can not be more than 50 characters',
      ],
    },
    address: {
      type: String,
      required: [true, 'address is required'],
    },
    resume: {
      type: String,
      required: [true, 'cin is required'],
      maxlength: [
        500,
        'Description can not be more than 500 characters',
      ],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model(
  'Document',
  DocumentSchema
)
