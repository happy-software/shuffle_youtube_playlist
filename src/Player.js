import React from 'react';
import Youtube from 'react-youtube';

class Player extends React.Component {

  render() {
    const opts = {
      height: '800',
      width:  '100%',
      playerVars: {
        autoplay: 1
      },
      // host: "https://www.youtube-nocookie.com" // TODO: Try to get this working so my extensions don't have to block tons of things
    };

    return(<Youtube videoId={this.props.videoId} opts={opts} onReady={this._onReady} onEnd={this.props.onEnd} onError={this.props.onEnd}/>);
  }

  _onReady(event) {
    // access to player in all event handlers via `event.target`
    // event.target.pauseVideo();
    //console.log(event.target.getVolume());
    //https://developers.google.com/youtube/iframe_api_reference#Playback_controls
    console.log("Player ready");
  }
}

export default Player;