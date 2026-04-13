'use client';

import css from './SidebarNotes.module.css';
import NoteList from '@/components/NoteList/NoteList';
import { FetchNotes } from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Pagination from '@/components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebouncedCallback } from 'use-debounce';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/Loader/Loader';

interface SidebarNotesClientProps {
  initialQuery: string;
  initialPage: number;
  selectedTag?: string;
}

function SidebarNotesClient({
  initialQuery,
  initialPage,
  selectedTag,
}: SidebarNotesClientProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [modalState, setModalState] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setModalState(true);
  };
  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setModalState(false);
  };

  const handleClose = () => closeModal();

  const {
    data = { notes: [], totalPages: 0 },
    isLoading,
    isFetching,
    isPlaceholderData,
    error,
  } = useQuery({
    queryKey: ['notes', searchQuery, currentPage, selectedTag],
    queryFn: () => FetchNotes(currentPage, searchQuery, selectedTag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong', {
        duration: 4000,
        position: 'top-center',
      });
    }
  }, [error]);

  const showLoader = isLoading || (isFetching && !isPlaceholderData);

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        {showLoader && <Loader />}
        <SearchBox defaultValue={searchQuery} onChange={handleSearch} />
        {data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data.notes.length > 0 && <NoteList notes={data.notes} />}
      {modalState && (
        <Modal onClose={handleClose}>
          <NoteForm onCancel={handleClose} />
        </Modal>
      )}
    </div>
  );
}

export default SidebarNotesClient;
