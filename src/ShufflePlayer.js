import React from 'react';
import AppConstants from './AppConstants';
import Player from './Player';
import PlaylistSelector from './PlaylistSelector';
import VideoTitleDisplay from './VideoTitleDisplay';
import axios from 'axios';

class ShufflePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      played_history: [],
      playlist_ids: ["FL7B_s7wxX-D__fkTiYp3Oaw",            // Favorites
                     "PL8g7AzKjYPsPZ5jy04jsKPhcpYdkmbCTe",  // Malayalam
                     "PL8g7AzKjYPsOjSDrikmLU22NtJ5M2F65s",  // Inna
                     "PL8g7AzKjYPsOCSWat1e3DjQ8UVj7G1zf1",  // KPop
                     "PL8g7AzKjYPsNXA56I9GjB4hz3Z39NSrwN",  // Drum&Bass
                     "PL8g7AzKjYPsNcw0KrijKocKW_Q7PgPEo9"], // PsyTrance
      currentVideoId: '[waiting_to_load_video_lol]',
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
        currentTitle:   nextSong.title,
    });

    console.log(`${songCount}: https://youtube.com/watch?v=${nextSongId}\t${nextSong.title}`);
  }


  componentDidMount() {
    console.log(`Loading Playlists: ${this.state.playlist_ids}`);
    axios.post(AppConstants.APIEndpoints.SHUFFLE, {playlist_ids: this.state.playlist_ids})
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

    const playlistSelectorOpts = {
      color: 'pink',
      fontSize: 22,
      borderStyle: 'solid'
    }

    return (
      <div>
        <Player videoId={this.state.currentVideoId} onEnd={this.pickNextSong} ></Player>
        <button onClick={this.pickNextSong}>Shuffle Again</button>
        <VideoTitleDisplay title={this.state.currentTitle} style={videoTitleOpts} ></VideoTitleDisplay>
        <PlaylistSelector style={playlistSelectorOpts}></PlaylistSelector>
      </div>
    )
  }
}

export default ShufflePlayer;