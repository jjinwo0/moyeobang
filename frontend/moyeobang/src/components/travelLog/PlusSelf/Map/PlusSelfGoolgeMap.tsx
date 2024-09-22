// import {
//   useEffect,
//   useRef,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from 'react';

// // Forwarding Ref를 사용해 부모에서 메서드를 호출할 수 있게 함
// const PlusSelfGoogleMap = forwardRef((props, ref) => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [googleMap, setGoogleMap] = useState<google.maps.Map>();

//   useImperativeHandle(ref, () => ({
//     setCenter: (lat: number, lng: number) => {
//       if (googleMap) {
//         googleMap.setCenter({lat, lng});
//       }
//     },
//   }));

//   useEffect(() => {
//     if (mapRef.current) {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: {
//           lat: 37.5,
//           lng: 127.0,
//         },
//         zoom: 16,
//       });
//       setGoogleMap(map);
//     }
//   }, []);

//   return <div ref={mapRef} id="map" style={{minHeight: '100vh'}} />;
// });

// export default PlusSelfGoogleMap;

// PlusSelfGoogleMap.tsx
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

    useImperativeHandle(ref, () => ({
      setCenter: (lat: number, lng: number) => {
        if (googleMap) {
          googleMap.setCenter({lat, lng});
        }
      },
    }));

    useEffect(() => {
      if (mapRef.current && initialLocation) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({address: initialLocation}, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            const map = new window.google.maps.Map(mapRef.current, {
              center: {
                lat: location.lat(),
                lng: location.lng(),
              },
              zoom: 16,
            });
            setGoogleMap(map);
          }
          // } else {
          //   const map = new window.google.maps.Map(mapRef.current, {
          //     center: {
          //       lat: 37.5,
          //       lng: 127.0,
          //     },
          //     zoom: 16,
          //   });
          //   setGoogleMap(map);
          // }
        });
      }
    }, [initialLocation]);

    return (
      <div ref={mapRef} id="map" style={{minHeight: '100vh', width: '100%'}} />
    );
  }
);

export default PlusSelfGoogleMap;
