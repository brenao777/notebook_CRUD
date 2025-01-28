import React from 'react';
import type { NotebookObjectType } from '../../../../entities/notebook/types/notebookTypes';
import Card from 'react-bootstrap/Card';
import { useAppDispatch } from '../../../../shared/hooks';
import { DeleteNotebooks } from '../../../../entities/notebook/lib/noteBookThunk';
import { openModal } from '../../../../entities/notebook/model/notebookSlice';
import styles from './NotebookUi.module.scss'; // Импорт стилей
import deleteIcon from '../../../../../public/delete.png'; // Импорт иконки удаления
import editIcon from '../../../../../public/edit.png'; // Импорт иконки редактирования

type Props = {
  notebook: NotebookObjectType;
};

function NotebookUi({ notebook }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();

  const deleteHandler = async (notebookId: number): Promise<void> => {
    await dispatch(DeleteNotebooks(notebookId));
  };

  return (
    <Card className={styles.card}>
      <Card.Body>
        <Card.Title className={styles.title}>{notebook.title}</Card.Title>
        <div className={styles.actions}>
          <button onClick={() => deleteHandler(notebook.id)} className={styles.button}>
            <img src={deleteIcon} alt="Удалить" className={styles.icon} />
          </button>
          <button onClick={() => dispatch(openModal(notebook))} className={styles.button}>
            <img src={editIcon} alt="Изменить" className={styles.icon} />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default NotebookUi;
