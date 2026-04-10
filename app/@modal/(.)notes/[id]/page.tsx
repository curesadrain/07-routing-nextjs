'use client';

import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
import BackButton from '@/components/BackButton/BackButton';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';

function NotePreview() {
  const router = useRouter();
  const close = () => router.back();
  return (
    <Modal onClose={close}>
      <BackButton onClose={close} />
      <NoteDetailsClient />
    </Modal>
  );
}

export default NotePreview;
