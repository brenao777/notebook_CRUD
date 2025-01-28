import {
  AddNotebooks,
  DeleteNotebooks,
  fetchNotebooks,
  UpdateNotebooks,
} from '../lib/noteBookThunk';
import { createSlice } from '@reduxjs/toolkit';
import type { NotebookArrayType, NotebookObjectType } from '../types/notebookTypes';

type NoteBookState = {
  notebooks: NotebookArrayType;
  loading: boolean;
  error: null | string;
  showModal: boolean;
  notebook: NotebookObjectType | null;
};

const initialState: NoteBookState = {
  notebooks: [],
  loading: false,
  error: null,
  showModal: false,
  notebook: null,
};

const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
    openModal: (state, action: { payload: NotebookObjectType }) => {
      state.showModal = true;
      state.notebook = action.payload;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.notebook = null;
    },
  },
  extraReducers(builder) {
    builder // GET
      .addCase(fetchNotebooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotebooks.fulfilled, (state, action) => {
        state.loading = false;
        state.notebooks = action.payload;
      })
      .addCase(fetchNotebooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(AddNotebooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddNotebooks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.notebooks.unshift(payload);
      })
      .addCase(AddNotebooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }) 
      .addCase(UpdateNotebooks.fulfilled, (state, { payload }) => {
        state.notebooks = state.notebooks.map((notebook) =>
          notebook.id === payload.id ? payload : notebook,
        );
      })
      .addCase(DeleteNotebooks.fulfilled, (state, { payload }) => {
        state.notebooks = state.notebooks.filter((notebook) => notebook.id !== payload);
      }); 
  },
});
export const { openModal, closeModal } = notebookSlice.actions;
export default notebookSlice.reducer;
