import { z } from 'zod';

export const notebookObjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  userId: z.number(),
});

export const postNotebookSchema = z.object({
  title: z.string(),
});

export const notebookSchema = z.array(notebookObjectSchema);

export type NotebookObjectType = z.infer<typeof notebookObjectSchema>;
export type NotebookArrayType = z.infer<typeof notebookSchema>;
export type postNotebook = Omit<NotebookObjectType, 'id' | 'userId'>;

export type UpdateNotebookType = {
  notebookId: number;
  updateNotebook: postNotebook;
};
