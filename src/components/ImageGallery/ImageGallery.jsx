import React from "react";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li
          key={image.id}
          className={styles.galleryItem}
          onClick={() => onImageClick(image)}
        >
          <img
            src={image.urls.small}
            alt={image.alt_description || "Image"}
            className={styles.galleryImage}
            loading="lazy"
          />
        </li>
      ))}
    </ul>
  );
}
