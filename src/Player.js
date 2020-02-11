import React from 'react';
import Youtube from 'react-youtube';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: '4KV9qz90fYo',
    }
  }

  render() {
    const opts = {
      height: '800',
      width:  '100%',
      playerVars: {
        autoplay: 1
      }
    };

    return(<Youtube videoId={this.props.videoId} opts={opts} onReady={this._onReady} onEnd={this._onEnd.bind(this)} />);
  }

  _onEnd(event) {
    this.setState({videoId: "MKIHb1lvqSc"})
  }
  
  _onReady(event) {
    // access to player in all event handlers via `event.target`
    // event.target.pauseVideo();
    console.log("Player ready");
  }
}

export default Player;