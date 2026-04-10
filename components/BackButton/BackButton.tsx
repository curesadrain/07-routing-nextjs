import css from './BackButton.module.css';

interface BackButtonProps {
  onClose: () => void;
}

function BackButton({ onClose }: BackButtonProps) {
  return (
    <button type="button" className={css.backBtn} onClick={onClose}>
      ←
    </button>
  );
}

export default BackButton;
