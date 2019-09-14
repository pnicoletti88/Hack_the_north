const firebase = require('firebase');

const firebaseConfig = {
  apiKey: 'AIzaSyDRujDPowERRwIlFfKKE6EzMWSDSt1vBBs',
  authDomain: 'hackthenorth2019-85da0.firebaseapp.com',
  databaseURL: 'https://hackthenorth2019-85da0.firebaseio.com',
  projectId: 'hackthenorth2019-85da0',
  storageBucket: '',
  messagingSenderId: '797026456543',
  appId: '1:797026456543:web:7af263970170b3ed2b6a6a',
};


firebase.initializeApp(firebaseConfig);


const db = firebase.database();

module.exports = db;
