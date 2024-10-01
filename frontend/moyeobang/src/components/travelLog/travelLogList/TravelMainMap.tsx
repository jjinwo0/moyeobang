import React, {useEffect, useState, useRef} from 'react';
import {GoogleMap, Marker} from '@react-google-maps/api';
import {useTravelLogContext} from '@/contexts/TravelLog';
import useTravelDetailStore from '@/store/useTravelDetailStore';
import heartIcon from '@/assets/icons/heartIcon.webp';

interface markerInfo {
  lat: number;
  lng: number;
  googlePlaceId?: string;
}
const containerStyle = {
  width: '100%',
  height: '50vh', // 원하는 높이로 설정
};

const defaultCenter = {lat: 37.5665, lng: 126.978}; // 서울 기본 중심 좌표

export default function TravelMainMap() {
  const {travelSchedules, scheduleDayNum} = useTravelLogContext();
  const {travelPlaceList} = useTravelDetailStore();
  const [markers, setMarkers] = useState<markerInfo[]>([]);
  const [currentLocation, setCurrentLocation] = useState<markerInfo | null>(
    null
  );
  const googleMapRef = useRef<any>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [placeCoords, setPlaceCoords] = useState<markerInfo[]>([]);

  // 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log('[*] position', position);
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        error => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // 마커 생성 및 스케줄 변경 시 마커 업데이트
  useEffect(() => {
    if (scheduleDayNum) {
      const schedules = travelSchedules[scheduleDayNum - 1]?.daySchedules ?? [];
      const newMarker = schedules
        .map(schedule => {
          if ('scheduleId' in schedule) {
            return {
              lat: schedule.scheduleLocation.latitude,
              lng: schedule.scheduleLocation.longitude,
              googlePlaceId: schedule.scheduleLocation.googlePlaceId,
            };
          } else if ('transactionId' in schedule) {
            return {
              lat: schedule.latitude,
              lng: schedule.longitude,
            };
          }
          return null;
        })
        .filter(marker => marker !== null);
      setMarkers(newMarker);
    }
  }, [scheduleDayNum, travelSchedules]);

  // Geocoding API를 사용하여 주소를 위도와 경도로 변환
  useEffect(() => {
    if (travelPlaceList.length > 0) {
      const geocoder = new window.google.maps.Geocoder();
      const promises = travelPlaceList.map(place => {
        return new Promise<markerInfo>((resolve, reject) => {
          geocoder.geocode({address: place}, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              const location = results[0].geometry.location;
              resolve({
                lat: location.lat(),
                lng: location.lng(),
              });
            } else {
              reject(
                'Geocode was not successful for the following reason: ' + status
              );
            }
          });
        });
      });

      Promise.all(promises)
        .then(results => {
          setPlaceCoords(results);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [travelPlaceList]);

  useEffect(() => {
    if (map) {
      if (markers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(marker => {
          bounds.extend({lat: marker.lat, lng: marker.lng});
        });
        if (currentLocation) {
          bounds.extend({lat: currentLocation.lat, lng: currentLocation.lng});
        }
        map.fitBounds(bounds); // 모든 마커를 포함하는 경계로 설정
      } else if (placeCoords.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        placeCoords.forEach(coord => {
          bounds.extend({lat: coord.lat, lng: coord.lng});
        });
        map.fitBounds(bounds); // 모든 장소를 포함하는 경계로 설정
      } else {
        // 마커가 없고 placeCoords도 없을 때 기본 중심을 서울로 설정
        map.setCenter(defaultCenter);
        map.setZoom(12); // 서울을 중심으로 기본 줌 레벨 설정
      }
    }
  }, [map, markers, placeCoords, currentLocation]);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter} // 초기 렌더링 시 기본 중심을 서울로 설정
        zoom={12} // 기본 줌 레벨 설정
        onLoad={mapInstance => {
          setMap(mapInstance);
        }} // map 인스턴스 저장
        onUnmount={() => {
          console.log('Map unmounted');
          setMap(null);
        }} // 페이지가 이동되거나 언마운트 시 map 상태 초기화
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{lat: marker.lat, lng: marker.lng}}
            title={`Marker ${index + 1}`}
            icon={{
              url: heartIcon, // import한 이미지 사용
              scaledSize: new window.google.maps.Size(30, 30), // 이미지 크기 조정
            }}
            label={{
              text: `${index + 1}`, // 인덱스를 레이블로 표시
              color: 'black', // 레이블 색상
              fontSize: '12px', // 레이블 폰트 크기
            }}
          />
        ))}
        {currentLocation && (
          <Marker
            position={{lat: currentLocation.lat, lng: currentLocation.lng}}
            title="Current Location"
            icon={{
              url: heartIcon, // 현재 위치 마커 이미지
              scaledSize: new window.google.maps.Size(30, 30), // 이미지 크기 조정
            }}
            label={{
              text: '현재 위치', // 현재 위치 레이블
              color: 'blue', // 레이블 색상
              fontSize: '12px', // 레이블 폰트 크기
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
