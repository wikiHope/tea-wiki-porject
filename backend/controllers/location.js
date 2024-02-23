const Location = require('../models/location')

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find()
    const locationsMapped = locations.map(item => {
      return {
        id: item._id,
        name: item.name,
      }
    })
    res.status(200).json(locationsMapped)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'})
  }
}

exports.getLocationById = async (req, res) => {
  const locationId = req.params.id
  try {
    const location = await Location.findById(locationId)
    if (!location) {
      return res.status(404).json({ error: 'Mekan bulunamadı' })
    }

    res.status(200).json(location)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'})
  }
}

exports.addLocation = async (req, res) => {
  const locationData = req.body
  try {
    // Create and Add new location
    const newLocation = new Location(locationData)
    await newLocation.save()
    
    res.status(201).json({ success: true, message: 'Mekan başarıyla eklendi', location: newLocation})
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'})
  }
}

