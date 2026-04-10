import css from './NotesSidebar.module.css';
import Link from 'next/link';
import { NoteTag } from '@/types/note';

function NotesSidebar() {
  const sidebarTags: NoteTag[] = [
    'Todo',
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
  ];
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {sidebarTags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NotesSidebar;
