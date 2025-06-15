import axios from "axios";

const ACCESS_KEY = "_rZESH-nSYriH2KMmLbOut-TGKw_mfWGGDe5FuYofI4";
const BASE_URL = "https://api.unsplash.com/search/photos";

export const fetchImages = async (query, page = 1) => {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });

  return response.data;
};
