import React, { useEffect } from 'react';

function LoginButton(props) {
  function onSignIn(googleUser) {
    props.setIsLoggedIn(true);
    props.setUser(googleUser.getBasicProfile());
    props.setAccessToken(googleUser.tc.access_token);
  };

  function renderGoogleLoginButton() {
    window.gapi.signin2.render('my-signin2', {
      scope: 'https://www.googleapis.com/auth/youtube',
      width: 250,
      height: 40,
      longtitle: true,
      theme: 'light',
      onsuccess: onSignIn
    });
  };

  function logout() {
    let auth2 = window.gapi && window.gapi.auth2.getAuthInstance();
    if (auth2) {
      auth2.signOut()
        .then(() => {
          props.setIsLoggedIn(false);
          console.log('Logged out successfully');
        })
        .catch(err => {
          console.log('Error while logging out', err);
        });
    } else {
      console.log('error while logging out');
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
      <br />
      {props.isLoggedIn && (
        <button style={{ width: 200, height: 40, textAlign: 'center' }} onClick={() => logout()}>
          Logout
        </button>
      )}
    </div>
  );
}

export default LoginButton;