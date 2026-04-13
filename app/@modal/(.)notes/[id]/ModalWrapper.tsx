'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import BackButton from '@/components/BackButton/BackButton';

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const close = () => router.back();

  return (
    <Modal onClose={close}>
      <BackButton onClose={close} />
      {children}
    </Modal>
  );
}
