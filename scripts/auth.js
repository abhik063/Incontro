var firebaseConfig = {
  apiKey: "AIzaSyD6JsLx_qgje4-H-OF75xByPJ0gLZ7SG9M",
  authDomain: "incontro-b84ee.firebaseapp.com",
  projectId: "incontro-b84ee",
  storageBucket: "incontro-b84ee.appspot.com",
  messagingSenderId: "966643275541",
  appId: "1:966643275541:web:e1f9a56e1ab9ffaa13bb1c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();

//update firestore settings
db.settings({ timestampsInSnapshots: true });
auth.onAuthStateChanged(user => {
  if (user){
    //get data
    db.collection('guides').get().then(snapshot => {
     
      setupUI(user);
    });
  } else {
    setupUI();
    
  }
});

//signup
const signupForm= document.querySelector('#signup-form');
  
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;


  //sign up the user
  auth.createUserWithEmailAndPassword(email,password).then(cred => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    window.location.href = "index.html";
  }) .catch(function (error) {
    var authError = error;
    var errorCode = authError.code;
    var errorMessage = authError.message;
    if (errorMessage === "auth/weak-password") {
        alert("The password is too weak.");
    }
    else {
        alert(errorMessage);
    }
    console.log(error);
  });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click' , (e) => {
  e.preventDefault();
  auth.signOut();
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //set user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then((cred => {
    //close the login modal and reset the form
    const modal=document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    window.location.href = "index.html";
  }))
})

















