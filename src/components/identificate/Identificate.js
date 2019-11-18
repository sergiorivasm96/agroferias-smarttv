import React from "react";
import FirebaseConection from "../../services/firebase-connection.js";

class Identificate extends React.Component {
  constructor(props) {
    super(props);
    this.firebaseConnection = new FirebaseConection();
    this.firebaseConnection.init();
  }

  componentDidMount() {
  
    let tvid = "tv-1";
    const sessionRef = this.firebaseConnection.database.ref(`sessiones/${tvid}`);
    sessionRef.on("value", (snapshot)=> {
      console.log(" el valor es ", snapshot.val());
    });
  }

  render() {
    return <div>Identificate</div>;
  }
}

export default Identificate;
