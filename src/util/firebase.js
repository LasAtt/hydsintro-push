import firebase from 'firebase';
import 'firebase/messaging';

const config = {
  apiKey: 'AAAAWrSNZqQ:APA91bH15hnH58797ldiUmsJLuDGg2wZuZreoOpOlABeaVbgYE0_L-ON3Wp0EqxvvjvQy1FSEluT7P8XldFFe7C4l4ipzsA_5TesynsuJCixmtPxYJ-rPPBt_Fr6uhsNhqlbzVtVhxBa',
  projectId: 'api-project-389576222372',
  messagingSenderId: '389576222372',
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
console.log(firebase);

export { firebase, messaging };
