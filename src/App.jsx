import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

const ACCESS_KEY = "_rZESH-nSYriH2KMmLbOut-TGKw_mfWGGDe5FuYofI4";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;

    async function fetchImages() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query,
              page,
              per_page: 12,
            },
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );

        const { results, total_pages } = response.data;

        if (results.length === 0) {
          toast.error("No images found. Please try a different keyword.");
        }

        setImages((prevImages) =>
          page === 1 ? results : [...prevImages, ...results]
        );
        setTotalPages(total_pages);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch images. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (newQuery.trim() === "") {
      toast.error("Please enter a search term.");
      return;
    }

    if (newQuery === query) return;

    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {page < totalPages && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}
      {isLoading && <Loader />}
      {selectedImage && (
        <ImageModal
          photoUrl={selectedImage.urls.regular}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
