import { database } from "firebase";
import * as firebaseApp from "firebase/app";

class FirebaseConection {
  initialized = false;
  init() {
    const firebaseConfig = {
      apiKey: "AIzaSyAZDatQk2hmtCkMyjX-1y3QYknGQgsidXA",
      authDomain: "reconocimientofacialpucp.firebaseapp.com",
      databaseURL: "https://reconocimientofacialpucp.firebaseio.com",
      projectId: "reconocimientofacialpucp",
      storageBucket: "reconocimientofacialpucp.appspot.com",
      messagingSenderId: "488922524191",
      appId: "1:488922524191:web:d13a77b5172ddddc32832a"
    };
    // Initialize Firebase

    const appInitial = _firebaseAppFactory(firebaseConfig);
    this.initialized = true;
    this.database = database();
  }
}

export default FirebaseConection;

export function _firebaseAppFactory(options) {
  const name = "[DEFAULT]";
  const config = {};
  config.name = config.name || name;
  const existingApp = firebaseApp.apps.filter(app => app && app.name === config.name)[0];
  return existingApp || firebaseApp.initializeApp(options, config);
}
