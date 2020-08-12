import React, { useEffect } from 'react';

function GoogleLoginButton(props) {
  function onSignIn(googleUser) {
    let auth2 = window.gapi && window.gapi.auth2.getAuthInstance();
    if (auth2) {
      props.setGoogleState({
        apiRequestLock: false,
        isLoggedIn: true,
        user: googleUser.getBasicProfile(),
        accessToken: googleUser.wc.access_token
      })
    }
  };

  function renderGoogleLoginButton() {
    window.gapi.signin2.render('my-signin2', {
      scope: 'https://www.googleapis.com/auth/youtube',
      theme: 'dark',
      width: 199,
      height: 26,
      onsuccess: onSignIn
    });
  };

  function logout() {
    let auth2 = window.gapi && window.gapi.auth2.getAuthInstance();
    if (auth2) {
      auth2.signOut()
        .then(() => {
          props.setGoogleState({ 
            isLoggedIn: false,
            user: null,
            accessToken: ""
          })
          console.log('Logged out successfully');
        })
        .catch(err => {
          console.log('Error while logging out', err);
        });
    }
  };

  function onLoad() {
    window.addEventListener('google-loaded', renderGoogleLoginButton);
    window.gapi && renderGoogleLoginButton();
  }

  useEffect(onLoad, [])

  return (
    <div>
      <div id="my-signin2"></div>
      {
      props.googleState.isLoggedIn && (
        <button 
          className="buttonListButton"
          onClick={() => logout()}
        >Google Logout</button>
      )}
    </div>
  );
}

export default GoogleLoginButton;