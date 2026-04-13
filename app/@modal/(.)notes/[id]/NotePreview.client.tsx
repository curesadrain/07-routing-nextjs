'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import BackButton from '@/components/BackButton/BackButton';
import css from './NotePreview.module.css';

interface Props {
  id: string;
}

function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => FetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isPending) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.loader}>Loading note...</div>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.error}>
          <p>Error loading note:{error.message}</p>
          <BackButton onClose={handleClose} />
        </div>
      </Modal>
    );
  }

  const dateCheck = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={handleClose}>
      <BackButton onClose={handleClose} />
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{dateCheck}</p>
        </div>
      </div>
    </Modal>
  );
}

export default NotePreviewClient;
