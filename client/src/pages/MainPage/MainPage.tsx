import React, { useEffect } from 'react';
import NotebookUi from '../../features/notebook/ui/NotebookUi/NotebookUi';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { fetchNotebooks } from '../../entities/notebook/lib/noteBookThunk';
import styles from './MainPage.module.scss';
import ModalPost from '../../features/notebook/ui/ModalPost';

function MainPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const notebooks = useAppSelector((store) => store.notebooks.notebooks);
  useEffect(() => {
    dispatch(fetchNotebooks()).catch(() => {
      throw new Error();
    });
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {notebooks.map((notebook) => (
        <div key={notebook.id}>
          <NotebookUi notebook={notebook} />
        </div>
      ))}
      <ModalPost />
    </div>
  );
}

export default MainPage;
