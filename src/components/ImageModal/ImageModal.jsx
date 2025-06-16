import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ImageModal = ({ photoUrl, onClose }) => {
  return (
    <Lightbox open={!!photoUrl} close={onClose} slides={[{ src: photoUrl }]} />
  );
};

export default ImageModal;
