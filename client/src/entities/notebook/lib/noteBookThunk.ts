import type { postNotebook, UpdateNotebookType } from '../types/notebookTypes';
import { notebookObjectSchema, notebookSchema } from '../types/notebookTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../shared/api/axiosInstance';

export const fetchNotebooks = createAsyncThunk(
  'notebook/fettchNotebooks',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get('/notebooks');
      return notebookSchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const AddNotebooks = createAsyncThunk(
  'notebooks/AddNotebooks',
  async (notebookData: postNotebook, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/notebooks', notebookData);
      return notebookObjectSchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);
export const UpdateNotebooks = createAsyncThunk(
  'notebooks/UpdateNotebooks',
  async ({ updateNotebook, notebookId }: UpdateNotebookType, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/notebooks/${String(notebookId)}`, updateNotebook);
      return notebookObjectSchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Не удалось удалить заметку');
    }
  },
);

export const DeleteNotebooks = createAsyncThunk(
  'notebooks/DeleteNotebooks',
  async (notebookId: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/notebooks/${String(notebookId)}`);
      return notebookId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Не удалось удалить заметку');
    }
  },
);

