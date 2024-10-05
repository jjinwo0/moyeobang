// // Import the functions you need from the SDKs you need
// import {initializeApp} from 'firebase/app';
// import {
//   getMessaging,
//   getToken,
// } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging.js';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

import {initializeApp} from 'firebase/app';
import {getMessaging, getToken} from 'firebase/messaging';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDypWGdlW3XCYCFKKiqeQsC8ZTVK6KIH3w',
  authDomain: 'moyeobang-d1dec.firebaseapp.com',
  projectId: 'moyeobang-d1dec',
  storageBucket: 'moyeobang-d1dec.appspot.com',
  messagingSenderId: '843044088485',
  appId: '1:843044088485:web:598d60eb3abcbd8646bb4c',
  measurementId: 'G-1NPCHWL974',
};
// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase Messaging 초기화
const messaging = getMessaging(app);

// 여기 적은 건 예시일 뿐이므로 axios활용하면 됩니다. 예시 그대로 복붙하고 실제 사용할 값들은 수정한 것이라 스펙은 수정 안해도됩니다.)
// 권한 요청 및 토큰 저장 로직
export async function requestPermissionAndSaveToken() {
  // console.log('requestPermission');
  try {
    // // 서비스 워커가 준비될 때까지 기다리기
    // const registration = await navigator.serviceWorker.ready;
    // console.log('Service Worker 준비 완료:', registration);

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, {
        vapidKey:
          'BFg_yRn7AVZukoSqRrEcdS-OA-5O8xtZFRad4q7Y7ZteODNuCTrgTbAnp588LN94b6UzY-TZ7jSvnwdSCRDQxNU',
      });
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        // 서버에 토큰 저장
        saveTokenInMemberEntity(currentToken);
      } else {
        console.error('No registration token available.');
      }
    } else {
      console.error('Notification permission not granted.');
    }
  } catch (error) {
    console.error(
      'Error during notification permission or token saving:',
      error
    );
  }
}

const memberId: number = 4;

// 서버에 FCM 토큰 저장 요청
function saveTokenInMemberEntity(token: string) {
  fetch(`https://j11c102.p.ssafy.io/api/notification/agree/${memberId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token}),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => console.log('Token saved:', data))
    .catch(err => console.error('Error saving token:', err));
}
