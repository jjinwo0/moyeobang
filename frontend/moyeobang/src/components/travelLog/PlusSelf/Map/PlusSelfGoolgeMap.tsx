// import useTravelDetailStore from '@/store/useTravelDetailStore';
// import {
//   useEffect,
//   useRef,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from 'react';

// // Forwarding Ref를 사용해 부모에서 메서드를 호출할 수 있게 함
// const PlusSelfGoogleMap = forwardRef(
//   ({initialLocation}: {initialLocation: string | undefined}, ref) => {
//     const mapRef = useRef<HTMLDivElement>(null);
//     const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
//     const {travelPlaceList} = useTravelDetailStore()

//     // 부모 컴포넌트에서 setCenter 함수를 호출하여 지도의 중심을 변경할 수 있게 함
//     useImperativeHandle(ref, () => ({
//       setCenter: (lat: number, lng: number) => {
//         if (googleMap) {
//           googleMap.setCenter({lat, lng});
//         }
//       },
//     }));

//     useEffect(() => {
//       if (mapRef.current) {
//         // 초기값이 없을 경우 기본 위치를 '제주도'로 설정
//         const locationToSearch =
//           initialLocation && initialLocation.trim() !== ''
//             ? initialLocation
//             : '제주도';

//         // Google Map 객체를 생성 (위도와 경도 없이 기본 설정만 사용)
//         const map = new window.google.maps.Map(mapRef.current, {
//           zoom: 16, // 기본 줌 레벨
//         });
//         setGoogleMap(map);

//         // Google Places API를 사용하여 장소 검색 서비스 생성
//         const service = new window.google.maps.places.PlacesService(map);

//         // PlacesService를 사용해 사용자가 입력한 장소(POI)를 검색
//         service.findPlaceFromQuery(
//           {
//             query: locationToSearch, // 검색할 장소 이름 또는 주소
//             fields: ['geometry'], // geometry 필드를 요청하여 위치 정보를 가져옴
//           },
//           (results, status) => {
//             if (status === 'OK' && results && results[0].geometry) {
//               const location = results[0].geometry.location; // 검색된 장소의 위치
//               const bounds = results[0].geometry.viewport; // 장소의 경계를 가져옴 (뷰포트)
//               map.setCenter(location); // 검색된 장소를 지도의 중심으로 설정

//               // bounds가 있을 경우, 해당 경계로 지도의 뷰를 자동으로 맞춤
//               if (bounds) {
//                 map.fitBounds(bounds); // 검색된 장소의 경계에 맞게 줌 및 위치 조정
//               }
//             } else {
//               alert('장소를 찾을 수 없습니다.'); // 검색 실패 시 경고 메시지 출력
//             }
//           }
//         );
//       }
//     }, [initialLocation]); // initialLocation이 변경될 때마다 효과 재실행

//     return (
//       <div ref={mapRef} id="map" style={{minHeight: '100vh', width: '100%'}} />
//     );
//   }
// );

// // 컴포넌트의 displayName을 설정하여 디버깅 시 더 쉽게 구분할 수 있게 함
// PlusSelfGoogleMap.displayName = 'PlusSelfGoogleMap';

// export default PlusSelfGoogleMap;

// import useTravelDetailStore from '@/store/useTravelDetailStore';
// import {
//   useEffect,
//   useRef,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from 'react';

// // Forwarding Ref를 사용해 부모에서 메서드를 호출할 수 있게 함
// const PlusSelfGoogleMap = forwardRef(
//   ({searchLocation}: {searchLocation: string | undefined}, ref) => {
//     const mapRef = useRef<HTMLDivElement>(null);
//     const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
//     const {travelPlaceList} = useTravelDetailStore(); // travelPlaceList에서 장소 리스트 가져옴

//     // 부모 컴포넌트에서 setCenter 함수를 호출하여 지도의 중심을 변경할 수 있게 함
//     useImperativeHandle(ref, () => ({
//       setCenter: (lat: number, lng: number) => {
//         if (googleMap) {
//           googleMap.setCenter({lat, lng});
//         }
//       },
//     }));

//     useEffect(() => {
//       if (mapRef.current && !googleMap) {
//         // Google Map 생성
//         const map = new window.google.maps.Map(mapRef.current, {
//           zoom: 16, // 기본 줌 레벨
//           center: {lat: 37.5665, lng: 126.978}, // 서울 중심 초기 설정
//         });
//         setGoogleMap(map);
//       }
//     }, [mapRef, googleMap]);

//     useEffect(() => {
//       // `googleMap`이 초기화된 후 `travelPlaceList`로 경계 설정
//       if (googleMap && travelPlaceList && travelPlaceList.length > 0) {
//         const bounds = new window.google.maps.LatLngBounds();

//         travelPlaceList.forEach(place => {
//           if (place.lat && place.lng) {
//             const latLng = new window.google.maps.LatLng(place.lat, place.lng);
//             bounds.extend(latLng); // travelPlaceList의 장소들로 경계를 설정
//           }
//         });

