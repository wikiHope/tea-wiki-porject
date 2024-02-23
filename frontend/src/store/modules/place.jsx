import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  place: {}
}

export const placeSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setPlace: (state, data) => {
      state.place = data.payload
    }
  },
})

export const { setPlace  } = placeSlice.actions
export default placeSlice.reducer