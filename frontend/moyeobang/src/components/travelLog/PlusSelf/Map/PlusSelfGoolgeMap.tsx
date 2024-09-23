// import React, {
//   useEffect,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from 'react';
// import {GoogleMap, useLoadScript} from '@react-google-maps/api';
// import {MapLayout} from '@/components/travelLog/PlusSelf/Map/ScheduleMapSearchStyle';
// import useTravelDetailStore from '@/store/useTravelDetailStore';

// const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;

// const containerStyle = {
//   width: '100%',
//   height: '100vh',
// };

// const defaultCenter = {lat: 37.5665, lng: 126.978}; // 기본 중심: 서울

// // PlusSelfGoogleMap 컴포넌트
// const PlusSelfGoogleMap = forwardRef(
//   ({searchLocation}: {searchLocation: string | undefined}, ref) => {
//     const [map, setMap] = useState<google.maps.Map | null>(null);
//     const {travelPlaceList} = useTravelDetailStore(); // 장소 리스트 가져오기

//     // Google Maps API 로드
//     const {isLoaded} = useLoadScript({
//       googleMapsApiKey: mapAPI,
//       libraries: ['places'], // 'places' 라이브러리를 사용
//     });

//     // 부모에서 사용할 수 있는 메서드 제공 (지도 중심 변경)
//     useImperativeHandle(ref, () => ({
//       setCenter: (lat: number, lng: number) => {
//         if (map) {
//           map.setCenter({lat, lng});
//         }
//       },
//     }));

//     // Google Map 객체 로드 후 설정
//     const onLoad = (mapInstance: google.maps.Map) => {
//       setMap(mapInstance); // 지도 객체 저장
//     };

//     // travelPlaceList의 장소들로 경계 설정
//     const setBoundsFromPlaces = () => {
//       if (map && travelPlaceList.length > 0) {
//         const bounds = new window.google.maps.LatLngBounds();
//         const geocoder = new window.google.maps.Geocoder();

//         const geocodePlaces = travelPlaceList.map(place => {
//           return new Promise<void>((resolve, reject) => {
//             geocoder.geocode({address: place}, (results, status) => {
//               if (status === 'OK' && results && results[0]) {
//                 const location = results[0].geometry.location;
//                 bounds.extend(location); // 각 장소 위치를 경계에 추가
//                 resolve();
//               } else {
//                 console.error(`장소를 찾을 수 없습니다: ${place}`);
//                 reject();
//               }
//             });
//           });
//         });

//         // 모든 장소에 대한 지오코딩 완료 후 경계 맞춤
//         Promise.all(geocodePlaces)
//           .then(() => {
//             if (!bounds.isEmpty()) {
//               map.fitBounds(bounds); // 경계가 설정된 경우 지도에 적용
//             }
//           })
//           .catch(err => console.error('Geocode 오류:', err));
//       }
//     };

//     // 사용자가 검색한 장소에 따라 지도 중심 변경
//     const setCenterFromSearch = () => {
//       if (map && searchLocation && searchLocation.trim() !== '') {
//         const service = new window.google.maps.places.PlacesService(map);

//         const request = {
//           query: searchLocation,
//           fields: ['geometry'],
//         };

//         service.findPlaceFromQuery(request, (results, status) => {
//           if (
//             status === window.google.maps.places.PlacesServiceStatus.OK &&
//             results &&
//             results[0]
//           ) {
//             const location = results[0].geometry?.location;
//             if (location) {
//               map.setCenter(location); // 검색된 장소로 지도 중심 변경
//               if (results[0].geometry?.viewport) {
//                 map.fitBounds(results[0].geometry.viewport); // 경계 맞춤
//               }
//             }
//           } else {
//             alert('장소를 찾을 수 없습니다.');
//           }
//         });
//       }
//     };

//     // 초기 지도를 설정하는 로직
//     useEffect(() => {
//       if (map) {
//         if (searchLocation && searchLocation.trim() !== '') {
//           // 1. searchLocation이 있으면 해당 장소를 중점으로 설정
//           setCenterFromSearch();
//         } else if (travelPlaceList.length > 0) {
//           // 2. searchLocation이 없고 travelPlaceList가 있으면 해당 장소들로 경계 설정
//           setBoundsFromPlaces();
//         } else {
//           // 3. searchLocation과 travelPlaceList 모두 없으면 서울 중심으로 설정
//           map.setCenter(defaultCenter);
//           map.setZoom(12); // 기본 서울 줌 레벨
//         }
//       }
//     }, [map, searchLocation, travelPlaceList]);

