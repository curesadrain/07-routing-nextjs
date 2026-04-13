'use client';

import BackButton from '@/components/BackButton/BackButton';
import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import NotePreviewClient from './NotePreview.client';

function NotePreview() {
  const router = useRouter();
  const close = () => router.back();
  return (
    <Modal onClose={close}>
      <BackButton onClose={close} />
      <NotePreviewClient />
    </Modal>
  );
}

export default NotePreview;
