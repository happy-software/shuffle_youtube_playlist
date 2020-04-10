/* global gapi */
import React from 'react';

class OauthButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      buttonText: 'Sign In/Authorize',
      revokeButtonDisplay: 'none',
      authStatusText: 'You have not authorized this app or you are signed out.',
      GoogleAuth: null,
      SCOPE: 'https://www.googleapis.com/auth/youtube.force-ssl',
      url: `https://youtube.com/watch?v=${this.props.videoId}`
    }
    this.initClient = this.initClient.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.revokeAccess = this.revokeAccess.bind(this);
    this.setSigninStatus = this.setSigninStatus.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);  
  }

  componentDidMount() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', this.initClient);

  }

  initClient() {
    // Retrieve the discovery document for version 3 of YouTube Data API.
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': 'YOUR_API_KEY',
        'clientId': 'YOUR_CLIENT_ID',
        'discoveryDocs': [discoveryUrl],
        'scope': this.state.SCOPE
    }).then(function () {
      this.setState({ 
        GoogleAuth: gapi.auth2.getAuthInstance()
      })

      // Listen for sign-in state changes.
      this.state.GoogleAuth.isSignedIn.listen(this.updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      var user = this.state.GoogleAuth.currentUser.get();
      this.setSigninStatus();
    });
  }

  handleAuthClick() {
    if (this.state.GoogleAuth.isSignedIn.get()) {
      // User is authorized and has clicked "Sign out" button.
      this.state.GoogleAuth.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      this.state.GoogleAuth.signIn();
    }
  }

  revokeAccess() {
    this.state.GoogleAuth.disconnect();
  }

  setSigninStatus(isSignedIn) {
    var user = this.state.GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(this.state.SCOPE);
    if (isAuthorized) {
      this.setState({
        buttonText: 'Sign out',
        revokeButtonDisplay: 'inline-block',
        authStatusText: 'You are currently signed in and have granted access to this app.',
      })
    } else {
      this.setState({
        buttonText: 'Sign In/Authorize',
        revokeButtonDisplay: 'none',
        authStatusText: 'You have not authorized this app or you are signed out.',
      })
    }
  }

  updateSigninStatus(isSignedIn) {
    this.setSigninStatus();
  }

  render() {
    const loginButtonOpts = {
      marginLeft: 25
    }
    const revokeButtonOpts = {
      display: this.state.revokeButtonDisplay, 
      marginLeft: 25
    }
    const authStatusOpts = {
      display: 'inline',
      paddingLeft: 25
    }

    return(
      <div>
        <button id="sign-in-or-out-button"
                onClick={this.handleAuthClick}
                style={loginButtonOpts}>{this.state.buttonText}</button>
        <button id="revoke-access-button"
                onClick={this.revokeAccess}
                style={revokeButtonOpts}>Revoke access</button>

        <div id="auth-status" style={authStatusOpts}>{this.state.authStatusText}</div><hr/>
      </div>
    );
  }
}

export default OauthButton;