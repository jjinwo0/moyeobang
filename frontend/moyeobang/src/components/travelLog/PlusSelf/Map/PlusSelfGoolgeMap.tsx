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

import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

// Forwarding Ref를 사용해 부모에서 메서드를 호출할 수 있게 함
const PlusSelfGoogleMap = forwardRef(
  ({initialLocation}: {initialLocation: string | undefined}, ref) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null);

    // 부모 컴포넌트에서 setCenter 함수를 호출하여 지도의 중심을 변경할 수 있게 함
    useImperativeHandle(ref, () => ({
      setCenter: (lat: number, lng: number) => {
        if (googleMap) {
          googleMap.setCenter({lat, lng});
        }
      },
    }));

    useEffect(() => {
      if (mapRef.current) {
        // 초기값이 없을 경우 기본 위치를 '제주도'로 설정
        const locationToSearch =
          initialLocation && initialLocation.trim() !== ''
            ? initialLocation
            : '제주도';

        // Google Map 객체를 생성 (위도와 경도 없이 기본 설정만 사용)
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 16, // 기본 줌 레벨
        });
        setGoogleMap(map);

        // Google Places API를 사용하여 장소 검색 서비스 생성
        const service = new window.google.maps.places.PlacesService(map);

        // PlacesService를 사용해 사용자가 입력한 장소(POI)를 검색
        service.findPlaceFromQuery(
          {
            query: locationToSearch, // 검색할 장소 이름 또는 주소
            fields: ['geometry'], // geometry 필드를 요청하여 위치 정보를 가져옴
          },
          (results, status) => {
            if (status === 'OK' && results && results[0].geometry) {
              const location = results[0].geometry.location; // 검색된 장소의 위치
              const bounds = results[0].geometry.viewport; // 장소의 경계를 가져옴 (뷰포트)
              map.setCenter(location); // 검색된 장소를 지도의 중심으로 설정

              // bounds가 있을 경우, 해당 경계로 지도의 뷰를 자동으로 맞춤
              if (bounds) {
                map.fitBounds(bounds); // 검색된 장소의 경계에 맞게 줌 및 위치 조정
              }
            } else {
              alert('장소를 찾을 수 없습니다.'); // 검색 실패 시 경고 메시지 출력
            }
          }
        );
      }
    }, [initialLocation]); // initialLocation이 변경될 때마다 효과 재실행

    return (
      <div ref={mapRef} id="map" style={{minHeight: '100vh', width: '100%'}} />
    );
  }
);

// 컴포넌트의 displayName을 설정하여 디버깅 시 더 쉽게 구분할 수 있게 함
PlusSelfGoogleMap.displayName = 'PlusSelfGoogleMap';

export default PlusSelfGoogleMap;
