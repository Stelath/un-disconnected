import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    socket: 0,
  },
})
