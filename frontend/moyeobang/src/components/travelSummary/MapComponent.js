"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MapComponent;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
// import React, {useEffect, useState, useRef} from 'react';
// import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';
// import axios from 'axios';
// // import hearIcon from '@/assets/icons/hearIcon.png';
// import hearIcon from '@/assets/icons/heartIcon.webp';
// interface MapProps {
//   locationList: {latitude: number; longitude: number}[];
//   travelPlaceList: string[];
// }
// interface Coordinates {
//   lat: number;
//   lng: number;
// }
// export default function MapComponent({
//   locationList,
//   travelPlaceList,
// }: MapProps) {
//   const {isLoaded} = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
//   });
//   const mapRef = useRef<google.maps.Map | null>(null);
//   const [center, setCenter] = useState<Coordinates | null>(null);
//   // Geocoding API를 이용해 장소 이름에서 위도, 경도를 가져오는 함수
//   const getCoordinatesFromPlace = async (
//     placeName: string
//   ): Promise<Coordinates | null> => {
//     const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json`;
//     try {
//       const response = await axios.get(url, {
//         params: {
//           address: placeName,
//           key: apiKey,
//         },
//       });
//       const {results} = response.data;
//       if (results && results.length > 0) {
//         const location = results[0].geometry.location;
//         return {lat: location.lat, lng: location.lng};
//       } else {
//         console.error('No results found for this place:', placeName);
//         return null;
//       }
//     } catch (error) {
//       console.error('Error fetching coordinates:', error);
//       return null;
//     }
//   };
//   // 모든 장소의 위도와 경도를 가져와 평균 좌표를 계산하는 함수
//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       const coordinatesList = await Promise.all(
//         travelPlaceList.map(place => getCoordinatesFromPlace(place))
//       );
//       const validCoordinates = coordinatesList.filter(Boolean) as Coordinates[];
//       if (validCoordinates.length > 0) {
//         const averageLat =
//           validCoordinates.reduce((sum, coord) => sum + coord.lat, 0) /
//           validCoordinates.length;
//         const averageLng =
//           validCoordinates.reduce((sum, coord) => sum + coord.lng, 0) /
//           validCoordinates.length;
//         setCenter({lat: averageLat, lng: averageLng});
//       }
//     };
//     fetchCoordinates();
//   }, [travelPlaceList]);
//   // 마커를 생성하는 함수
//   const createMarkers = (map: google.maps.Map) => {
//     console.log(locationList);
//     locationList.forEach(location => {
//       new google.maps.Marker({
//         map,
//         position: {lat: location.latitude, lng: location.longitude},
//         // icon: {
//         //   path: google.maps.SymbolPath.CIRCLE, // 기본 마커 대신 원형 심볼
//         //   fillColor: '#FF0000', // 마커 색상 (빨간색)
//         //   fillOpacity: 1, // 색상 불투명도
//         //   strokeWeight: 2, // 테두리 두께
//         //   strokeColor: '#FFFFFF', // 테두리 색상 (흰색)
//         //   scale: 8, // 크기 (값을 키워서 확대)
//         // },
//         icon: {
//           url: hearIcon, // hearIcon 이미지를 마커로 사용
//           size: new google.maps.Size(18, 18), // 원본 이미지 크기 설정
//           scaledSize: new google.maps.Size(18, 18), // 이미지 크기 조정
//         },
//       });
//     });
//   };
//   const handleMapLoad = (map: google.maps.Map) => {
//     mapRef.current = map;
//     createMarkers(map);
//   };
//   if (!isLoaded || !center) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <GoogleMap
//       mapContainerStyle={{width: '350px', height: '150px'}}
//       center={center}
//       zoom={9}
//       onLoad={handleMapLoad}
//     />
//   );
// }
var react_1 = require("react");
var api_1 = require("@react-google-maps/api");
var axios_1 = require("axios");
// import hearIcon from '@/assets/icons/hearIcon.png';
var heartIcon_webp_1 = require("@/assets/icons/heartIcon.webp");
var Spinner_1 = require("@/components/Sipnner/Spinner");
function MapComponent(_a) {
    var _this = this;
    var locationList = _a.locationList, travelPlaceList = _a.travelPlaceList;
    var isLoaded = (0, api_1.useJsApiLoader)({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    }).isLoaded;
    var mapRef = (0, react_1.useRef)(null);
    // const [center, setCenter] = useState<Coordinates | null>(null);
    // Geocoding API를 이용해 장소 이름에서 위도, 경도를 가져오는 함수
    var getCoordinatesFromPlace = function (placeName) { return __awaiter(_this, void 0, void 0, function () {
        var apiKey, url, response, results, location_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
                    url = "https://maps.googleapis.com/maps/api/geocode/json";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get(url, {
                            params: {
                                address: placeName,
                                key: apiKey,
                            },
                        })];
                case 2:
                    response = _a.sent();
                    results = response.data.results;
                    if (results && results.length > 0) {
                        location_1 = results[0].geometry.location;
                        return [2 /*return*/, { lat: location_1.lat, lng: location_1.lng }];
                    }
                    else {
                        console.error('No results found for this place:', placeName);
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching coordinates:', error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // travelPlaceList에 있는 모든 장소의 좌표를 가져와 LatLngBounds 설정
    var fetchAndSetBounds = function (map) { return __awaiter(_this, void 0, void 0, function () {
        var coordinatesList, validCoordinates, bounds_1, listener_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(travelPlaceList.map(function (place) { return getCoordinatesFromPlace(place); }))];
                case 1:
                    coordinatesList = _a.sent();
                    validCoordinates = coordinatesList.filter(Boolean);
                    if (validCoordinates.length > 0) {
                        bounds_1 = new google.maps.LatLngBounds();
                        // 각 장소의 좌표를 LatLngBounds에 추가
                        validCoordinates.forEach(function (coord) {
                            bounds_1.extend(coord);
                        });
                        // 모든 장소가 포함되도록 지도에 fitBounds 적용
                        map.fitBounds(bounds_1);
                        listener_1 = map.addListener('bounds_changed', function () {
                            var currentZoom = map.getZoom();
                            if (currentZoom && currentZoom > 12) {
                                // 최대 줌 레벨 설정
                                map.setZoom(9); // 원하는 줌 레벨로 설정
                            }
                            google.maps.event.removeListener(listener_1); // 리스너 제거
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    // 마커를 생성하는 함수
    var createMarkers = function (map) {
        console.log(locationList);
        locationList.forEach(function (location) {
            new google.maps.Marker({
                map: map,
                position: { lat: location.latitude, lng: location.longitude },
                // icon: {
                //   path: google.maps.SymbolPath.CIRCLE, // 기본 마커 대신 원형 심볼
                //   fillColor: '#FF0000', // 마커 색상 (빨간색)
                //   fillOpacity: 1, // 색상 불투명도
                //   strokeWeight: 2, // 테두리 두께
                //   strokeColor: '#FFFFFF', // 테두리 색상 (흰색)
                //   scale: 8, // 크기 (값을 키워서 확대)
                // },
                icon: {
                    url: heartIcon_webp_1.default, // hearIcon 이미지를 마커로 사용
                    size: new google.maps.Size(18, 18), // 원본 이미지 크기 설정
                    scaledSize: new google.maps.Size(18, 18), // 이미지 크기 조정
                },
            });
        });
    };
    var handleMapLoad = function (map) {
        mapRef.current = map;
        fetchAndSetBounds(map); // 지도 로드 시 travelPlaceList를 기준으로 fitBounds 적용
        createMarkers(map);
    };
    if (!isLoaded) {
        return (0, jsx_runtime_1.jsx)(Spinner_1.default, {});
    }
    return ((0, jsx_runtime_1.jsx)(api_1.GoogleMap, { mapContainerStyle: { width: '350px', height: '150px' }, 
        // center={center} // center가 없을 경우 서울 좌표로 기본값 설정
        zoom: 9, onLoad: handleMapLoad }));
}
