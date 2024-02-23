import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    city: '',
    category: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date('12/31/2024').toISOString().split('T')[0]
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, response) => {
      const [model, data] = response.payload
      state.filters[model] = data
    }
  },
})

export const { setFilter  } = filterSlice.actions
export default filterSlice.reducer