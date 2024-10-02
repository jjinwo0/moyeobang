import {useLoadScript, Library} from '@react-google-maps/api';

const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;
const libraries: Library[] = ['places'];

export const useGoogleMapsLoader = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: mapAPI,
    libraries,
    version: 'weekly',
  });

  return {isLoaded};
};
