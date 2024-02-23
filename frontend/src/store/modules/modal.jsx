import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shareModalShow: false,
  infoModalShow: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, data) => {
      const { status, modalName } = data.payload
      state[modalName] = status
    }
  },
})

export const { setModal } = modalSlice.actions
export default modalSlice.reducer