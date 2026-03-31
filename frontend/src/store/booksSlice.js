import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const res = await fetch('http://localhost:4000/api/books');
  return res.json();
});

const booksSlice = createSlice({
  name: 'books',
  initialState: { items: [], status: 'idle', searchTerm: '' },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => { state.status = 'loading'; })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, state => { state.status = 'failed'; });
  },
});

export const { setSearchTerm } = booksSlice.actions;

// generated-by-copilot: Selector that returns books filtered by the current search term
export const selectFilteredBooks = state => {
  const { items, searchTerm } = state.books;
  if (!searchTerm.trim()) return items;
  const term = searchTerm.toLowerCase();
  return items.filter(
    book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
  );
};

export default booksSlice.reducer;
