"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TravelMainMap;
var jsx_runtime_1 = require("@emotion/react/jsx-runtime");
var react_1 = require("react");
var api_1 = require("@react-google-maps/api");
var TravelLog_1 = require("@/contexts/TravelLog");
var useTravelDetailStore_1 = require("@/store/useTravelDetailStore");
var heartIcon_webp_1 = require("@/assets/icons/heartIcon.webp");
var blueDot_png_1 = require("@/assets/icons/blueDot.png");
var containerStyle = {
    width: '100%',
    height: '48vh', // 원하는 높이로 설정
};
var defaultCenter = { lat: 37.5665, lng: 126.978 }; // 서울 기본 중심 좌표
function TravelMainMap() {
    var _a = (0, TravelLog_1.useTravelLogContext)(), travelSchedules = _a.travelSchedules, scheduleDayNum = _a.scheduleDayNum;
    var travelPlaceList = (0, useTravelDetailStore_1.default)().travelPlaceList;
    var _b = (0, react_1.useState)([]), markers = _b[0], setMarkers = _b[1];
    var _c = (0, react_1.useState)(null), currentLocation = _c[0], setCurrentLocation = _c[1];
    var _d = (0, react_1.useState)(null), map = _d[0], setMap = _d[1];
    var _e = (0, react_1.useState)([]), placeCoords = _e[0], setPlaceCoords = _e[1];
    var _f = (0, react_1.useState)(null), selectedMarker = _f[0], setSelectedMarker = _f[1];
    var _g = (0, react_1.useState)(), selectedMarkerInfo = _g[0], setSelectedMarkerInfo = _g[1];
    // 현재 위치 가져오기
    (0, react_1.useEffect)(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('[*] position', position);
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            }, function (error) {
                console.error('Error getting current position:', error);
            });
        }
        else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);
    // 마커 생성 및 스케줄 변경 시 마커 업데이트
    (0, react_1.useEffect)(function () {
        var _a, _b;
        if (scheduleDayNum) {
            var schedules = (_b = (_a = travelSchedules[scheduleDayNum - 1]) === null || _a === void 0 ? void 0 : _a.daySchedules) !== null && _b !== void 0 ? _b : [];
            var newMarker = schedules
                .map(function (schedule) {
                if ('scheduleId' in schedule) {
                    return {
                        lat: schedule.scheduleLocation.latitude,
                        lng: schedule.scheduleLocation.longitude,
                        googlePlaceId: schedule.scheduleLocation.googlePlaceId,
                        category: schedule.scheduleLocation.category,
                        name: schedule.scheduleLocation.title,
                    };
                }
                else if ('transactionId' in schedule) {
                    return {
                        lat: schedule.latitude,
                        lng: schedule.longitude,
                        name: schedule.paymentName,
                    };
                }
                return null;
            })
                .filter(function (marker) { return marker !== null; });
            setMarkers(newMarker);
        }
    }, [scheduleDayNum, travelSchedules]);
    // Geocoding API를 사용하여 주소를 위도와 경도로 변환
    (0, react_1.useEffect)(function () {
        if (travelPlaceList.length > 0) {
            var geocoder_1 = new window.google.maps.Geocoder();
            var promises = travelPlaceList.map(function (place) {
                return new Promise(function (resolve, reject) {
                    geocoder_1.geocode({ address: place }, function (results, status) {
                        if (status === 'OK' && (results === null || results === void 0 ? void 0 : results[0])) {
                            var location_1 = results[0].geometry.location;
                            resolve({
                                lat: location_1.lat(),
                                lng: location_1.lng(),
                            });
                        }
                        else {
                            reject('Geocode was not successful for the following reason: ' + status);
                        }
                    });
                });
            });
            Promise.all(promises)
                .then(function (results) {
                setPlaceCoords(results);
            })
                .catch(function (error) {
                console.error(error);
            });
        }
    }, [travelPlaceList]);
    // 마커 클릭 시 설명 가져오기
    var handleMarkerClick = function (marker) {
        if (marker.googlePlaceId) {
            var newSelectedMarkerInfo = {
                name: marker.name,
                category: marker.category,
            };
            setSelectedMarker(marker);
            setSelectedMarkerInfo(newSelectedMarkerInfo);
        }
        else {
            var newSelectedMarkerInfo = {
                name: marker.name,
            };
            setSelectedMarker(marker);
            setSelectedMarkerInfo(newSelectedMarkerInfo);
        }
    };
    (0, react_1.useEffect)(function () {
        if (map) {
            if (markers.length > 0) {
                var bounds_1 = new window.google.maps.LatLngBounds();
                markers.forEach(function (marker) {
                    bounds_1.extend({ lat: marker.lat, lng: marker.lng });
                });
                if (currentLocation) {
                    bounds_1.extend({ lat: currentLocation.lat, lng: currentLocation.lng });
                }
                map.fitBounds(bounds_1); // 모든 마커를 포함하는 경계로 설정
            }
            else if (placeCoords.length > 0) {
                var bounds_2 = new window.google.maps.LatLngBounds();
                placeCoords.forEach(function (coord) {
                    bounds_2.extend({ lat: coord.lat, lng: coord.lng });
                });
                map.fitBounds(bounds_2); // 모든 장소를 포함하는 경계로 설정
            }
            else {
                // 마커가 없고 placeCoords도 없을 때 기본 중심을 서울로 설정
                map.setCenter(defaultCenter);
                map.setZoom(12); // 서울을 중심으로 기본 줌 레벨 설정
            }
        }
    }, [map, markers, placeCoords, currentLocation]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("style", { children: "\n          .gm-style-iw-c {\n            padding: 0 !important; /* InfoWindow \uB0B4\uBD80 \uD328\uB529 \uC870\uC815 */\n          }\n          .gm-ui-hover-effect {\n           display: none !important;\n          }\n        " }), (0, jsx_runtime_1.jsxs)(api_1.GoogleMap, { mapContainerStyle: containerStyle, center: defaultCenter, zoom: 12, onLoad: function (mapInstance) {
                    setMap(mapInstance);
                }, onUnmount: function () {
                    console.log('Map unmounted');
                    setMap(null);
                }, onClick: function () {
                    setSelectedMarker(null);
                    setSelectedMarkerInfo(undefined);
                }, options: {
                    mapTypeControl: false, // 지도 위성 모드 설정 버튼 숨기기
                    fullscreenControl: false, // 최대화 버튼 숨기기
                }, children: [markers.map(function (marker, index) { return ((0, jsx_runtime_1.jsx)(api_1.Marker, { position: { lat: marker.lat, lng: marker.lng }, title: "Marker ".concat(index + 1), icon: {
                            url: heartIcon_webp_1.default, // import한 이미지 사용
                            scaledSize: new window.google.maps.Size(30, 30), // 이미지 크기 조정
                        }, label: {
                            text: "".concat(index + 1), // 인덱스를 레이블로 표시
                            color: 'white', // 레이블 색상
                            fontSize: '12px', // 레이블 폰트 크기
                            fontFamily: 'semibold',
                        }, onClick: function () { return handleMarkerClick(marker); } }, index)); }), selectedMarker && ((0, jsx_runtime_1.jsx)(api_1.InfoWindow, { position: {
                            lat: selectedMarker.lat,
                            lng: selectedMarker.lng,
                        }, onCloseClick: function () {
                            setSelectedMarker(null);
                            setSelectedMarkerInfo(undefined);
                        }, options: {
                            pixelOffset: new window.google.maps.Size(0, -30), // InfoWindow를 마커 위로 30픽셀 이동
                        }, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                                margin: '0 5px 10px 5px',
                                padding: '0 10px',
                                maxWidth: '200px',
                                fontFamily: 'semibold',
                                fontSize: '16px',
                            }, children: [(0, jsx_runtime_1.jsxs)("p", { style: { padding: '0 0 5px 0' }, children: [' ', "\uC7A5\uC18C \uC774\uB984 : ", (selectedMarkerInfo === null || selectedMarkerInfo === void 0 ? void 0 : selectedMarkerInfo.name) || ''] }), ' ', (selectedMarkerInfo === null || selectedMarkerInfo === void 0 ? void 0 : selectedMarkerInfo.category) && ((0, jsx_runtime_1.jsxs)("p", { style: { margin: '0' }, children: ["\uCE74\uD14C\uACE0\uB9AC : ", (selectedMarkerInfo === null || selectedMarkerInfo === void 0 ? void 0 : selectedMarkerInfo.category) || ''] }))] }) })), currentLocation && ((0, jsx_runtime_1.jsx)(api_1.Marker, { position: { lat: currentLocation.lat, lng: currentLocation.lng }, title: "Current Location", icon: {
                            url: blueDot_png_1.default, // import한 이미지 사용
                            scaledSize: new window.google.maps.Size(30, 30), // 이미지 크기 조정
                        }, label: {
                            text: '현재 위치', // 현재 위치 레이블
                            color: 'white', // 레이블 색상
                            fontSize: '8px', // 레이블 폰트 크기
                            fontFamily: 'semibold',
                        } }))] })] }));
}
