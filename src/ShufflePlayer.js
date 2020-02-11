import React from 'react';
import AppConstants from './AppConstants';
import Player from './Player';

class ShufflePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      playlist_id: 'FL7B_s7wxX-D__fkTiYp3Oaw',
      currentVideoId: 'V0s7TN80o9I',
      count: 0,
    }
  }

  playNextSong() {
    this.setState({count: this.state.count+1});
  }

  onSongEnd(event) {
    console.log("Song ended, here is the event: ");
    console.log(JSON.stringify(event));
  }

  componentDidMount() {
    fetch(AppConstants.APIEndpoints.SHUFFLE + this.state.playlist_id, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        playlist_id: this.state.playlist_id
      })
    })
    .then(response => response.json())
    .then(userFriendlyData => {
      console.log("Here is userFriendlyData: " + JSON.stringify(userFriendlyData));
      this.setState({videos: userFriendlyData, loadingResults: false});
    })
  }

  render() {
    return (
      <div>
        <Player videoId={this.state.currentVideoId} ></Player>
      </div>
    )
  }
}

export default ShufflePlayer;