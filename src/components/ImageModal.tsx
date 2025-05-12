import { createPortal } from "react-dom";

interface ImageModalProps {
  selectedImage: string;
  onClose?: () => void;
}

export const ImageModal = ({ selectedImage, onClose }: ImageModalProps) => {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      <img
        src={selectedImage}
        className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
      />
    </div>,
    document.body,
  );
};
