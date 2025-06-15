import styles from "./ImageCard.module.css";

export default function ImageCard({ image, onClick }) {
  const { urls, alt_description } = image;

  const handleClick = () => {
    onClick(image);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img
        className={styles.image}
        src={urls.small}
        alt={alt_description}
        loading="lazy"
      />
    </div>
  );
}
