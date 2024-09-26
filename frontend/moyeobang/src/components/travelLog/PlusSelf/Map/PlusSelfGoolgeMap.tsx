import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Library,
} from '@react-google-maps/api';
import {useTravelLogContext} from '@/contexts/TravelLog';
import MarkerDetail from './MarkerDetail';
import {MapDetailLayout, MapSpaceStyle} from './ScheduleMapSearchStyle';
import defaultMarkerIcon from '@/assets/icons/redDot.png';
import typesKo from '@/assets/types_ko.json';

const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;

const containerStyle = (isMarkerSelected: boolean) => ({
  width: '100%',
  height: isMarkerSelected ? '90vh' : '100vh',
});

const defaultCenter = {lat: 37.5665, lng: 126.978}; // 기본 중심: 서울

const libraries: Library[] = ['places'];

// 영어로 된 types들을 한국어로 변경하는 함수
const translateTypes = (types: string[]) => {
  return types.map(type => (typesKo as Record<string, string>)[type] || type);
};

// 마커 생성 함수
const createMarker = (
  result: google.maps.places.PlaceResult
): CustomMarker | null => {
  const location = result.geometry?.location;
  if (location) {
    return {
      position: {lat: location.lat(), lng: location.lng()},
      title: result.name || '',
      placeId: result.place_id || '',
      address: result.formatted_address || '',
      rating: result.rating,
      openingHours: result.opening_hours?.weekday_text || [],
      types: translateTypes(result.types || []),
      photos: result.photos?.map(photo => photo.getUrl()) || [], // 사진 추가
    };
  }
  return null;
};