//     return (
//       <>
//         {isLoaded ? (
//           <GoogleMap
//             mapContainerStyle={containerStyle} // 지도 컨테이너 스타일
//             center={defaultCenter} // 기본 중심 설정 (초기 로딩 시)
//             zoom={12} // 기본 줌 레벨
//             onLoad={onLoad} // 지도 로드 시 onLoad 호출
//           />
//         ) : (
//           <>로딩중...</> // 지도 로드 전 로딩 메시지
//         )}
//       </>
//     );
//   }
// );

// PlusSelfGoogleMap.displayName = 'PlusSelfGoogleMap';

// export default PlusSelfGoogleMap;

// 2번째 버전, 검색은 됨
// import React, {
//   useEffect,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from 'react';
// import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
// import {MapLayout} from '@/components/travelLog/PlusSelf/Map/ScheduleMapSearchStyle';
// import useTravelDetailStore from '@/store/useTravelDetailStore';

// const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;

// const containerStyle = {
//   width: '100%',
//   height: '100vh',
// };

// const defaultCenter = {lat: 37.5665, lng: 126.978}; // 기본 중심: 서울

// // PlusSelfGoogleMap 컴포넌트
// const PlusSelfGoogleMap = forwardRef(
//   ({searchLocation}: {searchLocation: string | undefined}, ref) => {
//     const [map, setMap] = useState<google.maps.Map | null>(null);
//     const [markers, setMarkers] = useState<google.maps.MarkerOptions[]>([]); // 마커 상태 관리
//     const {travelPlaceList} = useTravelDetailStore(); // 장소 리스트 가져오기

//     // Google Maps API 로드
//     const {isLoaded} = useLoadScript({
//       googleMapsApiKey: mapAPI,
//       libraries: ['places'], // 'places' 라이브러리를 사용
//     });

//     // 부모에서 사용할 수 있는 메서드 제공 (지도 중심 변경)
//     useImperativeHandle(ref, () => ({
//       setCenter: (lat: number, lng: number) => {
//         if (map) {
//           map.setCenter({lat, lng});
//         }
//       },
//     }));

//     // Google Map 객체 로드 후 설정
//     const onLoad = (mapInstance: google.maps.Map) => {
//       setMap(mapInstance); // 지도 객체 저장
//     };

//     // travelPlaceList의 장소들로 경계 설정
//     const setBoundsFromPlaces = () => {
//       if (map && travelPlaceList.length > 0) {
//         const bounds = new window.google.maps.LatLngBounds();
//         const geocoder = new window.google.maps.Geocoder();

//         const geocodePlaces = travelPlaceList.map(place => {
//           return new Promise<void>((resolve, reject) => {
//             geocoder.geocode({address: place}, (results, status) => {
//               if (status === 'OK' && results && results[0]) {
//                 const location = results[0].geometry.location;
//                 bounds.extend(location); // 각 장소 위치를 경계에 추가
//                 resolve();
//               } else {
//                 console.error(`장소를 찾을 수 없습니다: ${place}`);
//                 reject();
//               }
//             });
//           });
//         });

//         // 모든 장소에 대한 지오코딩 완료 후 경계 맞춤
//         Promise.all(geocodePlaces)
//           .then(() => {
//             if (!bounds.isEmpty()) {
//               map.fitBounds(bounds); // 경계가 설정된 경우 지도에 적용
//             }
//           })
//           .catch(err => console.error('Geocode 오류:', err));
//       }
//     };

//     // 사용자가 검색한 장소에 따라 지도 중심 변경 및 장소 표시
//     const setCenterFromSearch = () => {
//       if (map && searchLocation && searchLocation.trim() !== '') {
//         const service = new window.google.maps.places.PlacesService(map);

//         const request = {
//           query: searchLocation,
//           fields: ['geometry'],
//         };

//         service.findPlaceFromQuery(request, (results, status) => {
//           if (
//             status === window.google.maps.places.PlacesServiceStatus.OK &&
//             results &&
//             results[0]
//           ) {
//             const location = results[0].geometry?.location;
//             if (location) {
//               map.setCenter(location); // 검색된 장소로 지도 중심 변경
//               if (results[0].geometry?.viewport) {
//                 map.fitBounds(results[0].geometry.viewport); // 경계 맞춤
//               }

