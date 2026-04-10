import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { DeleteNote } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const noteDeleteM = useMutation({
    mutationFn: (id: string) => DeleteNote(id),
    onSuccess: () => {
      toast.success('Note deleted', {
        duration: 2000,
        position: 'top-center',
      });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View Details</Link>
            <button
              className={css.button}
              onClick={() => noteDeleteM.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
