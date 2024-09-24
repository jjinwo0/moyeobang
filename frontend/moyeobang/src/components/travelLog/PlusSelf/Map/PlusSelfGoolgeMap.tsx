import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import {useTravelLogContext} from '@/contexts/TravelLog';

const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const defaultCenter = {lat: 37.5665, lng: 126.978}; // 기본 중심: 서울

// PlusSelfGoogleMap 컴포넌트
const PlusSelfGoogleMap = forwardRef(
  ({searchLocation}: {searchLocation: string | undefined}, ref) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [markers, setMarkers] = useState<google.maps.MarkerOptions[]>([]); // 마커 상태 관리
    const [isInteraction, setIsInteraction] = useState(false); // 스크롤/줌 이벤트 트리거 방지
    const [hasSearched, setHasSearched] = useState(false); // 검색 완료 여부 플래그
    const {selectedPlace} = useTravelLogContext(); // selectedPlace 가져오기

    // Google Maps API 로드
    const {isLoaded} = useLoadScript({
      googleMapsApiKey: mapAPI,
      libraries: ['places'],
    });

    // 부모에서 사용할 수 있는 메서드 제공 (지도 중심 변경)
    useImperativeHandle(ref, () => ({
      setCenter: (lat: number, lng: number) => {
        if (map) {
          map.setCenter({lat, lng});
        }
      },
    }));

    // searchLocation이 변경되면 hasSearched를 리셋
    useEffect(() => {
      if (searchLocation) {
        setHasSearched(false); // searchLocation이 변경되면 다시 검색 가능
      }
    }, [searchLocation]);

    // selectedPlace와 searchLocation의 경계를 포함하도록 지도 설정
    const setBoundsFromSelectedPlaceAndSearch = () => {
      if (map) {
        const bounds = new window.google.maps.LatLngBounds();
        const service = new window.google.maps.places.PlacesService(map);

        // selectedPlace가 없고 searchLocation이 있으면 근처 검색 수행
        if (!selectedPlace && searchLocation && searchLocation.trim() !== '') {
          const request = {
            query: searchLocation, // searchLocation을 키워드로 사용
            location: defaultCenter, // 서울 중심 좌표
            radius: 5000, // 5km 반경 내 장소 검색
            fields: ['geometry', 'name'],
          };

          service.textSearch(request, (results, status) => {
            if (status === 'OK' && results) {
              const nearbyMarkers = results
                .map(result => {
                  const location = result.geometry?.location;
                  if (location) {
                    bounds.extend(location); // 검색된 장소 경계 추가
                    return {
                      position: location,
                      title: result.name,
                    };
                  }
                  return null;
                })
                .filter(marker => marker !== null);

              setMarkers(nearbyMarkers as google.maps.MarkerOptions[]); // 검색된 마커 추가
              map.fitBounds(bounds); // 모든 경계를 포함하여 지도 맞춤
              setHasSearched(true); // 검색 완료 상태 업데이트
            }
          });
        } else if (selectedPlace) {
          // selectedPlace가 있으면 기존 로직대로 처리
          const geocoder = new window.google.maps.Geocoder();
          const searchQuery = searchLocation
            ? `${selectedPlace} ${searchLocation}`
            : selectedPlace;

          geocoder.geocode({address: selectedPlace}, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const viewport = results[0].geometry.viewport;
              const location = results[0].geometry.location;

              if (viewport) {
                bounds.union(viewport); // selectedPlace의 경계를 추가
              } else {
                bounds.extend(location); // location을 경계에 추가
              }

              if (searchLocation && searchLocation.trim() !== '') {
                const request = {
                  query: searchQuery,
                  bounds: bounds,
                  fields: ['geometry', 'name'],
                };

                service.textSearch(request, (searchResults, searchStatus) => {
                  if (
                    searchStatus === 'OK' &&
                    searchResults &&
                    searchResults.length > 0
                  ) {
                    const searchMarkers = searchResults
                      .map(result => {
                        const searchLocation = result.geometry?.location;
                        if (searchLocation) {
                          bounds.extend(searchLocation); // 검색된 장소 추가
                          return {
                            position: searchLocation,
                            title: result.name,
                          };
                        }
                        return null;
                      })
                      .filter(marker => marker !== null);

                    setMarkers(searchMarkers as google.maps.MarkerOptions[]); // 검색된 마커 추가

                    if (searchMarkers.length === 1) {
                      map.setCenter(
                        searchMarkers[0]?.position || defaultCenter
                      );
                      map.setZoom(15);
                    } else {
                      const padding = 0;
                      map.fitBounds(bounds, padding); // 모든 경계를 포함하여 지도 맞춤
                    }

                    setHasSearched(true); // 검색 완료 상태 업데이트
                  }
                });
              } else {
                map.fitBounds(bounds); // searchLocation이 없으면 selectedPlace만 경계에 맞춤
              }
            }
          });
        }
      }
    };

    // 줌 및 스크롤 이벤트 방지
    useEffect(() => {
      if (map) {
        map.addListener('zoom_changed', () => {
          setIsInteraction(true); // 줌 이벤트 발생 시 검색 방지
        });

        map.addListener('dragend', () => {
          setIsInteraction(true); // 드래그(스크롤) 발생 시 검색 방지
        });

        map.addListener('idle', () => {
          setIsInteraction(false); // 인터랙션 종료 시 검색 가능 상태로 변경
        });
      }
    }, [map]);

    // 초기 지도 설정 및 검색 설정
    useEffect(() => {
      if (map && !isInteraction && !hasSearched) {
        setBoundsFromSelectedPlaceAndSearch(); // selectedPlace와 searchLocation 경계 설정
      }
    }, [map, searchLocation, selectedPlace, isInteraction, hasSearched]);

    // 지도 옵션 설정 (줌 기능을 활성화)
    const mapOptions = {
      zoomControl: true, // 줌 컨트롤 허용
      scrollwheel: true, // 스크롤 줌 허용
      disableDefaultUI: false, // 기본 UI 사용 허용
    };

    return (
      <>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle} // 지도 컨테이너 스타일
            center={defaultCenter} // 기본 중심 설정 (초기 로딩 시)
            zoom={12} // 기본 줌 레벨
            onLoad={mapInstance => setMap(mapInstance)} // 지도 로드 시 onLoad 호출
            options={mapOptions} // 줌 및 UI 설정
          >
            {/* 마커를 지도에 표시 */}
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.position}
                title={marker.title}
              />
            ))}
          </GoogleMap>
        ) : (
          <>로딩중...</> // 지도 로드 전 로딩 메시지
        )}
      </>
    );
  }
);

PlusSelfGoogleMap.displayName = 'PlusSelfGoogleMap';

export default PlusSelfGoogleMap;
