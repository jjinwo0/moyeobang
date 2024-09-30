import React, {useEffect, useState} from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Library,
} from '@react-google-maps/api';
import * as TravelMainMapStyle from '@/components/travelLog/travelLogList/TravelMainMapStyle';
import {useTravelLogContext} from '@/contexts/TravelLog';
const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;
const libraries: Library[] = ['places'];
const containerStyle = {
  width: '100%',
  height: '100%',
};

interface markerInfo {
  lat: number;
  lng: number;
  googlePlaceId?: string;
}

export default function TravelMainMap() {
  const {travelSchedules, scheduleDayNum} = useTravelLogContext();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<markerInfo[]>([]);

  useEffect(() => {
    if (scheduleDayNum) {
      setMarkers([]);
      const schedules = travelSchedules[scheduleDayNum - 1]?.daySchedules;
      schedules?.map(schedule => {
        console.log('[*] schedule', schedule);
        if ('scheduleId' in schedule) {
          setMarkers(prevMarkers => [
            ...prevMarkers,
            {
              lat: schedule.scheduleLocation.latitude,
              lng: schedule.scheduleLocation.longitude,
              googlePlaceId: schedule.scheduleLocation.googlePlaceId,
            },
          ]);
        } else if ('transactionId' in schedule) {
          setMarkers(prevMarkers => [
            ...prevMarkers,
            {
              lat: schedule.latitude,
              lng: schedule.longitude,
            },
          ]);
        }
      });
    }
  }, [scheduleDayNum, travelSchedules]);

  useEffect(() => {
    console.log('[*] markers', markers);
  }, [markers]);

  // Google Maps API 로드
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: mapAPI,
    libraries,
    version: '3.47',
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