//               // 검색된 위치 주변 장소 찾기
//               const nearbyRequest = {
//                 location: location,
//                 radius: 5000, // 5km 반경 내에서 장소 검색
//                 keyword: searchLocation, // 사용자가 검색한 키워드를 기준으로 장소 찾기
//               };

//               service.nearbySearch(
//                 nearbyRequest,
//                 (nearbyResults, nearbyStatus) => {
//                   if (
//                     nearbyStatus ===
//                       window.google.maps.places.PlacesServiceStatus.OK &&
//                     nearbyResults
//                   ) {
//                     const newMarkers = nearbyResults.map(result => ({
//                       position: result.geometry?.location,
//                       title: result.name,
//                     }));
//                     setMarkers(newMarkers); // 마커 업데이트
//                   }
//                 }
//               );
//             }
//           } else {
//             alert('장소를 찾을 수 없습니다.');
//           }
//         });
//       }
//     };

//     // 초기 지도 설정
//     useEffect(() => {
//       if (map) {
//         if (searchLocation && searchLocation.trim() !== '') {
//           setCenterFromSearch(); // 검색된 장소 중심으로 설정
//         } else if (travelPlaceList.length > 0) {
//           setBoundsFromPlaces(); // travelPlaceList 경계 설정
//         } else {
//           map.setCenter(defaultCenter); // 기본 서울 중심 설정
//           map.setZoom(12);
//         }
//       }
//     }, [map, searchLocation, travelPlaceList]);

//     return (
//       <>
//         {isLoaded ? (
//           <GoogleMap
//             mapContainerStyle={containerStyle} // 지도 컨테이너 스타일
//             center={defaultCenter} // 기본 중심 설정 (초기 로딩 시)
//             zoom={12} // 기본 줌 레벨
//             onLoad={onLoad} // 지도 로드 시 onLoad 호출
//           >
//             {/* 마커를 지도에 표시 */}
//             {markers.map((marker, index) => (
//               <Marker
//                 key={index}
//                 position={marker.position}
//                 title={marker.title}
//               />
//             ))}
//           </GoogleMap>
//         ) : (
//           <>로딩중...</> // 지도 로드 전 로딩 메시지
//         )}
//       </>
//     );
//   }
// );

// PlusSelfGoogleMap.displayName = 'PlusSelfGoogleMap';

// export default PlusSelfGoogleMap;

// [*]2번

// import React, {
//   useEffect,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from 'react';
// import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
// import {MapLayout} from '@/components/travelLog/PlusSelf/Map/ScheduleMapSearchStyle';
// import useTravelDetailStore from '@/store/useTravelDetailStore';

// const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;

// const containerStyle = {
//   width: '100%',
//   height: '100vh',
// };

// const defaultCenter = {lat: 37.5665, lng: 126.978}; // 기본 중심: 서울

// // PlusSelfGoogleMap 컴포넌트
// const PlusSelfGoogleMap = forwardRef(
//   ({searchLocation}: {searchLocation: string | undefined}, ref) => {
//     const [map, setMap] = useState<google.maps.Map | null>(null);
//     const [markers, setMarkers] = useState<google.maps.MarkerOptions[]>([]); // 마커 상태 관리
//     const {travelPlaceList} = useTravelDetailStore(); // 장소 리스트 가져오기

//     // Google Maps API 로드
//     const {isLoaded} = useLoadScript({
//       googleMapsApiKey: mapAPI,
//       libraries: ['places'], // 'places' 라이브러리를 사용
//     });

//     // 부모에서 사용할 수 있는 메서드 제공 (지도 중심 변경)
//     useImperativeHandle(ref, () => ({
//       setCenter: (lat: number, lng: number) => {
//         if (map) {
//           map.setCenter({lat, lng});
//         }
//       },
//     }));

//     // Google Map 객체 로드 후 설정
//     const onLoad = (mapInstance: google.maps.Map) => {
//       setMap(mapInstance); // 지도 객체 저장
//     };

//     // travelPlaceList의 장소들로 경계 설정
//     const setBoundsFromPlaces = () => {
//       if (map && travelPlaceList.length > 0) {
//         const bounds = new window.google.maps.LatLngBounds();
//         const geocoder = new window.google.maps.Geocoder();

