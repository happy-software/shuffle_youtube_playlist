import React from 'react';
import AppConstants from './AppConstants';
import Player from './Player';
import axios from 'axios';

class ShufflePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      playlist_id: 'FL7B_s7wxX-D__fkTiYp3Oaw',
      currentVideoId: '',
      count: 0,
      loadingResults: true,
    }

    this.pickNextSong = this.pickNextSong.bind(this)
  }

  pickNextSong(event) {
    this.setState({currentVideoId: this.state.videos[Math.floor(Math.random()*this.state.videos.length)]});
  }
  componentDidMount() {
    console.log(`Loading Playlist: ${this.state.playlist_id}`);
    axios.get(AppConstants.APIEndpoints.SHUFFLE + this.state.playlist_id)
    .then(userFriendlyData => {
      this.setState({videos: userFriendlyData.data.video_ids, loadingResults: false});
      this.pickNextSong();
    })
    .catch((e) => console.log(`Couldn't retrieve playlist songs! ${e}`))
  }

  render() {
    return (
      <div>
        <Player videoId={this.state.currentVideoId} onEnd={this.pickNextSong} ></Player>
        <button onClick={this.pickNextSong}>Shuffle Again</button>
      </div>
    )
  }
}

export default ShufflePlayer;