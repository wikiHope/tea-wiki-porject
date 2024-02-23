const { events } = require('../mock')

exports.getAllEvents = () => {
  return events
}

exports.getEventById = (id) => {
  return events.find(e => e.id == id)
}

exports.getEventByUserId = (userId) => {
  return events.find(e => e.userId == userId)
}