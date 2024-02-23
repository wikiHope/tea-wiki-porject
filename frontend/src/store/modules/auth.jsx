import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, data) => {
      state.accessToken = data.payload
    },
    removeAccessToken: (state) => {
      state.accessToken = ''
    }
  },
})

export const { setAccessToken, removeAccessToken  } = authSlice.actions
export default authSlice.reducer