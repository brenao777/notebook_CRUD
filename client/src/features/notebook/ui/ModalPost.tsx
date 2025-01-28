import React from 'react';
import {
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Header,
  FormInput,
  Form,
} from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks';
import { closeModal } from '../../../entities/notebook/model/notebookSlice';
import { postNotebookSchema } from '../../../entities/notebook/types/notebookTypes';
import { UpdateNotebooks } from '../../../entities/notebook/lib/noteBookThunk';
export default function ModalPost(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector((state) => state.notebooks.showModal);
  const notebook = useAppSelector((state) => state.notebooks.notebook);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const parsedNotebook = postNotebookSchema.parse(formData);
      if (notebook?.id !== undefined) {
        await dispatch(
          UpdateNotebooks({
            updateNotebook: parsedNotebook,
            notebookId: notebook.id,
          }),
        );
        dispatch(closeModal());
      }
    } catch (error) {
      console.error('Ошибка --->', error);
    }
  };

  if (notebook?.id !== undefined)
    return (
      <Modal size="small" open={showModal} onClose={() => dispatch(closeModal())}>
        <ModalContent>
          <Header>Редакция блокнота</Header>
          <Form onSubmit={submitHandler}>
            <FormInput name="title" type="text" defaultValue={notebook.title} />
            <ModalActions style={{ marginTop: '20px' }}>
              <Button color="black" onClick={() => dispatch(closeModal())}>
                Назад
              </Button>
              <Button positive>Соxранить изменения</Button>
            </ModalActions>
          </Form>
        </ModalContent>
      </Modal>
    );
  return <></>;
}