//         const geocodePlaces = travelPlaceList.map(place => {
//           return new Promise<void>((resolve, reject) => {
//             geocoder.geocode({address: place}, (results, status) => {
//               if (status === 'OK' && results && results[0]) {
//                 const location = results[0].geometry.location;
//                 bounds.extend(location); // 각 장소 위치를 경계에 추가
//                 resolve();
//               } else {
//                 console.error(`장소를 찾을 수 없습니다: ${place}`);
//                 reject();
//               }
//             });
//           });
//         });

//         // 모든 장소에 대한 지오코딩 완료 후 경계 맞춤
//         Promise.all(geocodePlaces)
//           .then(() => {
//             if (!bounds.isEmpty()) {
//               map.fitBounds(bounds); // 경계가 설정된 경우 지도에 적용
//             }
//           })
//           .catch(err => console.error('Geocode 오류:', err));
//       }
//     };

//     // 지도 경계를 기준으로 장소 검색
//     const searchPlacesWithinBounds = () => {
//       if (map) {
//         const bounds = map.getBounds(); // 현재 지도 경계를 가져옴
//         if (bounds) {
//           const service = new window.google.maps.places.PlacesService(map);
//           const request = {
//             bounds: bounds, // 지도 경계를 설정하여 경계 내의 장소만 검색
//             query: searchLocation, // 사용자가 검색한 키워드를 기준으로 장소 찾기
//           };

//           service.textSearch(request, (results, status) => {
//             if (
//               status === window.google.maps.places.PlacesServiceStatus.OK &&
//               results
//             ) {
//               const newMarkers = results.map(result => ({
//                 position: result.geometry?.location,
//                 title: result.name,
//               }));
//               setMarkers(newMarkers); // 마커 업데이트
//             } else {
//               alert('해당 장소를 찾을 수 없습니다.');
//             }
//           });
//         }
//       }
//     };

//     // 사용자가 검색한 장소에 따라 지도 중심 변경 및 경계 내 장소 표시
//     const setCenterFromSearch = () => {
//       if (map && searchLocation && searchLocation.trim() !== '') {
//         const service = new window.google.maps.places.PlacesService(map);

//         const request = {
//           query: searchLocation,
//           fields: ['geometry'],
//         };

//         service.findPlaceFromQuery(request, (results, status) => {
//           if (
//             status === window.google.maps.places.PlacesServiceStatus.OK &&
//             results &&
//             results[0]
//           ) {
//             const location = results[0].geometry?.location;
//             if (location) {
//               map.setCenter(location); // 검색된 장소로 지도 중심 변경
//               if (results[0].geometry?.viewport) {
//                 map.fitBounds(results[0].geometry.viewport); // 경계 맞춤
//               }

//               // 검색된 위치의 경계 내 장소 표시
//               searchPlacesWithinBounds();
//             }
//           } else {
//             alert('장소를 찾을 수 없습니다.');
//           }
//         });
//       }
//     };

//     // 초기 지도 설정
//     useEffect(() => {
//       if (map) {
//         if (searchLocation && searchLocation.trim() !== '') {
//           setCenterFromSearch(); // 검색된 장소 중심으로 설정
//         } else if (travelPlaceList.length > 0) {
//           setBoundsFromPlaces(); // travelPlaceList 경계 설정
//         } else {
//           map.setCenter(defaultCenter); // 기본 서울 중심 설정
//           map.setZoom(12);
//         }
//       }
//     }, [map, searchLocation, travelPlaceList]);

//     // 지도 중심이 변경될 때마다 경계 내 장소 검색
//     useEffect(() => {
//       if (map) {
//         map.addListener('idle', searchPlacesWithinBounds); // 지도가 움직인 후 멈출 때 경계 내 검색
//       }
//     }, [map]);

//     return (
//       <>
//         {isLoaded ? (
//           <GoogleMap
//             mapContainerStyle={containerStyle} // 지도 컨테이너 스타일
//             center={defaultCenter} // 기본 중심 설정 (초기 로딩 시)
//             zoom={12} // 기본 줌 레벨
//             onLoad={onLoad} // 지도 로드 시 onLoad 호출
//           >
//             {/* 마커를 지도에 표시 */}
//             {markers.map((marker, index) => (
//               <Marker
//                 key={index}
//                 position={marker.position}
//                 title={marker.title}
//               />
//             ))}
//           </GoogleMap>
//         ) : (
//           <>로딩중...</> // 지도 로드 전 로딩 메시지
//         )}
//       </>
//     );
//   }
// );

