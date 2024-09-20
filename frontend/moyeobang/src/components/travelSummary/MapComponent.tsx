import React from 'react';
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import {css} from '@emotion/react';

// 구글 맵에 표시할 기본 중심 좌표 (제주도 예시)
const center = {
  lat: 33.431441,
  lng: 126.874237,
};

interface MapProps {
  locationList: {latitude: number; longitude: number}[];
}

export default function MapComponent({locationList}: MapProps) {
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY, // Google API Key를 여기에 넣으세요
  });

  if (!isLoaded) {
    return <div>Loading...</div>; // API 로드 중일 때
  }

  return (
    <GoogleMap
      mapContainerStyle={{width: '330px', height: '150px'}}
      center={center}
      zoom={10}
    >
      {/* 마커 표시 */}
      {locationList.map((location, index) => (
        <Marker
          key={index}
          position={{lat: location.latitude, lng: location.longitude}}
        />
      ))}
    </GoogleMap>
  );
}
