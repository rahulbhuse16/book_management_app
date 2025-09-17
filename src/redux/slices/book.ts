import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  createNewBook,
  setBooksByDelete,
  setBooksByEdit,
  setBooksByFetching,
} from "../thunkfunctions/book";

const initialState: BookListNS.IState = {
  bookState: {
    isListLoading: false,
    isDeleteLoading: false,
    isAddBookLoading: false,
    isEditBookLoading: false,
    books: [],
    totalPages:0
  },
};
const book = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookstate(state, action: PayloadAction<BookListNS.IBookListState>) {
      return {
        ...state,
        bookState: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    // Fetch Books
    builder.addCase(setBooksByFetching.pending, (state) => {
      state.bookState.isListLoading = true;
    });
    builder.addCase(setBooksByFetching.fulfilled, (state, action) => {
      state.bookState.books = action.payload?.books;
      state.bookState.totalPages=action.payload?.totalPages
      state.bookState.isListLoading = false;
    });
    builder.addCase(setBooksByFetching.rejected, (state) => {
      state.bookState.isListLoading = false;
    });

    // Edit Book
    builder.addCase(setBooksByEdit.pending, (state) => {
      state.bookState.isEditBookLoading = true;
    });
    builder.addCase(setBooksByEdit.fulfilled, (state) => {
      state.bookState.isEditBookLoading = false;
    });
    builder.addCase(setBooksByEdit.rejected, (state) => {
      state.bookState.isEditBookLoading = false;
    });

    // Delete Book
    builder.addCase(setBooksByDelete.pending, (state) => {
      state.bookState.isDeleteLoading = true;
    });
    builder.addCase(setBooksByDelete.fulfilled, (state) => {
      state.bookState.isDeleteLoading = false;
    });
    builder.addCase(setBooksByDelete.rejected, (state) => {
      state.bookState.isDeleteLoading = false;
    });

    // Add New Book
    builder.addCase(createNewBook.pending, (state) => {
      state.bookState.isAddBookLoading = true;
    });
    builder.addCase(createNewBook.fulfilled, (state) => {
      state.bookState.isAddBookLoading = false;
    });
    builder.addCase(createNewBook.rejected, (state) => {
      state.bookState.isAddBookLoading = false;
    });
  },
});

export default book.reducer;

export const { setBookstate } = book.actions;
