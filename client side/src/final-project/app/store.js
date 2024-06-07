import { configureStore } from '@reduxjs/toolkit'
import usersSlice from '../features/user/usersSlice'
import productsSlice from '../features/product/productsSlice'
import ordersSlice from '../features/order/ordersSlice'

export const store = configureStore({
  reducer: {
      user : usersSlice,
      product :  productsSlice,
      order : ordersSlice
  },
})