import React from 'react';
import { useAppDispatch } from '../../shared/hooks';
import { AddNotebooks } from '../../entities/notebook/lib/noteBookThunk';
import { postNotebookSchema } from '../../entities/notebook/types/notebookTypes';
import styles from './AddNotebookPage.module.scss';

export default function AddNotebookPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const addNotebookHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const parsedData = postNotebookSchema.parse(formData);
      await dispatch(AddNotebooks(parsedData));
    } catch (error) {
      console.error('Ошибка --->', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.myh1}>Создать новый блокнот</h1>
      <form className={styles.addForm} onSubmit={addNotebookHandler}>
        <input
          className={styles.addInput}
          type="text"
          name="title"
          placeholder="Введите название"
        />
        <button type="submit" className={styles.btn}>
          Создать
        </button>
      </form>
    </div>
  );
}
