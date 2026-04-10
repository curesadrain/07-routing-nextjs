import NotesServer from '../../page';

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ searchQuery: string; currentPage: number }>;
};

async function NotesByFilter({ params, searchParams }: Props) {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];
  return <NotesServer searchParams={searchParams} selectedTag={category} />;
}

export default NotesByFilter;