// PlusSelfGoogleMap.displayName = 'PlusSelfGoogleMap';

// export default PlusSelfGoogleMap;

// [*] 3번
// import React, {
//   useEffect,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from 'react';
// import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';

// const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;

// const containerStyle = {
//   width: '100%',
//   height: '100vh',
// };

// const defaultCenter = {lat: 37.5665, lng: 126.978}; // 기본 중심: 서울

// // PlusSelfGoogleMap 컴포넌트
// const PlusSelfGoogleMap = forwardRef(
//   ({searchLocation}: {searchLocation: string | undefined}, ref) => {
//     const [map, setMap] = useState<google.maps.Map | null>(null);
//     const [markers, setMarkers] = useState<google.maps.MarkerOptions[]>([]); // 마커 상태 관리

//     // Google Maps API 로드
//     const {isLoaded} = useLoadScript({
//       googleMapsApiKey: mapAPI,
//       libraries: ['places'], // 'places' 라이브러리를 사용
//     });

//     // 부모에서 사용할 수 있는 메서드 제공 (지도 중심 변경)
//     useImperativeHandle(ref, () => ({
//       setCenter: (lat: number, lng: number) => {
//         if (map) {
//           map.setCenter({lat, lng});
//         }
//       },
//     }));

//     // Google Map 객체 로드 후 설정
//     const onLoad = (mapInstance: google.maps.Map) => {
//       setMap(mapInstance); // 지도 객체 저장
//     };

//     // 사용자가 검색한 장소에 따라 지도 중심 변경 및 경계 내 장소 표시
//     const setCenterFromSearch = () => {
//       if (map && searchLocation && searchLocation.trim() !== '') {
//         const service = new window.google.maps.places.PlacesService(map);

//         const request = {
//           query: searchLocation,
//           fields: ['geometry', 'name'],
//         };

//         service.textSearch(request, (results, status) => {
//           if (
//             status === window.google.maps.places.PlacesServiceStatus.OK &&
//             results &&
//             results.length > 0
//           ) {
//             const bounds = new window.google.maps.LatLngBounds();
//             const newMarkers = results
//               .map(result => {
//                 const location = result.geometry?.location;
//                 if (location) {
//                   bounds.extend(location); // 각 검색된 장소의 위치를 경계에 추가
//                   return {
//                     position: location,
//                     title: result.name, // 장소 이름을 타이틀로 설정
//                   };
//                 }
//                 return null;
//               })
//               .filter(marker => marker !== null);

//             setMarkers(newMarkers as google.maps.MarkerOptions[]);

//             // 경계가 설정되었으면 지도에 적용
//             if (!bounds.isEmpty()) {
//               map.fitBounds(bounds);
//             }
//           } else {
//             alert('장소를 찾을 수 없습니다.');
//           }
//         });
//       }
//     };

//     // 초기 지도 설정
//     useEffect(() => {
//       if (map && searchLocation && searchLocation.trim() !== '') {
//         setCenterFromSearch(); // 검색된 장소 중심으로 설정 및 마커 표시
//       }
//     }, [map, searchLocation]);

//     return (
//       <>
//         {isLoaded ? (
//           <GoogleMap
//             mapContainerStyle={containerStyle} // 지도 컨테이너 스타일
//             center={defaultCenter} // 기본 중심 설정 (초기 로딩 시)
//             zoom={12} // 기본 줌 레벨
//             onLoad={onLoad} // 지도 로드 시 onLoad 호출
//           >
//             {/* 마커를 지도에 표시 */}
//             {markers.map((marker, index) => (
//               <Marker
//                 key={index}
//                 position={marker.position}
//                 title={marker.title}
//               />
//             ))}
//           </GoogleMap>
//         ) : (
//           <>로딩중...</> // 지도 로드 전 로딩 메시지
//         )}
//       </>
//     );
//   }
// );

// PlusSelfGoogleMap.displayName = 'PlusSelfGoogleMap';

// export default PlusSelfGoogleMap;

// [*] 4번
// import React, {
//   useEffect,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from 'react';
// import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
// import useTravelDetailStore from '@/store/useTravelDetailStore';

// const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;

// const containerStyle = {
//   width: '100%',
//   height: '100vh',
// };

// const defaultCenter = {lat: 37.5665, lng: 126.978}; // 기본 중심: 서울

