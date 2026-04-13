'use client';

import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { FetchNoteById } from '@/lib/api';

interface Props {
  id: string;
}

function NotePreviewClient({ id }: Props) {
  const { data: note } = useQuery({
    queryKey: ['note', id],
    queryFn: () => FetchNoteById(id),
    refetchOnMount: false,
  });

  if (!note) return <p>Something went wrong.</p>;

  const dateCheck = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
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
  );
}

export default NotePreviewClient;