// PlusSelfGoogleMap 컴포넌트
const PlusSelfGoogleMap = forwardRef(
  ({searchLocation}: {searchLocation: string | undefined}, ref) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [markers, setMarkers] = useState<CustomMarker[]>([]); // CustomMarker 사용
    const [isInteraction, setIsInteraction] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const {selectedPlace} = useTravelLogContext();
    const {showMapSearch, setShowMapSearch} = useTravelLogContext();
    const {selectedMarker, setSelectedMarker} = useTravelLogContext();
    const [defaultMarker, setDefaultMarker] = useState<google.maps.Icon | null>(
      null
    );

    const loadMarkerLibrary = async () => {
      const {Marker} = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary;
      return Marker;
    };

    // Google Maps API 로드
    const {isLoaded} = useLoadScript({
      googleMapsApiKey: mapAPI,
      libraries,
    });

    // 부모에서 사용할 수 있는 메서드 제공 (지도 중심 변경)
    useImperativeHandle(ref, () => ({
      setCenter: (lat: number, lng: number) => {
        if (map) {
          map.setCenter({lat, lng});
        }
      },
    }));

    useEffect(() => {
      if (searchLocation) {
        setHasSearched(false);
      }
    }, [searchLocation]);

    // 마커 클릭 시 해당 마커 위치로 줌 인하는 함수
    const handleMarkerClick = async (marker: CustomMarker) => {
      if (map) {
        const Marker = await loadMarkerLibrary(); // Marker 라이브러리 로드
        setSelectedMarker(marker);
        map.panTo(marker.position);
        map.setZoom(15);
      }
    };

    const setBoundsFromSelectedPlaceAndSearch = async () => {
      if (map) {
        const bounds = new window.google.maps.LatLngBounds();
        const service = new window.google.maps.places.PlacesService(map);
        const Marker = await loadMarkerLibrary(); // Marker 라이브러리 로드

        if (!selectedPlace && searchLocation && searchLocation.trim() !== '') {
          const request = {
            query: searchLocation,
            location: defaultCenter,
            language: 'ko',
            radius: 5000,
            fields: [
              'geometry',
              'name',
              'formatted_address',
              'rating',
              'types',
              'photos', // 사진 필드 추가
            ],
          };

          service.textSearch(request, (results, status) => {
            if (status === 'OK' && results) {
              const nearbyMarkers = results.map(result => {
                const marker = createMarker(result);
                if (marker) {
                  bounds.extend(marker.position);

                  service.getDetails(
                    {
                      placeId: result.place_id ?? '',
                      language: 'ko',
                      fields: ['reviews', 'opening_hours', 'photos'], // 사진 필드 추가
                    },
                    (placeDetails, detailsStatus) => {
                      if (detailsStatus === 'OK' && placeDetails) {
                        marker.reviews =
                          placeDetails.reviews?.map(review => ({
                            authorName: review.author_name,
                            authorProfilePhoto: review.profile_photo_url,
                            reviewText: review.text,
                            rating: review.rating,
                          })) || [];
                        marker.detailedOpeningHours =
                          placeDetails.opening_hours?.weekday_text || [];
                        marker.photos =
                          placeDetails.photos?.map(photo => photo.getUrl()) ||
                          []; // 사진 추가

                        setMarkers(prevMarkers =>
                          prevMarkers.map(m =>
                            m.placeId === marker.placeId ? {...m, ...marker} : m
                          )
                        );
                      }
                    }
                  );
                }
                return marker;
              });

              setMarkers(
                nearbyMarkers.filter(
                  marker => marker !== null
                ) as CustomMarker[]
              );
              map.fitBounds(bounds);
              setHasSearched(true);
            }
          });
        } else if (selectedPlace) {
          const geocoder = new window.google.maps.Geocoder();
          const searchQuery = searchLocation
            ? `${selectedPlace} ${searchLocation}`
            : selectedPlace;

          geocoder.geocode({address: selectedPlace}, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              const viewport = results[0].geometry.viewport;
              const location = results[0].geometry.location;

              if (viewport) {
                bounds.union(viewport);
              } else {
                bounds.extend(location);
              }

              if (searchLocation && searchLocation.trim() !== '') {
                const request = {
                  query: searchQuery,
                  bounds: bounds,
                  language: 'ko',
                  fields: [
                    'geometry',
                    'name',
                    'formatted_address',
                    'rating',
                    'types',
                    'photos', // 사진 필드 추가
                  ],
                };

                service.textSearch(request, (results, status) => {
                  if (status === 'OK' && results) {
                    const searchMarkers = results.map(result => {
                      const marker = createMarker(result);
                      if (marker) {
                        bounds.extend(marker.position);

                        service.getDetails(
                          {
                            placeId: result.place_id ?? '',
                            language: 'ko',
                            fields: ['reviews', 'opening_hours', 'photos'], // 사진 필드 추가
                          },
                          (placeDetails, detailsStatus) => {
                            if (detailsStatus === 'OK' && placeDetails) {
                              marker.reviews =
                                placeDetails.reviews?.map(review => ({
                                  authorName: review.author_name,
                                  authorProfilePhoto: review.profile_photo_url,
                                  reviewText: review.text,
                                  rating: review.rating,
                                })) || [];
                              marker.detailedOpeningHours =
                                placeDetails.opening_hours?.weekday_text || [];
                              marker.photos =
                                placeDetails.photos?.map(photo =>
                                  photo.getUrl()
                                ) || []; // 사진 추가

                              setMarkers(prevMarkers =>
                                prevMarkers.map(m =>
                                  m.placeId === marker.placeId
                                    ? {...m, ...marker}
                                    : m
                                )
                              );
                            }
                          }
                        );
                      }
                      return marker;
                    });

                    setMarkers(
                      searchMarkers.filter(
                        marker => marker !== null
                      ) as CustomMarker[]
                    );
                    if (searchMarkers.length === 1) {
                      map.setCenter(
                        searchMarkers[0]?.position || defaultCenter
                      );
                      map.setZoom(15);
                    } else {
                      const padding = 0;
                      map.fitBounds(bounds, padding);
                    }

                    setHasSearched(true);
                  }
                });
              } else {
                map.fitBounds(bounds);
              }
            }
          });
        }
      }
    };

    useEffect(() => {
      if (map) {
        map.addListener('zoom_changed', () => {
          setIsInteraction(true);
        });

        map.addListener('dragend', () => {
          setIsInteraction(true);
        });

        map.addListener('idle', () => {
          setIsInteraction(false);
        });
      }
    }, [map]);

    useEffect(() => {
      if (map && !isInteraction && !hasSearched) {
        setBoundsFromSelectedPlaceAndSearch();
      }
    }, [map, searchLocation, selectedPlace, isInteraction, hasSearched]);

    const mapOptions = {
      zoomControl: true,
      scrollwheel: true,
      disableDefaultUI: false,
    };

    useEffect(() => {
      if (isLoaded) {
        setDefaultMarker({
          url: defaultMarkerIcon,
          scaledSize: new google.maps.Size(20, 20),
        });
      }
    }, [isLoaded]);

    return (
      <>
        {isLoaded ? (
          <div css={MapSpaceStyle}>
            <GoogleMap
              mapContainerStyle={containerStyle(!!selectedMarker)}
              center={defaultCenter}
              zoom={12}
              onLoad={mapInstance => setMap(mapInstance)}
              options={mapOptions}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.position}
                  title={marker.title}
                  onClick={() => handleMarkerClick(marker)}
                  icon={selectedMarker === marker ? null : defaultMarker}
                />
              ))}
            </GoogleMap>
            {selectedMarker && showMapSearch && (
              <div css={MapDetailLayout}>
                <MarkerDetail />
              </div>
            )}
          </div>
        ) : (
          <>로딩중...</>
        )}
      </>
    );
  }
);

PlusSelfGoogleMap.displayName = 'PlusSelfGoogleMap';

export default PlusSelfGoogleMap;
