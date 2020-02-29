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
      host: "https://www.youtube-nocookie.com"
    };

    return(<Youtube videoId={this.props.videoId} opts={opts} onReady={this._onReady} onEnd={this.props.onEnd} />);
  }

  _onReady(event) {
    // access to player in all event handlers via `event.target`
    // event.target.pauseVideo();
    console.log("Player ready");
  }
}

export default Player;