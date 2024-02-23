import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  events: [],
  selectedEvent: {}
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state, data) => {
      state.events = data.payload
    },
    setEventDetail: (state, data) => {
      state.selectedEvent = data.payload
    }
  },
})

export const { setEvents, setEventDetail  } = eventSlice.actions
export default eventSlice.reducer