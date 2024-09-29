import React, {useEffect} from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Library,
} from '@react-google-maps/api';
import * as TravelMainMapStyle from '@/components/travelLog/travelLogList/TravelMainMapStyle';

const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;
const libraries: Library[] = ['places'];
const containerStyle = {
  width: '100%',
  height: '100%',
};

export default function TravelMainMap() {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: mapAPI,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      console.log('Google Maps API is loaded');
    }
  }, [isLoaded]);

  return (
    <div css={TravelMainMapStyle.TravelMainMapLayout}>
      {/* <GoogleMap mapContainerStyle={containerStyle}></GoogleMap> */}
    </div>
  );
}