// // PlusSelfGoogleMap 컴포넌트
// const PlusSelfGoogleMap = forwardRef(
//   ({searchLocation}: {searchLocation: string | undefined}, ref) => {
//     const [map, setMap] = useState<google.maps.Map | null>(null);
//     const [markers, setMarkers] = useState<google.maps.MarkerOptions[]>([]); // 마커 상태 관리
//     const {travelPlaceList} = useTravelDetailStore(); // 장소 리스트 가져오기

//     // Google Maps API 로드
//     const {isLoaded} = useLoadScript({
//       googleMapsApiKey: mapAPI,
//       libraries: ['places'], // 'places' 라이브러리를 사용
//     });

//     // 부모에서 사용할 수 있는 메서드 제공 (지도 중심 변경)
//     useImperativeHandle(ref, () => ({
//       setCenter: (lat: number, lng: number) => {
//         if (map) {
//           map.setCenter({lat, lng});
//         }
//       },
//     }));

//     // Google Map 객체 로드 후 설정
//     const onLoad = (mapInstance: google.maps.Map) => {
//       setMap(mapInstance); // 지도 객체 저장
//     };

//     // travelPlaceList의 장소들로 경계 설정
//     const setBoundsFromPlaces = () => {
//       if (map && travelPlaceList.length > 0) {
//         const bounds = new window.google.maps.LatLngBounds();
//         const geocoder = new window.google.maps.Geocoder();

//         const geocodePlaces = travelPlaceList.map(place => {
//           return new Promise<void>((resolve, reject) => {
//             geocoder.geocode({address: place}, (results, status) => {
//               if (status === 'OK' && results && results[0]) {
//                 const location = results[0].geometry.location;
//                 bounds.extend(location); // 각 장소 위치를 경계에 추가
//                 resolve();
//               } else {
//                 console.error(`장소를 찾을 수 없습니다: ${place}`);
//                 reject();
//               }
//             });
//           });
//         });

//         // 모든 장소에 대한 지오코딩 완료 후 경계 맞춤
//         Promise.all(geocodePlaces)
//           .then(() => {
//             if (!bounds.isEmpty()) {
//               const padding = 100; // 패딩을 추가하여 지도에 적용
//               map.fitBounds(bounds, padding); // 경계가 설정된 경우 지도에 적용
//             }
//           })
//           .catch(err => console.error('Geocode 오류:', err));
//       }
//     };

//     // 사용자가 검색한 장소에 따라 지도 중심 변경 및 경계 내 장소 표시
//     const setCenterFromSearch = () => {
//       if (map && searchLocation && searchLocation.trim() !== '') {
//         const service = new window.google.maps.places.PlacesService(map);

//         const request = {
//           query: searchLocation,
//           bounds: map.getBounds(), // 현재 지도 경계를 기준으로 검색
//           fields: ['geometry', 'name'],
//         };

//         service.textSearch(request, (results, status) => {
//           if (
//             status === window.google.maps.places.PlacesServiceStatus.OK &&
//             results &&
//             results.length > 0
//           ) {
//             const bounds = new window.google.maps.LatLngBounds();
//             const newMarkers = results
//               .map(result => {
//                 const location = result.geometry?.location;
//                 if (location) {
//                   bounds.extend(location); // 각 검색된 장소의 위치를 경계에 추가
//                   return {
//                     position: location,
//                     title: result.name, // 장소 이름을 타이틀로 설정
//                   };
//                 }
//                 return null;
//               })
//               .filter(marker => marker !== null);

//             setMarkers(newMarkers as google.maps.MarkerOptions[]);

//             // 경계가 설정되었으면 패딩을 추가하여 지도에 적용
//             if (!bounds.isEmpty()) {
//               const padding = 100; // 패딩 값 추가 (100px 정도로 넓게 설정)
//               map.fitBounds(bounds, padding); // 패딩을 사용하여 모든 장소가 잘 보이도록 적용
//             }
//           } else {
//             alert('장소를 찾을 수 없습니다.');
//           }
//         });
//       }
//     };

//     // 초기 지도 설정
//     useEffect(() => {
//       if (map) {
//         if (searchLocation && searchLocation.trim() !== '') {
//           setCenterFromSearch(); // 검색된 장소 중심으로 설정 및 마커 표시
//         } else if (travelPlaceList.length > 0) {
//           setBoundsFromPlaces(); // travelPlaceList 경계 설정
//         } else {
//           map.setCenter(defaultCenter); // 기본 서울 중심 설정
//           map.setZoom(12);
//         }
//       }
//     }, [map, searchLocation, travelPlaceList]);

