// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import book from './slices/book'

// Import slices here

export const store = configureStore({
  reducer: {
    books: book,
  },
})

// Infer types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
