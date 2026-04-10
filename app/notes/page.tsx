import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { FetchNotes } from '@/lib/api';
import Notes from '@/app/notes/Notes.client';

interface NotesServerProps {
  searchParams: Promise<{
    searchQuery: string;
    currentPage: number;
  }>;
  selectedTag?: string;
}

async function NotesServer({ searchParams, selectedTag }: NotesServerProps) {
  const params = await searchParams;
  const searchQuery = params.searchQuery || '';
  const currentPage = Number(params.currentPage) || 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', searchQuery, currentPage, selectedTag],
    queryFn: () => FetchNotes(currentPage, searchQuery, selectedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes
        initialQuery={searchQuery}
        initialPage={currentPage}
        selectedTag={selectedTag}
      />
    </HydrationBoundary>
  );
}

export default NotesServer;
