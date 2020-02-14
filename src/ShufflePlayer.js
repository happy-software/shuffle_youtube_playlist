import React from 'react';
import AppConstants from './AppConstants';
import Player from './Player';
import VideoTitleDisplay from './VideoTitleDisplay';
import axios from 'axios';

class ShufflePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      played_history: [],
      playlist_id: 'FL7B_s7wxX-D__fkTiYp3Oaw',
      currentVideoId: '[start]',
      count: 0,
      loadingResults: true,
      currentTitle: '',
    }

    this.pickNextSong = this.pickNextSong.bind(this);
  }

  pickNextSong(event) {
    const nextSong   = this.state.videos[Math.floor(Math.random()*this.state.videos.length)];
    const nextSongId = nextSong.video_id;
    const songCount  = this.state.played_history.length;

    this.setState({
        currentVideoId: nextSongId, 
        played_history: this.state.played_history.concat(nextSongId),
        currentTitle: nextSong.title,
      });

    console.log(`${songCount}: https://youtube.com/watch?v=${nextSongId}\t${nextSong.title}`);
  }


  componentDidMount() {
    console.log(`Loading Playlist: ${this.state.playlist_id}`);
    axios.get(AppConstants.APIEndpoints.SHUFFLE + this.state.playlist_id)
    .then(response => {
      const songs = response.data.songs;
      this.setState({videos: songs, loadingResults: false});
      this.pickNextSong();
    })
    .catch((e) => console.log(`Couldn't retrieve playlist songs! ${e}`))
  }

  render() {
    const videoTitleOpts = {
      color: 'pink',
      fontSize: 44,
    };

    return (
      <div>
        <Player videoId={this.state.currentVideoId} onEnd={this.pickNextSong} ></Player>
        <button onClick={this.pickNextSong}>Shuffle Again</button>
        <VideoTitleDisplay title={this.state.currentTitle} style={videoTitleOpts} ></VideoTitleDisplay>
      </div>
    )
  }
}

export default ShufflePlayer;