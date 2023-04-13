import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '33885269-090adf138bc0970f2f6b8731c';
export const imgPerPage = 12;

export const fetchImages = async (searchText, page) => {
  const response = await axios.get('', {
    params: {
      key: API_KEY,
      q: searchText,
      image_type: 'photo',
      orientation: 'horizontal',
      page: page,
      per_page: imgPerPage,
    },
  });

  return response.data;
};
