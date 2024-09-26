import React, {useEffect} from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Library,
} from '@react-google-maps/api';
import * as TravelMainMapStyle from '@/components/travelLog/travelLogList/TravelMainMapStyle';

const mapAPI = import.meta.env.VITE_GOOGLE_API_KEY;
const libraries: Library[] = ['places'];
const containerStyle = {
  width: '100%',
  height: '100%',
};

export default function TravelMainMap() {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: mapAPI,
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      console.log('Google Maps API is loaded');
    }
  }, [isLoaded]);

  return (
    <div css={TravelMainMapStyle.TravelMainMapLayout}>
      <GoogleMap mapContainerStyle={containerStyle}></GoogleMap>
    </div>
  );
}

// const scheduleData=[
//   [
//     {
//       scheduleId: 67890,
//       isPlusSelf:true,
//       scheduleTitle: '도쿄 타워 방문',
//       scheduleLocation:
//       {
//   "googlePlaceId": "ChIJ1x9-lADvYjURbMl_CjjFXjg",
//   "title": "소울로스터리커피",
//   "address": "대한민국 강원특별자치도 춘천시 소양강로 538",
//   "lat": 37.9243555,
//   "lng": 127.7672156,
//   "category":"카페",
// }
//       ,
//       scheduleTime: '2024-10-01T10:00:00',
//       budget: 50000,
//       completion: 'completed',
//       memo: '도쿄 타워가서 누구보다 신나게 놀아야지',
//       scheduleImg:'',
//       matchedTransaction: {
//         transactionId: 78901,
//         paymentName: "도쿄 타워 입장료 결제",
//         totalPrice: 50000,
//         paymentTime: '2024-10-01T12:15:00',
//         splitMethod: "custom",  // 결제 내역 상세조회랑 동일, 정산 방식: "receipt" (영수증 정산) 또는 "custom" (default(1/n), 사용자 지정)
//         participantsInfo: participantsInfo[],
//       },
//     },
//     {
//       transactionId: 78902,
//       isPlusSelf:false,
//       paymentName: "신주쿠 카페 결제",
//       totalPrice: 25000,
//       paymentTime: '2024-10-01T16:00:00',
//       splitMethod: "receipt",  // 정산 방식
//       participantsInfo: participantsInfo[],
//     },
//   ],
//   [
//     {
//       scheduleId: 67891,
//       isPlusSelf:true,
//       scheduleTitle: '시부야 거리 탐방',
//       scheduleLocation: '시부야',
//       scheduleTime: '2024-10-01T13:00:00',
//       predictedBudget: 30000,
//       completion: 'pending',
//       memo: '',
//       matchedTransaction: null,
//     },
//   ],
// ];
