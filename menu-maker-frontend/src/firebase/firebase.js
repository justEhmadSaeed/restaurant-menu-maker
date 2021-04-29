import firebase from 'firebase';

var firebaseConfig = {
	apiKey: process.env.REACT_APP_Api_Key,
	authDomain: process.env.REACT_APP_Auth_Domain,
	projectId: process.env.REACT_APP_Project_Id,
	storageBucket: process.env.REACT_APP_Storage_Bucket,
	messagingSenderId: process.env.REACT_APP_Messaging_SenderId,
	appId: process.env.REACT_APP_App_Id,
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();

export default firebase;
