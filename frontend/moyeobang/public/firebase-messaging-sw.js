// importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

// self.addEventListener('install', _ => {
//   self.skipWaiting();
// });

// self.addEventListener('activate', _ => {
//   console.log('fcm service worker가 실행되었습니다.');
// });

// const firebaseConfig = {
//   apiKey: 'AIzaSyDypWGdlW3XCYCFKKiqeQsC8ZTVK6KIH3w',
//   authDomain: 'moyeobang-d1dec.firebaseapp.com',
//   projectId: 'moyeobang-d1dec',
//   storageBucket: 'moyeobang-d1dec.appspot.com',
//   messagingSenderId: '843044088485',
//   appId: '1:843044088485:web:598d60eb3abcbd8646bb4c',
//   measurementId: 'G-1NPCHWL974',
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(payload => {
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     icon: payload.data.image,
//     data: {
//       url: payload.data.click_action, // 알림 클릭시 이동할 URL
//     },
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// // 알림 클릭 이벤트 처리
// self.addEventListener('notificationclick', event => {
//   event.notification.close(); // 알림 닫기

//   // 알림에서 설정한 URL로 이동
//   const clickActionUrl = event.notification.data.url;
//   if (clickActionUrl) {
//     event.waitUntil(clients.openWindow(clickActionUrl));
//   }
// });