// 지도 옵션 설정 (줌 기능을 활성화)
//     const mapOptions = {
//       zoomControl: true, // 줌 컨트롤 허용
//       scrollwheel: true, // 스크롤 줌 허용
//       disableDefaultUI: false, // 기본 UI 사용 허용
//     };

//     // 지도 중심이 변경될 때마다 경계 내 장소 검색
//     useEffect(() => {
//       if (map) {
//         map.addListener('idle', () => {
//           if (searchLocation) {
//             setCenterFromSearch(); // 검색된 장소 중심으로 설정 및 마커 표시
//           }
//         });
//       }
//     }, [map, searchLocation]);

//     return (
//       <>
//         {isLoaded ? (
//           <GoogleMap
//             mapContainerStyle={containerStyle} // 지도 컨테이너 스타일
//             center={defaultCenter} // 기본 중심 설정 (초기 로딩 시)
//             zoom={12} // 기본 줌 레벨
//             onLoad={onLoad} // 지도 로드 시 onLoad 호출
//             options={mapOptions} // 줌 및 UI 설정
//           >
//             {/* 마커를 지도에 표시 */}
//             {markers.map((marker, index) => (
//               <Marker
//                 key={index}
//                 position={marker.position}
//                 title={marker.title}
//               />
//             ))}
//           </GoogleMap>
//         ) : (
//           <>로딩중...</> // 지도 로드 전 로딩 메시지
//         )}
//       </>
//     );
//   }
// );

// PlusSelfGoogleMap.displayName = 'PlusSelfGoogleMap';

