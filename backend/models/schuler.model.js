import { model, Schema } from "mongoose";


const schulerSchema = new mongoose.Schema({
  vorname: {
    type: String,
    required: true
  },
  nachname: {
    type: String,
    required: true
  },
  geburtsdatum: {
    type: Date,
    required: true
  },
  klasse: {
    type: String,
    required: true
  }
});


const Schuler = mongoose.model('Schuler', schulerSchema);

module.exports = Schuler;
