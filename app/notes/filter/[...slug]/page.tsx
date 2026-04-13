import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { FetchNotes } from '@/lib/api';
import SidebarNotesClient from './Notes.client';

interface SidebarNotesServerProps {
  searchParams: Promise<{
    searchQuery: string;
    currentPage: number;
  }>;
  params: Promise<{
    slug: string[];
  }>;
}

async function SidebarNotesServer({
  searchParams,
  params,
}: SidebarNotesServerProps) {
  const search = await searchParams;
  const { slug } = await params;
  const searchQuery = search.searchQuery || '';
  const currentPage = Number(search.currentPage) || 1;

  const selectedTag = slug && slug[0] !== 'all' ? slug[0] : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', searchQuery, currentPage, selectedTag],
    queryFn: () => FetchNotes(currentPage, searchQuery, selectedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarNotesClient
        initialQuery={searchQuery}
        initialPage={currentPage}
        selectedTag={selectedTag}
      />
    </HydrationBoundary>
  );
}

export default SidebarNotesServer;
