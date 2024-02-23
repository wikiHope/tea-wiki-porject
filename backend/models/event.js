const mongoose = require('mongoose')
const Yup = require('yup');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  images: [{ url: String }],
  date: { type: Date, required: true },
  cityId: { type: Number, required: true },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  // if price is zero, event is free so no need for extra prop for free
  seatingCategories: [{ name: String, price: Number }],
  isPopular: { type: Boolean, default: false },
  socialMediaLinks: [{ name: String, url: String}],
  organizer: [{ type: String, required: true }],
  isPickable: { type: Boolean, default: false }
})

const eventFilterSchema = Yup.object().shape({
  startDate: Yup.date().nullable(),
  endDate: Yup.date().nullable(),
  category: Yup.string().nullable(),
  city: Yup.string().nullable(),
  location: Yup.string().nullable(),
  keyword: Yup.string().nullable()
});

eventSchema.index({ 'location.coordinates': '2dsphere' })

const Event = mongoose.model('Event', eventSchema)

module.exports = { Event, eventFilterSchema }