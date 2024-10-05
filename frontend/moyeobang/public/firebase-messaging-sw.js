// 푸시 알림 처리하는 서비스워커

importScripts(
  'https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js'
);

self.addEventListener('install', _ => {
  console.log('fcm sw install...');
  self.skipWaiting();
});

self.addEventListener('activate', _ => {
  console.log('fcm service worker가 실행되었습니다.');
});

const firebaseConfig = {
  apiKey: 'AIzaSyDypWGdlW3XCYCFKKiqeQsC8ZTVK6KIH3w',
  authDomain: 'moyeobang-d1dec.firebaseapp.com',
  projectId: 'moyeobang-d1dec',
  storageBucket: 'moyeobang-d1dec.appspot.com',
  messagingSenderId: '843044088485',
  appId: '1:843044088485:web:598d60eb3abcbd8646bb4c',
  measurementId: 'G-1NPCHWL974',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(messaging, payload => {
  console.log(payload.notification); // 푸시알림 콘솔 확인용
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    data: {
      url: payload.fcmOptions.link, // 알림 클릭시 이동할 URL
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', event => {
  event.notification.close(); // 알림 닫기

  // 알림에서 설정한 URL로 이동
  const clickActionUrl = event.notification.data.url;
  if (clickActionUrl) {
    event.waitUntil(self.clients.openWindow(clickActionUrl));
  }
});

// firebase-messaging-sw.js

self.addEventListener('install', event => {
  console.log('Service Worker 설치 완료.');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker 활성화 완료.');
});

self.addEventListener('fetch', event => {
  console.log('Service Worker에서 fetch 요청을 처리하고 있습니다.');
  event.respondWith(fetch(event.request));
});