// export default PlusSelfGoogleMap;
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import useTravelDetailStore from '@/store/useTravelDetailStore';

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
    const {travelPlaceList} = useTravelDetailStore(); // 장소 리스트 가져오기
    const [boundsChanged, setBoundsChanged] = useState(false); // 경계가 변경되었는지 추적
    const [isZooming, setIsZooming] = useState(false); // 줌 이벤트 추적

    // Google Maps API 로드
    const {isLoaded} = useLoadScript({
      googleMapsApiKey: mapAPI,
      libraries: ['places'], // 'places' 라이브러리를 사용
    });

    // 부모에서 사용할 수 있는 메서드 제공 (지도 중심 변경)
    useImperativeHandle(ref, () => ({
      setCenter: (lat: number, lng: number) => {
        if (map) {
          map.setCenter({lat, lng});
        }
      },
    }));

    // Google Map 객체 로드 후 설정
    const onLoad = (mapInstance: google.maps.Map) => {
      setMap(mapInstance); // 지도 객체 저장
    };

    // travelPlaceList의 장소들로 경계 설정
    const setBoundsFromPlaces = () => {
      if (map && travelPlaceList.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        const geocoder = new window.google.maps.Geocoder();

        const geocodePlaces = travelPlaceList.map(place => {
          return new Promise<void>((resolve, reject) => {
            geocoder.geocode({address: place}, (results, status) => {
              if (status === 'OK' && results && results[0]) {
                const location = results[0].geometry.location;
                bounds.extend(location); // 각 장소 위치를 경계에 추가
                resolve();
              } else {
                console.error(`장소를 찾을 수 없습니다: ${place}`);
                reject();
              }
            });
          });
        });

        // 모든 장소에 대한 지오코딩 완료 후 경계 맞춤
        Promise.all(geocodePlaces)
          .then(() => {
            if (!bounds.isEmpty()) {
              const padding = 150; // 패딩을 추가하여 지도에 적용
              map.fitBounds(bounds, padding); // 경계가 설정된 경우 지도에 적용
              setBoundsChanged(true); // 경계가 변경되었음을 표시
            }
          })
          .catch(err => console.error('Geocode 오류:', err));
      }
    };

    // 사용자가 검색한 장소에 따라 지도 중심 변경 및 경계 내 장소 표시
    const setCenterFromSearch = () => {
      if (map && searchLocation && searchLocation.trim() !== '') {
        const service = new window.google.maps.places.PlacesService(map);

        const request = {
          query: searchLocation,
          bounds: map.getBounds(), // 현재 지도 경계를 기준으로 검색
          fields: ['geometry', 'name'],
        };

        service.textSearch(request, (results, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            results &&
            results.length > 0
          ) {
            const bounds = new window.google.maps.LatLngBounds();
            const newMarkers = results
              .map(result => {
                const location = result.geometry?.location;
                const viewport = result.geometry?.viewport; // viewport 가져오기

                if (location) {
                  bounds.extend(location); // 각 검색된 장소의 위치를 경계에 추가
                  return {
                    position: location,
                    title: result.name, // 장소 이름을 타이틀로 설정
                  };
                }

                // viewport가 있으면 경계를 해당 장소 전체로 설정
                if (viewport) {
                  const resultBounds = new window.google.maps.LatLngBounds(
                    new window.google.maps.LatLng(
                      viewport.south,
                      viewport.west
                    ),
                    new window.google.maps.LatLng(viewport.north, viewport.east)
                  );
                  map.fitBounds(resultBounds); // 검색된 결과의 viewport로 경계 설정
                }

                return null;
              })
              .filter(marker => marker !== null);

            setMarkers(newMarkers as google.maps.MarkerOptions[]);

            // 경계가 설정되었으면 패딩을 추가하여 지도에 적용
            if (!bounds.isEmpty() && !isZooming) {
              const padding = 150; // 패딩 값 추가 (150px 정도로 넓게 설정)
              map.fitBounds(bounds, padding); // 패딩을 사용하여 모든 장소가 잘 보이도록 적용
              setBoundsChanged(true); // 경계 변경 상태 표시
            }
          } else if (
            status ===
            window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS
          ) {
            // 현재 경계 내에 검색 결과가 없을 때 지도 중심 주변에서 검색
            const nearbyRequest = {
              query: searchLocation,
              location: map.getCenter(), // 지도 중심 좌표로 검색
              radius: 5000, // 5km 반경 내에서 검색
            };
            service.textSearch(nearbyRequest, (nearbyResults, nearbyStatus) => {
              if (
                nearbyStatus ===
                  window.google.maps.places.PlacesServiceStatus.OK &&
                nearbyResults.length > 0
              ) {
                const nearbyBounds = new window.google.maps.LatLngBounds();
                const nearbyMarkers = nearbyResults
                  .map(result => {
                    const location = result.geometry?.location;
                    if (location) {
                      nearbyBounds.extend(location);
                      return {
                        position: location,
                        title: result.name,
                      };
                    }
                    return null;
                  })
                  .filter(marker => marker !== null);

                setMarkers(nearbyMarkers as google.maps.MarkerOptions[]);

                if (!nearbyBounds.isEmpty()) {
                  const padding = 50;
                  map.fitBounds(nearbyBounds, padding); // 지도에 경계를 적용하여 근처 결과 표시
                  setBoundsChanged(true);
                }
              } else {
                alert('근처에서도 해당 장소를 찾을 수 없습니다.');
              }
            });
          }
        });
      }
    };

    // 줌 이벤트 핸들링
    useEffect(() => {
      if (map) {
        map.addListener('zoom_changed', () => {
          setIsZooming(true); // 줌 이벤트가 발생했음을 표시
        });

        map.addListener('idle', () => {
          setIsZooming(false); // 줌 이벤트가 종료되었음을 표시
        });
      }
    }, [map]);

    // 지도 변경(줌, 이동) 시 검색을 중복해서 하지 않도록 idle 상태에서 조건을 검토
    useEffect(() => {
      if (map && boundsChanged) {
        map.addListener('idle', () => {
          setBoundsChanged(false); // idle 시 경계가 한 번만 변경되도록 설정
          if (searchLocation && !isZooming) {
            // 줌 중이 아닐 때만 검색
            setCenterFromSearch(); // 검색된 장소 중심으로 설정 및 마커 표시
          }
        });
      }
    }, [map, boundsChanged, searchLocation, isZooming]);

    // 초기 지도 설정
    useEffect(() => {
      if (map) {
        if (searchLocation && searchLocation.trim() !== '') {
          setCenterFromSearch(); // 검색된 장소 중심으로 설정 및 마커 표시
        } else if (travelPlaceList.length > 0) {
          setBoundsFromPlaces(); // travelPlaceList 경계 설정
        } else {
          map.setCenter(defaultCenter); // 기본 서울 중심 설정
          map.setZoom(12);
        }
      }
    }, [map, searchLocation, travelPlaceList]);

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
            onLoad={onLoad} // 지도 로드 시 onLoad 호출
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