//         // 경계가 비어 있지 않으면 경계 적용
//         if (!bounds.isEmpty()) {
//           googleMap.fitBounds(bounds);
//         }
//       }
//     }, [googleMap, travelPlaceList]);

//     useEffect(() => {
//       // 사용자가 검색한 `searchLocation`으로 지도 중심 변경
//       if (googleMap && searchLocation && searchLocation.trim() !== '') {
//         const geocoder = new window.google.maps.Geocoder();
//         geocoder.geocode({address: searchLocation}, (results, status) => {
//           if (status === 'OK' && results && results[0]) {
//             const location = results[0].geometry.location;

//             // 검색된 위치를 중심으로 설정
//             googleMap.setCenter(location);
//             if (results[0].geometry.viewport) {
//               googleMap.fitBounds(results[0].geometry.viewport);
//             }
//           } else {
//             alert('장소를 찾을 수 없습니다.');
//           }
//         });
//       }
//     }, [searchLocation, googleMap]);

//     return (
//       <div ref={mapRef} id="map" style={{minHeight: '100vh', width: '100%'}} />
//     );
//   }
// );

// PlusSelfGoogleMap.displayName = 'PlusSelfGoogleMap';

// export default PlusSelfGoogleMap;

import useTravelDetailStore from '@/store/useTravelDetailStore';
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

// Forwarding Ref를 사용해 부모에서 메서드를 호출할 수 있게 함
const PlusSelfGoogleMap = forwardRef(
  ({searchLocation}: {searchLocation: string | undefined}, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);
    const {travelPlaceList} = useTravelDetailStore(); // travelPlaceList에서 장소 리스트 가져옴

    // 부모 컴포넌트에서 setCenter 함수를 호출하여 지도의 중심을 변경할 수 있게 함
    useImperativeHandle(ref, () => ({
      setCenter: (lat: number, lng: number) => {
        if (googleMap) {
          googleMap.setCenter({lat, lng});
        }
      },
    }));

    // 초기 Google Map을 생성
    useEffect(() => {
      if (mapRef.current && !googleMap) {
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 16,
          center: {lat: 37.5665, lng: 126.978}, // 기본 중심은 서울
        });
        setGoogleMap(map);
      }
    }, [mapRef, googleMap]);

    // travelPlaceList의 장소 이름으로 경계 설정
    useEffect(() => {
      if (googleMap && travelPlaceList && travelPlaceList.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        const geocoder = new window.google.maps.Geocoder();

        // 모든 장소에 대해 비동기로 geocode 요청
        const geocodePlaces = travelPlaceList.map(place => {
          return new Promise<void>((resolve, reject) => {
            geocoder.geocode({address: place}, (results, status) => {
              if (status === 'OK' && results && results[0]) {
                const location = results[0].geometry.location;
                bounds.extend(location); // 경계에 위치 추가
                resolve();
              } else {
                console.error(`장소를 찾을 수 없습니다: ${place}`);
                reject();
              }
            });
          });
        });

        // 모든 장소에 대한 geocode가 완료되면 경계를 맞춤
        Promise.all(geocodePlaces)
          .then(() => {
            if (!bounds.isEmpty()) {
              googleMap.fitBounds(bounds); // 경계가 설정된 경우 지도에 적용
            }
          })
          .catch(err => console.error('Geocode 오류:', err));
      }
    }, [googleMap, travelPlaceList]);

    // 사용자가 검색한 장소에 맞춰서 지도 중심을 변경
    useEffect(() => {
      if (googleMap) {
        console.log('googleMap 초기화 완료:', googleMap); // googleMap 객체가 정상적으로 생성되었는지 확인
      }

      if (googleMap && searchLocation && searchLocation.trim() !== '') {
        const service = new window.google.maps.places.PlacesService(googleMap);
        console.log('PlacesService 초기화 완료:', service); // PlacesService 객체 로그로 확인

        const request = {
          query: searchLocation,
          fields: ['geometry'],
        };

        service.findPlaceFromQuery(request, (results, status) => {
          console.log('검색 결과:', results); // 검색 결과 확인
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            results &&
            results[0]
          ) {
            const location = results[0].geometry?.location;
            if (location) {
              googleMap.setCenter(location);
              if (results[0].geometry?.viewport) {
                googleMap.fitBounds(results[0].geometry.viewport);
              }
            }
          } else {
            alert('장소를 찾을 수 없습니다.');
          }
        });
      }
    }, [searchLocation, googleMap]); // googleMap이 완전히 생성된 이후에만 실행

    return (
      <div ref={mapRef} id="map" style={{minHeight: '100vh', width: '100%'}} />
    );
  }
);

PlusSelfGoogleMap.displayName = 'PlusSelfGoogleMap';

export default PlusSelfGoogleMap;
