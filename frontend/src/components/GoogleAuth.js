import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import data from '../config/ServiceAccount.json'

const GoogleAuth = (props) => {

    const firebaseConfig = data;
      
      initializeApp(firebaseConfig);

      const navigate = useNavigate();
      
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      
    const google_login = (user) => {
        var body_ = JSON.stringify({ "name": user.displayName, 'email': user.email});
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: body_
        }
        fetch('http://127.0.0.1:5001/chat-3d05a/us-central1/app/user/register_google', requestOptions).
            then((response) => response.json()).
            then((data) => {
                if(data.message == "User registered successfully"){
                    navigate('/login')
                }
                else{
                    alert("Some error occured")
                }
            }).
            catch((error) => {
                console.log("error : ", error.message)
            })
    }

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // Access token of user
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            if (user) {
              user.getIdToken().then((tkn) => {
                // set access token in session storage
                localStorage.setItem("token", tkn);
                if(props.login){
                    navigate('/');
                }
                else{
                    google_login(user)
                }
                // setAuthorizedUser(true);
              })
            }
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <button
                style={{
                    margin: '8px',
                    backgroundColor: '#DB4437',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    cursor: 'pointer',
                }}
                onClick={handleGoogleSignIn}
            >
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>G</span>
                <span style={{ marginLeft: '8px' }}>{props.login ? "Sign in with Google" : "Sign up with Google"}</span>
            </button>
        </div>
    );
};

export default GoogleAuth;
